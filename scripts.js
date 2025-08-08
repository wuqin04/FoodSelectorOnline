const foods = ["Biji", "杂饭之家", "Desa", "MickeyMouse", "BlackBoard", "Wallace", "BlueZone Kopitiam",
    "Taiwan Teahouse", "TianXia Kopitiam", "YaZhou Kopitiam", "MeiMei Kopitiam"]

function printFood() {
    const foodList = document.querySelector(".list ol");

    foods.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        foodList.appendChild(li);
    });
}

function pickFood() {
    const random = Math.floor(Math.random() * foods.length);
    const selection = foods[random];

    alert("The system picked " + selection + "!");
}

document.addEventListener("DOMContentLoaded", printFood);