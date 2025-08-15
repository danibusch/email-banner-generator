# Email Banner Generator

A single-page web application for creating professional 900x300px email banners with customizable text, backgrounds, and assets.

## 🚀 Live Demo

Access the live application at: `https://[your-username].github.io/[repository-name]`

## ✨ Features

- **Fixed Banner Dimensions**: Professional 900x300px output
- **Background Options**: White (#FFFFFF), Black (#000000), Light Green (#EAFFBB)
- **Customizable Text**: Adjustable title with font sizing (16-48px)
- **Logo Support**: Toggle logo display in top-left corner
- **Asset Integration**: 
  - Photo assets (450x300px, right-side positioning)
  - 3D assets (PNG with transparency, right-side positioning)
- **Real-time Preview**: Live canvas rendering
- **Instant Download**: PNG export functionality
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: File validation and user feedback

## 🛠 Technical Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Canvas**: HTML5 Canvas API for rendering
- **Hosting**: GitHub Pages compatible (no build process required)
- **Font**: Arial (fallback for Cera font)

## 📁 File Structure

```
email-banner-generator/
├── index.html          # Main application interface
├── style.css           # Styling and responsive design
├── script.js           # Core functionality and canvas rendering
├── assets/
│   ├── logo-placeholder.txt    # Logo requirements and info
│   └── samples/
│       └── samples-info.txt    # Sample assets information
└── README.md           # This documentation
```

## 🚀 Quick Start

### Local Development

1. Clone or download the repository:
```bash
git clone https://github.com/[username]/email-banner-generator.git
cd email-banner-generator
```

2. Open `index.html` in your web browser or serve with a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have live-server installed)
npx live-server

# Using VS Code Live Server extension
# Right-click index.html -> "Open with Live Server"
```

3. Navigate to `http://localhost:8000` (or the port shown)

### GitHub Pages Deployment

1. **Create a new GitHub repository**:
   - Go to GitHub.com
   - Click "New repository"
   - Name it (e.g., "email-banner-generator")
   - Make it public
   - Don't initialize with README (you already have one)

2. **Push your code to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit: Email Banner Generator"
git branch -M main
git remote add origin https://github.com/[your-username]/[repository-name].git
git push -u origin main
```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access your live site**:
   - URL will be: `https://[your-username].github.io/[repository-name]`
   - May take a few minutes to become available

## 📖 Usage Guide

### Creating Your First Banner

1. **Choose Background Color**: Select from White, Black, or Light Green
2. **Enter Title Text**: Type your banner headline (max 50 characters)
3. **Adjust Font Size**: Use the slider (16-48px range)
4. **Toggle Logo**: Enable/disable logo display
5. **Select Asset Type**: Choose "Photo" or "3D Asset"
6. **Upload Asset** (optional): Choose an image file
7. **Generate Banner**: Click "Generate Banner" to create
8. **Download**: Save your banner as PNG

### Adding Your Logo

1. Save your logo as `logo.png` in the `assets/` folder
2. Recommended specs:
   - Format: PNG with transparent background
   - Size: 80x80px or larger (will be scaled)
   - File size: Under 1MB

### Asset Guidelines

#### Photo Assets
- **Dimensions**: 450x300px (or similar 3:2 aspect ratio)
- **Format**: JPG or PNG
- **Position**: Right side of banner
- **Cropping**: Automatically cropped to fit

#### 3D Assets
- **Format**: PNG with transparent background
- **Position**: Right side of banner, centered
- **Scaling**: Maintains aspect ratio, fits within 450x300px

### File Upload Requirements
- **Supported Formats**: PNG, JPG, JPEG, GIF, WebP
- **Maximum Size**: 5MB
- **Validation**: Automatic file type and size checking

## 🎨 Design Specifications

- **Canvas Dimensions**: 900x300px (fixed)
- **Background Colors**: 
  - White: `#FFFFFF`
  - Black: `#000000` 
  - Light Green: `#EAFFBB`
- **Typography**: Arial (Cera font planned for future)
- **Logo Area**: Top-left, 80x80px
- **Asset Area**: Right side, 450x300px
- **Text Area**: Left side (adjusts based on logo presence)

## 🧪 Testing Checklist

- [ ] All three background colors render correctly
- [ ] Title text displays properly at all font sizes (16-48px)
- [ ] Logo toggles on/off without issues
- [ ] Photo assets (450x300px) position correctly on right side
- [ ] 3D PNG assets with transparency render properly
- [ ] Text wrapping works with long titles
- [ ] Download functionality works in Chrome, Firefox, Safari
- [ ] File upload validation prevents invalid files
- [ ] Error messages display for oversized files (>5MB)
- [ ] Mobile responsive controls work on phone/tablet
- [ ] Real-time preview updates as settings change
- [ ] Clear button resets all settings correctly

## 🔧 Browser Compatibility

- **Chrome**: 60+ ✅
- **Firefox**: 55+ ✅
- **Safari**: 12+ ✅
- **Edge**: 79+ ✅

## 🚨 Known Limitations

- Banner dimensions are fixed at 900x300px
- Limited to 3 background colors
- Cera font not yet implemented (using Arial)
- No text color customization (auto-contrast only)
- Single logo position (top-left only)

## 🔮 Future Enhancements

- [ ] **Cera Font Integration**: Replace Arial with Cera font
- [ ] **Text Color Options**: Custom color picker based on background
- [ ] **Multiple Logo Positions**: Center, right, custom positioning
- [ ] **Preset Templates**: Quick-start design templates
- [ ] **Batch Generation**: Create multiple banners at once
- [ ] **Advanced Text Formatting**: Bold, italic, underline options
- [ ] **Gradient Backgrounds**: More background options
- [ ] **Social Media Sizes**: Additional dimensions for different platforms
- [ ] **Template Saving**: Save and load custom templates
- [ ] **Export Formats**: JPG and SVG export options

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Bug Reports

If you find any issues:
1. Check the browser console for error messages
2. Verify file formats and sizes meet requirements
3. Test in a different browser
4. Open an issue with:
   - Browser and version
   - Steps to reproduce
   - Screenshot if applicable

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Support

For questions or support:
- Check this README for common solutions
- Review the browser console for error messages
- Open an issue for bugs or feature requests

---

**Built with ❤️ for creating professional email banners**

*Ready for GitHub Pages deployment • No build process required • Mobile responsive*
