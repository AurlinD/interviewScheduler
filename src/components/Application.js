import DayList from "./DayList.js";
import React, { useState, useEffect } from "react";

import "components/Application.scss";
import Appointment from "./Appointments/index";

import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Aurlin Dhillon",
      interviewer: {
        id: 1,
        name: "Billy Bob",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      },
    },
  },
  { id: 5, time: "5pm" },
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get("/api/days").then((res) => {
      setDays(res.data);
    });
  }, []);
  const schedule = appointments.map((app) => {
    return <Appointment key={app.id} {...app} />;
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="/images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="/images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">{schedule}</section>
    </main>
  );
}
