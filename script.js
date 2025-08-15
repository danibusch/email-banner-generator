// Email Banner Generator - JavaScript
// Canvas dimensions (fixed)
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 300;
const LOGO_SIZE = 80; // Logo size for top-left corner
const ASSET_WIDTH = 450; // Right-side asset width
const ASSET_HEIGHT = 300; // Right-side asset height (full height)

// Global variables
let canvas, ctx;
let currentBackgroundColor = '#FFFFFF';
let currentTitle = '';
let currentFontSize = 32;
let showLogo = true;
let currentAssetType = 'photo';
let uploadedAsset = null;
let logoImage = null;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCanvas();
    bindEventListeners();
    generateBanner(); // Initial render
});

// Core Functions
function initializeCanvas() {
    canvas = document.getElementById('bannerCanvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    
    // Load placeholder logo
    loadLogo();
    
    console.log('Canvas initialized:', CANVAS_WIDTH + 'x' + CANVAS_HEIGHT);
}

function loadLogo() {
    // Create a simple placeholder logo since we don't have assets folder yet
    logoImage = new Image();
    logoImage.onload = function() {
        console.log('Logo loaded successfully');
        generateBanner();
    };
    logoImage.onerror = function() {
        console.warn('Logo not found, using text placeholder');
        logoImage = null;
        generateBanner();
    };
    logoImage.src = 'assets/logo.png';
}

function setBackgroundColor(color) {
    currentBackgroundColor = color;
    console.log('Background color set to:', color);
}

function drawBackground() {
    ctx.fillStyle = currentBackgroundColor;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawTitle(text, fontSize) {
    if (!text.trim()) return;
    
    // Set font properties (Arial fallback until Cera font is added)
    ctx.font = `${fontSize}px Arial, sans-serif`;
    ctx.fontWeight = 'bold';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    
    // Determine text color based on background
    const textColor = getContrastingTextColor(currentBackgroundColor);
    ctx.fillStyle = textColor;
    
    // Calculate text position (left side, avoiding logo if present)
    const leftMargin = showLogo && logoImage ? LOGO_SIZE + 30 : 30;
    const topPosition = CANVAS_HEIGHT / 2;
    
    // Word wrapping for long titles
    const maxWidth = (CANVAS_WIDTH / 2) - leftMargin - 20; // Leave space for right asset
    wrapText(ctx, text, leftMargin, topPosition, maxWidth, fontSize * 1.2);
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    let lines = [];
    
    // Calculate all lines first
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);
    
    // Center vertically
    const totalHeight = lines.length * lineHeight;
    const startY = y - (totalHeight / 2) + (lineHeight / 2);
    
    // Draw all lines
    lines.forEach((line, index) => {
        context.fillText(line, x, startY + (index * lineHeight));
    });
}

function getContrastingTextColor(backgroundColor) {
    // Simple contrast calculation
    if (backgroundColor === '#000000') {
        return '#FFFFFF'; // White text on black background
    } else {
        return '#333333'; // Dark text on light backgrounds
    }
}

function toggleLogo(show) {
    showLogo = show;
    console.log('Logo toggle:', show);
}

function drawLogo() {
    if (!showLogo) return;
    
    if (logoImage && logoImage.complete) {
        // Draw actual logo
        ctx.drawImage(logoImage, 20, 20, LOGO_SIZE, LOGO_SIZE);
    } else {
        // Draw placeholder logo
        drawPlaceholderLogo();
    }
}

function drawPlaceholderLogo() {
    const x = 20;
    const y = 20;
    const size = LOGO_SIZE;
    
    // Draw placeholder rectangle
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(x, y, size, size);
    
    // Draw border
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, size, size);
    
    // Draw "LOGO" text
    ctx.fillStyle = '#999';
    ctx.font = '16px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('LOGO', x + size/2, y + size/2);
}

function loadAndDrawAsset(file, assetType) {
    if (!file) {
        uploadedAsset = null;
        generateBanner();
        return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showError('Please upload a valid image file.');
        return;
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
        showError('File size must be less than 5MB.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            uploadedAsset = {
                image: img,
                type: assetType,
                originalWidth: img.width,
                originalHeight: img.height
            };
            console.log('Asset loaded:', assetType, img.width + 'x' + img.height);
            generateBanner();
        };
        img.onerror = function() {
            showError('Failed to load the image. Please try another file.');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function drawAsset() {
    if (!uploadedAsset) return;
    
    const { image, type } = uploadedAsset;
    const startX = CANVAS_WIDTH - ASSET_WIDTH; // Right side
    const startY = 0;
    
    if (type === 'photo') {
        // Draw photo asset (450x300px, cropped to fit)
        drawImageCropped(image, startX, startY, ASSET_WIDTH, ASSET_HEIGHT);
    } else if (type === '3d') {
        // Draw 3D asset (maintain aspect ratio, transparent background)
        drawImageFitted(image, startX, startY, ASSET_WIDTH, ASSET_HEIGHT);
    }
}

function drawImageCropped(image, x, y, width, height) {
    // Calculate crop dimensions to maintain aspect ratio
    const imageAspect = image.width / image.height;
    const targetAspect = width / height;
    
    let sourceX = 0, sourceY = 0, sourceWidth = image.width, sourceHeight = image.height;
    
    if (imageAspect > targetAspect) {
        // Image is wider, crop sides
        sourceWidth = image.height * targetAspect;
        sourceX = (image.width - sourceWidth) / 2;
    } else {
        // Image is taller, crop top/bottom
        sourceHeight = image.width / targetAspect;
        sourceY = (image.height - sourceHeight) / 2;
    }
    
    ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function drawImageFitted(image, x, y, maxWidth, maxHeight) {
    // Maintain aspect ratio, fit within bounds
    const imageAspect = image.width / image.height;
    let drawWidth = maxWidth;
    let drawHeight = maxHeight;
    
    if (imageAspect > maxWidth / maxHeight) {
        // Image is wider
        drawHeight = maxWidth / imageAspect;
    } else {
        // Image is taller
        drawWidth = maxHeight * imageAspect;
    }
    
    // Center the image within the bounds
    const drawX = x + (maxWidth - drawWidth) / 2;
    const drawY = y + (maxHeight - drawHeight) / 2;
    
    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

function generateBanner() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw background
    drawBackground();
    
    // Draw asset (behind text)
    drawAsset();
    
    // Draw logo
    drawLogo();
    
    // Draw title
    drawTitle(currentTitle, currentFontSize);
    
    // Hide canvas overlay and enable download
    const overlay = document.getElementById('canvasOverlay');
    overlay.classList.add('hidden');
    
    document.getElementById('downloadBtn').disabled = false;
    
    console.log('Banner generated successfully');
}

function downloadBanner() {
    try {
        // Create download link
        const link = document.createElement('a');
        link.download = `email-banner-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('Banner downloaded successfully');
        showSuccess('Banner downloaded successfully!');
    } catch (error) {
        console.error('Download error:', error);
        showError('Failed to download banner. Please try again.');
    }
}

function clearAll() {
    // Reset all form values
    document.getElementById('titleInput').value = '';
    document.getElementById('fontSizeSlider').value = 32;
    document.getElementById('fontSizeValue').textContent = '32px';
    document.getElementById('logoToggle').checked = true;
    document.querySelector('input[name="bgColor"][value="#FFFFFF"]').checked = true;
    document.querySelector('input[name="assetType"][value="photo"]').checked = true;
    document.getElementById('assetUpload').value = '';
    
    // Reset global variables
    currentTitle = '';
    currentFontSize = 32;
    currentBackgroundColor = '#FFFFFF';
    showLogo = true;
    currentAssetType = 'photo';
    uploadedAsset = null;
    
    // Show canvas overlay and disable download
    const overlay = document.getElementById('canvasOverlay');
    overlay.classList.remove('hidden');
    document.getElementById('downloadBtn').disabled = true;
    
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    console.log('All settings cleared');
    showSuccess('All settings have been cleared.');
}

// Event Listeners
function bindEventListeners() {
    // Background color selection
    document.querySelectorAll('input[name="bgColor"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            setBackgroundColor(e.target.value);
            generateBanner();
        });
    });
    
    // Title input
    document.getElementById('titleInput').addEventListener('input', (e) => {
        currentTitle = e.target.value;
        generateBanner();
    });
    
    // Font size slider
    document.getElementById('fontSizeSlider').addEventListener('input', (e) => {
        currentFontSize = parseInt(e.target.value);
        document.getElementById('fontSizeValue').textContent = currentFontSize + 'px';
        generateBanner();
    });
    
    // Logo toggle
    document.getElementById('logoToggle').addEventListener('change', (e) => {
        toggleLogo(e.target.checked);
        generateBanner();
    });
    
    // Asset type selection
    document.querySelectorAll('input[name="assetType"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentAssetType = e.target.value;
            if (uploadedAsset) {
                uploadedAsset.type = currentAssetType;
                generateBanner();
            }
        });
    });
    
    // Asset upload
    document.getElementById('assetUpload').addEventListener('change', (e) => {
        const file = e.target.files[0];
        loadAndDrawAsset(file, currentAssetType);
    });
    
    // Action buttons
    document.getElementById('generateBtn').addEventListener('click', generateBanner);
    document.getElementById('downloadBtn').addEventListener('click', downloadBanner);
    document.getElementById('clearBtn').addEventListener('click', clearAll);
}

// Utility Functions
function showError(message) {
    // Simple error display - can be enhanced with a toast/modal system
    alert('Error: ' + message);
    console.error('Error:', message);
}

function showSuccess(message) {
    // Simple success display - can be enhanced with a toast/modal system
    console.log('Success:', message);
    
    // Optional: Show a temporary success message
    const successDiv = document.createElement('div');
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: 600;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
}

// Future enhancements (commented for reference)
/*
TODO: Future Features
- Add Cera font when available
- Multiple logo options
- Text color picker based on background
- Preset templates
- Batch generation capability
- Advanced text formatting (bold, italic)
- Gradient backgrounds
- Shadow effects
- Export in multiple formats (JPG, SVG)
- Template saving/loading
- Social media size variants
*/

console.log('Email Banner Generator initialized successfully');
