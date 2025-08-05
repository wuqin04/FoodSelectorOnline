const foods = ["Biji", "杂饭之家", "Desa", "MickeyMouse", "BlackBoard", "Wallace", "BlueZone Kopitiam",
    "Taiwan Teahouse", "TianXia Kopitiam", "YaZhou Kopitiam", "MeiMei Kopitiam"]

function pickFood() {
    const random = Math.floor(Math.random() * foods.length);
    const selection = foods[random];

    alert("The system picked " + selection + "!");
}