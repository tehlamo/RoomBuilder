// ============================================================================
// ROOM3D COMPONENT - 3D RENDERING ENGINE
// ============================================================================
// This component handles all 3D rendering, scene management, and user interactions
// for the room builder application using Three.js.
// ============================================================================

// ============================================================================
// IMPORTS - Organized by category
// ============================================================================

// External Libraries
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Internal Types
import type { RoomDimensions } from '../types/Room';
import type { Furniture } from '../types/Furniture';

// ============================================================================
// ROOM3D CLASS
// ============================================================================

export class Room3D {
  // ============================================================================
  // PROPERTIES - Core 3D scene components
  // ============================================================================
  
  // Core Three.js objects
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  
  // Room and furniture
  private roomMesh!: THREE.Mesh;
  private furnitureMeshes: Map<string, THREE.Mesh> = new Map();
  private furniture: any[] = [];
  private boundingBoxes: Map<string, THREE.BoxHelper> = new Map();
  private roomDimensions: RoomDimensions | null = null;
  
  // Manipulation system
  private manipulationMode: 'none' | 'move' | 'rotate' | 'delete' | 'view' = 'none';
  private selectedFurnitureId: string | null = null;
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private mouse: THREE.Vector2 = new THREE.Vector2();
  
  // Drag system
  private isDragging: boolean = false;
  private dragStartPosition: THREE.Vector3 = new THREE.Vector3();
  private dragOffset: THREE.Vector3 = new THREE.Vector3();
  // private lastMousePosition: THREE.Vector2 = new THREE.Vector2(); // Unused for now
  private snapToGrid: boolean = true;
  private gridSize: number = 0.5;
  
  // Selection and handles system
  private selectionBox: THREE.BoxHelper | null = null;
  private dragHandles: THREE.Group | null = null;
  private handleMeshes: Map<string, THREE.Mesh> = new Map();
  private isDraggingHandle: boolean = false;
  private activeHandle: string | null = null;
  
  // Application integration
  private container: HTMLElement;
  private appInstance: any = null;

  // ============================================================================
  // CONSTRUCTOR & INITIALIZATION
  // ============================================================================

  constructor(container: HTMLElement, appInstance?: any) {
    this.container = container;
    this.appInstance = appInstance;
    this.initializeScene();
    this.setupLighting();
    this.setupControls();
    this.animate();
  }

  // ============================================================================
  // PUBLIC METHODS - Core functionality exposed to App
  // ============================================================================

  /**
   * Create a room with specified dimensions
   */
  createRoom(dimensions: RoomDimensions): void {
    this.roomDimensions = dimensions;
    this.clearRoom();
    this.createRoomMesh(dimensions);
    this.setupCamera(dimensions);
    this.updateControls();
  }

  /**
   * Add furniture to the 3D scene
   */
  addFurniture(furniture: Furniture): void {
    const mesh = this.createFurnitureMesh(furniture);
    this.scene.add(mesh);
    this.furnitureMeshes.set(furniture.id, mesh);
    this.furniture.push(furniture);
    
    // Add bounding box for collision detection
    const boundingBox = new THREE.BoxHelper(mesh, 0x00ff00);
    this.scene.add(boundingBox);
    this.boundingBoxes.set(furniture.id, boundingBox);
  }

  /**
   * Remove furniture from the 3D scene
   */
  removeFurniture(furnitureId: string): void {
    const mesh = this.furnitureMeshes.get(furnitureId);
    if (mesh) {
      this.scene.remove(mesh);
      this.furnitureMeshes.delete(furnitureId);
    }

    const boundingBox = this.boundingBoxes.get(furnitureId);
    if (boundingBox) {
      this.scene.remove(boundingBox);
      this.boundingBoxes.delete(furnitureId);
    }

    this.furniture = this.furniture.filter(f => f.id !== furnitureId);
    
    if (this.selectedFurnitureId === furnitureId) {
      this.deselectFurniture();
    }
  }

  /**
   * Clear all furniture from the scene
   */
  clearAllFurniture(): void {
    this.furnitureMeshes.forEach(mesh => {
      this.scene.remove(mesh);
    });
    this.furnitureMeshes.clear();

    this.boundingBoxes.forEach(box => {
      this.scene.remove(box);
    });
    this.boundingBoxes.clear();

    this.furniture = [];
    this.deselectFurniture();
  }

  /**
   * Set manipulation mode for furniture interaction
   */
  setManipulationMode(mode: 'none' | 'move' | 'rotate' | 'delete' | 'view'): void {
    this.manipulationMode = mode;
    
    if (mode === 'none') {
      this.deselectFurniture();
    }
  }

  /**
   * Move furniture to new position
   */
  moveFurniture(furnitureId: string, newPosition: { x: number; y: number; z: number }): boolean {
    const mesh = this.furnitureMeshes.get(furnitureId);
    if (!mesh) return false;

    // Check if position is within room bounds
    if (!this.isPositionValid(newPosition)) {
      return false;
    }

    mesh.position.set(newPosition.x, newPosition.y, newPosition.z);
    
    // Update furniture data
    const furniture = this.furniture.find(f => f.id === furnitureId);
    if (furniture) {
      furniture.x = newPosition.x;
      furniture.y = newPosition.y;
      furniture.z = newPosition.z;
    }

    // Update bounding box
    this.updateBoundingBox(furnitureId);
    
    // Update app state
    if (this.appInstance) {
      this.appInstance.updateFurniturePosition(furnitureId, mesh.position);
    }

    return true;
  }

  /**
   * Rotate furniture
   */
  rotateFurniture(furnitureId: string, direction: 'clockwise' | 'counterclockwise'): boolean {
    const mesh = this.furnitureMeshes.get(furnitureId);
    if (!mesh) return false;

    const rotationAmount = direction === 'clockwise' ? Math.PI / 2 : -Math.PI / 2;
    mesh.rotation.y += rotationAmount;

    // Update furniture data
    const furniture = this.furniture.find(f => f.id === furnitureId);
    if (furniture) {
      furniture.rotation = mesh.rotation.y;
    }

    // Update app state
    if (this.appInstance) {
      this.appInstance.updateFurnitureRotation(furnitureId, mesh.rotation.y);
    }

    return true;
  }

  /**
   * Get furniture position
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
   * Get furniture rotation
   */
  getFurnitureRotation(furnitureId: string): number {
    const mesh = this.furnitureMeshes.get(furnitureId);
    if (!mesh) return 0;

    return mesh.rotation.y;
  }

  /**
   * Set snap to grid setting
   */
  setSnapToGrid(enabled: boolean): void {
    this.snapToGrid = enabled;
  }

  /**
   * Reset camera to default view
   */
  resetView(): void {
    if (!this.roomDimensions) return;

    const center = new THREE.Vector3(0, 0, 0);
    const distance = Math.max(this.roomDimensions.width, this.roomDimensions.length) * 2;
    
    this.camera.position.set(distance, distance, distance);
    this.camera.lookAt(center);
    this.controls.target.copy(center);
    this.controls.update();
  }

  /**
   * Capture thumbnail of current scene
   */
  captureThumbnail(): string {
    this.renderer.render(this.scene, this.camera);
    return this.renderer.domElement.toDataURL('image/png');
  }

  /**
   * Get cube logo for app branding
   */
  createCubeLogo(): THREE.Group {
    const group = new THREE.Group();
    
    // Create cube geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    
    // Create materials for each face
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x0066ff }), // Blue face
      new THREE.MeshBasicMaterial({ color: 0x333333 }), // Dark faces
      new THREE.MeshBasicMaterial({ color: 0x333333 }),
      new THREE.MeshBasicMaterial({ color: 0x333333 }),
      new THREE.MeshBasicMaterial({ color: 0x333333 }),
      new THREE.MeshBasicMaterial({ color: 0x333333 })
    ];
    
    const cube = new THREE.Mesh(geometry, materials);
    group.add(cube);
    
    return group;
  }

  // ============================================================================
  // PRIVATE METHODS - Internal 3D scene management
  // ============================================================================

  /**
   * Initialize the Three.js scene
   */
  private initializeScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);
    
    this.setupCamera();
    this.setupRenderer();
    this.setupEventListeners();
  }

  /**
   * Setup camera with appropriate settings
   */
  private setupCamera(dimensions?: RoomDimensions): void {
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    
    if (dimensions) {
      const distance = Math.max(dimensions.width, dimensions.length) * 2;
      this.camera.position.set(distance, distance, distance);
    } else {
      this.camera.position.set(10, 10, 10);
    }
  }

  /**
   * Setup WebGL renderer
   */
  private setupRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);
  }

  /**
   * Setup lighting for the scene
   */
  private setupLighting(): void {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    // Directional light for shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    this.scene.add(directionalLight);
  }

  /**
   * Setup orbit controls for camera movement
   */
  private setupControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.enableRotate = true;
  }

  /**
   * Update controls based on room dimensions
   */
  private updateControls(): void {
    if (!this.roomDimensions) return;

    const maxDistance = Math.max(this.roomDimensions.width, this.roomDimensions.length) * 3;
    this.controls.maxDistance = maxDistance;
    this.controls.minDistance = 1;
  }

  /**
   * Create room mesh from dimensions
   */
  private createRoomMesh(dimensions: RoomDimensions): void {
    const geometry = new THREE.BoxGeometry(dimensions.width, dimensions.height, dimensions.length);
    const material = new THREE.MeshLambertMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.1,
      side: THREE.DoubleSide
    });
    
    this.roomMesh = new THREE.Mesh(geometry, material);
    this.roomMesh.position.y = dimensions.height / 2;
    this.roomMesh.receiveShadow = true;
    this.scene.add(this.roomMesh);
  }

  /**
   * Create furniture mesh from furniture data
   */
  private createFurnitureMesh(furniture: Furniture): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(furniture.width, furniture.height, furniture.depth);
    const material = new THREE.MeshLambertMaterial({ 
      color: furniture.color,
      transparent: true,
      opacity: 0.8
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(furniture.x, furniture.y, furniture.z);
    mesh.rotation.y = furniture.rotation || 0;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    // Store furniture ID for identification
    mesh.userData = { furnitureId: furniture.id };
    
    return mesh;
  }

  /**
   * Clear existing room
   */
  private clearRoom(): void {
    if (this.roomMesh) {
      this.scene.remove(this.roomMesh);
    }
    this.clearAllFurniture();
  }

  /**
   * Check if position is within room bounds
   */
  private isPositionValid(position: { x: number; y: number; z: number }): boolean {
    if (!this.roomDimensions) return false;

    const halfWidth = this.roomDimensions.width / 2;
    const halfLength = this.roomDimensions.length / 2;

    return position.x >= -halfWidth && position.x <= halfWidth &&
           position.z >= -halfLength && position.z <= halfLength &&
           position.y >= 0 && position.y <= this.roomDimensions.height;
  }

  /**
   * Update bounding box for furniture
   */
  private updateBoundingBox(furnitureId: string): void {
    const mesh = this.furnitureMeshes.get(furnitureId);
    const boundingBox = this.boundingBoxes.get(furnitureId);
    
    if (mesh && boundingBox) {
      boundingBox.update();
    }
  }

  // ============================================================================
  // EVENT HANDLERS - User interaction management
  // ============================================================================

  /**
   * Setup all event listeners for user interaction
   */
  private setupEventListeners(): void {
    this.renderer.domElement.addEventListener('click', this.onMouseClick.bind(this));
    this.renderer.domElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.renderer.domElement.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  /**
   * Handle mouse click events
   */
  private onMouseClick(event: MouseEvent): void {
    if (this.manipulationMode === 'none') return;

    this.updateMousePosition(event);
    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(Array.from(this.furnitureMeshes.values()));
    
    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object;
      const furnitureId = clickedMesh.userData.furnitureId;
      
      if (this.manipulationMode === 'delete') {
        this.deleteFurniture(furnitureId);
      } else if (this.manipulationMode === 'view') {
        this.selectFurniture(furnitureId);
        this.showFurnitureDetails(furnitureId);
      } else if (this.manipulationMode === 'move' || this.manipulationMode === 'rotate') {
        this.selectFurniture(furnitureId);
        this.showDragHandles(furnitureId);
      }
    } else {
      this.deselectFurniture();
    }
  }

  /**
   * Handle mouse down events for dragging
   */
  private onMouseDown(event: MouseEvent): void {
    if (this.manipulationMode !== 'move' || !this.selectedFurnitureId) return;

    this.updateMousePosition(event);
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Check if clicking on a drag handle
    const handleIntersects = this.raycaster.intersectObjects(Array.from(this.handleMeshes.values()));
    if (handleIntersects.length > 0) {
      this.isDraggingHandle = true;
      this.activeHandle = handleIntersects[0].object.userData.handleType;
      this.dragStartPosition.set(this.mouse.x, this.mouse.y, 0);
      return;
    }

    // Check if clicking on furniture
    const furnitureIntersects = this.raycaster.intersectObjects(Array.from(this.furnitureMeshes.values()));
    if (furnitureIntersects.length > 0) {
      const furnitureId = furnitureIntersects[0].object.userData.furnitureId;
      if (furnitureId === this.selectedFurnitureId) {
        this.isDragging = true;
        this.dragStartPosition.set(this.mouse.x, this.mouse.y, 0);
        
        const mesh = this.furnitureMeshes.get(furnitureId);
        if (mesh) {
          this.dragOffset.copy(mesh.position);
        }
      }
    }
  }

  /**
   * Handle mouse move events for dragging
   */
  private onMouseMove(event: MouseEvent): void {
    if (!this.isDragging && !this.isDraggingHandle) return;

    this.updateMousePosition(event);

    if (this.isDraggingHandle && this.activeHandle) {
      this.handleHandleDrag();
    } else if (this.isDragging && this.selectedFurnitureId) {
      this.handleFurnitureDrag();
    }
  }

  /**
   * Handle mouse up events to end dragging
   */
  private onMouseUp(_event: MouseEvent): void {
    if (this.isDragging || this.isDraggingHandle) {
      this.isDragging = false;
      this.isDraggingHandle = false;
      this.activeHandle = null;
      
      // Dispatch furniture dragged event
      if (this.selectedFurnitureId) {
        const mesh = this.furnitureMeshes.get(this.selectedFurnitureId);
        if (mesh) {
          this.dispatchFurnitureDraggedEvent(this.selectedFurnitureId, mesh.position);
        }
      }
    }
  }

  /**
   * Handle window resize events
   */
  private onWindowResize(): void {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // ============================================================================
  // SELECTION & MANIPULATION METHODS
  // ============================================================================

  /**
   * Select furniture for manipulation
   */
  private selectFurniture(furnitureId: string): void {
    this.selectedFurnitureId = furnitureId;
    this.showSelectionBox(furnitureId);
    this.dispatchFurnitureSelectedEvent(furnitureId);
  }

  /**
   * Deselect current furniture
   */
  private deselectFurniture(): void {
    this.selectedFurnitureId = null;
    this.hideSelectionBox();
    this.hideDragHandles();
    this.dispatchFurnitureDeselectedEvent();
  }

  /**
   * Show selection box around furniture
   */
  private showSelectionBox(furnitureId: string): void {
    this.hideSelectionBox();
    
    const mesh = this.furnitureMeshes.get(furnitureId);
    if (mesh) {
      this.selectionBox = new THREE.BoxHelper(mesh, 0xffff00);
      this.scene.add(this.selectionBox);
    }
  }

  /**
   * Hide selection box
   */
  private hideSelectionBox(): void {
    if (this.selectionBox) {
      this.scene.remove(this.selectionBox);
      this.selectionBox = null;
    }
  }

  /**
   * Show drag handles for furniture manipulation
   */
  private showDragHandles(furnitureId: string): void {
    this.hideDragHandles();
    
    const mesh = this.furnitureMeshes.get(furnitureId);
    if (!mesh) return;

    this.dragHandles = new THREE.Group();
    
    // Create handles for each axis
    this.createHandle('x', new THREE.Vector3(1, 0, 0), 0xff0000);
    this.createHandle('y', new THREE.Vector3(0, 1, 0), 0x00ff00);
    this.createHandle('z', new THREE.Vector3(0, 0, 1), 0x0000ff);
    
    this.dragHandles.position.copy(mesh.position);
    this.scene.add(this.dragHandles);
  }

  /**
   * Create individual drag handle
   */
  private createHandle(axis: string, direction: THREE.Vector3, color: number): void {
    const geometry = new THREE.SphereGeometry(0.2, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color });
    const handle = new THREE.Mesh(geometry, material);
    
    handle.position.copy(direction.multiplyScalar(2));
    handle.userData = { handleType: axis };
    
    this.handleMeshes.set(axis, handle);
    this.dragHandles!.add(handle);
  }

  /**
   * Hide drag handles
   */
  private hideDragHandles(): void {
    if (this.dragHandles) {
      this.scene.remove(this.dragHandles);
      this.dragHandles = null;
      this.handleMeshes.clear();
    }
  }

  /**
   * Handle dragging of furniture handles
   */
  private handleHandleDrag(): void {
    if (!this.selectedFurnitureId || !this.activeHandle) return;

    const mesh = this.furnitureMeshes.get(this.selectedFurnitureId);
    if (!mesh) return;

    const deltaX = this.mouse.x - this.dragStartPosition.x;
    const deltaY = this.mouse.y - this.dragStartPosition.y;
    
    const sensitivity = 5;
    const newPosition = mesh.position.clone();

    switch (this.activeHandle) {
      case 'x':
        newPosition.x += deltaX * sensitivity;
        break;
      case 'y':
        newPosition.y += deltaY * sensitivity;
        break;
      case 'z':
        newPosition.z += deltaX * sensitivity;
        break;
    }

    // Apply snap to grid
    if (this.snapToGrid) {
      newPosition.x = Math.round(newPosition.x / this.gridSize) * this.gridSize;
      newPosition.y = Math.round(newPosition.y / this.gridSize) * this.gridSize;
      newPosition.z = Math.round(newPosition.z / this.gridSize) * this.gridSize;
    }

    // Check bounds and apply position
    if (this.isPositionValid(newPosition)) {
      mesh.position.copy(newPosition);
      this.updateBoundingBox(this.selectedFurnitureId);
      
      // Update furniture data
      const furniture = this.furniture.find(f => f.id === this.selectedFurnitureId);
      if (furniture) {
        furniture.x = newPosition.x;
        furniture.y = newPosition.y;
        furniture.z = newPosition.z;
      }
    }
  }

  /**
   * Handle dragging of furniture
   */
  private handleFurnitureDrag(): void {
    if (!this.selectedFurnitureId) return;

    const mesh = this.furnitureMeshes.get(this.selectedFurnitureId);
    if (!mesh) return;

    const deltaX = this.mouse.x - this.dragStartPosition.x;
    const deltaY = this.mouse.y - this.dragStartPosition.y;
    
    const sensitivity = 5;
    const newPosition = this.dragOffset.clone();
    newPosition.x += deltaX * sensitivity;
    newPosition.z += deltaY * sensitivity;

    // Apply snap to grid
    if (this.snapToGrid) {
      newPosition.x = Math.round(newPosition.x / this.gridSize) * this.gridSize;
      newPosition.z = Math.round(newPosition.z / this.gridSize) * this.gridSize;
    }

    // Check bounds and apply position
    if (this.isPositionValid(newPosition)) {
      mesh.position.copy(newPosition);
      this.updateBoundingBox(this.selectedFurnitureId);
      
      // Update furniture data
      const furniture = this.furniture.find(f => f.id === this.selectedFurnitureId);
      if (furniture) {
        furniture.x = newPosition.x;
        furniture.y = newPosition.y;
        furniture.z = newPosition.z;
      }
    }
  }

  // ============================================================================
  // FURNITURE MANAGEMENT METHODS
  // ============================================================================

  /**
   * Delete furniture from scene
   */
  private deleteFurniture(furnitureId: string): void {
    this.removeFurniture(furnitureId);
    this.dispatchFurnitureDeletedEvent(furnitureId);
  }

  /**
   * Show furniture details modal
   */
  private showFurnitureDetails(furnitureId: string): void {
    const furniture = this.furniture.find(f => f.id === furnitureId);
    if (furniture) {
      // This would typically show a modal with furniture details
      console.log('Furniture details:', furniture);
    }
  }

  // ============================================================================
  // ANIMATION & RENDERING
  // ============================================================================

  /**
   * Main animation loop
   */
  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Update mouse position from event
   */
  private updateMousePosition(event: MouseEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  // ============================================================================
  // EVENT DISPATCHING - Communication with App
  // ============================================================================

  /**
   * Dispatch furniture selected event
   */
  private dispatchFurnitureSelectedEvent(furnitureId: string): void {
    const event = new CustomEvent('furnitureSelected', {
      detail: { furnitureId, mode: this.manipulationMode }
    });
    this.container.dispatchEvent(event);
  }

  /**
   * Dispatch furniture deselected event
   */
  private dispatchFurnitureDeselectedEvent(): void {
    const event = new CustomEvent('furnitureDeselected', {
      detail: { mode: this.manipulationMode }
    });
    this.container.dispatchEvent(event);
  }

  /**
   * Dispatch furniture dragged event
   */
  private dispatchFurnitureDraggedEvent(furnitureId: string, position: THREE.Vector3): void {
    const event = new CustomEvent('furnitureDragged', {
      detail: { 
        furnitureId, 
        position: { x: position.x, y: position.y, z: position.z }
      }
    });
    this.container.dispatchEvent(event);
  }

  /**
   * Dispatch furniture deleted event
   */
  private dispatchFurnitureDeletedEvent(furnitureId: string): void {
    const event = new CustomEvent('furnitureDeleted', {
      detail: { furnitureId }
    });
    this.container.dispatchEvent(event);
  }
}