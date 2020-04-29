import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../..//hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const SAVING = "SAVING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {
    transition(CREATE);
  };
  const onCancel = () => {
    back();
  };

  const onConfirm = () => {
    transition(DELETING);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  const onDelete = () => {
    transition(CONFIRM);
  };

  const onEdit = () => {
    transition(EDIT);
  };

  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          onCancel={onCancel}
          // interviewer={props.interviewer}
          interviewers={props.interviewers}
          onSave={onSave}
        />
      )}
      {mode === EDIT && (
        <Form
          onCancel={onCancel}
          interviewers={props.interviewers}
          onSave={onSave}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onConfirm={onConfirm}
          onDelete={onCancel}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment" onClose={onCancel} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment" onClose={onCancel} />
      )}
    </article>
  );
}
