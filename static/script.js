let numeroActual = null; // guarda el número aleatorio actual
let etapa = 0; // 0 = primer clic, 1 = segundo clic

async function sacarNumero() {
    const bola = document.getElementById("bola");
    const historial = document.getElementById("historial");

    if (etapa === 0) {
        // Primer clic: obtener número del servidor
        const res = await fetch("/sacar_numero");
        const data = await res.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        numeroActual = data.numero;

        // Mostrar primer dígito
        let primerDigito = numeroActual < 10 ? "0" : String(numeroActual)[0];

        // Animación
        bola.classList.remove("animar");
        void bola.offsetWidth; // reinicia animación
        bola.classList.add("animar");

        bola.innerText = primerDigito;

        etapa = 1; // pasar al segundo clic
    } else if (etapa === 1) {
        // Segundo clic: mostrar número completo y actualizar historial
        let numeroCompleto = numeroActual < 10 ? "0" + numeroActual : numeroActual;

        // Animación
        bola.classList.remove("animar");
        void bola.offsetWidth; // reinicia animación
        bola.classList.add("animar");

        bola.innerText = numeroCompleto;

        // Agregar al historial
        historial.innerHTML += historial.innerHTML ? " - " + numeroCompleto : numeroCompleto;

        // Reiniciar estado
        etapa = 0;
        numeroActual = null;
    }
}
function reiniciarBingo() {
    numeroActual = null;
    etapa = 0;
}



