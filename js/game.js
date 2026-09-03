/* =========================================================================
   game.js
   -------------------------------------------------------------------------
   Minijuego final "¿Quieres ser mi novia?". El botón "No" detecta
   proximidad del cursor/dedo (no solo hover exacto) y escapa a una posición
   aleatoria, dejando un mensaje placeholder en el lugar donde estaba.
   El botón "Sí" nunca se mueve y crece un poco cada vez que "No" escapa.
   ========================================================================= */

window.Game = (function (Sprites, CONTENT) {
  const ESCAPE_RADIUS = 95; // px: distancia a partir de la cual el botón "No" escapa
  const MAX_YES_GROWTH = 1.6; // tope de crecimiento del botón "Sí"
  const YES_GROWTH_STEP = 0.06;

  let mensajeIndex = 0;
  let escaping = false;
  let yesScale = 1;
  let initialized = false;

  function init() {
    if (initialized) return;
    initialized = true;

    const titleEl = document.getElementById("game-title");
    const yesBtn = document.getElementById("yes-btn");
    const noBtn = document.getElementById("no-btn");
    const area = document.getElementById("game-area");

    titleEl.textContent = CONTENT.game.title;
    yesBtn.textContent = CONTENT.game.yesLabel;
    noBtn.textContent = CONTENT.game.noLabel;

    centerNoButton(area, noBtn);

    // --- Detección de proximidad (mouse) ---
    area.addEventListener("mousemove", function (e) {
      const rect = area.getBoundingClientRect();
      checkProximity(area, noBtn, e.clientX - rect.left, e.clientY - rect.top, yesBtn);
    });

    // --- Detección de proximidad (touch) ---
    area.addEventListener(
      "touchstart",
      function (e) {
        handleTouch(e, area, noBtn, yesBtn);
      },
      { passive: true }
    );
    area.addEventListener(
      "touchmove",
      function (e) {
        handleTouch(e, area, noBtn, yesBtn);
      },
      { passive: true }
    );

    // Red de seguridad: si por lo que sea el click SÍ llega a registrarse
    // en el botón "No", tampoco pasa nada malo: simplemente vuelve a escapar.
    noBtn.addEventListener("click", function () {
      escapeButton(area, noBtn, yesBtn);
    });

    yesBtn.addEventListener("click", function () {
      showCelebration();
    });
  }

  function handleTouch(e, area, noBtn, yesBtn) {
    if (!e.touches || !e.touches.length) return;
    const rect = area.getBoundingClientRect();
    const touch = e.touches[0];
    checkProximity(
      area,
      noBtn,
      touch.clientX - rect.left,
      touch.clientY - rect.top,
      yesBtn
    );
  }

  function centerNoButton(area, noBtn) {
    const areaRect = area.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const x = areaRect.width / 2 - btnRect.width / 2 + 60;
    const y = areaRect.height / 2 - btnRect.height / 2 + 40;
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  }

  function checkProximity(area, noBtn, pointerX, pointerY, yesBtn) {
    if (escaping) return;

    const btnRect = noBtn.getBoundingClientRect();
    const areaRect = area.getBoundingClientRect();
    const btnCenterX = btnRect.left - areaRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top - areaRect.top + btnRect.height / 2;

    const dx = pointerX - btnCenterX;
    const dy = pointerY - btnCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ESCAPE_RADIUS) {
      escapeButton(area, noBtn, yesBtn);
    }
  }

  function escapeButton(area, noBtn, yesBtn) {
    escaping = true;

    const areaRect = area.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Deja un mensaje placeholder exactamente donde estaba el botón "No".
    dropEscapeMessage(area, noBtn.style.left, noBtn.style.top);

    // Nueva posición aleatoria dentro del contenedor.
    const padding = 12;
    const maxX = Math.max(padding, areaRect.width - btnRect.width - padding);
    const maxY = Math.max(padding, areaRect.height - btnRect.height - padding);
    const newX = padding + Math.random() * (maxX - padding);
    const newY = padding + Math.random() * (maxY - padding);

    noBtn.style.left = newX + "px";
    noBtn.style.top = newY + "px";

    // Detalle tierno: el botón "Sí" crece un poco cada vez.
    yesScale = Math.min(MAX_YES_GROWTH, yesScale + YES_GROWTH_STEP);
    yesBtn.style.transform = "scale(" + yesScale.toFixed(2) + ")";

    noBtn.classList.remove("no-btn-pop");
    void noBtn.offsetWidth;
    noBtn.classList.add("no-btn-pop");

    setTimeout(function () {
      escaping = false;
    }, 160);
  }

  function dropEscapeMessage(area, left, top) {
    const mensajes = CONTENT.game.mensajesEscape;
    const mensaje = mensajes[Math.min(mensajeIndex, mensajes.length - 1)];
    mensajeIndex++;

    const span = document.createElement("div");
    span.className = "escape-message";
    span.style.left = left;
    span.style.top = top;
    span.textContent = mensaje;
    area.appendChild(span);

    // Se desvanece solo para no saturar la pantalla en móviles pequeños.
    setTimeout(function () {
      span.classList.add("escape-message-fade");
    }, 2200);
    setTimeout(function () {
      span.remove();
    }, 3000);
  }

  function showCelebration() {
    const gameScene = document.getElementById("scene-game");
    const celebrationScene = document.getElementById("scene-celebration");

    gameScene.classList.add("scene-exit");
    setTimeout(function () {
      gameScene.hidden = true;
      celebrationScene.hidden = false;
      void celebrationScene.offsetWidth;
      celebrationScene.classList.add("scene-enter");
      buildCelebration();
    }, 380);
  }

  function buildCelebration() {
    document.getElementById("celebration-title").textContent =
      CONTENT.celebration.title;
    document.getElementById("celebration-subtitle").textContent =
      CONTENT.celebration.subtitle;

    // Misma pareja de pingüinos azul/rosado de la escena de bienvenida
    // (excepción intencional a blanco/negro, ver sprites.js).
    const isMobile = window.matchMedia("(max-width: 480px)").matches;
    Sprites.renderPenguins(document.getElementById("art-birds-pair-final"), isMobile ? 4 : 7);
    Sprites.renderCats(document.getElementById("art-cats-pair-final"), isMobile ? 4 : 6);

    spawnConfetti();
  }

  function spawnConfetti() {
    const confettiRoot = document.getElementById("confetti-root");
    confettiRoot.innerHTML = "";
    const colors = ["#e8607a", "#f6a8c4", "#f4d35e", "#fdf6ec", "#b23a52"];

    for (let i = 0; i < 36; i++) {
      const piece = document.createElement("div");
      const isHeart = i % 4 === 0;
      piece.className = "confetti-piece" + (isHeart ? " confetti-heart" : "");
      piece.style.left = Math.random() * 100 + "%";
      piece.style.animationDuration = 2.6 + Math.random() * 2.2 + "s";
      piece.style.animationDelay = Math.random() * 1.5 + "s";

      if (isHeart) {
        Sprites.renderHeart(piece, 4, colors[i % colors.length]);
      } else {
        piece.style.background = colors[i % colors.length];
      }
      confettiRoot.appendChild(piece);
    }
  }

  return { init: init };
})(window.Sprites, window.CONTENT);
