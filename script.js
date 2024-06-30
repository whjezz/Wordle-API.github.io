let intentos=6;
let palabraSecreta = '';


window.addEventListener('load',init);


async function init() {
    await fetchRandomWord();
  }
  
  async function fetchRandomWord() {
    const API_URL =
      "https://random-word-api.herokuapp.com/word?number=1&length=5";
  
    try {
      const response = await fetch(API_URL);
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const [randomWord] = await response.json();
      palabraSecreta = randomWord.toUpperCase();
  
      console.log("Palabra secreta seleccionada:", palabraSecreta);
    } catch (error) {
      console.error("Error al obtener la palabra de la API:", error);
  
      palabraSecreta = getRandomFallbackWord();
      console.log("Palabra secreta seleccionada (fallback):", palabraSecreta);
    } finally {
      enableGuessButton();
    }
  }



function getRandomFallbackWord() {
    const palabras = ['PARED', 'PERRO', 'EXTRA', 'MIEDO', 'RUEDA', 'DEDOS', 'LLAVE', 'NUBES', 'OVEJA'];
    let palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];
    return palabraAleatoria;
}



function enableGuessButton(){
    const button = document.getElementById ("guess-button");
    button.disabled = false;
}



const button = document.getElementById("guess-button") 
button.addEventListener("click",intentar);



function intentar() {
    const INTENTO = leerIntento().toUpperCase();
    if(INTENTO.length !==5){
        alert ("Debes ingresar una palabra de 5 letras")
        return;
    }
    const GRID = document.getElementById("grid");
    const ROW= document.createElement('div');
    ROW.className = 'row';
    
    for (let i=0; i< palabraSecreta.length; i++){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        SPAN.innerHTML = INTENTO [i]|| '';
    
   
        if(INTENTO[i]===palabraSecreta[i]){
            SPAN.style.backgroundColor = '#79b851';
        } else if (palabraSecreta.includes(INTENTO[i])){
            SPAN.style.backgroundColor ='#f3c337';
        } else{
            SPAN.style.backgroundColor = '#a4aec4';
        }
        ROW.appendChild(SPAN);
    }

    GRID.appendChild(ROW)

    intentos--;

    if(INTENTO === palabraSecreta){
        terminar ("<h1>¡GANASTE! ૮₍ ´ ꒳ `₎ა </h1>");
    }

    if (intentos === 0){
        terminar("<h1>¡PERDISTE!૮ ◞ ﻌ ◟ ა </h1>");
        const INPUT = document.getElementById("guess-input");
        const BOTON = document.getElementById("guess-button");
        INPUT.disabled=true;
        BOTON.disabled=true;
    }
}


function leerIntento(){
    let input = document.getElementById("guess-input");
    let intento = input.value.trim();
    intento = intento.toUpperCase();
    return intento;
}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML=mensaje;
}


