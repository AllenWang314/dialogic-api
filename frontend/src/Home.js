import "./Home.css";
import Seat from "./Seat";
import OuterButton from "./OuterButton";
import Modal from "./Modal";
import SeatButton from "./SeatButton";
import { useState, useEffect } from "react";
import Xarrow from "react-xarrows";

const STUDENTS_FEW = [
  {
    name: "Jash M",
    student_id: 1,
  },
  {
    name: "Lies L",
    student_id: 2,
  },
  {
    name: "Shreyl S",
    student_id: 3,
  },
  {
    name: "Broke L",
    student_id: 4,
  },
  {
    name: "Josh M",
    student_id: 5,
  },
  {
    name: "Jamin T",
    student_id: 6,
  },
];

const STUDENTS = [
  {
    name: "Jash M",
    student_id: 1,
  },
  {
    name: "Lies L",
    student_id: 2,
  },
  {
    name: "Shreyl S",
    student_id: 3,
  },
  {
    name: "Broke L",
    student_id: 4,
  },
  {
    name: "Josh M",
    student_id: 5,
  },
  {
    name: "Jamin T",
    student_id: 6,
  },
  {
    name: "Jann Q",
    student_id: 7,
  },
  {
    name: "Wald W",
    student_id: 8,
  },
  {
    name: "Maddi N",
    student_id: 9,
  },
  {
    name: "Cindoo Q",
    student_id: 10,
  },
  {
    name: "David M",
    student_id: 11,
  },
  {
    name: "Joey E",
    student_id: 12,
  },
  {
    name: "Step C",
    student_id: 13,
  },
];

const STUDENTS_MORE = [
  {
    name: "Jash M",
    student_id: 1,
  },
  {
    name: "Lies L",
    student_id: 2,
  },
  {
    name: "Shreyl S",
    student_id: 3,
  },
  {
    name: "Broke L",
    student_id: 4,
  },
  {
    name: "Josh M",
    student_id: 5,
  },
  {
    name: "Jamin T",
    student_id: 6,
  },
  {
    name: "Jann Q",
    student_id: 7,
  },
  {
    name: "Wald W",
    student_id: 8,
  },
  {
    name: "Maddi N",
    student_id: 9,
  },
  {
    name: "Cindoo Q",
    student_id: 10,
  },
  {
    name: "David M",
    student_id: 11,
  },
  {
    name: "Joey E",
    student_id: 12,
  },
  {
    name: "Step C",
    student_id: 13,
  },
  {
    name: "Jann Q",
    student_id: 14,
  },
  {
    name: "Wald W",
    student_id: 15,
  },
  {
    name: "Maddi N",
    student_id: 16,
  },
  {
    name: "Cindoo Q",
    student_id: 17,
  },
  {
    name: "David M",
    student_id: 18,
  },
  {
    name: "Joey E",
    student_id: 19,
  },
  {
    name: "Step C",
    student_id: 20,
  },
];

const ANNOTATIONS = {
  1: {
    T: 1,
    A: 0,
    C: 0,
    Q: 1,
    R: 0,
    F: 1,
  },
  2: {
    T: 1,
    A: 0,
    C: 0,
    Q: 0,
    R: 0,
    F: 0,
  },
  3: {
    T: 1,
    A: 0,
    C: 0,
    Q: 0,
    R: 0,
    F: 1,
  },
  4: {
    T: 0,
    A: 0,
    C: 0,
    Q: 0,
    R: 0,
    F: 0,
  },
  5: {
    T: 0,
    A: 0,
    C: 1,
    Q: 1,
    R: 0,
    F: 0,
  },
  6: {
    T: 0,
    A: 0,
    C: 0,
    Q: 0,
    R: 0,
    F: 0,
  },
  7: {
    T: 1,
    A: 0,
    C: 0,
    Q: 1,
    R: 0,
    F: 0,
  },
  8: {
    T: 1,
    A: 1,
    C: 2,
    Q: 1,
    R: 2,
    F: 1,
  },
  9: {
    T: 1,
    A: 1,
    C: 0,
    Q: 0,
    R: 0,
    F: 0,
  },
  10: {
    T: 0,
    A: 1,
    C: 0,
    Q: 0,
    R: 1,
    F: 0,
  },
  11: {
    T: 0,
    A: 0,
    C: 0,
    Q: 0,
    R: 2,
    F: 0,
  },
  12: {
    T: 1,
    A: 1,
    C: 0,
    Q: 0,
    R: 0,
    F: 0,
  },
  12: {
    T: 1,
    A: 0,
    C: 1,
    Q: 0,
    R: 0,
    F: 0,
  },
  13: {
    T: 1,
    A: 0,
    C: 0,
    Q: 0,
    R: 0,
    F: 1,
  },
  14: {
    T: 0,
    A: 1,
    C: 1,
    Q: 0,
    R: 0,
    F: 0,
  },
  15: {
    T: 0,
    A: 0,
    C: 0,
    Q: 0,
    R: 0,
    F: 0,
  },
  16: {
    T: 0,
    A: 0,
    C: 0,
    Q: 0,
    R: 0,
    F: 0,
  },
  17: {
    T: 1,
    A: 1,
    C: 1,
    Q: 0,
    R: 0,
    F: 0,
  },
  18: {
    T: 1,
    A: 1,
    C: 1,
    Q: 0,
    R: 0,
    F: 1,
  },
  19: {
    T: 1,
    A: 1,
    C: 1,
    Q: 0,
    R: 0,
    F: 1,
  },
  20: {
    T: 0,
    A: 0,
    C: 1,
    Q: 0,
    R: 0,
    F: 0,
  },
};

function Home() {
  const [annotationModalStudent, setAnnotationModalStudent] = useState(null);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [annotationMap, setAnnotationMap] = useState(ANNOTATIONS);
  const [selected, setSelected] = useState([]);
  const [lines, setLines] = useState([]);
  const [students, setStudents] = useState(STUDENTS);


  const outerButtonClick = (student) => {
    setAnnotationModalStudent(student);
  };

  useEffect(() => {
    if (selected.length === 2) {
      setLines([...lines, selected]);
      setSelected([]);
    }
  }, [selected, lines]);

  const generateSeats = (students) => {
    return students.map((obj, ind) => {
      return <Seat key={ind} index={ind} student={obj} numStudents={students.length} />;
    });
  };

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
  const styles = {};

  return (
    <div id="home">
      <div className="circle" style={styles}>
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
       <div className="students-toggle">
        Student Count
        <select id="menu" onChange={(e) => {
          if (e.target.value == "few") {
            setStudents(STUDENTS_FEW)
            setLines([])
          } else if (e.target.value == "average") {
            setStudents(STUDENTS)
            setLines([])
          } else {
            setStudents(STUDENTS_MORE)
            setLines([])
          }
        }}>
    <option value="few">few</option>
    <option value="average">average</option>
    <option value="more">more</option>
</select>
      </div>
      <div className="annotations-toggle">
        Annotations {showAnnotations ? "On" : "Off"}
        <label className="switch">
          <input
            type="checkbox"
            onClick={() => {
              setShowAnnotations(!showAnnotations);
            }}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default Home;