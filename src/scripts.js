let restaurants = ["Biji", "杂饭之家", "Desa", "MickeyMouse", "BlackBoard", "Wallace", "BlueZone Kopitiam",
    "Taiwan Teahouse", "TianXia Kopitiam", "YaZhou Kopitiam", "MeiMei Kopitiam"];

function foodPanel() {
    const restaurantsList = document.querySelector(".list ol");
    restaurantsList.textContent = "";
    let len = restaurants.length;

    for (let i = 0; i < len; i++) {
        const li = document.createElement("li");

        // text container
        const span = document.createElement("span");
        span.textContent = restaurants[i];


        // delete button
        const button = document.createElement("button");
        button.textContent = "X";
        button.classList.add("remove-btn");
        button.addEventListener("click", ()=> {
            restaurants.splice(i, 1);
            foodPanel();
        })


        // append both text and button into the list
        li.appendChild(span);
        li.appendChild(button);
        restaurantsList.append(li);
    }
}

function pickRestaurant() {
    if (restaurants.length == 0) {
        alert("Error: No restaurants available to pick from!");
        return;
    }

    const random = Math.floor(Math.random() * restaurants.length);
    const selection = restaurants[random];

    alert("The system picked " + selection + "!");
}

function addRestaurant() {
    const newRest = prompt("Enter the name of restaurant:");

    if (!newRest) {
        alert("❌ Restaurant name cannot be empty!");
        return;
    }

    if (restaurants.includes(newRest)) {
        alert("⚠️ This restaurant is already in the list!");
        return;
    }

    restaurants.push(newRest);
    foodPanel();
}

document.addEventListener("DOMContentLoaded", foodPanel);