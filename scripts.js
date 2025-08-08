let restaurants = ["Biji", "杂饭之家", "Desa", "MickeyMouse", "BlackBoard", "Wallace", "BlueZone Kopitiam",
    "Taiwan Teahouse", "TianXia Kopitiam", "YaZhou Kopitiam", "MeiMei Kopitiam"];

function foodPanel() {
    const restaurantsList = document.querySelector(".list ol");
    let len = restaurants.length;

    for (let i = 0; i < len; i++) {
        const li = document.createElement("li");

        // text container
        const span = document.createElement("span");
        span.textContent = restaurants[i];
        li.appendChild(span);

        // delete button
        const button = document.createElement("button");
        button.textContent = "X";
        li.appendChild(button);

        // append both text and button into the list
        restaurantsList.append(li);
    }
}

function pickFood() {
    const random = Math.floor(Math.random() * restaurants.length);
    const selection = restaurants[random];

    alert("The system picked " + selection + "!");
}

document.addEventListener("DOMContentLoaded", foodPanel);