import { generateChunk } from './js/world.js';
import { movePlayer } from './js/player.js';
import { updateCamera } from './js/camera.js';
import { playerPos, cameraPos, CHUNK_SIZE, TILE_SIZE, setTargetPosition } from './js/gameState.js';

// Initialize procedural world around player's starting position
const initialChunkX = Math.floor(playerPos.x / (CHUNK_SIZE * TILE_SIZE));
const initialChunkY = Math.floor(playerPos.y / (CHUNK_SIZE * TILE_SIZE));

for (let x = initialChunkX - 1; x <= initialChunkX + 1; x++) {
  for (let y = initialChunkY - 1; y <= initialChunkY + 1; y++) {
    generateChunk(x, y);
  }
}

// Set up controls
document.addEventListener('keydown', (e) => {
  const speed = 5;
  switch(e.key.toLowerCase()) {
    case 'w': 
    case 'arrowup': movePlayer(0, -speed); break;
    case 's': 
    case 'arrowdown': movePlayer(0, speed); break;
    case 'a': 
    case 'arrowleft': movePlayer(-speed, 0); break;
    case 'd': 
    case 'arrowright': movePlayer(speed, 0); break;
  }
  // Camera update now handled in game loop
});

// Initial positioning
player.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
updateCamera();

// Add click-to-move handler
document.querySelector('[data-world]').addEventListener('click', (e) => {
  const world = document.querySelector('[data-world]');
  const rect = world.getBoundingClientRect();
  const clickX = e.clientX - rect.left + cameraPos.x;
  const clickY = e.clientY - rect.top + cameraPos.y;
  
  setTargetPosition(clickX, clickY);
  
  // Create click effect
  const marker = document.createElement('div');
  marker.style.cssText = `
    position: absolute;
    width: 8px;
    height: 8px;
    background: rgba(255,50,50,0.7);
    border-radius: 50%;
    transform: translate(${clickX}px, ${clickY}px);
    pointer-events: none;
  `;
  world.appendChild(marker);
  marker.animate([
    { opacity: 1, transform: `translate(${clickX}px, ${clickY}px) scale(1)` },
    { opacity: 0, transform: `translate(${clickX}px, ${clickY}px) scale(3)` }
  ], { duration: 500 }).onfinish = () => marker.remove();
});

// Implement smooth game loop
function gameLoop() {
  updateCamera();
  requestAnimationFrame(gameLoop);
}
gameLoop();