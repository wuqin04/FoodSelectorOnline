// API Base URL - adjust if needed
const API_BASE = window.location.origin;

// Global state
let restaurants = [];
let isLoading = false;

// DOM Elements
const restaurantInput = document.getElementById('restaurant-input');
const addBtn = document.getElementById('add-btn');
const pickBtn = document.getElementById('pick-btn');
const restaurantCount = document.getElementById('restaurant-count');
const restaurantsContainer = document.getElementById('restaurants-container');
const resultDisplay = document.getElementById('result-display');
const selectedRestaurant = document.getElementById('selected-restaurant');
const loading = document.getElementById('loading');

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadRestaurants();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Enter key support for adding restaurants
    restaurantInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addRestaurant();
        }
    });

    // Input validation
    restaurantInput.addEventListener('input', function() {
        const value = this.value.trim();
        addBtn.disabled = value.length === 0;
        
        if (value.length > 50) {
            this.value = value.substring(0, 50);
        }
    });
}

// Show/hide loading spinner
function setLoading(show) {
    isLoading = show;
    loading.style.display = show ? 'flex' : 'none';
    
    // Disable buttons during loading
    addBtn.disabled = show || restaurantInput.value.trim().length === 0;
    pickBtn.disabled = show || restaurants.length === 0;
}

// Show error message
function showError(message) {
    alert(`❌ Error: ${message}`);
}

// Show success message
function showSuccess(message) {
    // You could implement a toast notification here
    console.log(`✅ Success: ${message}`);
}

// Load restaurants from API
async function loadRestaurants() {
    setLoading(true);
    
    try {
        const response = await fetch(`${API_BASE}/api/restaurants`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        restaurants = data.restaurants || [];
        updateUI();
        showSuccess('Restaurants loaded successfully');
        
    } catch (error) {
        console.error('Error loading restaurants:', error);
        showError('Failed to load restaurants. Please check if the server is running.');
        
        // Fallback to default restaurants if API fails
        restaurants = [
            "Biji", "KFD", "杂饭之家", "Desa", "MickeyMouse", 
            "BlackBoard", "Wallace", "BlueZone Kopitiam", 
            "Taiwan Teahouse", "TianXia Kopitiam", "YaZhou Kopitiam", "MeiMei Kopitiam"
        ];
        updateUI();
        
    } finally {
        setLoading(false);
    }
}

// Add a new restaurant
async function addRestaurant() {
    const name = restaurantInput.value.trim();
    
    if (!name) {
        showError('Please enter a restaurant name');
        return;
    }
    
    if (restaurants.includes(name)) {
        showError('This restaurant is already in your list');
        restaurantInput.value = '';
        return;
    }
    
    setLoading(true);
    
    try {
        const response = await fetch(`${API_BASE}/api/restaurants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        restaurants = data.restaurants || [];
        restaurantInput.value = '';
        updateUI();
        showSuccess(`"${name}" added to your restaurant list`);
        
        // Focus back to input for easy adding
        restaurantInput.focus();
        
    } catch (error) {
        console.error('Error adding restaurant:', error);
        showError('Failed to add restaurant. Please try again.');
        
    } finally {
        setLoading(false);
    }
}

// Delete a restaurant
async function deleteRestaurant(name) {
    if (!confirm(`Are you sure you want to remove "${name}" from your list?`)) {
        return;
    }
    
    setLoading(true);
    
    try {
        const response = await fetch(`${API_BASE}/api/restaurants/${encodeURIComponent(name)}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        restaurants = data.restaurants || [];
        updateUI();
        showSuccess(`"${name}" removed from your restaurant list`);
        
        // Hide result if the selected restaurant was deleted
        const currentSelection = selectedRestaurant.textContent;
        if (currentSelection === name) {
            hideResult();
        }
        
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        showError('Failed to remove restaurant. Please try again.');
        
    } finally {
        setLoading(false);
    }
}

// Pick a random restaurant
async function pickRestaurant() {
    if (restaurants.length === 0) {
        showError('Please add some restaurants first');
        return;
    }
    
    setLoading(true);
    hideResult();
    
    try {
        const response = await fetch(`${API_BASE}/api/pick`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Add a slight delay for better UX
        setTimeout(() => {
            showResult(data.selected);
            setLoading(false);
        }, 1000);
        
    } catch (error) {
        console.error('Error picking restaurant:', error);
        
        // Fallback to client-side picking
        const randomIndex = Math.floor(Math.random() * restaurants.length);
        const selected = restaurants[randomIndex];
        
        setTimeout(() => {
            showResult(selected);
            setLoading(false);
            showError('Used offline mode for picking (server unavailable)');
        }, 1000);
    }
}

// Show the selected restaurant result
function showResult(restaurant) {
    selectedRestaurant.textContent = restaurant;
    resultDisplay.classList.remove('hidden');
    
    // Scroll to result
    resultDisplay.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

// Hide the result display
function hideResult() {
    resultDisplay.classList.add('hidden');
}

// Update the UI with current restaurant data
function updateUI() {
    // Update restaurant count
    restaurantCount.textContent = restaurants.length;
    
    // Update restaurant list
    restaurantsContainer.innerHTML = '';
    
    if (restaurants.length === 0) {
        restaurantsContainer.innerHTML = `
            <div style="text-align: center; padding: 20px; color: var(--text-light);">
                <p>🍽️ No restaurants yet!</p>
                <p>Add your first restaurant above to get started.</p>
            </div>
        `;
    } else {
        restaurants.forEach(restaurant => {
            const restaurantItem = document.createElement('div');
            restaurantItem.className = 'restaurant-item';
            restaurantItem.innerHTML = `
                <span class="restaurant-name">${escapeHtml(restaurant)}</span>
                <button class="delete-btn" onclick="deleteRestaurant('${escapeHtml(restaurant)}')" title="Remove restaurant">
                    ✕
                </button>
            `;
            restaurantsContainer.appendChild(restaurantItem);
        });
    }
    
    // Update button states
    pickBtn.disabled = isLoading || restaurants.length === 0;
    addBtn.disabled = isLoading || restaurantInput.value.trim().length === 0;
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Utility function for development/debugging
function getRestaurantData() {
    return {
        restaurants: restaurants,
        count: restaurants.length,
        apiBase: API_BASE
    };
}

// Export for potential future use
window.FoodSelector = {
    loadRestaurants,
    addRestaurant,
    deleteRestaurant,
    pickRestaurant,
    getRestaurantData
};