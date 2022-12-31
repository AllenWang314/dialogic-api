import styles from "./Begin.module.css";
import { useState, useEffect } from "react";

const SeatNameButton = (props) => {
  const turnVar = 1 / props.numStudents;

  const seatClick = (_event) => {
    props.outerButtonClick(props.student);
  };
  const [name, setName] = useState();

  const getName = (name) => {
    if (name) {
      const words = name.split(" ");
      return words[0] + " " + words[words.length - 1][0] + ".";
    }
    return "";
  };

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data);
    setName(data);
    document.getElementById(data).cloneNode(true);
  }
  // this part is where we did linear regression over what
  // looked nice to find the div width
  const width = 240 - 9 * props.numStudents;

  // the bottom names are flipped
  const flipName = props.index > props.numStudents / 4 && props.index < (props.numStudents * 3) / 4;
  const flipTransform = flipName ? "scaleY(-1) scaleX(-1)" : "";
  const flipAlignItems = flipName ? "flex-end" : "flex-start";

  // programatically inject styles
  const styles1 = {
    transform:
      `translate(${300 - width / 2}px) translateY(${300 - 25}px) rotate(${
        turnVar * props.index
      }turn) translateY(${-300}px)` + flipTransform,
    width: `${width}px`,
    alignItems: flipAlignItems,
  };

  return (
    <div
      className={styles["seatname-button"]}
      onClick={seatClick}
      style={styles1}
      draggable="true"
      onDragOver={allowDrop}
      onDrop={drop}
      onDragStart={drag}
    >
      <div> {getName(name)}</div>
    </div>
  );
};

export default SeatNameButton;
