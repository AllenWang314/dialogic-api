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
  const DEFAULT_STATE = [{student: {name: "Josh0"}}, {student: {name: "Josh1"}}, {student: {name: "Josh2"}}, {student: {name: "Josh3"}}, {student: {name: "Josh4"}}, {student: {name: "Josh5"}}, {student: {name: "Josh6"}}, {student: {name: "Josh7"}}, {student: {name: "Josh8"}}, {student: {name: "Josh9"}}, {student: {name: "Josh10"}}, {student: {name: "Josh11"}}] 
  console.log(DEFAULT_STATE)
  const [students, setStudents] = useState(DEFAULT_STATE);
  const [studentData, setStudentData] = useState({}); // map student id to student data from API


  const addSeat = (ind) => {
    // adds a seat in students after index ind
    // note that 0th index always rendered at center top of page
    students.splice(ind + 1, 0, {student: null})
    setStudents([...students])
  }

  const deleteSeat = (ind) => {
    // deletes seat at index ind
    // note that 0th index always rendered at center top of page
    students.splice(ind, 1)
    setStudents([...students])
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
          onClick={() => {deleteSeat(ind)}}
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
