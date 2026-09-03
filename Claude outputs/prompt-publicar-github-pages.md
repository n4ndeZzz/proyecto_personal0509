# Prompt para Claude Code — Publicar el sitio en GitHub Pages (conseguir un link público)

```
Quiero publicar este proyecto (romantic-gift) en GitHub Pages para conseguir un link público que pueda mandarle a otra persona. Es un sitio 100% estático (HTML/CSS/JS sin build ni backend), así que no necesita configuración especial, solo subirlo a un repositorio de GitHub y activar Pages.

Hazlo en este orden:

## 1. Revisa qué herramientas hay disponibles

Corre en la terminal:

    git --version
    gh --version

Si `gh` (GitHub CLI) está instalado, sigue la Opción A (todo por terminal, sin tocar el navegador salvo para iniciar sesión si hace falta). Si `gh` NO está instalado, sigue la Opción B (con algunos pasos manuales en github.com).

## Opción A — con GitHub CLI (`gh`)

1. Si la carpeta todavía no es un repositorio git, inicialízala y haz el primer commit:

       git init
       git add -A
       git commit -m "Primer commit: regalo romántico"

   (Si ya es un repo git con commits, solo asegúrate de que todo esté agregado y commiteado: `git add -A && git commit -m "actualización"` — si no hay cambios pendientes, este paso no hace nada y está bien.)

2. Verifica que la sesión de `gh` esté iniciada:

       gh auth status

   Si dice que no hay sesión iniciada, corre `gh auth login` y sigue las instrucciones (te va a pedir abrir una URL en el navegador y pegar un código, o autorizar directamente) — avísame cuando lo hayas completado para seguir.

3. Crea el repositorio en GitHub y sube el código en un solo paso (usa el nombre `romantic-gift`; puedes cambiarlo por otro si prefieres que el nombre del repo no sea tan obvio, ya que GitHub Pages requiere que el repositorio sea público a menos que tengas un plan de pago):

       gh repo create romantic-gift --public --source=. --remote=origin --push

4. Activa GitHub Pages apuntando a la rama `main`, carpeta raíz, usando la API (sin tocar el navegador):

       REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
       gh api repos/$REPO/pages -X POST -f "source[branch]=main" -f "source[path]=/"

5. Espera 1-2 minutos (el primer despliegue tarda un poco) y luego muéstrame la URL final corriendo:

       REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
       gh api repos/$REPO/pages -q .html_url

   Esa URL (algo como `https://TUUSUARIO.github.io/romantic-gift/`) es el link que le puedo pasar a la otra persona.

## Opción B — sin GitHub CLI (con algunos pasos en el navegador)

1. Inicializa git y haz el commit si hace falta (igual que el paso 1 de la Opción A).
2. Dile al usuario que cree un repositorio nuevo, público, vacío (sin README) en https://github.com/new — con el nombre que prefiera (por ejemplo `romantic-gift`).
3. Una vez creado, conecta el repo local y sube el código (reemplaza TUUSUARIO y NOMBREREPO por los reales que dio el usuario):

       git remote add origin https://github.com/TUUSUARIO/NOMBREREPO.git
       git branch -M main
       git push -u origin main

4. Dile al usuario que vaya a la pestaña "Settings" del repo en github.com → sección "Pages" (menú izquierdo) → en "Source" elija la rama `main` y la carpeta `/ (root)` → clic en "Save".
5. A los 1-2 minutos, GitHub le va a mostrar ahí mismo la URL pública (algo como `https://TUUSUARIO.github.io/NOMBREREPO/`).

## Nota importante para avisarle al usuario (no es parte del código, pero coméntaselo al terminar)

GitHub Pages en el plan gratuito requiere que el repositorio sea PÚBLICO — cualquiera con el link del repositorio podría ver el código fuente (aunque el contenido de la página sigue protegido por la contraseña de la app). El sitio publicado tampoco aparece en buscadores ni es fácil de encontrar sin el link exacto, pero técnicamente no es privado. Si prefiere que el código no sea visible para nadie, la alternativa sería Netlify o Vercel (ahí el sitio publicado también es público, pero el repositorio de código puede quedar privado sin pagar nada extra).

Para futuras actualizaciones del sitio, basta con:

    git add -A
    git commit -m "descripción del cambio"
    git push

y GitHub Pages se actualiza solo en 1-2 minutos.
```
