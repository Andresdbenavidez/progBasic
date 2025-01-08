const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonTierra = document.getElementById('boton-tierra')
sectionReiniciar.style.display = 'none'
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedorTarjetas')

/*Array*/
let mokepones = []

/*Variables*/
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let vidasJugador = 3
let vidasEnemigo = 3

/*Clase Mokepon para que se creen los objetos*/
class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        /*Array de ataques*/
        this.ataques = []
    }
}

/*Crea los objetos Mokepon con la clase Mokepon*/
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)

/*Mete información al array de hipodoge ataques usando objetos*/
hipodoge.ataques.push(
    { nombre : '💧', id: 'boton-agua' },
    { nombre : '💧', id: 'boton-agua' },
    { nombre : '💧', id: 'boton-agua' },
    { nombre : '🔥', id: 'boton-fuego' },
    { nombre : '🌱', id: 'boton-tierra'}
)

/*Mete información al array de capipepo ataques usando objetos*/
capipepo.ataques.push(
    { nombre : '🌱', id: 'boton-tierra'},
    { nombre : '🌱', id: 'boton-tierra'},
    { nombre : '🌱', id: 'boton-tierra'},
    { nombre : '💧', id: 'boton-agua' },
    { nombre : '🔥', id: 'boton-fuego' }
)

/*Mete información al array de ataques de ratigueya usando objetos*/
ratigueya.ataques.push(
    { nombre : '🔥', id: 'boton-fuego' },
    { nombre : '🔥', id: 'boton-fuego' },
    { nombre : '🔥', id: 'boton-fuego' },
    { nombre : '💧', id: 'boton-agua' },
    { nombre : '🌱', id: 'boton-tierra'}
)

mokepones.push(hipodoge, capipepo, ratigueya)



function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'

    /*Ciclo foreach para crear las tarjetas de los mokepones*/
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `                
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre} >
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')

    })
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    
    botonFuego.addEventListener('click', ataqueFuego)
    
    botonAgua.addEventListener('click', ataqueAgua)
    
    botonTierra.addEventListener('click', ataqueTierra)

    
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {

    sectionSeleccionarMascota.style.display = 'none'
    
    sectionSeleccionarAtaque.style.display = 'flex'
    
    /*Valida que mascota esta seleccionando el jugador y los muestra en el html usando el input.id */
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        /**Guarda el nombre de la mascota que seleccionó en el interior de una variable. */
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        /**Guarda el nombre de la mascota que seleccionó en el interior de una variable. */
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        /**Guarda el nombre de la mascota que seleccionó en el interior de una variable. */
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascota')
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }

    }

    mostrarAtaques(ataques)
}

function seleccionarMascotaEnemigo() {
    /*Selecciona una mascota aleatoria para el enemigo, con la posibilidad de elegirlo entre x cantidad de mokepones*/
    let mascotaAleatoria = aleatorio(0,mokepones.length -1)

    /*Selecciona un mokepon adentro del array mokepones usando el número aleatorio en el indice. */
    /**Cuando Tengamos el valor imprimelo adentro de esta etiquet(Asi entendi el innerHTML) */
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }

    combate()
}

function combate() {
    
    
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensaje(resultado) {
    
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    
    sectionMensajes.innerHTML = resultadoFinal

    
    botonFuego.disabled = true
    
    botonAgua.disabled = true
    
    botonTierra.disabled = true

    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)
