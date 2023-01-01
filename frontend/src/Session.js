import styles from "./Session.module.css";
import Seat from "./components/Seat";
import { useState, useEffect } from "react";
import AddButton from "./components/AddButton";
import SeatNameButton from "./components/SeatNameButton";
import Roster from "./components/Roster";
import { STUDENTS_MORE, ANNOTATIONS } from "./constants.js";
import globalstyles from "./global.module.css";
import Navbar from "./components/Navbar";
import React from "react";
import SeatButton from "./components/SeatButton";
import CurvedArrow from "./components/CurvedArrow";
import OuterButton from "./components/OuterButton";
import Modal from "./components/Modal";

const DEFAULT_COUNT = 13;

const Session = () => {
  const [seats, setSeats] = useState(
    Array(DEFAULT_COUNT).fill({ student: null })
  ); // list of student ids
  const [annotationModalStudent, setAnnotationModalStudent] = useState(null);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [annotationMap, setAnnotationMap] = useState(ANNOTATIONS);
  const [students, setStudents] = useState(STUDENTS_MORE); // map student id to student data from API
  const [startDiscussion, setStartDiscussion] = useState(false); // map student id to student data from API
  const [selected, setSelected] = useState([]);
  const [lines, setLines] = useState([]);

  // modal listener outer button
  const outerButtonClick = (student) => {
    setAnnotationModalStudent(student);
  };

  // listener for drawing lines
  useEffect(() => {
    if (selected.length === 2) {
      setLines([...lines, selected]);
      setSelected([]);
    }
  }, [selected, lines]);

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
    seats.splice(ind, 1, {
      student: students.find((student) => student.id == student_id),
    });
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
      return (
        <Seat
          key={ind}
          index={ind}
          student={obj}
          numStudents={students.length}
          showName={startDiscussion}
        />
      );
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
        <SeatButton
          key={ind}
          index={ind}
          student={obj}
          numStudents={students.length}
          selected={selected}
          deleteMode={!startDiscussion}
          setSelected={setSelected}
          onDelete={() => {
            deleteSeat(ind);
          }}
        />
      );
    });
  };
  const generateOuterButtons = (students) => {
    return students.map((obj, ind) => {
      if (!startDiscussion) {
        return (
          <SeatNameButton
            key={ind}
            index={ind}
            student={obj}
            adjustMode={!startDiscussion}
            numStudents={students.length}
            onAssign={(student_id) => {
              assignSeat(student_id, ind);
            }}
            onRemove={unassignSeat}
          />
        );
      } else {
        return (
          <OuterButton
            key={ind}
            index={ind}
            student={obj}
            numStudents={students.length}
            annotationMap={annotationMap}
            setAnnotationMap={setAnnotationMap}
            outerButtonClick={outerButtonClick}
            showAnnotations={showAnnotations}
          />
        );
      }
    });
  };

  const computeCoords = (index) => {
    const x = Math.sin(index * ((2 * Math.PI) / seats.length)) * 300;
    const y = Math.cos(index * ((2 * Math.PI) / seats.length)) * 300;
    return [x, y];
  };

  const generateLines = () => {
    return lines.map((line, ind) => {
      const [x1, y1] = computeCoords(line[0]);
      const [x2, y2] = computeCoords(line[1]);

      const mid_x = (x1 + x2) / 2;
      const mid_y = (y1 + y2) / 2;

      return (
        <CurvedArrow
          key={ind}
          fromSelector={`[id='${line[0]}']`}
          toSelector={`[id='${line[1]}']`}
          color={"#9DB5B2"}
          width={2}
          size={20}
          middleY={-mid_y * 0.8}
          middleX={-mid_x * 0.8}
          dynamicUpdate="true"
        />
      );
    });
  };

  return (
    <>
      <div className={globalstyles["App"]}>
        <Navbar />
        <div className={globalstyles["page-wrapper"]}>
          <div className={styles["begin"]}>
            {!startDiscussion && (
              <Roster
                onRemove={unassignSeat}
                students={students}
                seats={seats}
              />
            )}
            <div className={styles["circle"]}>
              {generateSeats(seats.map((student) => student.student))}
              {generateInnerButtons(seats)}
              {!startDiscussion && generatePlusButtons(seats)}
              {generateOuterButtons(seats.map((student) => student.student))}
              {generateLines()}
            </div>
            <Modal
              student={annotationModalStudent}
              annotationMap={annotationMap}
              setAnnotationMap={setAnnotationMap}
              closeModal={() => {
                setAnnotationModalStudent(null);
              }}
              openModal={outerButtonClick}
            />

            {!startDiscussion && (
              <button
                style={{ position: "absolute", height: "50px", width: "100px" }}
                onClick={() => setStartDiscussion(true)}
              >
                begin discussion
              </button>
            )}
          </div>
          {startDiscussion && (
            <div className={styles["annotations-toggle"]}>
              Annotations {showAnnotations ? "On" : "Off"}
              <label className="switch">
                <input
                  type="checkbox"
                  checked={showAnnotations}
                  onClick={() => {
                    setShowAnnotations(!showAnnotations);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
          )}
        </div>
      </div>
      <div className={globalstyles["small-screen"]}>
        Your screen is too small to view our work! Please switch over to an ipad
        or laptop. -The Dialogic Team
      </div>
    </>
  );
};

export default Session;
