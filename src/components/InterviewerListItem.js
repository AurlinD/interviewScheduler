import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";

export default function InterviewerListItems({
  id,
  name,
  avatar,
  selected,
  setInterviewer,
}) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": selected,
  });
  return (
    <li className={interviewerClass} onClick={() => setInterviewer()}>
      <img className="interviewers__item-image" src={avatar} alt={name}></img>
      {selected && name}
    </li>
  );
}
