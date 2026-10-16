// Set up scene, camera, renderer
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// We can set a background color or keep it transparent.
// Let's use a subtle off-white to match Instagram's vibe.
scene.background = new THREE.Color('#fafafa');

const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
// Move camera back to see the grid
camera.position.z = 12;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Load textures (placeholder images for posts)
const textureLoader = new THREE.TextureLoader();
// Using some nice random images for the grid
const imageUrls = [
    'https://picsum.photos/600/600?random=11',
    'https://picsum.photos/600/600?random=12',
    'https://picsum.photos/600/600?random=13',
    'https://picsum.photos/600/600?random=14',
    'https://picsum.photos/600/600?random=15',
    'https://picsum.photos/600/600?random=16',
    'https://picsum.photos/600/600?random=17',
    'https://picsum.photos/600/600?random=18',
    'https://picsum.photos/600/600?random=19'
];

const planes = [];
const rows = 3;
const cols = 3;
// Size of each image plane and spacing between them
const size = 5;
const spacing = 5.2; 

// Add some ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Create 3x3 Grid
let index = 0;
for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        const geometry = new THREE.PlaneGeometry(size, size);
        
        // We use MeshBasicMaterial so we don't strictly need complex lighting,
        // but we can use MeshStandardMaterial if we want reflections later.
        const material = new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            side: THREE.DoubleSide
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        
        // Calculate position to center the grid
        const posX = (x - (cols - 1) / 2) * spacing;
        // Invert Y so the first image is top-left
        const posY = -(y - (rows - 1) / 2) * spacing; 
        
        mesh.position.set(posX, posY, 0);
        // Save base values for animation
        mesh.userData = { 
            baseX: posX, 
            baseY: posY, 
            baseZ: 0,
            hoverScale: 1.15
        };
        
        scene.add(mesh);
        planes.push(mesh);
        
        // Load texture asynchronously
        const currentMesh = mesh; // closure reference
        textureLoader.load(imageUrls[index], (texture) => {
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            currentMesh.material.map = texture;
            currentMesh.material.needsUpdate = true;
        });
        
        index++;
    }
}

// Raycaster for mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Mouse move interaction (Parallax & Hover)
let targetX = 0;
let targetY = 0;

container.addEventListener('mousemove', (event) => {
    const rect = container.getBoundingClientRect();
    
    // Normalized device coordinates (-1 to +1) for raycaster
    mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
    
    // Calculate values for parallax camera movement based on mouse position inside container
    // We constrain the movement so it doesn't go too wild
    targetX = (event.clientX - rect.left - rect.width / 2) * 0.005;
    targetY = (event.clientY - rect.top - rect.height / 2) * 0.005;
});

// Reset mouse position when leaving canvas
container.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
    targetX = 0;
    targetY = 0;
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();
    
    // Smooth camera movement (Parallax effect)
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (-targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    // Raycasting for hover effects on images
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planes);
    
    // First, animate all planes to their default state
    planes.forEach((plane, i) => {
        // Add a slight floating animation to all images
        const floatY = Math.sin(time * 2 + i) * 0.1;
        plane.position.y = plane.userData.baseY + floatY;

        // Reset scale and Z position slowly using LERP
        plane.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        plane.position.z += (plane.userData.baseZ - plane.position.z) * 0.1;
        
        // Reset rotation slowly
        plane.rotation.x += (0 - plane.rotation.x) * 0.1;
        plane.rotation.y += (0 - plane.rotation.y) * 0.1;
    });
    
    // If hovering over an image, pop it out and tilt it
    if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        const hoveredPlane = intersects[0].object;
        
        // Scale up
        hoveredPlane.scale.lerp(
            new THREE.Vector3(hoveredPlane.userData.hoverScale, hoveredPlane.userData.hoverScale, 1), 
            0.15
        );
        // Move forward in Z
        hoveredPlane.position.z += (1.5 - hoveredPlane.position.z) * 0.15;
        
        // Tilt slightly based on mouse position relative to the center of the image
        const intersectionPoint = intersects[0].point;
        const tiltX = (hoveredPlane.position.y - intersectionPoint.y) * 0.2;
        const tiltY = (intersectionPoint.x - hoveredPlane.position.x) * 0.2;
        
        hoveredPlane.rotation.x += (tiltX - hoveredPlane.rotation.x) * 0.15;
        hoveredPlane.rotation.y += (tiltY - hoveredPlane.rotation.y) * 0.15;
    } else {
        document.body.style.cursor = 'default';
    }
    
    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    if(container.clientWidth === 0) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
