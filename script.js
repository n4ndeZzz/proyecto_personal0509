/* =========================================================================
   script.js
   -------------------------------------------------------------------------
   Punto de entrada: inicia el fondo de corazones flotantes y el login.
   Cuando el login tiene éxito, arranca la secuencia de escenas.
   ========================================================================= */

(function (Sprites, Login, Scenes) {
  function spawnFloatingHearts() {
    const root = document.getElementById("floating-hearts-bg");
    if (!root) return;
    const colors = ["#e8607a", "#f6a8c4", "#eec9d8"];
    const COUNT = 16;

    for (let i = 0; i < COUNT; i++) {
      const wrap = document.createElement("div");
      wrap.className = "floating-heart";
      wrap.style.left = Math.random() * 100 + "%";
      wrap.style.animationDuration = 9 + Math.random() * 8 + "s";
      wrap.style.animationDelay = Math.random() * 10 + "s";
      wrap.style.opacity = (0.35 + Math.random() * 0.4).toFixed(2);

      const inner = document.createElement("div");
      Sprites.renderHeart(inner, 4 + Math.round(Math.random() * 2), colors[i % colors.length]);
      wrap.appendChild(inner);
      root.appendChild(wrap);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    spawnFloatingHearts();
    Login.init(function onLoginSuccess() {
      Scenes.init();
    });
  });
})(window.Sprites, window.Login, window.Scenes);
