/* =========================================================================
   login.js
   -------------------------------------------------------------------------
   Pantalla de acceso. Validación 100% en front-end (regalo personal, no
   necesita seguridad real). Usa sessionStorage para no volver a pedir la
   contraseña durante la misma sesión de pestaña/navegador.
   ========================================================================= */

window.Login = (function (Sprites, CONTENT) {
  // TODO: si algún día se quiere cambiar la contraseña, editar aquí.
  const CORRECT_PASSWORD = "0509";
  const SESSION_KEY = "romanticGiftUnlocked";

  function isUnlocked() {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  }

  function markUnlocked() {
    sessionStorage.setItem(SESSION_KEY, "true");
  }

  function init(onSuccess) {
    const loginScreen = document.getElementById("login-screen");
    const appRoot = document.getElementById("app");
    const form = document.getElementById("login-form");
    const input = document.getElementById("password-input");
    const errorMsg = document.getElementById("login-error");
    const lockContainer = document.getElementById("lock-sprite");
    const titleEl = document.getElementById("login-title");
    const subtitleEl = document.getElementById("login-subtitle");
    const buttonEl = document.getElementById("login-button");

    const ATTEMPTS_FOR_HINT = 3;
    let failedAttempts = 0;

    const hintCard = document.getElementById("hint-card");
    const hintLabelEl = document.getElementById("hint-card-label");
    const hintTextEl = document.getElementById("hint-card-text");

    // Textos desde content.js
    titleEl.textContent = CONTENT.login.title;
    subtitleEl.textContent = CONTENT.login.subtitle;
    input.placeholder = CONTENT.login.placeholder;
    buttonEl.textContent = CONTENT.login.button;
    errorMsg.textContent = CONTENT.login.errorMessage;
    hintLabelEl.textContent = CONTENT.login.hintLabel;
    hintTextEl.textContent = CONTENT.login.hintText;

    hintCard.addEventListener("click", function () {
      const isOpen = hintCard.classList.toggle("hint-open");
      hintLabelEl.classList.toggle("hidden", isOpen);
      hintTextEl.classList.toggle("hidden", !isOpen);
    });

    Sprites.renderLock(lockContainer, 9);

    // Si ya se desbloqueó en esta sesión, saltar directo a la app.
    if (isUnlocked()) {
      loginScreen.hidden = true;
      appRoot.hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
      onSuccess();
      return;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const value = input.value.trim();

      if (value === CORRECT_PASSWORD) {
        markUnlocked();
        transitionToApp(loginScreen, appRoot, onSuccess);
      } else {
        showError(loginScreen, errorMsg, input);
        failedAttempts++;
        if (failedAttempts === ATTEMPTS_FOR_HINT) {
          revealHint(hintCard);
        }
      }
    });
  }

  function showError(loginScreen, errorMsg, input) {
    errorMsg.classList.remove("hidden");
    loginScreen.classList.remove("shake");
    // Forzar reflow para poder re-disparar la animación de shake.
    void loginScreen.offsetWidth;
    loginScreen.classList.add("shake");
    input.value = "";
    input.focus();
  }

  function revealHint(hintCard) {
    hintCard.classList.remove("hidden");
    void hintCard.offsetWidth; // forzar reflow para que la transición se dispare
    hintCard.classList.add("hint-visible");
  }

  function transitionToApp(loginScreen, appRoot, onSuccess) {
    // Efecto tipo "scanline" retro + fundido.
    loginScreen.classList.add("scanline-wipe");
    setTimeout(function () {
      loginScreen.hidden = true;
      appRoot.hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
      appRoot.classList.add("fade-in");
      onSuccess();
    }, 550);
  }

  return { init: init };
})(window.Sprites, window.CONTENT);
