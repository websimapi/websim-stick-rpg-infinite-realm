import { generateChunk } from './js/world.js';
import { movePlayer } from './js/player.js';
import { updateCamera } from './js/camera.js';
import { playerPos } from './js/gameState.js';

// Initialize procedural world
for (let x = -1; x <= 1; x++) {
  for (let y = -1; y <= 1; y++) {
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
  updateCamera();
});

// Initial positioning
player.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
updateCamera();

// TODO: Implement main game loop
// function gameLoop() {
//   Handle NPCs, weather, time progression
//   requestAnimationFrame(gameLoop);
// }
// gameLoop();