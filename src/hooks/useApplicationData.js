import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
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

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(setAppointments(appointments));
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(setAppointments(appointments));
  };

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

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
