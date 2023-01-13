const grid = document.querySelector('.grid') // Agarando a nuestro div classe .grid
const startButton = document.querySelector('#start') // Agarando a boton de iniciar partida
const scoreDisplay = document.querySelector('#score') // Agarando a SPAN de la puntacion
let cuadrados = [] // Array donde guardamos todos los cuadraditos
let laSerpiente = [2, 1, 0] // Array representante de la Serpiente
let direction = 1 // Direccion inicial de movimiento de la serpiente
const width = 10 // Anchura de nuestro grid
let appleIndex = 0 // Indice de manzana para Math.random
let score = 0 // Puntuacion inicial
let intervalTime = 1000 // Velocidad inicial
let speed = 0.9 // Multiplicar la Velocidad inicial cuando se come la manzana
let timerId = 0 // Nuestro temporizador



/*******************************
Crear nuestro grid cuadrados y es por donde se movera serpiente
********************************/
function createGrid() {
    for (let i = 0; i < width * width; i++) {
        const cuadradito = document.createElement('div') // Crear elemento HTML en cuadradito
        cuadradito.classList.add('square') // Añadir una clase a elemento creado
        grid.appendChild(cuadradito) // Meter elemento creado dentro del grid
        cuadrados.push(cuadradito) // Empujar elemento en el array cuadrados
    }
}
createGrid()




/*******************************
Utilizando entradas en laSerpiente como indice para anadir clase css a nuestra serpiente representada en cuadrados
********************************/
laSerpiente.forEach(i => cuadrados[i].classList.add('snake'))




/*******************************
Funcion de iniciar y reiniciar el juego
********************************/
function startGame() {
    laSerpiente.forEach(i => cuadrados[i].classList.remove('snake')) // Eliminar serpiente del DOM
    cuadrados[appleIndex].classList.remove('apple') // Eliminar la manzana del DOM
    clearInterval(timerId) // Parar el timerId
    score = 0 // resetear la puntuacion en score

    // Poner la puntuacion en DOM a 0
    scoreDisplay.textContent = score
    // resetear serpiente 
    laSerpiente = [2, 1, 0]
    // resetear la direccion
    direction = 1
    // resetear intervalo tiempo
    intervalTime = 1000
    // Generar una nueva manzana
    generateApple()
    // Poner nueva erpiente en el DOM
    laSerpiente.forEach(i => cuadrados[i].classList.add('snake'))
    // Iniciar el temporizador
    timerId = setInterval(move, intervalTime)
}



/*******************************
Mover serpiente
********************************/
function move() {
    // Ver si la serpiente ha chocado contra la pared y si TRUE, parar el juego
    if (
        (laSerpiente[0] % width === 0 && direction === -1) || // Izquierdo
        (laSerpiente[0] % width === width - 1 && direction === 1) || // Derecho
        (laSerpiente[0] - width < 0 && direction === -width) || // Arriba
        (laSerpiente[0] + width >= width * width && direction === +width) || // Abajo
        cuadrados[laSerpiente[0] + direction].classList.contains('snake') // Contra si misma
    ) {
        return clearInterval(timerId) // Parar el juego (usar return para dejar de ejecutarse)
    }

    // Moviendo la serpiente
    const culoSerpiente = laSerpiente.pop() // ELiminar culo de laSerpiente
    cuadrados[culoSerpiente].classList.remove('snake') // Eliminar estilo css del mismo indice
    laSerpiente.unshift(laSerpiente[0] + direction) // Añadir nueva cabeza, depende de direccion

    // Lo que pasa cuando la serpiente se come la manzana
    if (cuadrados[laSerpiente[0]].classList.contains('apple')) { // Si la cabeza come manzana
        cuadrados[laSerpiente[0]].classList.remove('apple') // Quitar manzana class
        cuadrados[culoSerpiente].classList.add('snake') // Añadir serpiente class
        laSerpiente.push(culoSerpiente) // Crecer la serpiente
        generateApple() // Generar una nueva manzana
        score++ // Puntuar
        scoreDisplay.textContent = score // Poner puntuacion en DOM
        clearInterval(timerId) // Parar timerId
        intervalTime = intervalTime * speed // Cambiar la velocidad a mas rapida
        timerId = setInterval(move, intervalTime) // Reiniciar timerId con nueva velocidad
    }

    cuadrados[laSerpiente[0]].classList.add('snake') // Añadir clase CSS a la nueva cabeza
}




/*******************************
Generar manzana y colocarla a nuestro grid (cuadrados)
********************************/
function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * cuadrados.length) // Sacar numero aleatorio
    } while (cuadrados[appleIndex].classList.contains('snake')) // Si contiene serpiente, repetir
    cuadrados[appleIndex].classList.add('apple') // Si no contiene añadir manzana (clase css)
}
generateApple()




/*******************************
Controlar la direccion de serpiente con teclado utilizando nuevo metodo e.key
********************************/
function controlDireccion(eventoTeclado) {
    if (eventoTeclado.key === 'ArrowRight') {
        direction = 1
    } else if (eventoTeclado.key === 'ArrowUp') {
        direction = -width
    } else if (eventoTeclado.key === 'ArrowLeft') {
        direction = -1
    } else if (eventoTeclado.key === 'ArrowDown') {
        direction = +width
    }
}




/*******************************
Event listeners
********************************/
document.addEventListener('keyup', controlDireccion) // Event listener para controlDirection.
startButton.addEventListener('click', startGame) // event listener para boton de inicio