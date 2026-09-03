/* =========================================================================
   pixelart.js
   -------------------------------------------------------------------------
   Motor genérico de pixel art 100% en código (sin imágenes externas).

   Técnica: cada sprite es una matriz de filas de texto donde cada carácter
   representa un color de una paleta ('.' o ' ' = transparente). Se dibuja
   con UN solo <div> por sprite usando box-shadow apilados (cada "pixel" es
   una sombra sin blur en la posición x*size, y*size). Esto es liviano y no
   requiere canvas ni imágenes.
   ========================================================================= */

window.PixelArt = (function () {
  /**
   * Dibuja un sprite dentro de un contenedor.
   * @param {HTMLElement} container - contenedor (se le pondrá position:relative)
   * @param {string[]} rows - filas del sprite, cada char = clave de paleta
   * @param {Object<string,string>} palette - mapa clave -> color css
   * @param {number} pixelSize - tamaño en px de cada "pixel"
   */
  function render(container, rows, palette, pixelSize) {
    container.innerHTML = "";
    container.classList.add("pixel-sprite");
    container.style.position = "relative";

    const shadows = [];
    let maxCols = 0;

    rows.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const ch = row[x];
        if (ch === " " || ch === "." || ch === undefined) continue;
        const color = palette[ch];
        if (!color) continue;
        shadows.push(`${x * pixelSize}px ${y * pixelSize}px 0 0 ${color}`);
        if (x + 1 > maxCols) maxCols = x + 1;
      }
    });

    const dot = document.createElement("div");
    dot.style.position = "absolute";
    dot.style.top = "0";
    dot.style.left = "0";
    dot.style.width = pixelSize + "px";
    dot.style.height = pixelSize + "px";
    dot.style.background = "transparent";
    dot.style.boxShadow = shadows.join(", ");
    container.appendChild(dot);

    container.style.width = maxCols * pixelSize + "px";
    container.style.height = rows.length * pixelSize + "px";
  }

  return { render };
})();
