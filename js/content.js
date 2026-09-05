/* =========================================================================
   content.js
   -------------------------------------------------------------------------
   TODOS los textos del sitio viven aquí, en un solo lugar, para poder
   reemplazarlos fácilmente más adelante sin tocar el resto del código.
   ========================================================================= */

window.CONTENT = {

  // ---- Pantalla de login -------------------------------------------------
  login: {
    title: "Acceso privado",
    subtitle: "Escribe la contraseña para continuar",
    placeholder: "contraseña",
    button: "Entrar",
    errorMessage: "Intenta de nuevo 💗",
    hintLabel: "¡PISTA!",
    hintText: "La fecha de hoy es muy especial (DD/MM)",
  },

  // ---- Escenas narrativas (orden = orden de aparición) -------------------
  scenes: [
    {
      id: "welcome",
      title: "Si pusiste bien la contraseña significa que para ti hoy es una fecha especial también",
      text: `La verdad llevo varios días emocionado diseñando estoy aquí escribiendo esta carta lo que más se me pasa por la mente es lo mucho que quiero que la leas y que estemos pasando el momento que tengo en mente.

Pero antes de que leas algo que escribí para ti con una pregunta muy importante`,
      nextLabel: "Siguiente →",
    },
    {
      id: "cats",
      title: "Atrasé un poquito los planes",
      text: `Se supone que el plan de hoy debería de ser disfrutar un ratico del hotel y luego ir a conocer bien el pueblo para comer yyyyyyyy quedamos en tomar una cantidad considerable de polas en un lugar así bien pueblerino.

Pero planeé algo, para ver qué es, escríbeme cuando termines de leer esta parte y voy a mandar mi ubicación para que vayas. No vayas a pasar a la siguiente tarjetica todavía, cuando llegues sigues esta dinámica.`,
      nextLabel: "Siguiente →",
    },
    {
      id: "lilies",
      title: "Elige tu favorita",
      text: "Toca la que más te guste🌸",
      nextLabel: "Siguiente →",
      selectMessage: "Abre la canasta del pícnic para ver el otro detallito",
    },
    {
      id: "couple",
      title: "Ya se está acabando este jueguito",
      text: `Esta es la última tarjeta que hay en la paginita y espero que te hayas entretenido un poco con la dinámica que me inventé para decirte la razón por la cual hoy es una fecha muy especial.

Yo me imagino que igual ya sabes que, si tengo una pregunta para hacerte, sabes cuál es, y sé que he tardado bastante en hacerla. Te pido perdón si en algún punto pareció que yo no quería algo o que no estaba poniendo de mi parte, pero la suma de unos cuantos miedos y las ganas de que todo salga bien al mismo tiempo me jugaron en contra, y espero aún estar a tiempo para formar realmente un equipo contigo.
Porque no pongo en duda un solo segundo lo que siento por ti, no pongo en duda un solo segundo el amor que siento y la forma en la que vos hacés latir mi corazón. Pero hoy lo que quiero no es solo decirte algo lindo en una carta. No quiero intentar algo y ya, no quiero que seas una opción y no quiero que yo sea solo tu primer intento.
Por eso elegí la palabra equipo. Quiero que formemos algo que no envejezca Vale, quiero que nos comprometamos a darnos lo mejor el uno al otro y a esforzarnos para que funcione, porque si hay algo que sabemos después de más de 4 años de vernos la cara es que no somos perfectos, y eso está bien. Eso, de hecho, está perfecto y quiero que sea así, porque se siente bien estar en un lugar donde te aman con tus errores, y yo estoy dispuesto a entregarme totalmente a vos, con los errores que tenés, para que me ames con los míos.
Quiero que esta carta sea para que sepas que mi corazón es totalmente tuyo y quiero poner todo de mi parte para que seamos siempre tu y yo y ya. Te lo digo desde todo mi corazón, quiero pasar los momentos lindos a tu lado y también los complicados que podamos llegar a tener. Quiero vivir con vos todas las etapas que me faltan y verte a vos hacer las tuyas, pero siempre siendo tu y yo y ya.
De verdad que veo mi vida completa contigo Vale, y si hoy te estoy diciendo esto es porque estoy decidido a dar cada parte de mí para que esto funcione toda la vida.
Esta carta es para preguntarte si quieres que hagamos ese equipo en el que seamos tu y yo y ya. O como normalmente preguntan pues ->`,
      nextLabel: "Siguiente →",
    },
  ],

  // ---- Escena del minijuego final ("¿Quieres ser mi novia?") -------------
  game: {
    title: "¿Querés que seamos novios?",
    yesLabel: "Sí 💗",
    noLabel: "No",

    // Mensajes que van quedando en el lugar donde estaba el botón "No"
    // cada vez que escapa. Se van mostrando en orden; si se acaban,
    // se repite el último.
    mensajesEscape: [
      "Q le pasa!",
      "Respetame horrible",
      "No mija",
      "No le va a dar",
      "Devuélvase pa su casa ent",
      "O nos cuadramos o nos cuadramos",
      'Aquí solo hay "sí"',
      "Ven esta hptica",
    ],
  },

  // ---- Escena final de celebración ---------------------------------------
  celebration: {
    title: "Gracias por darle voluntariamente al “Si”",
    subtitle: "Valentina te amo con toda mi vida, te juro que lo que siento por tí no se va a acabar nunca y que esto de ser novios no va a ser toda la vida nada más porque existe el matrimonio💚",
  },
};
