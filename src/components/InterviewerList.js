import React from "react";
import classnames from "classnames";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList({
  interviewers,
  interviewer,
  setInterviewer,
}) {
  const interviewerClass = classnames("interviewers");
  const persons = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === interviewer}
        setInterviewer={() => setInterviewer(interviewer.id)}
      />
    );
  });
  return (
    <section className={interviewerClass}>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{persons}</ul>
    </section>
  );
}
