import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
export default function() {
  console.log("bbb");
  document.addEventListener('DOMContentLoaded', function() {
    console.log("aaa");
    var calendarEl = document.getElementById('calendar');

    var calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin ]
    });

    calendar.render();
  });
}
