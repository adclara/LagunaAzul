# Manual Completo de Instalación y Mantenimiento

Este documento explica cómo configurar el **Sistema de Reservas Apartamento Costa Azul**.

## 📁 Estado Actual del Proyecto
Todos los archivos necesarios están en tu carpeta `Downloads/CalendarApp`:
-   `index.html`: La aplicación web (¡Actualizada!).
-   `Code.gs`: El código del servidor (¡Nuevo!).
-   `assets/`: Carpeta con las fotos (Exterior, Piscina, Interior).

---

## 🚀 PASO 1 (CRÍTICO): Actualizar Google Apps Script

Para que funcionen los **emails automáticos** y el **bloqueo estricto**, debes actualizar el código en la nube:

1.  Ve a [script.google.com](https://script.google.com) y abre tu proyecto.
2.  Borra todo el código viejo.
3.  Copia TODO el contenido del archivo `Code.gs` de esta carpeta.
4.  Pégalo en el editor de Google.
5.  **IMPORTANTE**: En la línea 7 del código, debes reemplazar:
    ```javascript
    const CALENDAR_ID = 'TU_ID_DE_CALENDARIO_AQUI@group.calendar.google.com';
    ```
    ...por el **ID real de tu calendario** (lo encuentras en Google Calendar > Configuración > Integrar calendario).
6.  Guarda el proyecto (Icono Diskette).

## 🔄 PASO 2: Implementar Nueva Versión

Cada vez que cambias el código (`Code.gs`), debes "re-desplegar" para que los cambios sean públicos:

1.  Botón **Implementar** (arriba a la derecha) > **Gestionar implementaciones**.
2.  Haz clic en el icono ✏️ (Editar).
3.  En el desplegable "Versión", elige **Nueva versión**.
4.  Clic en **Implementar**.

*Nota: La URL de la aplicación web no debería cambiar si lo haces así. Si cambia, actualízala en el `index.html`.*

---

## 🌐 PASO 3: Publicar la Web

Para compartir el link con los clientes:

### Opción Rápida: Netlify Drop
1.  Entra a [app.netlify.com/drop](https://app.netlify.com/drop).
2.  Arrastra la carpeta COMPLETA `CalendarApp` (asegúrate de que incluya la carpeta `assets`).
3.  Espera unos segundos y tendrás tu link mundial.

### Gestión Diaria

**¿Cómo bloqueo fechas?**
Simplemente crea un evento de "Día completo" en tu Google Calendar (desde tu celular). El sistema leerá ese bloqueo y pintará la fecha en ROJO en la web automáticamente.

**¿Dónde veo las nuevas reservas?**
1.  Aparecerán en tu Google Calendar.
2.  Llegará un email a `ricardojose.mendez@gmail.com` y `rosi.montero13@gmail.com`.

---

### Solución de Problemas Comunes

-   **"No se envían los correos"**: Verifica que creaste una `Nueva versión` al implementar en el Paso 2.
-   **"Error al reservar"**: Verifica que el `CALENDAR_ID` en el script sea correcto y no tenga espacios extra.
-   **"Las fotos no cargan"**: Asegúrate de que la carpeta `assets` se subió junto con el `index.html`.
