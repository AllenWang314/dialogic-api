import "./Home.css";
import Seat from "./components/Seat";
import OuterButton from "./components/OuterButton";
import Modal from "./components/Modal";
import SeatButton from "./components/SeatButton";
import { useState, useEffect } from "react";
import CurvedArrow from "./CurvedArrow";
import { STUDENTS_FEW, STUDENTS_AVERAGE, STUDENTS_MORE, ANNOTATIONS } from "./constants.js";
import React from "react";

const Home = () => {
  const [annotationModalStudent, setAnnotationModalStudent] = useState(null);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [annotationMap, setAnnotationMap] = useState(ANNOTATIONS);
  const [selected, setSelected] = useState([]);
  const [lines, setLines] = useState([]);
  const [students, setStudents] = useState(STUDENTS_AVERAGE);

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

  // programatically generate seat graphic
  const generateSeats = (students) => {
    return students.map((obj, ind) => {
      return <Seat key={ind} index={ind} student={obj} numStudents={students.length} />;
    });
  };

  // programatically generate outer buttons
  const generateOuterButtons = (students) => {
    return students.map((obj, ind) => {
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
          setSelected={setSelected}
        />
      );
    });
  };

  // programatically generate lines

  const computeCoords = (index) => {
    const x = Math.sin(index * ((2 * Math.PI) / students.length)) * 300;
    const y = Math.cos(index * ((2 * Math.PI) / students.length)) * 300;
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
    <div id="home">
      <div className="circle">
        {generateOuterButtons(students)}
        {generateSeats(students)}
        {generateInnerButtons(students)}
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
      <div className="students-toggle ">
        Student Count
        <select
          id="menu"
          onChange={(e) => {
            if (e.target.value == "few") {
              setStudents(STUDENTS_FEW);
              setLines([]);
            } else if (e.target.value == "average") {
              setStudents(STUDENTS_AVERAGE);
              setLines([]);
            } else {
              setStudents(STUDENTS_MORE);
              setLines([]);
            }
          }}
        >
          <option value="few">few</option>
          <option value="average" selected="selected">
            average
          </option>
          <option value="more">more</option>
        </select>
      </div>
      <div className="annotations-toggle">
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
    </div>
  );
};

export default Home;
