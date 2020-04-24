import DayList from "./DayList.js";
import React, { useState, useEffect } from "react";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";
import "components/Application.scss";
import Appointment from "./Appointments/index";

import axios from "axios";

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState((prev) => ({ ...prev, days }));
  const setAppointments = (appointments) =>
    setState((prev) => ({ ...prev, appointments }));

  const setInterviewers = (interviewers) =>
    setState((prev) => ({ ...prev, interviewers }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((value) => {
      setDays(value[0].data);
      setAppointments(value[1].data);
      setInterviewers(value[2].data);
    });
  }, []);

  // you can use spread when mapping
  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
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
