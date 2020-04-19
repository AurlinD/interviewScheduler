import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment({ time, interview }) {
  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? (
        <Show interviewer={interview.interviewer} student={interview.student} />
      ) : (
        <Empty />
      )}
    </article>
  );
}
