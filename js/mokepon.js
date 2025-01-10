const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'


const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedorTarjetas')

const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

/*Array*/
let mokepones = []
let botones = []
let ataqueJugador = []
let ataqueEnemigo = []

/*Variables*/
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
//Usamos el lienzo para dibujar dentro de canvas
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'

/*Clase Mokepon para que se creen los objetos*/
class Mokepon {
    constructor(nombre, foto, vida, fotomap) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.fotomap = fotomap

        /*Array de ataques*/
        this.ataques = []

        //Atributos para mover el mokepon
        this.x = 20
        this.y = 30
        this.ancho = 40
        this.alto = 40

        //imagen del canvas
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotomap
        
        //velocidad del mokepon
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

/*Crea los objetos Mokepon con la clase Mokepon*/
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, 'assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, 'assets/ratigueya.png')

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

/**Mete los Mokepon a un array para que se puedan recorrer*/
mokepones.push(hipodoge, capipepo, ratigueya)


function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

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
    
    botonReiniciar.addEventListener('click', reiniciarJuego)
}


function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'

    //Mostrar los botones de ataques
    // sectionSeleccionarAtaque.style.display = 'flex'

    // Mostrar el mapa de canvas

    
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
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
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


function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `

        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}


function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background ='#112f58'
                boton.disabled = true
            }else if (e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true             
            }else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}


function seleccionarMascotaEnemigo() {
    /*Selecciona una mascota aleatoria para el enemigo, con la posibilidad de elegirlo entre x cantidad de mokepones*/
    let mascotaAleatoria = aleatorio(0,mokepones.length -1)

    /*Selecciona un mokepon adentro del array mokepones usando el número aleatorio en el indice. */
    /**Cuando Tengamos el valor imprimelo adentro de esta etiquet(Asi entendi el innerHTML) */
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length-1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}


function iniciarPelea(){
    if (ataqueJugador.length === 5) {
        combate()
    }
}


function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}


function combate() {
    for (let index=0; index<ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador      
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}


function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}


function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}


function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}


function reiniciarJuego() {
    location.reload()
}


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function pintarCanvas() {
    

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height); // Asegúrate de que 'height' esté correcto
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    // Verifica si la imagen está completamente cargada
    if (mascotaJugadorObjeto.mapaFoto.complete) {
        //console.log(mascotaJugadorObjeto.mapaFoto); // Muestra la imagen en la consola
        lienzo.drawImage(
            mascotaJugadorObjeto.mapaFoto,
            mascotaJugadorObjeto.x,
            mascotaJugadorObjeto.y,
            mascotaJugadorObjeto.ancho,
            mascotaJugadorObjeto.alto
        );
    } else {
        console.log("La imagen no está completamente cargada.");
    }
}


function moveR(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moveL(){
    mascotaJugadorObjeto.velocidadX = - 5
}

function moveD(){
    mascotaJugadorObjeto.velocidadY = 5
}

function moveU(){
    mascotaJugadorObjeto.velocidadY = -5
}

function stopMove(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function pressButton(event){
    //console.log(event.key);
}

function pressButton(event){
    switch (event.key) {
        case 'ArrowUp':
            moveU()
            break
        case 'ArrowDown':
            moveD()
            break
        case 'ArrowLeft':
            moveL()
            break
        case 'ArrowRight':
            moveR()
            break
        default:
            break;
    }
}

function dropButton(){
    stopMove()
}

function iniciarMapa(){
    //Hacer mapamas grande
    mapa.width = 320
    mapa.height = 240
    
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)

    // Inicializar el mapa


    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', pressButton)
    window.addEventListener('keyup', dropButton)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

window.addEventListener('load', iniciarJuego)
