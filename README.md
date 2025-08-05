# 🍽️ FoodSelector

A beautiful and intuitive web application that helps you choose a restaurant by clicking a button! Features a warm color palette, restaurant management capabilities, and persistent data storage.

## ✨ Features

- **🎨 Warm & Cozy Design**: Beautiful warm color palette with modern UI/UX
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **🏪 Restaurant Management**: Add and remove restaurants from your personal list
- **🎲 Smart Picker**: Randomly selects a restaurant from your list
- **💾 Persistent Storage**: Your restaurant list is saved and remembered between sessions
- **🚀 Real-time Updates**: Instant updates with smooth animations
- **🔄 Offline Fallback**: Works even when the server is unavailable

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. **Clone or download the project**
   ```bash
   # If you have git installed
   git clone <repository-url>
   cd foodselector
   
   # Or simply download and extract the files
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Development Mode

For development with auto-restart on file changes:
```bash
npm run dev
```

## 🎯 How to Use

1. **View Your Restaurant List**: See how many restaurants you currently have
2. **Add Restaurants**: Type a restaurant name and click "➕ Add" or press Enter
3. **Remove Restaurants**: Click the "✕" button next to any restaurant to remove it
4. **Pick a Restaurant**: Click "🎲 Pick a Restaurant" to randomly select one
5. **Enjoy**: Visit your selected restaurant! 🍴

## 🏗️ Project Structure

```
foodselector/
├── server.js          # Node.js Express backend server
├── index.html         # Main HTML file with modern structure
├── style.css          # CSS with warm color palette and responsive design
├── scripts.js         # Frontend JavaScript with API integration
├── package.json       # Node.js dependencies and scripts
├── restaurants.json   # Auto-generated data file (created on first run)
└── README.md         # This file
```

## 🔧 Technical Details

### Backend (Node.js + Express)
- **RESTful API** with endpoints for restaurant management
- **File-based storage** using JSON for simplicity
- **CORS enabled** for cross-origin requests
- **Error handling** with graceful fallbacks

### Frontend (Vanilla JavaScript)
- **Modern ES6+ syntax** with async/await
- **Responsive design** with CSS Grid and Flexbox
- **Smooth animations** and transitions
- **Accessibility features** with proper ARIA labels

### API Endpoints

- `GET /api/restaurants` - Get all restaurants
- `POST /api/restaurants` - Add a new restaurant
- `DELETE /api/restaurants/:name` - Remove a restaurant
- `GET /api/pick` - Pick a random restaurant

## 🎨 Color Palette

The application uses a carefully selected warm color palette:

- **Warm Peach**: `#FFD4C4` - Background elements
- **Warm Coral**: `#FF9F80` - Accent colors
- **Warm Orange**: `#FF8C69` - Primary buttons
- **Warm Brown**: `#D2691E` - Text and borders
- **Warm Cream**: `#FFF8DC` - Input backgrounds
- **Warm Gold**: `#FFD700` - Result highlights

## 🔧 Customization

### Adding More Restaurants
You can pre-populate restaurants by editing the `defaultRestaurants` array in `server.js`.

### Changing Colors
Modify the CSS custom properties in `:root` section of `style.css`.

### Changing Port
Set the `PORT` environment variable or modify the default in `server.js`.

## 🐛 Troubleshooting

### Server Won't Start
- Make sure Node.js is installed: `node --version`
- Install dependencies: `npm install`
- Check if port 3000 is available

### Restaurants Not Saving
- Check file permissions in the project directory
- Look for error messages in the browser console
- Ensure the server is running

### Styling Issues
- Clear your browser cache
- Check if all CSS files are loading
- Verify the browser supports modern CSS features

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📝 License

This project is licensed under the MIT License - see the package.json file for details.

## 🎉 Enjoy Your Meals!

We hope FoodSelector helps you discover great restaurants and makes your dining decisions easier! 🍽️✨