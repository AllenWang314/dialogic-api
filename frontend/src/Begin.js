import styles from "./Begin.module.css";
import Seat from "./components/Seat";
import Modal from "./components/Modal";
import DeleteButton from "./components/DeleteButton";
import { useState, useEffect } from "react";
import AddButton from "./components/AddButton";
import SeatName from "./components/SeatName";
import Roster from "./components/Roster";
import { STUDENTS_FEW, STUDENTS_AVERAGE, STUDENTS_MORE, ANNOTATIONS } from "./constants.js";

const Begin = () => {
  const DEFAULT_COUNT = 13;
  const DEFAULT_STATE = [
    { student: null },
    { student: null },
    { student: null },
    { student: null },
    { student: null },
    { student: null },
    { student: null },
    { student: null },
    { student: null },
  ];
  const [seats, setSeats] = useState(DEFAULT_STATE); // list of student ids
  const [students, setStudents] = useState(STUDENTS_AVERAGE); // map student id to student data from API

  const addSeat = (ind) => {
    // adds a seat in students after index ind
    // note that 0th index always rendered at center top of page
    seats.splice(ind + 1, 0, { student: null });
    setSeats([...seats]);
  };

  const deleteSeat = (ind) => {
    // deletes seat at index ind
    // note that 0th index always rendered at center top of page
    seats.splice(ind, 1);
    setSeats([...seats]);
  };

  const assignSeat = (student_id, ind) => {
    seats.splice(ind, 1, { student: students.find((student) => student.id == student_id) });
    setSeats([...seats]);
  };

  const unassignSeat = (ind) => {
    if (ind) {
      seats.splice(ind, 1, { student: null });
      setSeats([...seats]);
    }
  };

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
          onClick={() => {
            addSeat(ind);
          }}
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
          onClick={() => {
            deleteSeat(ind);
          }}
        />
      );
    });
  };
  const generateOuterButtons = (students) => {
    return students.map((obj, ind) => {
      return (
        <SeatName
          key={ind}
          index={ind}
          student={obj}
          numStudents={students.length}
          onAssign={(student_id) => {
            assignSeat(student_id, ind);
          }}
          onRemove={unassignSeat}
        />
      );
    });
  };
  return (
    <div className={styles["begin"]}>
      <Roster onRemove={unassignSeat} students={STUDENTS_AVERAGE} seats={seats} />
      <div className={styles["circle"]}>
        {generateSeats(seats.map((student) => student.student))}
        {generateInnerButtons(seats)}
        {generatePlusButtons(seats)}
        {generateOuterButtons(seats.map((student) => student.student))}
      </div>
    </div>
  );
};

export default Begin;
