---
trigger: always_on
---

PROJECT: Beach Apartment Booking System

TECH STACK:
- Single HTML file (with embedded CSS/JS)
- Vanilla JavaScript
- Google Calendar API v3
- GitHub Pages hosting

FILE STRUCTURE:
index.html (contains everything)

DEVELOPMENT PHASES:

PHASE 1: Google Calendar API Setup
1. Go to console.cloud.google.com
2. Create new project "Beach Booking"
3. Enable "Google Calendar API"
4. Create API Key (Credentials → API Key)
5. Create new Google Calendar "Beach Reservations"
6. Make calendar public (Settings → Access permissions)
7. Copy Calendar ID (Settings → Integrate calendar)

PHASE 2: HTML Structure
- Header: App title
- Calendar container: Display month view
- Date selector: Check-in/Check-out inputs
- Booking form: Name, email, phone, guests
- Submit button
- Status messages (success/error)

PHASE 3: Calendar Logic
Functions needed:
- renderCalendar(month, year): Display calendar grid
- fetchEvents(): Get bookings from Google Calendar API
- markOccupiedDates(): Highlight booked dates
- selectDateRange(): Allow user to pick dates
- validateDates(): Check if dates overlap with bookings
- nextMonth() / prevMonth(): Navigate calendar

PHASE 4: Booking System
Functions needed:
- checkAvailability(startDate, endDate): Validate dates
- submitBooking(): Create event in Google Calendar
- showConfirmation(): Display success message
- handleError(): Show error messages

API ENDPOINTS:
- GET events: 
  https://www.googleapis.com/calendar/v3/calendars/{CALENDAR_ID}/events?key={API_KEY}
- POST event (requires OAuth - see note below)

PHASE 5: UI/UX
- Mobile responsive (media queries)
- Visual feedback (loading spinner)
- Color coding (green=available, red=booked)
- Form validation
- Clear error messages in Spanish

IMPORTANT NOTES:
- API Key allows READ operations only
- To CREATE bookings, you need OAuth 2.0 OR Google Apps Script
- Recommended: Use Google Apps Script as serverless backend

ALTERNATIVE SIMPLE APPROACH:
Instead of direct API write:
1. User fills form on your page
2. Form submits to Google Apps Script endpoint
3. Apps Script creates calendar event
4. Returns confirmation

Apps Script Setup:
- Tools → Script editor in Google Sheets
- Deploy as Web App
- Allow anonymous access
- Use Calendar.createEvent() method

DEPLOYMENT:
1. Push code to GitHub repository
2. Go to repo Settings → Pages
3. Select main branch
4. Get your public URL

TESTING:
- Test date selection
- Test overlap validation
- Test form submission
- Test on mobile devices
- Test error scenarios

COMPLETE CODE STRUCTURE:
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Beach Apartment Booking</title>
  <style>
    /* CSS here - mobile-first responsive */
  </style>
</head>
<body>
  <!-- HTML structure here -->
  <script>
    // Configuration
    const API_KEY = 'YOUR_API_KEY';
    const CALENDAR_ID = 'YOUR_CALENDAR_ID';
    
    // Calendar rendering logic
    // Booking validation logic
    // Form handling logic
    // API calls
  </script>
</body>
</html>

SECURITY:
- API Key is safe to expose (read-only public calendar)
- Don't put OAuth tokens in frontend
- Use Apps Script for write operations

MAINTENANCE:
- Update availability from Google Calendar directly
- Block dates by creating events manually
- View all bookings in Calendar app