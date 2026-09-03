/* =========================================================================
   scenes.js
   -------------------------------------------------------------------------
   Controla la navegación entre las escenas narrativas mediante el botón
   "Siguiente →", con una transición de fundido + slight slide entre cada
   una. Al terminar la última escena narrativa, entra a la escena del
   minijuego (Game.init()).
   ========================================================================= */

window.Scenes = (function (Sprites, CONTENT, Game) {
  const ORDER = ["welcome", "cats", "lilies", "couple"]; // ids en CONTENT.scenes
  let currentIndex = 0;
  let gameStarted = false;

  function buildSceneArt() {
    const isMobile = window.matchMedia("(max-width: 480px)").matches;

    // Escena bienvenida: pareja de pingüinos (azul + rosado) como una
    // sola imagen combinada, ya apoyados entre sí.
    Sprites.renderPenguins(document.getElementById("art-birds-pair"), 7);
    Sprites.renderBranch(document.getElementById("art-branch"), 11);
    Sprites.renderHeart(document.getElementById("art-heart-welcome"), 6, "#e8607a");

    // Escena gatitos: pareja de gatitos como una sola imagen combinada,
    // con un corazón flotante arriba (igual al de la escena de bienvenida).
    // En mobile se dibuja más chico (5 en vez de 7): a tamaño completo
    // (273px) queda muy justo o se recorta contra el borde de la tarjeta
    // en celulares angostos.
    Sprites.renderHeart(document.getElementById("art-heart-cats"), 6, "#e8607a");
    Sprites.renderCats(document.getElementById("art-cats-pair"), isMobile ? 5 : 7);

    // Escena "elige tu favorita": 3 flores distintas. Cada una usa su
    // propio pixelSize (en vez del mismo para las 3) porque el tulipán
    // ocupa muy pocas columnas de su cuadrícula original y se veía
    // chico al lado del lirio y la rosa — así las 3 quedan con un ancho
    // más parejo entre ellas (el tulipán queda algo más alto que las
    // otras dos como efecto secundario, y eso está bien: le da un aire
    // de ramo real, no de flores clonadas al mismo tamaño).
    // En mobile las 3 juntas a tamaño completo suman casi 400px de
    // ancho, más de lo que entra en la tarjeta en un celular — por eso
    // en mobile se dibujan más chicas (6 en vez de 9).
    const flowerPx = isMobile ? 6 : 9;
    Sprites.renderFlower(document.getElementById("art-flower-1"), "tulip", flowerPx);
    Sprites.renderFlower(document.getElementById("art-flower-2"), "rose", flowerPx);
    Sprites.renderFlower(document.getElementById("art-flower-3"), "pink", flowerPx);

    // Escena pareja: los dos retratos son pixel art generado por código
    // (extraído pixel por pixel de las fotos reales), igual que el resto
    // de los sprites del sitio. Él a la izquierda, ella a la derecha.
    // En mobile se dibujan más chicos (1.3 en vez de 2): a tamaño
    // completo, los dos retratos + el corazón del medio suman casi
    // 400px de ancho y no entran uno al lado del otro en la mayoría de
    // los celulares (el segundo retrato termina saltando a otra fila).
    const portraitPx = isMobile ? 1 : 2;
    Sprites.renderPortrait(document.getElementById("art-portrait-el"), "el", portraitPx);
    Sprites.renderPortrait(document.getElementById("art-portrait-ella"), "ella", portraitPx);
    Sprites.renderHeart(document.getElementById("art-heart-couple"), isMobile ? 5 : 7, "#e8607a");
  }

  function fillText() {
    CONTENT.scenes.forEach(function (scene) {
      const titleEl = document.querySelector(
        '#scene-' + scene.id + " .scene-title"
      );
      const textEl = document.querySelector('#scene-' + scene.id + " .scene-text");
      const btnEl = document.querySelector('#scene-' + scene.id + " .next-btn");
      if (titleEl) titleEl.textContent = scene.title;
      if (textEl) textEl.textContent = scene.text;
      if (btnEl) btnEl.textContent = scene.nextLabel;
    });
  }

  function getSceneEl(id) {
    return document.getElementById("scene-" + id);
  }

  function showScene(id) {
    const el = getSceneEl(id);
    el.hidden = false;
    // Forzar reflow para que la animación de entrada se re-dispare siempre.
    void el.offsetWidth;
    el.classList.add("scene-enter");
    el.classList.remove("scene-exit");
  }

  function hideScene(id) {
    const el = getSceneEl(id);
    el.classList.add("scene-exit");
    el.classList.remove("scene-enter");
    setTimeout(function () {
      el.hidden = true;
    }, 380);
  }

  function goNext() {
    const currentId = ORDER[currentIndex];
    hideScene(currentId);

    currentIndex++;

    if (currentIndex < ORDER.length) {
      const nextId = ORDER[currentIndex];
      setTimeout(function () {
        showScene(nextId);
      }, 120);
    } else {
      // Se acabaron las escenas narrativas: pasa al minijuego.
      setTimeout(function () {
        showScene("game");
        if (!gameStarted) {
          gameStarted = true;
          Game.init();
        }
      }, 120);
    }
  }

  function attachButtons() {
    ORDER.forEach(function (id) {
      const btn = document.querySelector('#scene-' + id + " .next-btn");
      if (btn) btn.addEventListener("click", goNext);
    });
  }

  function setupFlowerPicker() {
    const scene = document.getElementById("scene-lilies");
    if (!scene) return;
    const options = scene.querySelectorAll(".flower-option");
    const messageEl = scene.querySelector(".scene-text");
    const nextBtn = scene.querySelector(".next-btn");
    const sceneData = CONTENT.scenes.find(function (s) { return s.id === "lilies"; });

    options.forEach(function (btn) {
      btn.addEventListener("click", function () {
        options.forEach(function (b) { b.classList.remove("flower-selected"); });
        btn.classList.add("flower-selected");
        if (messageEl && sceneData) messageEl.textContent = sceneData.selectMessage;
        if (nextBtn) nextBtn.classList.remove("hidden");
      });
    });
  }

  function init() {
    fillText();
    buildSceneArt();
    attachButtons();
    setupFlowerPicker();
    showScene(ORDER[0]);
  }

  return { init: init };
})(window.Sprites, window.CONTENT, window.Game);
