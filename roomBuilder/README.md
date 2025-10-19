# 🏠 Room Builder - 3D Room Planner

A powerful 3D room planning application built with TypeScript, Three.js, and Firebase. Design and visualize your rooms with AI-powered furniture suggestions.

## ✨ Features

- **3D Room Visualization**: Interactive 3D room design with Three.js
- **AI-Powered Suggestions**: Get intelligent furniture recommendations with Google Gemini AI
- **Real-time Collaboration**: Share and view community designs
- **Firebase Integration**: Secure authentication and data storage
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Drag & Drop**: Intuitive furniture placement and manipulation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project (for authentication and database)
- Google Gemini API key (for AI suggestions)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/RoomBuilder.git
   cd RoomBuilder/roomBuilder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `roomBuilder` directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

### GitHub Pages (Recommended)

1. **Update repository name** in `vite.config.ts`:
   ```typescript
   base: '/YOUR_REPOSITORY_NAME/', // Replace with your actual repository name
   ```

2. **Deploy automatically**:
   ```bash
   # Push to GitHub
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select "GitHub Actions" as source
   - Your app will deploy automatically!

### Manual Deployment

```bash
# Build and deploy
npm run build
npm run deploy
```

## 🛠️ Development

### Project Structure
```
roomBuilder/
├── src/
│   ├── components/     # React components
│   ├── services/       # API and Firebase services
│   ├── types/         # TypeScript type definitions
│   └── App.ts         # Main application
├── public/            # Static assets
├── dist/              # Built files (generated)
└── vite.config.ts     # Vite configuration
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication (Google provider)
3. Create Firestore database
4. Update environment variables

### Gemini AI Setup
1. Get API key from Google AI Studio
2. Add to environment variables
3. Configure in `DecorationAI.ts`

## 📱 Features

### 3D Room Design
- Create rooms with custom dimensions
- Add furniture from extensive library
- Real-time 3D visualization
- Drag and drop furniture placement

### AI Integration
- Smart furniture suggestions
- Room-specific recommendations
- Budget-aware suggestions
- Style and size matching

### Community Features
- Share designs publicly
- Browse community creations
- Like and comment on designs
- Save favorite designs

## 🎨 Customization

### Adding New Furniture
Edit `FurnitureManager.ts` to add new furniture templates:

```typescript
{
  name: 'Custom Furniture',
  type: 'furniture',
  dimensions: { width: 2, height: 1, depth: 1 },
  color: 0x8B4513,
  price: 200,
  category: 'custom'
}
```

### Styling
- Main styles: `src/style.css`
- Component-specific styles in respective files
- Responsive design with CSS Grid and Flexbox

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- Check the [Deployment Guide](DEPLOYMENT.md) for deployment issues
- Review [Firebase Setup](FIREBASE_SETUP.md) for authentication
- See [Gemini Setup](GEMINI_SETUP.md) for AI configuration

## 🎯 Live Demo

Visit the live application: [Your GitHub Pages URL]

---

**Built with ❤️ using TypeScript, Three.js, and Firebase**
