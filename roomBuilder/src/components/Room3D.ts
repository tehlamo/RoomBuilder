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
  private controls!: OrbitControls;
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
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

    console.log(`Renderer initialized with size: ${width}x${height}`);
  }

  createRoom(dimensions: RoomDimensions): void {
    console.log('Creating room with dimensions:', dimensions);
    
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
      this.scene.add(this.roomMesh);
      console.log('Room mesh created and added to scene');

      const floorGeometry = new THREE.PlaneGeometry(dimensions.width, dimensions.length);
      const floorMaterial = new THREE.MeshLambertMaterial({
        color: 0x8b4513,
        transparent: true,
        opacity: 0.8
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -dimensions.height / 2;
      floor.receiveShadow = true;
      this.scene.add(floor);

      const ceiling = new THREE.Mesh(floorGeometry, floorMaterial);
      ceiling.rotation.x = Math.PI / 2;
      ceiling.position.y = dimensions.height / 2;
      this.scene.add(ceiling);

      const maxDimension = Math.max(dimensions.width, dimensions.length, dimensions.height);
      // Limit camera distance to prevent extreme zoom out
      const cameraDistance = Math.min(maxDimension * 1.5, 50);
      this.camera.position.set(cameraDistance, maxDimension * 0.8, cameraDistance);
      this.camera.lookAt(0, 0, 0);
      
      // Force a resize to ensure proper dimensions after room creation
      setTimeout(() => {
        this.onWindowResize();
      }, 100);
      
      console.log('Room created successfully!');
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
    mesh.rotation.y = (furniture.rotation * Math.PI) / 180;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Make furniture interactive
    mesh.userData = { furnitureId: furniture.id, furniture: furniture };
    mesh.name = furniture.name;

    this.addFurnitureLabel(mesh, furniture.name);
    this.scene.add(mesh);
    this.furnitureMeshes.set(furniture.id, mesh);

    console.log(`Furniture mesh created for ${furniture.name} at (${furniture.x}, ${furniture.y}, ${furniture.z})`);
  }

  removeFurniture(furnitureId: string): void {
    const mesh = this.furnitureMeshes.get(furnitureId);
    if (mesh) {
      this.scene.remove(mesh);
      this.furnitureMeshes.delete(furnitureId);
    }
  }

  private addFurnitureLabel(_mesh: THREE.Mesh, _name: string): void {
    // You can implement text labels here using TextGeometry or HTML overlays
    // For now, we'll skip this for simplicity
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
    return this.container.clientWidth || this.container.offsetWidth || 800;
  }

  private getContainerHeight(): number {
    return this.container.clientHeight || this.container.offsetHeight || window.innerHeight - 70;
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

        console.log(`Window resized to: ${width}x${height}`);
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
}