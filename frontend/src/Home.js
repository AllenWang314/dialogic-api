import "./Home.css";
import Seat from "./components/Seat";
import OuterButton from "./components/OuterButton";
import SeatNameButton from "./components/SeatNameButton";
import Modal from "./components/Modal";
import SeatButton from "./components/SeatButton";
import { useState, useEffect } from "react";
import Xarrow from "react-xarrows";
import { STUDENTS_FEW, STUDENTS_AVERAGE, STUDENTS_MORE, ANNOTATIONS } from "./constants.js";
import AddButton from "./components/AddButton";
import Roster from "./components/Roster";
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
        <SeatNameButton
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

  // programatically generate outer buttons
  const generatePlusButtons = (students) => {
    return students.map((obj, ind) => {
      return <AddButton key={ind} index={ind} student={obj} numStudents={students.length} />;
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
          deleteMode={true}
        />
      );
    });
  };

  // programatically generate lines
  const generateLines = () => {
    return lines.map((line, ind) => {
      return (
        <Xarrow
          key={ind}
          start={line[0]}
          end={line[1]}
          curveness={0}
          color={"#9DB5B2"}
          startAnchor={"middle"}
          endAnchor={"middle"}
          animateDrawing={0.1}
        />
      );
    });
  };

  return (
    <div id="home">
      <div className="roster"> {Roster(students)}</div>

      <div className="circle">
        {generateOuterButtons(students)}
        {generateSeats(students)}
        {generateInnerButtons(students)}
        {generateLines()}
        {generatePlusButtons(students)}
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
