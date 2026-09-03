# Prompt para Claude Code — Corregir líneas/costuras en el retrato de ella en mobile

```
En el celular (probado desde un iPhone), el retrato de ella se ve con unas líneas horizontales raras cruzando toda la imagen, como costuras entre filas de píxeles. El de él tiene el mismo problema pero se nota mucho menos porque tiene zonas de color más uniformes.

La causa: en el último cambio de mobile, dejé el tamaño de los retratos en mobile como `1.3` (un número decimal). Como este motor de pixel art dibuja cada "pixelito" como una sombra (box-shadow) individual en la posición `x * pixelSize`, un tamaño no entero hace que Safari/WebKit en iPhone redondee cada sombra por separado al renderizar, dejando esas líneas/costuras visibles entre filas — sobre todo en dibujos con muchos cambios de color fila por fila, como el pelo de ella. La solución es usar un número entero.

Busca en js/scenes.js, dentro de `buildSceneArt()`:

    const portraitPx = isMobile ? 1.3 : 2;

Y reemplázalo por:

    const portraitPx = isMobile ? 1 : 2;

No cambies nada más de esa función ni de ningún otro archivo — es únicamente este número.

Después de guardar, subí el cambio (`git add -A && git commit -m "fix: lineas en retrato mobile" && git push`) y probá de nuevo el link en el celular real (no alcanza con el modo mobile de las herramientas de desarrollador en escritorio, porque este bug es específico del motor de renderizado de Safari/iOS) — confirmá que ya no aparecen las líneas en ninguno de los dos retratos, y que los dos siguen entrando uno al lado del otro sin cortarse.
```
