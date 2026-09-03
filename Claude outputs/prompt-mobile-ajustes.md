# Prompt para Claude Code — Ajustar el sitio para que se vea bien en mobile

```
Quiero que el sitio se vea bien en celulares. Medí matemáticamente el ancho real (en píxeles) que ocupa cada dibujo de pixel art tal cual está el código hoy, comparado contra el espacio real disponible dentro de la tarjeta en pantallas chicas (~360-430px de ancho, que es el rango de la mayoría de los celulares actuales), y encontré 3 problemas concretos de overflow (los dibujos no entran y quedan recortados o se acomodan mal):

1. **Escena "elige tu favorita"**: las 3 flores juntas (a su tamaño actual) suman casi 400px de ancho, pero dentro de la tarjeta en un celular hay más o menos 260-300px disponibles. Se recortan contra el borde de la tarjeta.
2. **Escena de la pareja**: los dos retratos + el corazón del medio suman casi 400px de ancho también, así que en la mayoría de los celulares el segundo retrato "salta" a una segunda fila en vez de quedar al lado del primero (hay un `flex-wrap` que evita que se vea cortado, pero igual se ve desacomodado).
3. **Escena de los gatitos**: el dibujo de los gatitos (273px) queda muy justo contra el espacio disponible en celulares angostos (~360px o menos) y puede recortarse un poco contra el borde.

La solución: dibujar estos sprites un poco más chicos SOLO en mobile (pantallas de hasta 480px de ancho), detectando el tamaño de pantalla con `window.matchMedia`, sin tocar nada del tamaño en escritorio. Además, voy a agregar/ajustar algunos `gap` en mobile para que todo respire mejor. Esto no cambia ningún dibujo ni paleta de colores, solo el tamaño (pixelSize) con el que se dibujan en pantallas chicas.

## 1. js/scenes.js — función `buildSceneArt()`

Busca:

    function buildSceneArt() {
      // Escena bienvenida: pareja de pingüinos (azul + rosado) como una
      // sola imagen combinada, ya apoyados entre sí.
      Sprites.renderPenguins(document.getElementById("art-birds-pair"), 7);
      Sprites.renderBranch(document.getElementById("art-branch"), 11);
      Sprites.renderHeart(document.getElementById("art-heart-welcome"), 6, "#e8607a");

      // Escena gatitos: pareja de gatitos como una sola imagen combinada,
      // con un corazón flotante arriba (igual al de la escena de bienvenida).
      Sprites.renderHeart(document.getElementById("art-heart-cats"), 6, "#e8607a");
      Sprites.renderCats(document.getElementById("art-cats-pair"), 7);

      // Escena "elige tu favorita": 3 flores distintas. Cada una usa su
      // propio pixelSize (en vez del mismo para las 3) porque el tulipán
      // ocupa muy pocas columnas de su cuadrícula original y se veía
      // chico al lado del lirio y la rosa — así las 3 quedan con un ancho
      // más parejo entre ellas (el tulipán queda algo más alto que las
      // otras dos como efecto secundario, y eso está bien: le da un aire
      // de ramo real, no de flores clonadas al mismo tamaño).
      Sprites.renderFlower(document.getElementById("art-flower-1"), "tulip", 9);
      Sprites.renderFlower(document.getElementById("art-flower-2"), "rose", 9);
      Sprites.renderFlower(document.getElementById("art-flower-3"), "pink", 9);

      // Escena pareja: los dos retratos son pixel art generado por código
      // (extraído pixel por pixel de las fotos reales), igual que el resto
      // de los sprites del sitio. Él a la izquierda, ella a la derecha.
      Sprites.renderPortrait(document.getElementById("art-portrait-el"), "el", 2);
      Sprites.renderPortrait(document.getElementById("art-portrait-ella"), "ella", 2);
      Sprites.renderHeart(document.getElementById("art-heart-couple"), 7, "#e8607a");
    }

Y reemplázalo por:

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
      const portraitPx = isMobile ? 1.3 : 2;
      Sprites.renderPortrait(document.getElementById("art-portrait-el"), "el", portraitPx);
      Sprites.renderPortrait(document.getElementById("art-portrait-ella"), "ella", portraitPx);
      Sprites.renderHeart(document.getElementById("art-heart-couple"), isMobile ? 5 : 7, "#e8607a");
    }

## 2. js/game.js — función `buildCelebration()`

Busca:

    // Misma pareja de pingüinos azul/rosado de la escena de bienvenida
    // (excepción intencional a blanco/negro, ver sprites.js).
    Sprites.renderPenguins(document.getElementById("art-birds-pair-final"), 7);
    Sprites.renderCats(document.getElementById("art-cats-pair-final"), 6);

Y reemplázalo por:

    // Misma pareja de pingüinos azul/rosado de la escena de bienvenida
    // (excepción intencional a blanco/negro, ver sprites.js).
    const isMobile = window.matchMedia("(max-width: 480px)").matches;
    Sprites.renderPenguins(document.getElementById("art-birds-pair-final"), isMobile ? 4 : 7);
    Sprites.renderCats(document.getElementById("art-cats-pair-final"), isMobile ? 4 : 6);

(en la escena de celebración final los pingüinos y gatitos van uno al lado del otro dentro de `.hug-row` — a tamaño completo en mobile tampoco entran los dos juntos, por eso también se achican solo en pantallas chicas)

## 3. styles.css — dentro de `@media (max-width: 480px)`

Busca:

    .flower-picker {
      gap: 12px;
      min-height: 170px;
    }
    .hint-card {

Y reemplázalo por (se reduce el gap de las flores, se le agrega `flex-wrap` como red de seguridad, y se agregan gaps más chicos para la fila de la pareja y la fila de la celebración final — ambas ya tienen `flex-wrap: wrap` puesto globalmente en el CSS, así que si en algún celular puntual algo no entra igual, en vez de recortarse va a saltar de forma prolija a una segunda fila en vez de cortarse contra el borde):

    .flower-picker {
      gap: 8px;
      min-height: 170px;
      flex-wrap: wrap;
    }
    .couple-row {
      gap: 6px;
    }
    .hug-row {
      gap: 8px;
    }
    .hint-card {

No cambies nada más del archivo (dejá el resto de `@media (max-width: 480px)` igual), ni ningún shape/paleta de js/sprites.js — este cambio es únicamente de tamaños (pixelSize) y espaciados (gap) para pantallas chicas.

Después de guardar, probá el sitio en el navegador con las herramientas de desarrollador en modo celular (en Chrome: F12 → ícono de celular/tablet arriba a la izquierda, o Ctrl+Shift+M) probando con un par de anchos típicos (360px, 390px y 414px), y recorré las 6 escenas (bienvenida, gatitos, elige tu favorita, pareja, minijuego, celebración final) confirmando que:
- Ninguna imagen se recorta contra el borde de la tarjeta.
- Los dos pingüinos/gatitos de la celebración final quedan uno al lado del otro (no cortados).
- Las 3 flores entran completas una al lado de la otra.
- Los dos retratos de la pareja quedan uno al lado del otro (no uno abajo del otro), con el corazón en el medio.
- En escritorio (ancho de ventana grande) todo se ve exactamente igual que antes — estos cambios son exclusivamente para pantallas de hasta 480px de ancho.
```
