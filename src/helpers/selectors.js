export default function getAppointmentsForDay(state, day) {
  const result = [];

  const filteredDay = state.days.filter((sched) => sched.name === day);

  if (filteredDay[0]) {
    let apps = filteredDay[0].appointments;

    for (let i = 0; i < apps.length; i++) {
      for (const appointment in state.appointments) {
        if (apps[i] === Number(appointment))
          result.push(state.appointments[appointment]);
      }
    }

    return result;
  } else {
    return result;
  }
}
