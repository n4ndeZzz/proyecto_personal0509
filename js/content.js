/* =========================================================================
   content.js
   -------------------------------------------------------------------------
   TODOS los textos del sitio viven aquí, en un solo lugar, para poder
   reemplazarlos fácilmente más adelante sin tocar el resto del código.

   TODO: reemplazar todos los textos marcados como PLACEHOLDER por los
   textos definitivos cuando estén listos.
   ========================================================================= */

window.CONTENT = {

  // ---- Pantalla de login -------------------------------------------------
  login: {
    title: "Acceso privado",
    subtitle: "Escribe la contraseña para continuar",
    placeholder: "contraseña",
    button: "Entrar",
    errorMessage: "Intenta de nuevo 💗", // mensaje de error tierno
    hintLabel: "¡PISTA!",
    // TODO: reemplazar por la pista real
    hintText: "PLACEHOLDER_PISTA",
  },

  // ---- Escenas narrativas (orden = orden de aparición) -------------------
  // Cada escena tiene: id, título corto y un texto placeholder.
  scenes: [
    {
      id: "welcome",
      title: "Hola, q se dice, ttitulo uno",
      // TODO: reemplazar por el texto definitivo de bienvenida
      text: "PLACEHOLDER_Aqui la primera cartica y que tales",
      nextLabel: "Siguiente →",
    },
    {
      id: "cats",
      title: "Texto título 2",
      // TODO: reemplazar por el texto definitivo de la escena de gatitos
      text: "PLACEHOLDERc_Aqui la segunda cartica y que tales",
      nextLabel: "Siguiente →",
    },
    {
      id: "lilies",
      title: "Elige tu favorita",
      text: "Toca la que más te guste 🌸",
      nextLabel: "Siguiente →",
      selectMessage: "PLACEHOLDER_MENSAJE_FLOR_ELEGIDA",
    },
    {
      id: "couple",
      title: "tin tin tin titulo 3",
      // TODO: reemplazar por el texto definitivo de la escena de la pareja
      text: "PLACEHOLDER_ultima carta din don din don ella me vio y se orinó",
      nextLabel: "Siguiente →",
    },
  ],

  // ---- Escena del minijuego final ("¿Quieres ser mi novia?") -------------
  game: {
    // TODO: reemplazar si se quiere otro título
    title: "¿Quieres ser mi novia?",
    yesLabel: "Sí 💗",
    noLabel: "No",

    // Mensajes que van quedando en el lugar donde estaba el botón "No"
    // cada vez que escapa. Se van mostrando en orden; si se acaban,
    // se repite el último.
    // TODO: reemplazar cada PLACEHOLDER_MENSAJE_X por el mensaje definitivo
    mensajesEscape: [
      "PLACEHOLDER_MENSAJE_1",
      "PLACEHOLDER_MENSAJE_2",
      "PLACEHOLDER_MENSAJE_3",
      "PLACEHOLDER_MENSAJE_4",
      "PLACEHOLDER_MENSAJE_5",
      "PLACEHOLDER_MENSAJE_6",
      "PLACEHOLDER_MENSAJE_7",
      "PLACEHOLDER_MENSAJE_8",
    ],
  },

  // ---- Escena final de celebración ---------------------------------------
  celebration: {
    // TODO: reemplazar por el mensaje final definitivo
    title: "¡Aqui ya deberiamos ser novios! 💗",
    // TODO: reemplazar por el subtítulo final definitivo (opcional)
    subtitle: "PLACEHOLDER_SUBTITULO_FINAL",
  },
};
