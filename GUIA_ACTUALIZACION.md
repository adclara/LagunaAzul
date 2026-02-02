# Guía de Actualización Crítica

He realizado mejoras importantes en el sistema. Para que funcionen, debes actualizar el código en Google Apps Script.

## 1. Actualizar el Backend (Google Apps Script)
Esta actualización incluye la configuración de los correos y la protección estricta contra reservas dobles.

1.  Ve a tu proyecto en [script.google.com](https://script.google.com).
2.  Borra **todo** el código actual de `Code.gs`.
3.  Copia y pega el **nuevo código** que está en el archivo `Code.gs` de tu carpeta `CalendarApp` en tu ordenador.
4.  **IMPORTANTE**: Asegúrate de poner tu `CALENDAR_ID` en la línea 7.
5.  Haz clic en el icono de **Guardar**.
6.  **¡PASO CRÍTICO!**: Debes crear una NUEVA implementación para que los cambios surtan efecto.
    -   Clic en **Implementar** > **Gestionar implementaciones**.
    -   Clic en el icono de **Lápiz** (Editar) arriba a la derecha O crear nueva.
    -   Selecciona versión: **Nueva versión**.
    -   Clic en **Implementar**.
    -   (Si creas una nueva desde cero, asegúrate de actualizar la URL en `index.html`, pero si actualizas la versión existente, la URL se mantiene).

## 2. Verificar Imágenes
He organizado las imágenes en la carpeta `assets` dentro de `CalendarApp`.
-   `assets/exterior.jpg`
-   `assets/interior.png`
-   `assets/pool.png`

Asegúrate de subir la carpeta `assets` completa junto con tu `index.html` cuando publiques la web (en GitHub Pages o Netlify).

## 3. Probar el Sistema
1.  Abre `index.html`.
2.  Verás la nueva galería de fotos arriba.
3.  Intenta reservar una fecha.
4.  Deberías recibir un correo de confirmación en el email que pongas en el formulario.
5.  Los administradores (`ricardojose...` y `rosi...`) recibirán una notificación simultánea.
