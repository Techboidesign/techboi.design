const fs = require('fs');

// Configuration
const WIDTH = 1600;
const HEIGHT = 900;
const SQUARE_SIZE = 4;
const GAP = 4;
const TOTAL_SIZE = SQUARE_SIZE + GAP;

// Start SVG content
let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#090A15" />
  
  <!-- Squares -->
`;

// Generate squares
for (let y = 0; y < HEIGHT; y += TOTAL_SIZE) {
  for (let x = 0; x < WIDTH; x += TOTAL_SIZE) {
    const isSpecial = Math.random() < 0.1;
    const opacity = isSpecial ? 
      (Math.random() * 0.3 + 0.2) * 0.66 : // ~13-33%
      (Math.random() * 0.1 + 0.1) * 0.66;  // ~6.6-13%
    
    svgContent += `  <rect x="${x}" y="${y}" width="${SQUARE_SIZE}" height="${SQUARE_SIZE}" fill="#71E8DF" opacity="${opacity.toFixed(2)}" />\n`;
  }
}

// Add gradient overlays
svgContent += `
  <!-- Gradient Overlays -->
  <defs>
    <linearGradient id="topFade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#090A15" stop-opacity="1" />
      <stop offset="100%" stop-color="#090A15" stop-opacity="0" />
    </linearGradient>
    
    <linearGradient id="bottomFade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#090A15" stop-opacity="0" />
      <stop offset="100%" stop-color="#090A15" stop-opacity="1" />
    </linearGradient>
  </defs>
  
  <!-- Overlay rectangles with gradients -->
  <rect width="${WIDTH}" height="200" fill="url(#topFade)" />
  <rect y="${HEIGHT - 200}" width="${WIDTH}" height="200" fill="url(#bottomFade)" />
</svg>`;

// Write to file
fs.writeFileSync('squares_pattern.svg', svgContent);
console.log('SVG file created!');