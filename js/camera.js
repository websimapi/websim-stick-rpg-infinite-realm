import { cameraPos, playerPos } from './gameState.js';

const world = document.querySelector('[data-world]');

export function updateCamera() {
  const screenX = window.innerWidth / 2;
  const screenY = window.innerHeight / 2;
  cameraPos.x = playerPos.x - screenX;
  cameraPos.y = playerPos.y - screenY;
  world.style.transform = `translate(${-cameraPos.x}px, ${-cameraPos.y}px)`;
}

// Future expansion:
// - Screen shake effect
// - Zoom functionality
// - Cinematic mode