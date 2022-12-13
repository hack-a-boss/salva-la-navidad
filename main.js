const sky = document.querySelector("main.sky");
const item = document.querySelector("div.item");
const info = document.querySelector("p.info");

const EMOJI_LIST = ["🎅", "🤶", "🎄", "🎁", "⛄"];
const EMOJI_OK = "✨";
const EMOJI_KO = "💥";
const EMOJI_CLOUD = "☁️";

let points = 0;
let animationDuration = 10000;

//Gestión de click en el item
item.addEventListener("click", () => {
  if (EMOJI_LIST.includes(item.textContent)) {
    //Pauso la animación
    pauseAnimation();

    //Indico que el elemento se salvó
    item.textContent = EMOJI_OK;

    //Actualizo los puntos
    points = points + 1;

    //Muestro puntos en pantalla
    info.textContent = `${points} puntos`;

    //Actualizo la opacidad del item
    item.style.opacity = 0;

    //Actualizo la velocidad de la animación
    animationDuration =
      animationDuration > 1000 ? animationDuration - 200 : 1000;

    //Vuelvo a lanzar otro emoji
    setTimeout(run, 500);
  }
});

//Esta función añade una nube
function addCloud() {
  //Creo el elmento y le asigno el emoji de nube
  const cloud = document.createElement("span");
  cloud.classList.add("cloud");
  cloud.textContent = EMOJI_CLOUD;

  //Cambio el tamaño
  cloud.style.fontSize = `${20 * Math.random()}rem`;

  //Extraigo el tamaño del sky y de la cloud
  const skyDimentions = sky.getBoundingClientRect();
  const cloudDimensions = cloud.getBoundingClientRect();

  //Posiciono la cloud
  cloud.style.top = `${skyDimentions.height * Math.random()}px`;
  cloud.style.left = `${
    skyDimentions.width * Math.random() - cloudDimensions.width
  }px`;

  sky.append(cloud);
}

//Esta función es el loop principal del juego
function run() {
  //Cancelamos la animación
  cancelAnimation();

  //Añadir una nube al "sky" si tenemos puntos
  if (points) addCloud();

  //Resetear la opacidad del item
  item.style.opacity = 1;

  //Extraer ancho del elemento sky
  const skyDimentions = sky.getBoundingClientRect();
  const skyWidth = skyDimentions.width;
  const skyHeight = skyDimentions.height;

  //Asignar emoji aleatorio al item
  item.textContent = EMOJI_LIST[Math.floor(EMOJI_LIST.length * Math.random())];

  //Asignar un tamaño aleatorio al item
  item.style.fontSize = `${2 + 5 * Math.random()}rem`;

  //Extraer el ancho del item después de aplicar el tamaño de letra
  const itemDimensions = item.getBoundingClientRect();

  // Establezco la coordenada x de animación
  const x = Math.random() * skyWidth - itemDimensions.width / 2;

  //Iniciar la animación
  const animation = item.animate(
    [
      { transform: `translate(${x}px, ${skyHeight}px)` },
      { transform: `translate(${x}px, 0)` },
    ],
    {
      duration: animationDuration,
      fill: "both",
    }
  );

  animation.onfinish = endGame;
}

//Pause item animation
function pauseAnimation() {
  for (const animation of item.getAnimations()) {
    animation.pause();
  }
}

//Cancel item animation
function cancelAnimation() {
  for (const animation of item.getAnimations()) {
    animation.cancel();
  }
}

// Esta función se ejecuta al acabar la partida
function endGame() {
  item.textContent = EMOJI_KO;
  info.textContent = `Partida acabada. Salvaste ${points} emojis navideños. Recarga la página para reintentarlo.`;
}

info.textContent = `No dejes que los emojis navideños lleguen hasta arriba`;
run();
