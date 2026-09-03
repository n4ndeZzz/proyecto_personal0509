# Prompt para Claude Code — Agregar corazón flotante en la escena de los gatitos

```
Quiero agregar un corazón flotante arriba de los gatitos, igual al que ya existe en la escena de bienvenida arriba de los pingüinos (mismo tamaño, mismo color, misma animación). Como los dos gatitos son un solo dibujo fusionado (no son dos sprites separados como en la pareja), el corazón va arriba de los dos, centrado, no "entre" ellos.

## 1. index.html

Busca la escena de los gatitos:

    <!-- Escena 2: gatitos -->
    <section id="scene-cats" class="scene" hidden>
      <div class="cats-row">
        <div id="art-cats-pair" class="sprite-box" aria-hidden="true"></div>
      </div>
      <h2 class="scene-title pixel-title"></h2>
      <p class="scene-text soft-text"></p>
      <button class="pixel-btn next-btn"></button>
    </section>

Y agrégale un div de corazón antes de `.cats-row`, con la misma clase `heart-above` que usa el de la escena de bienvenida:

    <!-- Escena 2: gatitos -->
    <section id="scene-cats" class="scene" hidden>
      <div id="art-heart-cats" class="sprite-box heart-above" aria-hidden="true"></div>
      <div class="cats-row">
        <div id="art-cats-pair" class="sprite-box" aria-hidden="true"></div>
      </div>
      <h2 class="scene-title pixel-title"></h2>
      <p class="scene-text soft-text"></p>
      <button class="pixel-btn next-btn"></button>
    </section>

## 2. js/scenes.js

Busca en `buildSceneArt()`:

    // Escena gatitos: pareja de gatitos como una sola imagen combinada.
    Sprites.renderCats(document.getElementById("art-cats-pair"), 7);

Y agrégale el corazón (mismo pixelSize 6 y mismo color rosa "#e8607a" que usa el corazón de la escena de bienvenida):

    // Escena gatitos: pareja de gatitos como una sola imagen combinada,
    // con un corazón flotante arriba (igual al de la escena de bienvenida).
    Sprites.renderHeart(document.getElementById("art-heart-cats"), 6, "#e8607a");
    Sprites.renderCats(document.getElementById("art-cats-pair"), 7);

No hace falta tocar styles.css — `.heart-above` y su animación `gentleBob` ya existen y se van a aplicar solos a este nuevo corazón.

Después de guardar, revisa en el navegador que la escena de los gatitos ahora tenga un corazón flotando arriba de ellos, con la misma animación suave de "flotar" que el de la escena de bienvenida.
```
