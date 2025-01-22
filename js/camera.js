import { cameraPos, playerPos } from './gameState.js';

const world = document.querySelector('[data-world]');
const SMOOTH_FACTOR = 0.2;

export function updateCamera() {
  // Calculate ideal camera position
  const targetX = playerPos.x - window.innerWidth/2;
  const targetY = playerPos.y - window.innerHeight/2;
  
  // Apply smooth dampening
  cameraPos.x += (targetX - cameraPos.x) * SMOOTH_FACTOR;
  cameraPos.y += (targetY - cameraPos.y) * SMOOTH_FACTOR;

  // Apply with subpixel precision
  world.style.transform = `translate(
    ${-cameraPos.x.toFixed(2)}px,
    ${-cameraPos.y.toFixed(2)}px
  )`;
}

// Add responsive tracking
window.addEventListener('resize', updateCamera);