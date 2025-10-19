import * as THREE from 'three';

export class CubeLogo {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;
  private animationId: number | null = null;
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.initializeScene();
    this.createCube();
    this.animate();
  }

  private initializeScene(): void {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf8f9fa);

    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(3, 3, 3);
    this.camera.lookAt(0, 0, 0);

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Add lighting
    this.setupLighting();

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  private setupLighting(): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    // Point light for extra illumination
    const pointLight = new THREE.PointLight(0x3498db, 0.5, 10);
    pointLight.position.set(-2, 2, 2);
    this.scene.add(pointLight);
  }

  private createCube(): void {
    // Create cube geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Create materials for different faces
    const materials = [
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // Right face
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // Left face
      new THREE.MeshLambertMaterial({ color: 0x3498db }), // Top face (blue)
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // Bottom face
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // Front face
      new THREE.MeshLambertMaterial({ color: 0xecf0f1 })  // Back face
    ];

    // Create the cube
    this.cube = new THREE.Mesh(geometry, materials);
    this.cube.castShadow = true;
    this.cube.receiveShadow = true;
    this.scene.add(this.cube);

    // Add a subtle rotation animation
    this.cube.rotation.x = 0.2;
    this.cube.rotation.y = 0.2;
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    // Gentle rotation animation
    if (this.cube) {
      this.cube.rotation.y += 0.005;
      this.cube.rotation.x += 0.002;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public dispose(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    // Clean up Three.js objects
    this.scene.clear();
    this.renderer.dispose();
    
    // Remove the canvas from the container
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }

  public getCube(): THREE.Mesh {
    return this.cube;
  }
}
