"use client";
import { signOut } from "next-auth/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const myEventsList = [];
function DashboardPage() {
  return (
    <section className="flex justify-center items-center w-full">
      <div className="w-full mt-5">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, color: "#000", backgroundColor: "#fff" }}
        />
      </div>
    </section>
  );
}
export default DashboardPage;
