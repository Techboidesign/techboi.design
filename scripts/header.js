// PURPOSE: JavaScript for the header of the portfolio website

class PixelText {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePos = { x: 0, y: 0 };
        this.isPressed = false;
        this.pixelSize = 16;
        this.text = 'TECHBOI.DESIGN';
        this.fontSize = 80;
        this.fontFamily = "'Press Start 2P'";
        this.color = '#FFD700';
        
        this.init();
        this.bindEvents();
        this.animate();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        
        // Adjust fontSize and text based on screen width
        if (window.innerWidth < 768) {
            this.fontSize = 60;
            this.pixelSize = 4;
            this.textLines = ['TECHBOI', '.DESIGN']; // Split text for mobile
        } else {
            this.fontSize = 80;
            this.pixelSize = 6;
            this.textLines = ['TECHBOI.DESIGN']; // Single line for desktop
        }
    }
    
    createParticles() {
        this.particles = [];
        this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        this.ctx.fillStyle = this.color;
        
        // Calculate total height of all text lines
        const lineHeight = this.fontSize * 1; // 1.2 is the line spacing factor
        const totalHeight = this.textLines.length * lineHeight;
        
        // Calculate widest line for centering
        let maxWidth = 0;
        this.textLines.forEach(line => {
            const metrics = this.ctx.measureText(line);
            maxWidth = Math.max(maxWidth, metrics.width);
        });
        
        // Draw each line
        this.textLines.forEach((line, index) => {
            const metrics = this.ctx.measureText(line);
            const startX = (this.canvas.width - metrics.width) / 2;
            const startY = (this.canvas.height - totalHeight) / 2 + (index + 1) * lineHeight;
            
            this.ctx.fillText(line, startX, startY);
        });
        
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;
        
        for (let y = 0; y < this.canvas.height; y += this.pixelSize) {
            for (let x = 0; x < this.canvas.width; x += this.pixelSize) {
                const index = (y * this.canvas.width + x) * 4;
                const alpha = data[index + 3];
                
                if (alpha > 0) {
                    this.particles.push({
                        x,
                        y,
                        originX: x,
                        originY: y,
                        vx: 0,
                        vy: 0,
                        size: this.pixelSize
                    });
                }
            }
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePos.x = e.clientX - rect.left;
            this.mousePos.y = e.clientY - rect.top;
        });
        
        this.canvas.addEventListener('mousedown', () => {
            this.isPressed = true;
        });
        
        this.canvas.addEventListener('mouseup', () => {
            this.isPressed = false;
        });
        
       
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            const dx = this.mousePos.x - particle.x;
            const dy = this.mousePos.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const force = (this.isPressed ? 55 : 5) / distance;
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const repelX = Math.cos(angle) * force;
                const repelY = Math.sin(angle) * force;
                
                particle.vx -= repelX * 64;
                particle.vy -= repelY * 64;
            }
            
            // Apply velocity for shooting effect
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rubber band effect
            const dx2 = particle.originX - particle.x;
            const dy2 = particle.originY - particle.y;
            particle.vx += dx2 * 0.05;
            particle.vy += dy2 * 0.05;
            
            // Damping
            particle.vx *= 0.85;
            particle.vy *= 0.85;
            
            // Draw particle
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}



// Initialize after fonts are loaded
document.fonts.ready.then(() => {
    new PixelText('portfolioCanvas');
});