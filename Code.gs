/**
 * CÓDIGO DE BACKEND - VERSIÓN 8.0 (SIMPLIFICADA Y ROBUSTA)
 * Objetivo: Funcionar SIEMPRE.
 */

// --- 1. CONFIGURACIÓN ---
const CALENDAR_ID = 'TU_ID_DE_CALENDARIO_AQUI@group.calendar.google.com';

const ADMIN_EMAILS = [
  'ricardojose.mendez@gmail.com',
  'rosi.montero13@gmail.com'
];

const PROPERTY_CONFIG = {
  name: "Apartamento Laguna Azul",
  address: "Tucacas 2047, Falcón, Venezuela | Edificación Residencial Laguna Azul, APT 2-A",
  mapLink: "https://maps.app.goo.gl/xf9NApE1hZfSS4Qx5?g_st=am"
};

// --- 2. AYUDAS ---
function getResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// Extractor de JSON "A prueba de balas"
function extractJSON(text) {
  try {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end !== -1) {
      return JSON.parse(text.substring(start, end + 1));
    }
  } catch (e) { return null; }
  return null;
}

// Formateador fecha YYYY-MM-DD
function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// --- 3. RUTAS ---
function doGet(e) {
  const action = e.parameter.action;
  if (action === 'getEvents') return getEvents(e.parameter.start, e.parameter.end);
  if (action === 'getUserReservations') return getUserReservations(e.parameter.email);
  return getResponse({status: 'ok', msg: 'System V8 Online'});
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === 'createEvent') return createReservation(data);
    if (data.action === 'cancelEvent') return cancelReservation(data);
    if (data.action === 'getEvents') return getEvents(data.start, data.end);
    if (data.action === 'getUserReservations') return getUserReservations(data.email);
    
    return getResponse({status: 'error', message: 'Acción desconocida: ' + data.action});
  } catch (error) {
    return getResponse({status: 'error', message: error.toString()});
  }
}

// --- 4. LÓGICA ---

function getEvents(startStr, endStr) {
  const cal = CalendarApp.getCalendarById(CALENDAR_ID);
  
  // Fechas: Importante forzar T00:00:00 para que sea local
  const start = new Date(startStr + 'T00:00:00');
  const end = new Date(endStr + 'T23:59:59');
  
  const events = cal.getEvents(start, end);
  const occupiedDates = [];
  
  // Recorrer eventos y "llenar" los días ocupados
  events.forEach(event => {
    let current = new Date(event.getStartTime());
    current.setHours(0,0,0,0);
    
    let endEvent = new Date(event.getEndTime());
    // Si es todo el día, termina al día siguiente a las 00:00, restamos 1 para visualización
    if (event.isAllDayEvent()) endEvent.setDate(endEvent.getDate() - 1);
    endEvent.setHours(0,0,0,0);
    
    while(current <= endEvent) {
      occupiedDates.push(formatDate(current));
      current.setDate(current.getDate() + 1);
    }
  });
  
  return getResponse({status: 'success', dates: [...new Set(occupiedDates)]});
}

function createReservation(data) {
  const cal = CalendarApp.getCalendarById(CALENDAR_ID);
  const reservationId = Math.random().toString(36).substring(2, 10).toUpperCase();

  // Fechas estrictas
  const start = new Date(data.startDate + 'T12:00:00'); // Mediodía para evitar cambios de hora
  const end = new Date(data.endDate + 'T12:00:00');
  
  // Google Calendar All-Day es exclusivo al final, sumamos 1 día
  const googleEnd = new Date(end);
  googleEnd.setDate(googleEnd.getDate() + 1);

  // Verificar conflicto
  const conflicts = cal.getEvents(start, googleEnd);
  if (conflicts.length > 0) return getResponse({status: 'error', message: 'Fechas ocupadas'});

  const description = JSON.stringify({
    id: reservationId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    guests: data.guests,
    originalStart: data.startDate,
    originalEnd: data.endDate
  }, null, 2);

  const title = `🏠 ${data.name} (#${reservationId})`;
  
  cal.createAllDayEvent(title, start, googleEnd, {description: description});
  
  // FORMATO EMAIL EXACTO SOLICITADO
  const emailBody = `
     NUEVA RESERVA CONFIRMADA
     ------------------------
     🆔 ID Reserva: ${reservationId}
     🏨 Propiedad: ${PROPERTY_CONFIG.name}
     📍 Dirección: Tucacas 2047, Falcón, Venezuela | Edificación Residencial 
Laguna Azul, APT 2-A
     🗺️ Mapa: 
${PROPERTY_CONFIG.mapLink}

     👤 Huésped: ${data.name}
     📧 Email: ${data.email}
     📱 Teléfono: ${data.phone}
     👥 Personas: ${data.guests}

     📅 LLEGADA: ${data.startDate}
     📅 SALIDA: ${data.endDate}
     ------------------------
  `;

  const recipients = [...ADMIN_EMAILS, data.email].join(',');
  MailApp.sendEmail({
    to: recipients,
    subject: `✅ Reserva Confirmada #${reservationId} - Laguna Azul`,
    body: emailBody
  });

  return getResponse({status: 'success', reservation: {id: reservationId}});
}

function cancelReservation(data) {
  const cal = CalendarApp.getCalendarById(CALENDAR_ID);
  
  // Buscar en rango amplio (-1 mes a +2 años)
  const now = new Date();
  const startSearch = new Date(); startSearch.setMonth(now.getMonth() - 1);
  const endSearch = new Date(); endSearch.setFullYear(now.getFullYear() + 2);
  
  const events = cal.getEvents(startSearch, endSearch);
  
  for(const event of events) {
    const meta = extractJSON(event.getDescription());
    if(meta && meta.id === data.reservationId) {
      event.deleteEvent();
      
      MailApp.sendEmail({
        to: ADMIN_EMAILS.join(','), // Solo admins, o también usuario si quieres
        subject: `⚠️ Cancelación: #${data.reservationId}`,
        body: `La reserva ${data.reservationId} ha sido eliminada del calendario.`
      });
      
      return getResponse({status: 'success', message: 'Reserva eliminada'});
    }
  }
  
  return getResponse({status: 'error', message: 'No se encontró la reserva con ese ID'});
}

function getUserReservations(email) {
  const cal = CalendarApp.getCalendarById(CALENDAR_ID);
  const now = new Date();
  const future = new Date(); future.setFullYear(future.getFullYear() + 2);
  
  const events = cal.getEvents(now, future);
  const list = [];
  
  events.forEach(event => {
    const meta = extractJSON(event.getDescription());
    if(meta) {
      if(meta.email === email || email === 'all' || email === '') { // '' busca todo si quieres debug
         const s = new Date(meta.originalStart);
         const e = new Date(meta.originalEnd);
         const nights = Math.round((e - s) / (1000 * 60 * 60 * 24));
         
         list.push({
           reservationId: meta.id,
           guestName: meta.name,
           guestEmail: meta.email,
           guestPhone: meta.phone,
           checkIn: meta.originalStart,
           checkOut: meta.originalEnd,
           nights: nights
         });
      }
    }
  });
  
  return getResponse({status: 'success', reservations: list});
}
