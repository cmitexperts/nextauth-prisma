"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import "./App.css";

dayjs.locale("es");

let Calendar;
let dayjsLocalizer;
let DropdownContext;
let Dropdown;

const loadCalendarAndDropdown = async () => {
  const [
    loadedCalendar,
    loadedDayjsLocalizer,
    loadedDropdownContext,
    loadedDropdown,
  ] = await Promise.all([
    import("react-big-calendar"),
    import("react-big-calendar/lib/localizers/dayjs"),
    import("react-overlays/cjs/DropdownContext"),
    import("react-overlays/cjs/Dropdown"),
  ]);
  Calendar = loadedCalendar.Calendar;
  dayjsLocalizer = loadedDayjsLocalizer.default;
  DropdownContext = loadedDropdownContext.createContext;
  Dropdown = loadedDropdown.default;
};

const events = [
  {
    title: "Reunión de trabajo",
    start: new Date("2023-12-19T10:00:00"),
    end: new Date("2023-12-19T11:00:00"),
    allDay: false,
  },
  {
    title: "Almuerzo",
    start: new Date("2023-12-20T12:30:00"),
    end: new Date("2023-12-20T13:30:00"),
    allDay: false,
  },
  {
    title: "Vacaciones",
    start: new Date("2023-12-21"),
    end: new Date("2023-12-28"),
    allDay: true,
  },
];

function App({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);  // Estado para controlar la visibilidad del calendario
  const localizer = dayjsLocalizer(dayjs);
  const { data: session } = useSession();

  useEffect(() => {
    setIsClient(true);
    loadCalendarAndDropdown();
  }, []);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);  // Cambiar el estado para mostrar/ocultar el calendario al hacer clic en el botón
  };

  if (!isClient) {
    return null;
  }

  if (!Calendar || !dayjsLocalizer || !DropdownContext || !Dropdown) {
    return null;
  }

  return (
    <div>
      <button onClick={toggleCalendar} style={{ marginBottom: '20px' }}>Calendario</button>  {/* Botón para mostrar/ocultar el calendario */}
      
      {showCalendar && (  {/* Mostrar el calendario si showCalendar es true */}
        <div
          style={{
            height: "95vh",
            width: "70vw",
          }}
        >
          <Calendar
            localizer={localizer}
            events={events}
            views={["month", "week", "day"]}
            date={dayjs("2023-12-19T12:00:00").toDate()}
            toolbar={true}
            defaultView="month"
            min={dayjs("2023-12-23T08:00:00").toDate()}
            max={dayjs("2023-12-23T18:00:00").toDate()}
            formats={{
              dayHeaderFormat: (date) => {
                return dayjs(date).format("DD/MM/YYYY");
              },
            }}
            components={components}
          />
        </div>
      )}
    </div>
  );
}

export default App;


