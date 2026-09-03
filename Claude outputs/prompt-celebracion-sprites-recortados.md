# Prompt para Claude Code — Los pingüinos y gatitos de la pantalla final se recortan

```
En la última pantalla (la de celebración, "¡Aquí ya deberíamos ser novios!"), los dos dibujos (pingüinos y gatitos) se ven recortados/no caben bien dentro de la tarjeta. Ya medí las cosas: en js/game.js, la función buildCelebration() dibuja los pingüinos con pixelSize 8 (ancho real ≈240px) y los gatitos con pixelSize 7 (ancho real ≈273px), y con el gap de 14px entre ellos eso da un ancho total de ≈527px — más ancho que el espacio disponible dentro de la tarjeta (la tarjeta mide como máximo 520px y le resta su padding, dejando bastante menos de 527px libres). Como `.scenes-frame` tiene overflow:hidden, la parte que no cabe se recorta en vez de mostrarse.

Hay que achicar un poco esos dos dibujos SOLO en esta pantalla final (los pingüinos y gatitos de las escenas 1 y 2 no se tocan, siguen igual) y además agregar un ajuste de seguridad en el CSS para que si algún día no cupieran, se acomoden en dos filas en vez de recortarse.

## 1. js/game.js

Busca dentro de `buildCelebration()`:

    Sprites.renderPenguins(document.getElementById("art-birds-pair-final"), 8);
    Sprites.renderCats(document.getElementById("art-cats-pair-final"), 7);

Y cámbialo a (pingüinos un poco más chicos, gatitos también, para que las dos figuras juntas quepan cómodas dentro de la tarjeta):

    Sprites.renderPenguins(document.getElementById("art-birds-pair-final"), 7);
    Sprites.renderCats(document.getElementById("art-cats-pair-final"), 6);

## 2. styles.css

Busca:

    .hug-row {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 14px;
    }

Y agrégale `flex-wrap: wrap` (esto es solo una red de seguridad: en pantallas muy angostas, si algún día no cupieran los dos dibujos uno al lado del otro, en vez de recortarse pasan a acomodarse uno debajo del otro, centrados):

    .hug-row {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 14px;
      flex-wrap: wrap;
    }

No cambies `.couple-row` (comparte la clase pero no tiene este problema), ni las llamadas a `Sprites.renderPenguins`/`Sprites.renderCats` en js/scenes.js (esas son las de las escenas 1 y 2, que se ven bien y no hay que tocarlas).

Después de guardar, revisa en el navegador la pantalla final (tienes que pasar el minijuego "¿Quieres ser mi novia?" para llegar ahí) y confirma que ahora los pingüinos y los gatitos se ven completos dentro de la tarjeta, sin ningún borde cortado.
```
