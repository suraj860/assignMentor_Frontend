import React from "react";
import Form from "./createMentorForm";
import StudForm from "./createStudentForm";
import { AppContext } from "./context";

function NavBar() {
  const { forms, setForms } = React.useContext(AppContext);
  const { stud_Form, setStudForm } = React.useContext(AppContext);

  //navbar code from bootstrap
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-primary"
        style={{ padding: "4px 20px" }}
      >
        <a className="navbar-brand" href="/" style={{ color: "white" }}>
          <i
            className="fas fa-users fa-2x icon"
            style={{
              color: "rgb(236, 163, 53)",
              marginRight: "8px",
              marginTop: "4px",
            }}
          ></i>
          STUDENT_MENTOR ASSIGNER
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNavAltMarkup"
          style={{ justifyContent: "flex-end" }}
        >
          <div className="navbar-nav">
            <button
              className="btn btn-light"
              type="button"
              style={{ margin: "10px 15px" }}
              onClick={()=>{ setForms(!forms)}}
            >
              Create Mentor
            </button>
            <button
              className="btn btn-light"
              type="button"
              style={{ margin: "10px 15px" }}
              onClick={()=>{ setStudForm(!stud_Form)}}
            >
              Create Student
            </button>
          </div>
        </div>
      </nav>
      {forms === true ? <Form /> : null}
      {stud_Form === true ? <StudForm /> : null}
    </>
  );
}
export default NavBar;
