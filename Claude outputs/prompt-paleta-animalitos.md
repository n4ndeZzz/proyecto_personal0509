# Prompt para Claude Code — Ajustar colores de pingüinos y gatitos a la paleta del sitio

```
Quiero afinar los colores de los pingüinos y los gatitos para que combinen mejor con la paleta general del sitio (que es toda de tonos cálidos: cremas, rosas, coral, vino y dorado — las variables --bg-cream, --pink-blush, --coral, --wine, --gold, --ink en styles.css). Son solo cambios de valores hexadecimal dentro de las paletas ya existentes en js/sprites.js, no hay que tocar ninguna forma/shape.

## 1. Contorno de los pingüinos (de negro puro al marrón-ciruela del sitio)

Busca:

    const PENGUINS_PALETTE = {
      K: "#000000",
      B: "#8ec8ee",
      P: "#f5aaae",
      W: "#f4d29c",
      N: "#df7126",
    };

Y reemplázalo por (K pasa de negro puro al mismo marrón-ciruela oscuro que usa el resto del sitio como su "negro" (--ink: #3b2b2f), y B — el celeste — se suaviza un poco hacia un azul más apagado/grisáceo para que no sea el único color frío y saturado de toda la página; P, W y N se quedan igual):

    const PENGUINS_PALETTE = {
      K: "#3b2b2f",
      B: "#a8c2de",
      P: "#f5aaae",
      W: "#f4d29c",
      N: "#df7126",
    };

## 2. Contorno y gris de los gatitos

Busca:

    const CATS_PALETTE = {
      K: "#060608",
      F: "#fcfcfc",
      C: "#e9d9cc",
      D: "#4c442f",
      T: "#a28a6e",
      G: "#c3c4bc",
      H: "#959595",
      P: "#e1c0c9",
      E: "#4487bb",
    };

Y reemplázalo por (K pasa al mismo marrón-ciruela --ink que los pingüinos y el resto del sitio; G y H — los dos tonos de gris del gatito gris — se calientan un poco hacia un gris-tostado en vez de gris neutro/frío; F, C, D, T, P y E se quedan igual, incluyendo el ojo azul que es un detalle lindo y no hace falta tocar):

    const CATS_PALETTE = {
      K: "#3b2b2f",
      F: "#fcfcfc",
      C: "#e9d9cc",
      D: "#4c442f",
      T: "#a28a6e",
      G: "#c7bfb4",
      H: "#9c9186",
      P: "#e1c0c9",
      E: "#4487bb",
    };

No cambies ninguna otra paleta (flores, retratos, candado, corazón, destello) ni ningún shape — es únicamente estos dos bloques de colores.

Después de guardar, revisa en el navegador la escena de bienvenida (pingüinos) y la de gatitos, y confirma que los contornos ahora se vean del mismo tono marrón-oscuro que el resto del sitio (tarjeta, botones, candado) en vez de negro puro, que el celeste del pingüino se vea un poco más suave/apagado, y que el gatito gris se vea con un tono más cálido sin dejar de leerse como "gris".
```
