import React from "react";
import cssstyles from "./Seats.module.css";

const Seat = (props) => {
  // get Name and last initial from full name
  const getName = (student) => {
    if (student && student.name) {
      const name = student.name;
      const words = name.split(" ");
      return words[0] + " " + words[words.length - 1][0] + ".";
    }
    return "";
  };
  // STROKE_FRACTION is a magic number we picked that
  // made the UI look nice
  const turnVar = 1 / props.numStudents;
  const STROKE_FRACTION = 0.7;
  const STROKE_COLOR =
    props.showName && props.selected == props.student?.id
      ? "#FFFFFF"
      : "#D3D5D4";

  const STROKE_WIDTH =
    props.showName && props.selected == props.student?.id ? 35 : 30;
  const styles = {
    transform: `rotate(${turnVar * props.index}turn)`,
  };
  const flipName =
    props.index > props.numStudents / 4 &&
    props.index < (props.numStudents * 3) / 4;
  const flipTransform = flipName ? "scaleY(-1) scaleX(-1)" : "";

  // we create individual circle arcs as svgs programatically
  // then we rotate them to the correct place on the circle
  return (
    <div className={cssstyles["seat"]} style={styles}>
      <div className={cssstyles["name"]} style={{ transform: flipTransform }}>
        {props.showName && getName(props.student)}
      </div>
      <svg viewBox="0 0 1000 1000">
        <circle
          r="450"
          cx="500"
          cy="500"
          fillOpacity="0"
          stroke={STROKE_COLOR}
          strokeWidth={STROKE_WIDTH}
          pathLength="1"
          strokeDashoffset={`${
            0.25 + ((1 / props.numStudents) * STROKE_FRACTION) / 2
          }`}
          strokeDasharray={`${(1 / props.numStudents) * STROKE_FRACTION} ${
            1 - (1 / props.numStudents) * STROKE_FRACTION
          }`}
        />
      </svg>
    </div>
  );
};

// programatically generate seat graphic
const Seats = (props) => {
  return props.seats.map((student, ind) => {
    return (
      <Seat
        key={ind}
        index={ind}
        student={student}
        numStudents={props.seats.length}
        selected={props.selected}
        showName={props.discussionState}
      />
    );
  });
};

export default Seats;
