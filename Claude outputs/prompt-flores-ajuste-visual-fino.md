# Prompt para Claude Code — Ajuste fino de la rosa y el lirio en "Elige tu favorita"

```
Quiero un ajuste puramente visual/estético en la escena "Elige tu favorita", sin tocar el pixel art de las flores ni su fidelidad de color. Dos cambios chiquitos, solo con CSS (transform), para que se vean mejor balanceadas visualmente aunque no queden matemáticamente centradas:

1. La rosa: hacerla MUY levemente más pequeña (un 5% aprox, casi imperceptible).
2. La rosa y el lirio (no el tulipán): moverlos unos pocos píxeles hacia la derecha. Solo el dibujo de la flor se corre, la etiqueta de texto de abajo ("Rosas" / "Lirios") se queda donde está.

Busca en styles.css este bloque:

    .flower-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      background: none;
      border: none;
      margin: 0;
      padding: 6px;
      border-radius: 10px;
      cursor: pointer;
      --tilt: 0deg;
    }
    .flower-option[data-flower="tulip"] { --tilt: -6deg; }
    .flower-option[data-flower="rose"] { --tilt: 6deg; }
    .flower-label { font-family: var(--font-body); font-weight: 700; font-size: 0.85rem; color: var(--ink-soft); transition: color 0.18s ease; }
    .flower-option.flower-selected .flower-label { color: var(--wine); }
    .flower-option .sprite-box { transform: rotate(var(--tilt)); transition: transform 0.18s ease, filter 0.18s ease; }
    .flower-option:hover .sprite-box, .flower-option:focus-visible .sprite-box { transform: rotate(var(--tilt)) translateY(-8px) scale(1.1); filter: drop-shadow(3px 3px 0 var(--shadow-hard)); }
    .flower-option.flower-selected .sprite-box { transform: rotate(var(--tilt)) translateY(-8px) scale(1.12); filter: drop-shadow(3px 3px 0 var(--coral)); }
    .flower-option:focus-visible { outline: 3px dashed var(--coral); outline-offset: 4px; }

Y reemplázalo por esto (agrega las variables `--shift` y `--scale` con sus valores por defecto en `.flower-option`, las overrides para rosa/lirio, y mete esas dos variables dentro de los 3 transforms del `.sprite-box` sin quitar nada de lo que ya tenían):

    .flower-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      background: none;
      border: none;
      margin: 0;
      padding: 6px;
      border-radius: 10px;
      cursor: pointer;
      --tilt: 0deg;
      --shift: 0px;
      --scale: 1;
    }
    .flower-option[data-flower="tulip"] { --tilt: -6deg; }
    .flower-option[data-flower="rose"] { --tilt: 6deg; --shift: 6px; --scale: 0.95; }
    .flower-option[data-flower="pink"] { --shift: 6px; }
    .flower-label { font-family: var(--font-body); font-weight: 700; font-size: 0.85rem; color: var(--ink-soft); transition: color 0.18s ease; }
    .flower-option.flower-selected .flower-label { color: var(--wine); }
    .flower-option .sprite-box { transform: translateX(var(--shift)) rotate(var(--tilt)) scale(var(--scale)); transition: transform 0.18s ease, filter 0.18s ease; }
    .flower-option:hover .sprite-box, .flower-option:focus-visible .sprite-box { transform: translateX(var(--shift)) rotate(var(--tilt)) scale(var(--scale)) translateY(-8px) scale(1.1); filter: drop-shadow(3px 3px 0 var(--shadow-hard)); }
    .flower-option.flower-selected .sprite-box { transform: translateX(var(--shift)) rotate(var(--tilt)) scale(var(--scale)) translateY(-8px) scale(1.12); filter: drop-shadow(3px 3px 0 var(--coral)); }
    .flower-option:focus-visible { outline: 3px dashed var(--coral); outline-offset: 4px; }

Nota: `data-flower="pink"` es el botón del lirio (así está nombrado en el HTML aunque diga "Lirios" en pantalla) — no lo confundas con otro elemento.

No toques nada de js/sprites.js ni js/scenes.js, ni el pixelSize de ninguna flor — este cambio es 100% visual vía CSS transform, no afecta los datos del pixel art.

Después de guardar, revisa en el navegador la escena "Elige tu favorita" y confirma que la rosa se vea un poquito más chica, y que tanto la rosa como el lirio estén corridos levemente hacia la derecha respecto a su posición anterior, sin que las etiquetas de texto ("Rosas", "Lirios") se muevan de lugar, y sin que se pierda la animación de hover/selección de cada flor.
```
