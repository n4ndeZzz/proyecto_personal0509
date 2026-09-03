# Prompt para Claude Code — La tarjeta se "estira" al cambiar de escena

```
Grabé un video de cómo se ve el cambio entre escenas (por ejemplo de "gatitos" a "elige tu favorita") y se ve raro: la tarjeta se agranda de golpe (se pone alta) y después vuelve a su tamaño normal, en vez de ser una transición suave.

La causa: en js/scenes.js, `goNext()` llama a `hideScene(currentId)` y 120ms después a `showScene(nextId)`, pero `hideScene` recién le pone `hidden = true` a la escena vieja 380ms después de iniciar su animación de salida. Eso significa que durante unos 260ms, la escena que se está yendo (todavía sin `hidden`) y la escena nueva (ya sin `hidden`) están las DOS visibles al mismo tiempo dentro de `.scenes-frame`. Como `.scenes-frame` es un contenedor flex en columna que centra su contenido, tener dos escenas "en el flujo" al mismo tiempo hace que la tarjeta crezca para hacerles espacio a ambas apiladas, y por eso se ve ese estirón que vuelve a su tamaño apenas la vieja escena termina de ocultarse.

La solución es sacar del flujo normal a la escena que se está yendo mientras dura su animación de salida (position: absolute, superpuesta en el mismo lugar), para que dentro de ese ratito de transición la tarjeta se base únicamente en el tamaño de la escena nueva, y la vieja simplemente se desvanezca encima sin afectar la altura. Es un cambio solo de CSS, no hay que tocar scenes.js.

## styles.css

Busca:

    .scene-exit {
      animation: sceneExit 0.36s ease-in forwards;
    }

Y reemplázalo por:

    .scene-exit {
      animation: sceneExit 0.36s ease-in forwards;
      position: absolute;
      inset: 0;
      margin: 0;
      padding: 28px 22px;
      justify-content: center;
      pointer-events: none;
      z-index: 2;
    }

(el `padding: 28px 22px` ahí repite el mismo padding que ya tiene `.scenes-frame`, para que la escena saliente quede exactamente en el mismo lugar visual en el que estaba, ya que al ponerla en position:absolute dentro de `.scenes-frame` deja de heredar ese padding del contenedor; `justify-content: center` la centra verticalmente dentro de ese espacio; `pointer-events: none` evita que se pueda hacer click en botones de la escena que ya se está yendo; `z-index: 2` la deja visualmente encima de la escena nueva mientras se desvanece).

Después busca, dentro de `@media (max-width: 480px)`, este bloque:

    .scenes-frame {
      padding: 22px 14px;
      min-height: 420px;
    }

Y justo después agrégale (mismo padding que usa `.scenes-frame` en mobile, para que el `position:absolute` de arriba también quede bien alineado en pantallas chicas):

    .scene-exit {
      padding: 22px 14px;
    }

No cambies nada de js/scenes.js, ni las animaciones `sceneEnter`/`sceneExit` en sí (los keyframes de fade+slide se quedan igual, solo se saca del flujo a la escena saliente mientras se anima).

Después de guardar, revisa en el navegador varios cambios de escena seguidos (bienvenida → gatitos → elige tu favorita → pareja) y confirma que la tarjeta ya NO se agranda ni se encoge de golpe durante la transición — debe verse como un fundido suave del mismo tamaño en todo momento.
```
