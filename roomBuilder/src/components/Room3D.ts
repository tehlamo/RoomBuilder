import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { RoomDimensions } from '../types/Room';
import type { Furniture } from '../types/Furniture';

export class Room3D {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private roomMesh!: THREE.Mesh;
  private furnitureMeshes: Map<string, THREE.Mesh> = new Map();
  private furniture: any[] = []; // Store furniture data for validation
  private boundingBoxes: Map<string, THREE.BoxHelper> = new Map(); // Store bounding boxes
  private controls!: OrbitControls;
  private container: HTMLElement;
  
  // Manipulation system
  private manipulationMode: 'none' | 'move' | 'rotate' | 'delete' | 'view' = 'none';
  private selectedFurnitureId: string | null = null;
  private roomDimensions: RoomDimensions | null = null;
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private mouse: THREE.Vector2 = new THREE.Vector2();
  
  // Drag system
  private isDragging: boolean = false;
  private dragStartPosition: THREE.Vector3 = new THREE.Vector3();
  // private dragPlane: THREE.Plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // Floor plane - unused for now
  private dragOffset: THREE.Vector3 = new THREE.Vector3();
  private lastMousePosition: THREE.Vector2 = new THREE.Vector2();
  private snapToGrid: boolean = true;
  private gridSize: number = 0.5; // 0.5 unit grid
  
  // Selection and handles system
  private selectionBox: THREE.BoxHelper | null = null;
  private dragHandles: THREE.Group | null = null;
  private handleMeshes: Map<string, THREE.Mesh> = new Map();
  private isDraggingHandle: boolean = false;
  private activeHandle: string | null = null;
  private appInstance: any = null;

  constructor(container: HTMLElement, appInstance?: any) {
    this.container = container;
    this.appInstance = appInstance;
    this.initializeScene();
    this.setupLighting();
    this.setupControls();
    this.animate();
  }

  private initializeScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    // Get container dimensions with fallbacks
    const width = this.getContainerWidth();
    const height = this.getContainerHeight();

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.container.appendChild(this.renderer.domElement);

    // Enhanced resize handling
    window.addEventListener('resize', () => this.onWindowResize());
    
    // Also listen for container size changes
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => this.onWindowResize());
      resizeObserver.observe(this.container);
    }

  }

  createRoom(dimensions: RoomDimensions): void {
    
    // Store room dimensions for boundary checking
    this.roomDimensions = dimensions;
    
    try {
      if (this.roomMesh) {
        this.scene.remove(this.roomMesh);
      }

      const roomGeometry = new THREE.BoxGeometry(dimensions.width, dimensions.height, dimensions.length);
      const roomMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
        wireframe: true
      });

      this.roomMesh = new THREE.Mesh(roomGeometry, roomMaterial);
      this.roomMesh.position.y = dimensions.height / 2; // Center the room mesh at half height
      this.scene.add(this.roomMesh);

      const floorGeometry = new THREE.PlaneGeometry(dimensions.width, dimensions.length);
      const floorMaterial = new THREE.MeshLambertMaterial({
        color: 0x8b4513,
        transparent: true,
        opacity: 0.8
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = 0; // Floor at Y=0
      floor.receiveShadow = true;
      this.scene.add(floor);

      const ceiling = new THREE.Mesh(floorGeometry, floorMaterial);
      ceiling.rotation.x = Math.PI / 2;
      ceiling.position.y = dimensions.height; // Ceiling at Y=height
      this.scene.add(ceiling);

      const maxDimension = Math.max(dimensions.width, dimensions.length, dimensions.height);
      // Set reasonable camera distance to prevent extreme zoom out
      const cameraDistance = Math.min(maxDimension * 1.2, 30);
      this.camera.position.set(cameraDistance, dimensions.height * 0.6, cameraDistance);
      this.camera.lookAt(0, dimensions.height * 0.3, 0); // Look at center of room height
      
      // Update controls target and reset zoom
      this.controls.target.set(0, dimensions.height * 0.3, 0);
      this.controls.reset();
      this.controls.update();
      
      // Force a resize to ensure proper dimensions after room creation
      setTimeout(() => {
        this.onWindowResize();
      }, 100);
      
      // Setup click handling for object selection
      this.setupClickHandling();
      
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  }

  addFurniture(furniture: Furniture): void {
    const geometry = new THREE.BoxGeometry(furniture.width, furniture.height, furniture.depth);
    const material = new THREE.MeshLambertMaterial({ color: furniture.color });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(furniture.x, furniture.y, furniture.z);
    
    // Apply rotation properly - convert degrees to radians
    // Handle backward compatibility for old designs without rotation data
    const rotation = typeof furniture.rotation === 'number' ? furniture.rotation : 0;
    const rotationRadians = rotation * (Math.PI / 180);
    mesh.rotation.y = rotationRadians;
    
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Make furniture interactive
    mesh.userData = { furnitureId: furniture.id, furniture: furniture };
    mesh.name = furniture.name;

    this.addFurnitureLabel(mesh, furniture.name);
    this.scene.add(mesh);
    this.furnitureMeshes.set(furniture.id, mesh);
    
    // Create and add bounding box
    this.createBoundingBox(mesh, furniture.id);
    
    // Store furniture data for validation
    this.furniture.push(furniture);

  }

  removeFurniture(furnitureId: string): void {
    const mesh = this.furnitureMeshes.get(furnitureId);
    if (mesh) {
      this.scene.remove(mesh);
      this.furnitureMeshes.delete(furnitureId);
    }
    
    // Remove bounding box
    const boundingBox = this.boundingBoxes.get(furnitureId);
    if (boundingBox) {
      this.scene.remove(boundingBox);
      this.boundingBoxes.delete(furnitureId);
    }
    
    // Remove from furniture data array
    this.furniture = this.furniture.filter(f => f.id !== furnitureId);
  }

  clearAllFurniture(): void {
    // Remove all furniture meshes from scene
    this.furnitureMeshes.forEach((mesh, _id) => {
      this.scene.remove(mesh);
    });
    this.furnitureMeshes.clear();
    
    // Remove all bounding boxes from scene
    this.boundingBoxes.forEach((boundingBox, _id) => {
      this.scene.remove(boundingBox);
    });
    this.boundingBoxes.clear();
    
    // Clear furniture data array
    this.furniture = [];
    
  }

  private addFurnitureLabel(_mesh: THREE.Mesh, _name: string): void {
    // You can implement text labels here using TextGeometry or HTML overlays
    // For now, we'll skip this for simplicity
  }

  /**
   * Create a bounding box for furniture
   */
  private createBoundingBox(mesh: THREE.Mesh, furnitureId: string): void {
    const boundingBox = new THREE.BoxHelper(mesh, 0x00ff00); // Green wireframe
    boundingBox.visible = true;
    this.scene.add(boundingBox);
    this.boundingBoxes.set(furnitureId, boundingBox);
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
    pointLight.position.set(0, 5, 0);
    this.scene.add(pointLight);
  }

  private setupControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.enableRotate = true;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 100;
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    // Update controls
    if (this.controls) {
      this.controls.update();
    }

    this.renderer.render(this.scene, this.camera);
  }

  private getContainerWidth(): number {
    const width = this.container.clientWidth || this.container.offsetWidth;
    if (width > 0) return width;
    
    // Fallback to parent container or window width
    const parentWidth = this.container.parentElement?.clientWidth || window.innerWidth;
    return Math.max(parentWidth * 0.75, 800); // Ensure minimum width
  }

  private getContainerHeight(): number {
    const height = this.container.clientHeight || this.container.offsetHeight;
    if (height > 0) return height;
    
    // Fallback to window height minus controls
    return Math.max(window.innerHeight - 70, 400); // Ensure minimum height
  }

  private onWindowResize(): void {
    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      const width = this.getContainerWidth();
      const height = this.getContainerHeight();

      // Ensure we have valid dimensions
      if (width > 0 && height > 0) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);

        // Update controls if they exist
        if (this.controls) {
          this.controls.update();
        }

      }
    });
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  // Method to get furniture information at a specific screen position
  getFurnitureAtPosition(x: number, y: number): Furniture | null {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Convert screen coordinates to normalized device coordinates
    mouse.x = (x / this.container.clientWidth) * 2 - 1;
    mouse.y = -(y / this.container.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, this.camera);

    // Get all furniture meshes
    const furnitureMeshes = Array.from(this.furnitureMeshes.values());
    const intersects = raycaster.intersectObjects(furnitureMeshes);

    if (intersects.length > 0) {
      const furniture = intersects[0].object.userData.furniture;
      return furniture;
    }

    return null;
  }

  // Method to highlight selected furniture
  highlightFurniture(furnitureId: string, highlight: boolean): void {
    const mesh = this.furnitureMeshes.get(furnitureId);
    if (mesh) {
      const material = mesh.material as THREE.MeshLambertMaterial;
      if (highlight) {
        material.emissive.setHex(0x444444); // Add glow effect
        material.opacity = 0.8;
      } else {
        material.emissive.setHex(0x000000); // Remove glow
        material.opacity = 1.0;
      }
    }
  }

  // Method to capture the 3D scene as a thumbnail
  captureThumbnail(): string {
    try {
      // Render the scene
      this.renderer.render(this.scene, this.camera);
      
      // Capture the canvas as a data URL
      const canvas = this.renderer.domElement;
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error capturing thumbnail:', error);
      return '';
    }
  }

  // ===== MANIPULATION SYSTEM =====

  /**
   * Set the manipulation mode
   */
  setManipulationMode(mode: 'none' | 'move' | 'rotate' | 'delete' | 'view'): void {
    this.manipulationMode = mode;
    
    // Clear selection when changing modes
    if (this.selectedFurnitureId) {
      this.highlightFurniture(this.selectedFurnitureId, false);
      this.selectedFurnitureId = null;
    }

    // Enable/disable OrbitControls based on mode
    // Controls should be enabled for 'none' and 'view' modes
    // Disabled for 'move', 'rotate', and 'delete' modes when furniture is selected
    this.controls.enabled = (mode === 'none' || mode === 'view');
  }

  /**
   * Get the current manipulation mode
   */
  getManipulationMode(): string {
    return this.manipulationMode;
  }

  /**
   * Get the currently selected furniture ID
   */
  getSelectedFurnitureId(): string | null {
    return this.selectedFurnitureId;
  }

  /**
   * Setup click handling for object selection and manipulation
   */
  private setupClickHandling(): void {
    this.renderer.domElement.addEventListener('click', (event) => {
      this.handleClick(event);
    });

    // Add drag functionality
    this.renderer.domElement.addEventListener('mousedown', (event) => {
      this.handleMouseDown(event);
    });

    this.renderer.domElement.addEventListener('mousemove', (event) => {
      this.handleMouseMove(event);
    });

    this.renderer.domElement.addEventListener('mouseup', (event) => {
      this.handleMouseUp(event);
    });

    // Prevent context menu during drag
    this.renderer.domElement.addEventListener('contextmenu', (event) => {
      if (this.isDragging) {
        event.preventDefault();
      }
    });
  }

  /**
   * Handle click events for object selection and manipulation
   */
  private handleClick(event: MouseEvent): void {
    // Only handle clicks if not dragging
    if (this.isDragging) return;
    
    if (this.manipulationMode === 'none') return;

    // Calculate mouse position in normalized device coordinates
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Update the raycaster
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Get all furniture meshes
    const furnitureMeshes = Array.from(this.furnitureMeshes.values());
    const intersects = this.raycaster.intersectObjects(furnitureMeshes);

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object as THREE.Mesh;
      const furnitureId = this.getFurnitureIdFromMesh(clickedMesh);
      
      if (furnitureId) {
        this.selectFurniture(furnitureId);
      }
    } else {
      // Clicked on empty space - deselect
      this.deselectFurniture();
    }
  }

  /**
   * Handle mouse down events for drag initiation
   */
  private handleMouseDown(event: MouseEvent): void {
    if (event.button !== 0) return; // Only left mouse button

    // Check if in edit mode - if not, don't allow any manipulation
    if (this.manipulationMode === 'none') {
      return;
    }


    // Calculate mouse position
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.lastMousePosition.set(this.mouse.x, this.mouse.y);

    // Update the raycaster
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // First check if clicking on a drag handle or rotation sphere
    if (this.dragHandles) {
      const handleIntersects = this.raycaster.intersectObject(this.dragHandles, true);
      
      if (handleIntersects.length > 0) {
        const clickedHandle = handleIntersects[0].object as THREE.Mesh;
        
        if (clickedHandle.userData.isHandle) {
          // Prevent event propagation to camera controls
          event.stopPropagation();
          event.preventDefault();
          
          if (clickedHandle.userData.type === 'rotate') {
            this.startRotation(clickedHandle.userData.axis);
          } else {
            this.startHandleDrag(clickedHandle.userData.axis);
          }
          return;
        }
      }
    }

    // Check if clicking on furniture
    const furnitureMeshes = Array.from(this.furnitureMeshes.values());
    const intersects = this.raycaster.intersectObjects(furnitureMeshes);

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object as THREE.Mesh;
      const furnitureId = this.getFurnitureIdFromMesh(clickedMesh);
      
      if (furnitureId) {
        // Select the furniture (this will create handles)
        this.selectFurniture(furnitureId);
        
        // Start dragging
        this.isDragging = true;
        this.selectedFurnitureId = furnitureId;
        
        // Calculate drag start position on the floor plane
        const intersectionPoint = this.getIntersectionWithFloor(this.mouse);
        if (intersectionPoint) {
          this.dragStartPosition.copy(intersectionPoint);
          this.dragOffset.copy(clickedMesh.position).sub(intersectionPoint);
        }

        // Change cursor to indicate dragging
        this.renderer.domElement.style.cursor = 'grabbing';
        this.container.classList.add('dragging');
        
        // Disable orbit controls during drag
        this.controls.enabled = false;
        
      }
    } else {
      // Clicked on empty space - deselect any selected furniture
      if (this.selectedFurnitureId) {
        this.deselectFurniture();
      }
    }
  }

  /**
   * Handle mouse move events for drag continuation
   */
  private handleMouseMove(event: MouseEvent): void {
    // Check if in edit mode - if not, don't allow any manipulation
    if (this.manipulationMode === 'none') {
      return;
    }

    // Calculate mouse position with improved precision
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Handle different types of dragging with maximum smoothness
    if (this.isDragging && this.selectedFurnitureId) {
      if (this.isDraggingHandle) {
        // Handle dragging - ultra-smooth axis-based movement
        this.handleHandleDrag();
      } else {
        // Regular floor-based dragging - every frame for maximum smoothness
        const intersectionPoint = this.getIntersectionWithFloor(this.mouse);
        if (intersectionPoint) {
          // Calculate new position
          let newPosition = intersectionPoint.clone().add(this.dragOffset);
          
          // Apply snap to grid if enabled
          if (this.snapToGrid) {
            newPosition = this.snapPositionToGrid(newPosition);
          }
          
          // Apply smooth boundary constraints
          const constrainedPosition = this.constrainToRoomBoundaries(newPosition, this.selectedFurnitureId);
          
          // Update furniture position
          const mesh = this.furnitureMeshes.get(this.selectedFurnitureId);
          if (mesh) {
            mesh.position.copy(constrainedPosition);
            
            // Update visuals every frame for smooth feedback
            this.updateSelectionVisuals();
          }
        }
      }
    } else {
      // Handle hover effects only when not dragging
      this.handleHoverEffects();
    }
  }

  /**
   * Handle mouse up events for drag completion
   */
  private handleMouseUp(_event: MouseEvent): void {
    if (this.isDragging) {
      this.isDragging = false;
      this.isDraggingHandle = false;
      this.activeHandle = null;
      
      // Restore cursor
      this.renderer.domElement.style.cursor = 'grab';
      this.container.classList.remove('dragging');
      
      // Re-enable orbit controls
      this.controls.enabled = true;
      
      // Final position update
      if (this.selectedFurnitureId) {
        this.container.dispatchEvent(new CustomEvent('furnitureDragged', {
          detail: { 
            furnitureId: this.selectedFurnitureId,
            position: this.getFurniturePosition(this.selectedFurnitureId)
          }
        }));
      }
    }
  }

  /**
   * Get intersection point with floor plane
   */
  private getIntersectionWithFloor(mouse: THREE.Vector2): THREE.Vector3 | null {
    this.raycaster.setFromCamera(mouse, this.camera);
    
    // Create a large plane for intersection
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const planeMesh = new THREE.Mesh(planeGeometry);
    planeMesh.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    planeMesh.position.y = 0; // Position at floor level
    
    const intersects = this.raycaster.intersectObject(planeMesh);
    
    if (intersects.length > 0) {
      return intersects[0].point;
    }
    
    return null;
  }

  /**
   * Snap position to grid
   */
  private snapPositionToGrid(position: THREE.Vector3): THREE.Vector3 {
    const snappedPosition = position.clone();
    
    // Snap X and Z coordinates to grid (keep Y as is for height)
    snappedPosition.x = Math.round(position.x / this.gridSize) * this.gridSize;
    snappedPosition.z = Math.round(position.z / this.gridSize) * this.gridSize;
    
    return snappedPosition;
  }

  /**
   * Toggle snap to grid functionality
   */
  setSnapToGrid(enabled: boolean): void {
    this.snapToGrid = enabled;
  }

  /**
   * Set grid size for snapping
   */
  setGridSize(size: number): void {
    this.gridSize = size;
  }

  /**
   * Create selection visuals (bounding box and drag handles)
   */
  private createSelectionVisuals(furnitureId: string): void {
    const mesh = this.furnitureMeshes.get(furnitureId);
    if (!mesh) {
      return;
    }


    // Clear any existing selection visuals
    this.clearSelection();

    // Create bounding box
    this.selectionBox = new THREE.BoxHelper(mesh, 0x00ff00);
    this.scene.add(this.selectionBox);

    // Create drag handles
    this.createDragHandles(mesh);
  }

  /**
   * Create drag handles for the selected object
   */
  private createDragHandles(mesh: THREE.Mesh): void {
    this.dragHandles = new THREE.Group();
    
    // Get object bounding box
    const box = new THREE.Box3().setFromObject(mesh);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    
    // Create handles for X, Y, Z axes - scale proportionally to object size
    const maxDimension = Math.max(size.x, size.y, size.z);
    
    // Base handle size on object size, with minimum and maximum limits
    const baseHandleSize = Math.max(0.1, Math.min(0.5, maxDimension * 0.15));
    const handleSize = baseHandleSize;
    const handleLength = Math.max(0.2, Math.min(1.0, maxDimension * 0.4));
    const sphereSize = Math.max(0.1, Math.min(0.6, handleSize * 3.0)); // 2x bigger spheres
    
    // Calculate offset distance based on object size
    const offsetDistance = Math.max(0.1, maxDimension * 0.1);
    
    // Debug handle sizes
    
    // X-axis handle (red) - horizontal movement (positive direction)
    const xHandle = this.createHandle('x+', new THREE.Vector3(center.x + size.x/2 + offsetDistance, center.y, center.z), 
                                     new THREE.Vector3(handleLength, handleSize, handleSize), 0xff0000);
    this.dragHandles.add(xHandle);
    this.handleMeshes.set('x+', xHandle);
    
    // X-axis handle (red) - horizontal movement (negative direction)
    const xHandleNeg = this.createHandle('x-', new THREE.Vector3(center.x - size.x/2 - offsetDistance, center.y, center.z), 
                                        new THREE.Vector3(handleLength, handleSize, handleSize), 0xff6666);
    this.dragHandles.add(xHandleNeg);
    this.handleMeshes.set('x-', xHandleNeg);
    
    // X-axis rotation sphere (Red) - positioned at end of X handle
    const xRotSphere = this.createRotationSphere('x-rot', new THREE.Vector3(center.x + size.x/2 + offsetDistance + handleLength/2 + sphereSize/2, center.y, center.z), 
                                                sphereSize, 0xff0000);
    this.dragHandles.add(xRotSphere);
    this.handleMeshes.set('x-rot', xRotSphere);
    
    // Y-axis handle (green) - vertical movement (positive direction)
    const yHandle = this.createHandle('y+', new THREE.Vector3(center.x, center.y + size.y/2 + offsetDistance, center.z), 
                                     new THREE.Vector3(handleSize, handleLength, handleSize), 0x00ff00);
    this.dragHandles.add(yHandle);
    this.handleMeshes.set('y+', yHandle);
    // Y-axis handle (green) - vertical movement (negative direction)
    const yHandleNeg = this.createHandle('y-', new THREE.Vector3(center.x, center.y - size.y/2 - offsetDistance, center.z), 
                                        new THREE.Vector3(handleSize, handleLength, handleSize), 0x66ff66);
    this.dragHandles.add(yHandleNeg);
    this.handleMeshes.set('y-', yHandleNeg);
    
    // Y-axis rotation sphere (Green) - positioned at end of Y handle
    const yRotSphere = this.createRotationSphere('y-rot', new THREE.Vector3(center.x, center.y + size.y/2 + offsetDistance + handleLength/2 + sphereSize/2, center.z), 
                                                sphereSize, 0x00ff00);
    this.dragHandles.add(yRotSphere);
    this.handleMeshes.set('y-rot', yRotSphere);
    
    // Z-axis handle (blue) - depth movement (positive direction)
    const zHandle = this.createHandle('z+', new THREE.Vector3(center.x, center.y, center.z + size.z/2 + offsetDistance), 
                                     new THREE.Vector3(handleSize, handleSize, handleLength), 0x0000ff);
    this.dragHandles.add(zHandle);
    this.handleMeshes.set('z+', zHandle);
    
    // Z-axis handle (blue) - depth movement (negative direction)
    const zHandleNeg = this.createHandle('z-', new THREE.Vector3(center.x, center.y, center.z - size.z/2 - offsetDistance), 
                                        new THREE.Vector3(handleSize, handleSize, handleLength), 0x6666ff);
    this.dragHandles.add(zHandleNeg);
    this.handleMeshes.set('z-', zHandleNeg);
    
    // Z-axis rotation sphere (Blue) - positioned at end of Z handle
    const zRotSphere = this.createRotationSphere('z-rot', new THREE.Vector3(center.x, center.y, center.z + size.z/2 + offsetDistance + handleLength/2 + sphereSize/2), 
                                                sphereSize, 0x0000ff);
    this.dragHandles.add(zRotSphere);
    this.handleMeshes.set('z-rot', zRotSphere);
    this.scene.add(this.dragHandles);
  }

  /**
   * Create a 3D cube logo for the app
   */
  createCubeLogo(): THREE.Group {
    const logoGroup = new THREE.Group();
    
    // Create cube geometry
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    
    // Create materials for different faces
    const blueMaterial = new THREE.MeshLambertMaterial({ color: 0x3498db });
    const whiteMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const grayMaterial = new THREE.MeshLambertMaterial({ color: 0xecf0f1 });
    
    // Create the cube mesh
    const cube = new THREE.Mesh(cubeGeometry, [
      whiteMaterial,  // Right face
      whiteMaterial,  // Left face  
      blueMaterial,   // Top face (this will be the blue one)
      whiteMaterial,  // Bottom face
      whiteMaterial,  // Front face
      grayMaterial    // Back face
    ]);
    
    // Position the cube
    cube.position.set(0, 0, 0);
    cube.castShadow = true;
    cube.receiveShadow = true;
    
    logoGroup.add(cube);
    
    // Add some lighting for better visibility
    const logoLight = new THREE.DirectionalLight(0xffffff, 0.8);
    logoLight.position.set(2, 2, 2);
    logoGroup.add(logoLight);
    
    return logoGroup;
  }

  /**
   * Create a single drag handle
   */
  private createHandle(axis: string, position: THREE.Vector3, size: THREE.Vector3, color: number): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.MeshBasicMaterial({ 
      color: color, 
      transparent: true, 
      opacity: 0.9, // Increased opacity for better visibility
      wireframe: false
    });
    
    const handle = new THREE.Mesh(geometry, material);
    handle.position.copy(position);
    handle.userData = { axis: axis, isHandle: true, type: 'move' };
    
    return handle;
  }

  /**
   * Create a rotation sphere
   */
  private createRotationSphere(axis: string, position: THREE.Vector3, size: number, color: number): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(size, 16, 16);
    const material = new THREE.MeshBasicMaterial({ 
      color: color, 
      transparent: true, 
      opacity: 0.9, // Increased opacity for better visibility
      wireframe: false
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(position);
    sphere.userData = { axis: axis, isHandle: true, type: 'rotate' };
    
    return sphere;
  }

  /**
   * Clear all selection visuals
   */
  private clearSelection(): void {
    // Remove bounding box
    if (this.selectionBox) {
      this.scene.remove(this.selectionBox);
      this.selectionBox = null;
    }
    
    // Remove drag handles
    if (this.dragHandles) {
      this.scene.remove(this.dragHandles);
      this.dragHandles = null;
    }
    
    // Clear handle meshes
    this.handleMeshes.clear();
  }



  /**
   * Handle dragging with a specific axis handle - ULTRA SMOOTH AND RESPONSIVE
   */
  private handleHandleDrag(): void {
    if (!this.selectedFurnitureId || !this.activeHandle) {
      return;
    }
    
    const mesh = this.furnitureMeshes.get(this.selectedFurnitureId);
    if (!mesh) {
      return;
    }
    
    // Calculate raw mouse delta with high precision
    const rawDelta = new THREE.Vector2(
      this.mouse.x - this.lastMousePosition.x,
      this.mouse.y - this.lastMousePosition.y
    );
    
    // Ultra-responsive movement with no smoothing delay
    const movementScale = 8.0; // Increased for much better responsiveness
    const currentPosition = mesh.position.clone();
    let newPosition = currentPosition.clone();
    
    // Direct, immediate movement based on mouse direction
    switch (this.activeHandle) {
      case 'x+':
        // X-axis positive: horizontal mouse movement = right movement
        newPosition.x += rawDelta.x * movementScale;
        break;
      case 'x-':
        // X-axis negative: horizontal mouse movement = left movement  
        newPosition.x -= rawDelta.x * movementScale;
        break;
      case 'y+':
        // Y-axis positive: vertical mouse movement = up movement
        newPosition.y += rawDelta.y * movementScale;
        break;
      case 'y-':
        // Y-axis negative: vertical mouse movement = down movement
        newPosition.y -= rawDelta.y * movementScale;
        break;
      case 'z+':
        // Z-axis positive: horizontal mouse movement = forward movement
        newPosition.z += rawDelta.x * movementScale;
        break;
      case 'z-':
        // Z-axis negative: horizontal mouse movement = backward movement
        newPosition.z -= rawDelta.x * movementScale;
        break;
    }
    
    // Apply snap to grid if enabled (only for X and Z axes)
    if (this.snapToGrid && !this.activeHandle.startsWith('y')) {
      newPosition = this.snapPositionToGrid(newPosition);
    }
    
    // Apply boundary constraints
    const constrainedPosition = this.constrainToRoomBoundaries(newPosition, this.selectedFurnitureId);
    
    // Update position immediately for maximum responsiveness
    mesh.position.copy(constrainedPosition);
    
    // Update visuals every frame for smooth feedback
    this.updateSelectionVisuals();
    
    // Dispatch drag event for real-time updates
    this.container.dispatchEvent(new CustomEvent('furnitureDragged', {
      detail: { 
        furnitureId: this.selectedFurnitureId,
        position: constrainedPosition
      }
    }));
    
    // Update last mouse position for next frame
    this.lastMousePosition.set(this.mouse.x, this.mouse.y);
  }

  /**
   * Update selection visuals when object moves
   */
  private updateSelectionVisuals(): void {
    if (!this.selectedFurnitureId) return;
    
    // Update bounding box
    if (this.selectionBox) {
      this.scene.remove(this.selectionBox);
      const mesh = this.furnitureMeshes.get(this.selectedFurnitureId);
      if (mesh) {
        this.selectionBox = new THREE.BoxHelper(mesh, 0x00ff00);
        this.scene.add(this.selectionBox);
      }
    }
    
    // Update furniture bounding box
    const boundingBox = this.boundingBoxes.get(this.selectedFurnitureId);
    if (boundingBox) {
      this.scene.remove(boundingBox);
      const mesh = this.furnitureMeshes.get(this.selectedFurnitureId);
      if (mesh) {
        this.createBoundingBox(mesh, this.selectedFurnitureId);
      }
    }
    
    // Update drag handles
    if (this.dragHandles) {
      this.scene.remove(this.dragHandles);
      const mesh = this.furnitureMeshes.get(this.selectedFurnitureId);
      if (mesh) {
        this.createDragHandles(mesh);
      }
    }
  }

  /**
   * Handle hover effects for handles
   */
  private handleHoverEffects(): void {
    if (!this.dragHandles) return;

    // Update raycaster
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Check for handle intersections
    const handleIntersects = this.raycaster.intersectObject(this.dragHandles, true);
    
    // Reset all handle materials
    this.handleMeshes.forEach((handle) => {
      const material = handle.material as THREE.MeshBasicMaterial;
      material.opacity = 0.7;
      handle.scale.set(1, 1, 1);
    });
    
    // Highlight hovered handle
    if (handleIntersects.length > 0) {
      const hoveredHandle = handleIntersects[0].object as THREE.Mesh;
      if (hoveredHandle.userData.isHandle) {
        const material = hoveredHandle.material as THREE.MeshBasicMaterial;
        material.opacity = 1.0;
        hoveredHandle.scale.set(1.1, 1.1, 1.1);
        
        // Change cursor based on handle type
        this.renderer.domElement.style.cursor = hoveredHandle.userData.type === 'rotate' ? 'grab' : 'ew-resize';
      }
    } else {
      this.renderer.domElement.style.cursor = 'default';
    }
  }

  /**
   * Start dragging a handle for ultra-smooth movement
   */
  private startHandleDrag(axis: string): void {
    this.isDraggingHandle = true;
    this.activeHandle = axis;
    this.isDragging = true;
    
    // Store initial mouse position for delta calculation
    this.lastMousePosition.set(this.mouse.x, this.mouse.y);
    
    // Disable orbit controls during handle drag
    this.controls.enabled = false;
    
    // Change cursor to indicate dragging
    this.renderer.domElement.style.cursor = 'grabbing';
  }


  /**
   * Check if a position is valid (within room boundaries)
   */
  private isPositionValid(position: THREE.Vector3, furnitureId?: string): boolean {
    if (!this.roomDimensions) return true;
    
    const halfWidth = this.roomDimensions.width / 2;
    const halfLength = this.roomDimensions.length / 2;
    const height = this.roomDimensions.height;
    
    // If no furniture ID provided, use simple room boundary check
    if (!furnitureId) {
      return position.x >= -halfWidth + 0.1 && 
             position.x <= halfWidth - 0.1 &&
             position.y >= 0.1 && 
             position.y <= height - 0.1 &&
             position.z >= -halfLength + 0.1 && 
             position.z <= halfLength - 0.1;
    }
    
    // Get furniture data for rotated bounding box calculation
    const furniture = this.furniture.find(f => f.id === furnitureId);
    if (!furniture) return true;
    
    const rotation = furniture.rotation || 0;
    const cos = Math.abs(Math.cos(rotation));
    const sin = Math.abs(Math.sin(rotation));
    
    // Calculate rotated bounding box dimensions
    const rotatedWidth = furniture.width * cos + furniture.depth * sin;
    const rotatedDepth = furniture.width * sin + furniture.depth * cos;
    const rotatedHeight = furniture.height;
    
    const halfRotatedWidth = rotatedWidth / 2;
    const halfRotatedHeight = rotatedHeight / 2;
    const halfRotatedDepth = rotatedDepth / 2;
    
    // Check if position is within room boundaries accounting for rotated furniture
    return position.x >= -halfWidth + halfRotatedWidth + 0.1 && 
           position.x <= halfWidth - halfRotatedWidth - 0.1 &&
           position.y >= halfRotatedHeight && 
           position.y <= height - halfRotatedHeight - 0.1 &&
           position.z >= -halfLength + halfRotatedDepth + 0.1 && 
           position.z <= halfLength - halfRotatedDepth - 0.1;
  }

  /**
   * Start rotation of the selected object
   */
  private startRotation(axis: string): void {
    if (!this.selectedFurnitureId) return;
    
    const mesh = this.furnitureMeshes.get(this.selectedFurnitureId);
    if (!mesh) return;
    
    // Calculate rotation amount (45 degrees)
    const rotationAmount = Math.PI / 4; // 45 degrees in radians
    let newRotation = mesh.rotation.clone();
    
    switch (axis) {
      case 'x-rot': // Red sphere rotates around X-axis
        newRotation.x += rotationAmount;
        break;
      case 'y-rot': // Green sphere rotates around Y-axis
        newRotation.y += rotationAmount;
        break;
      case 'z-rot': // Blue sphere rotates around Z-axis
        newRotation.z += rotationAmount;
        break;
    }
    
    // Check if rotation is valid (no collision)
    if (this.isRotationValid(mesh, newRotation)) {
      mesh.rotation.copy(newRotation);
      this.updateSelectionVisuals();
      
      // Update furniture rotation in state via app instance
      if (this.appInstance && this.appInstance.updateFurnitureRotation) {
        this.appInstance.updateFurnitureRotation(this.selectedFurnitureId, newRotation.y);
      }
      
    } else {
    }
  }

  /**
   * Check if rotation is valid (no collision with room boundaries)
   */
  private isRotationValid(mesh: THREE.Mesh, newRotation: THREE.Euler): boolean {
    if (!this.roomDimensions) return true;
    
    // Create a temporary mesh with new rotation to test collision
    const tempMesh = mesh.clone();
    tempMesh.rotation.copy(newRotation);
    
    // Get bounding box of rotated mesh
    const box = new THREE.Box3().setFromObject(tempMesh);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    
    // Check if rotated mesh fits within room
    const halfWidth = this.roomDimensions.width / 2;
    const halfLength = this.roomDimensions.length / 2;
    const halfHeight = this.roomDimensions.height / 2;
    
    return (center.x - size.x/2 >= -halfWidth && center.x + size.x/2 <= halfWidth &&
            center.z - size.z/2 >= -halfLength && center.z + size.z/2 <= halfLength &&
            center.y + size.y/2 <= halfHeight);
  }


  /**
   * Select a furniture item
   */
  private selectFurniture(furnitureId: string): void {
    // If in delete mode, delete the furniture immediately
    if (this.manipulationMode === 'delete') {
      this.removeFurniture(furnitureId);
      
      // Dispatch delete event
      this.container.dispatchEvent(new CustomEvent('furnitureDeleted', {
        detail: { furnitureId }
      }));
      return;
    }

    // If in view mode, just dispatch selection event without creating handles
    if (this.manipulationMode === 'view') {
      this.selectedFurnitureId = furnitureId;
      this.highlightFurniture(furnitureId, true);
      
      // Dispatch selection event for view mode
      this.container.dispatchEvent(new CustomEvent('furnitureSelected', {
        detail: { furnitureId, mode: 'view' }
      }));
      return;
    }

    // Deselect previous selection
    if (this.selectedFurnitureId) {
      this.highlightFurniture(this.selectedFurnitureId, false);
      this.clearSelection();
    }

    // Select new furniture
    this.selectedFurnitureId = furnitureId;
    this.highlightFurniture(furnitureId, true);
    this.createSelectionVisuals(furnitureId);
    
    // Disable OrbitControls when furniture is selected in move/rotate/delete modes
    if (this.manipulationMode === 'move' || this.manipulationMode === 'rotate' || (this.manipulationMode as string) === 'delete') {
      this.controls.enabled = false;
    }
    
    
    // Dispatch selection event
    this.container.dispatchEvent(new CustomEvent('furnitureSelected', {
      detail: { furnitureId, mode: this.manipulationMode }
    }));
  }

  /**
   * Deselect current furniture
   */
  private deselectFurniture(): void {
    if (this.selectedFurnitureId) {
      this.highlightFurniture(this.selectedFurnitureId, false);
      this.clearSelection();
      this.selectedFurnitureId = null;
      
      // Reset handle dragging state
      this.isDraggingHandle = false;
      this.activeHandle = null;
      
      // Re-enable OrbitControls when furniture is deselected
      this.controls.enabled = (this.manipulationMode === 'none' || this.manipulationMode === 'view');
      
      // Dispatch deselection event
      this.container.dispatchEvent(new CustomEvent('furnitureDeselected', {
        detail: { mode: this.manipulationMode }
      }));
    }
  }

  /**
   * Get furniture ID from mesh
   */
  private getFurnitureIdFromMesh(mesh: THREE.Mesh): string | null {
    for (const [id, furnitureMesh] of this.furnitureMeshes) {
      if (furnitureMesh === mesh) {
        return id;
      }
    }
    return null;
  }

  /**
   * Move furniture to a new position with boundary checking
   */
  moveFurniture(furnitureId: string, newPosition: { x: number; y: number; z: number }): boolean {
    const mesh = this.furnitureMeshes.get(furnitureId);
    if (!mesh || !this.roomDimensions) return false;

    // Check if position is within room boundaries
    if (this.isPositionValid(new THREE.Vector3(newPosition.x, newPosition.y, newPosition.z), furnitureId)) {
      mesh.position.set(newPosition.x, newPosition.y, newPosition.z);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Rotate furniture by 45 degrees
   */
  rotateFurniture(furnitureId: string, direction: 'clockwise' | 'counterclockwise'): boolean {
    const mesh = this.furnitureMeshes.get(furnitureId);
    if (!mesh) return false;

    const rotationAmount = direction === 'clockwise' ? Math.PI / 4 : -Math.PI / 4;
    mesh.rotation.y += rotationAmount;
    
    // Update the furniture data to reflect the new rotation
    const furniture = this.furniture.find(f => f.id === furnitureId);
    if (furniture) {
      // Convert current rotation from radians to degrees, add 45 degrees, then back to radians
      const currentRotationDegrees = (mesh.rotation.y * 180) / Math.PI;
      furniture.rotation = currentRotationDegrees;
      
      // Update the furniture data in the mesh userData as well
      mesh.userData.furniture.rotation = currentRotationDegrees;
    }
    
    return true;
  }


  /**
   * Constrain position to room boundaries (allows movement but keeps within bounds)
   */
  private constrainToRoomBoundaries(position: { x: number; y: number; z: number }, furnitureId: string): { x: number; y: number; z: number } {
    if (!this.roomDimensions) return position;

    // Get furniture dimensions and rotation from the furniture data
    const furniture = this.furniture.find(f => f.id === furnitureId);
    if (!furniture) {
      return position;
    }
    
    const furnitureWidth = furniture.width;
    const furnitureHeight = furniture.height;
    const furnitureDepth = furniture.depth;
    const rotation = furniture.rotation || 0;

    const roomHalfWidth = this.roomDimensions.width / 2;
    const roomHalfLength = this.roomDimensions.length / 2;
    const roomHeight = this.roomDimensions.height;

    // Calculate rotated bounding box dimensions
    // When furniture is rotated, we need to use the maximum extent in each axis
    const cos = Math.abs(Math.cos(rotation));
    const sin = Math.abs(Math.sin(rotation));
    
    // Calculate the rotated bounding box dimensions
    const rotatedWidth = furnitureWidth * cos + furnitureDepth * sin;
    const rotatedDepth = furnitureWidth * sin + furnitureDepth * cos;
    const rotatedHeight = furnitureHeight; // Height doesn't change with Y rotation

    const halfRotatedWidth = rotatedWidth / 2;
    const halfRotatedHeight = rotatedHeight / 2;
    const halfRotatedDepth = rotatedDepth / 2;


    // Constrain each axis using rotated bounding box
    const tolerance = 0.1; // Minimal tolerance for edge clearance
    
    const constrainedX = Math.max(-roomHalfWidth + halfRotatedWidth + tolerance, Math.min(roomHalfWidth - halfRotatedWidth - tolerance, position.x));
    const constrainedY = Math.max(halfRotatedHeight, Math.min(roomHeight - halfRotatedHeight - tolerance, position.y));
    const constrainedZ = Math.max(-roomHalfLength + halfRotatedDepth + tolerance, Math.min(roomHalfLength - halfRotatedDepth - tolerance, position.z));
    

    return {
      x: constrainedX,
      y: constrainedY,
      z: constrainedZ
    };
  }

  /**
   * Toggle bounding box visibility for all furniture
   */
  toggleBoundingBoxes(visible: boolean): void {
    this.boundingBoxes.forEach((boundingBox, _id) => {
      boundingBox.visible = visible;
    });
  }

  /**
   * Get current furniture position
   */
  getFurniturePosition(furnitureId: string): { x: number; y: number; z: number } | null {
    const mesh = this.furnitureMeshes.get(furnitureId);
    if (!mesh) return null;

    return {
      x: mesh.position.x,
      y: mesh.position.y,
      z: mesh.position.z
    };
  }

  /**
   * Get current furniture rotation in degrees
   */
  getFurnitureRotation(furnitureId: string): number {
    const mesh = this.furnitureMeshes.get(furnitureId);
    if (!mesh) return 0;

    // Convert from radians to degrees
    return (mesh.rotation.y * 180) / Math.PI;
  }

  /**
   * Reset camera to default view
   */
  resetView(): void {
    if (!this.roomDimensions) return;

    // Reset camera position to default
    const distance = Math.max(this.roomDimensions.width, this.roomDimensions.length) * 2;
    this.camera.position.set(distance, distance, distance);
    this.camera.lookAt(0, 0, 0);

    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }
}