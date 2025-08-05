const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'restaurants.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Default restaurants
const defaultRestaurants = [
    "Biji", "KFD", "杂饭之家", "Desa", "MickeyMouse", 
    "BlackBoard", "Wallace", "BlueZone Kopitiam", 
    "Taiwan Teahouse", "TianXia Kopitiam", "YaZhou Kopitiam", "MeiMei Kopitiam"
];

// Initialize data file if it doesn't exist
async function initializeData() {
    try {
        await fs.access(DATA_FILE);
    } catch (error) {
        await fs.writeFile(DATA_FILE, JSON.stringify({ restaurants: defaultRestaurants }, null, 2));
    }
}

// Read restaurants from file
async function readRestaurants() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data).restaurants;
    } catch (error) {
        return defaultRestaurants;
    }
}

// Write restaurants to file
async function writeRestaurants(restaurants) {
    await fs.writeFile(DATA_FILE, JSON.stringify({ restaurants }, null, 2));
}

// Routes
app.get('/api/restaurants', async (req, res) => {
    try {
        const restaurants = await readRestaurants();
        res.json({ restaurants });
    } catch (error) {
        res.status(500).json({ error: 'Failed to read restaurants' });
    }
});

app.post('/api/restaurants', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'Restaurant name is required' });
        }
        
        const restaurants = await readRestaurants();
        if (!restaurants.includes(name.trim())) {
            restaurants.push(name.trim());
            await writeRestaurants(restaurants);
        }
        
        res.json({ restaurants });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add restaurant' });
    }
});

app.delete('/api/restaurants/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const restaurants = await readRestaurants();
        const filteredRestaurants = restaurants.filter(r => r !== decodeURIComponent(name));
        
        if (filteredRestaurants.length === restaurants.length) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        
        await writeRestaurants(filteredRestaurants);
        res.json({ restaurants: filteredRestaurants });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete restaurant' });
    }
});

app.get('/api/pick', async (req, res) => {
    try {
        const restaurants = await readRestaurants();
        if (restaurants.length === 0) {
            return res.status(400).json({ error: 'No restaurants available' });
        }
        
        const randomIndex = Math.floor(Math.random() * restaurants.length);
        const selectedRestaurant = restaurants[randomIndex];
        
        res.json({ selected: selectedRestaurant });
    } catch (error) {
        res.status(500).json({ error: 'Failed to pick restaurant' });
    }
});

// Start server
app.listen(PORT, async () => {
    await initializeData();
    console.log(`FoodSelector server running on http://localhost:${PORT}`);
});