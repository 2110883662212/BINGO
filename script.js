let numbers = [];
let currentNumber = document.getElementById("currentNumber");
let spinBtn = document.getElementById("spinBtn");
let resetBtn = document.getElementById("resetBtn");

// Crear tabla
function createTable() {
    const row1 = document.getElementById("row1");
    const row2 = document.getElementById("row2");
    const row3 = document.getElementById("row3");

    row1.innerHTML = "";
    row2.innerHTML = "";
    row3.innerHTML = "";

    for (let i = 1; i <= 25; i++) {
        row1.appendChild(createCell(i));
    }
    for (let i = 26; i <= 50; i++) {
        row2.appendChild(createCell(i));
    }
    for (let i = 51; i <= 75; i++) {
        row3.appendChild(createCell(i));
    }
}

// Crear celda
function createCell(number) {
    let td = document.createElement("td");
    td.textContent = number;
    td.id = "num-" + number;
    return td;
}

// Inicializar números
function initNumbers() {
    numbers = [];
    for (let i = 1; i <= 75; i++) {
        numbers.push(i);
    }
}

// Girar pelota
spinBtn.addEventListener("click", () => {
    if (numbers.length === 0) {
        alert("¡Ya salieron todos los números!");
        return;
    }

    let index = Math.floor(Math.random() * numbers.length);
    let number = numbers.splice(index, 1)[0];

    currentNumber.textContent = number;

    let cell = document.getElementById("num-" + number);
    cell.classList.add("called");
});

// Reiniciar juego
resetBtn.addEventListener("click", () => {
    initNumbers();
    createTable();
    currentNumber.textContent = "—";
});

// Inicialización
initNumbers();
createTable();
