import * as THREE from 'three';
import type {RoomDimensions} from '../types/Room';
import type {Furniture} from '../types/Furniture';

export class Room3D {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private roomMesh!: THREE.Mesh;
  private furnitureMeshes: Map<string, THREE.Mesh> = new Map();
  private controls: any;
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

    this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    this.container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => this.onWindowResize());
  }

  createRoom(dimensions: RoomDimensions): void {
    if (this.roomMesh) {
      this.scene.remove(this.roomMesh);
    }

    const roomGeometry = new THREE.BoxGeometry(
      dimensions.width,
      dimensions.height,
      dimensions.length
    );

    const roomMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
      wireframe: true
    });

    this.roomMesh = new THREE.Mesh(roomGeometry, roomMaterial);
    this.scene.add(this.roomMesh);

    const floorGeometry = new THREE.PlaneGeometry(
      dimensions.width,
      dimensions.length
    );
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

    const maxDimension = Math.max(
      dimensions.width,
      dimensions.length,
      dimensions.height
    );
    this.camera.position.set(maxDimension * 1.5, maxDimension * 0.8, maxDimension * 1.5);
    this.camera.lookAt(0, 0, 0);
  }

  addFurniture(furniture: Furniture): void {
    const geometry = new THREE.BoxGeometry(
      furniture.width,
      furniture.height,
      furniture.depth
    );
    const material = new THREE.MeshLambertMaterial({color: furniture.color});
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(furniture.x, furniture.y, furniture.z);
    mesh.rotation.y = (furniture.rotation * Math.PI) / 180;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    this.addFurnitureLabel(mesh, furniture.name);

    this.scene.add(mesh);
    this.furnitureMeshes.set(furniture.id, mesh);
  }

  removeFurniture(furnitureId: string): void {
    const mesh = this.furnitureMeshes.get(furnitureId);
    if (mesh) {
      this.scene.remove(mesh);
      this.furnitureMeshes.delete(furnitureId);
    }
  }

  private addFurnitureLabel(mesh: THREE.Mesh, name: string): void {

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
    // import {OrbitControls} from 'three/examples/jsm/controls/OrbitalControls.js';
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }
}