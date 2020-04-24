export function getAppointmentsForDay(state, day) {
  const result = [];

  const filteredDay = state.days.filter((sched) => sched.name === day);

  if (filteredDay[0]) {
    let apps = filteredDay[0].appointments;

    for (let i = 0; i < apps.length; i++) {
      // must use FOR.... IN for objects
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

// must use FOR.... IN for objects
//   function interviewerData(state, interview) {
//     for (const interviewer in state.interviewers) {
//       if (interviewer.id === interview.interviewer) {
//           return state.interviewers[interviewer];
//       }

//     }
//   }

// export function getInterview(state, interview) {
// const result = interviewerData(state, interview);
// if (result){
//   return {
//     student: interview.student,
//     interviewer: ...result
//     }
//   };
// }
// }

export function getInterview(state, interview) {
  if (
    interview &&
    interview.interviewer &&
    String(interview.interviewer) in state.interviewers
  ) {
    // returns student and interviewer, interviewer get overwritten afterwards
    return {
      ...interview,
      interviewer: state.interviewers[String(interview.interviewer)],
    };
  }
  return null;
}
