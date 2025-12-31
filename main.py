from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import random

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Números disponibles y salidos
numeros_disponibles = list(range(1, 76))
numeros_salidos = []

# Estado de la bola actual
estado_bola = {
    "numero_actual": None,
    "etapa": 0  # 0 = primer clic, 1 = segundo clic
}

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {
        "request": request,
        "bola": "?",
        "numeros_salidos": numeros_salidos
    })

@app.post("/sacar_numero", response_class=HTMLResponse)
async def sacar_numero(request: Request):
    global estado_bola, numeros_disponibles, numeros_salidos

    if estado_bola["etapa"] == 0:
        # Primer clic: obtener número aleatorio
        if not numeros_disponibles:
            bola_mostrar = "X"
        else:
            numero = random.choice(numeros_disponibles)
            estado_bola["numero_actual"] = numero
            numeros_disponibles.remove(numero)
            bola_mostrar = "0" if numero < 10 else str(numero)[0]
        estado_bola["etapa"] = 1
    else:
        # Segundo clic: mostrar número completo y marcar en el historial
        numero = estado_bola["numero_actual"]
        if numero < 10:
            bola_mostrar = "0" + str(numero)
        else:
            bola_mostrar = str(numero)
        numeros_salidos.append(numero)  # se guarda el número para marcar
        estado_bola["etapa"] = 0
        estado_bola["numero_actual"] = None

    return templates.TemplateResponse("index.html", {
        "request": request,
        "bola": bola_mostrar,
        "numeros_salidos": numeros_salidos
    })
