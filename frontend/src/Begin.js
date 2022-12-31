import styles from "./Begin.module.css";
import Seat from "./components/Seat";
import Modal from "./components/Modal";
import DeleteButton from "./components/DeleteButton";
import { useState, useEffect } from "react";
import AddButton from "./components/AddButton";

/*
STUDENT ARRAY attributes ?
  [index]: location on the circle
  student: {student information}
  annotations: {specific information}
  discussion: {other discussion scoped information specific to student}
  freeze: boolean (seat)
*/
const Begin = () => {
  const DEFAULT_COUNT = 13
  const DEFAULT_STATE = [{student: "student"}] 
  console.log(DEFAULT_STATE)
  const [students, setStudents] = useState(DEFAULT_STATE);

  const addSeat = (ind) => {
    console.log(ind)
  }

  // programatically generate seat graphic
  const generateSeats = (students) => {
    return students.map((obj, ind) => {
      return <Seat key={ind} index={ind} student={obj} numStudents={students.length} />;
    });
  };

  // programatically generate plus buttons
  const generatePlusButtons = (students) => {
    return students.map((obj, ind) => {
      return (
        <AddButton
          key={ind}
          index={ind}
          student={obj}
          numStudents={students.length}
          onClick={() => {addSeat(ind)}}
        />
      );
    });
  };

  // programatically generate inner buttons
  const generateInnerButtons = (students) => {
    return students.map((obj, ind) => {
      return (
        <DeleteButton
          key={ind}
          index={ind}
          student={obj}
          numStudents={students.length}
 
          deleteMode={true}
        />
      );
    });
  };

  return (
    <div className={styles["begin"]}>
      <div className={styles["circle"]}>
        {generateSeats(students.map(student => student.student))}
        {generateInnerButtons(students)}
        {generatePlusButtons(students)}
      </div>
    </div>
  );
};

export default Begin;
