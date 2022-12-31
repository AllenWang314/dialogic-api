import cssstyles from "./SeatName.module.css";

const SeatName = (props) => {
  const turnVar = 1 / props.numStudents;

  const getName = (student) => {
    if (student && student.name) {
      const name = student.name;
      const words = name.split(" ");
      return words[0] + " " + words[words.length - 1][0] + ".";
    }
    return "";
  };

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    // ev.dataTransfer.setData("targetid", ev.target.id);
    ev.dataTransfer.setData("index", props.index);
  }

  function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    props.onAssign(data);
    console.log("assigning", data);
    // props.document.getElementById(data).cloneNode(true);
  }
  // this part is where we did linear regression over what
  // looked nice to find the div width
  const width = 200 - 9 * props.numStudents;

  // the bottom names are flipped
  const flipName = props.index > props.numStudents / 4 && props.index < (props.numStudents * 3) / 4;
  const flipTransform = flipName ? "scaleY(-1) scaleX(-1)" : "";

  // programatically inject styles
  const styles = {
    transform:
      `translate(${300 - width / 2}px) translateY(${300 - 10}px) rotate(${
        turnVar * props.index
      }turn) translateY(${-300}px)` + flipTransform,
    width: `${width}px`,
  };

  return (
    <div
      className={cssstyles["seatname-button"]}
      style={styles}
      draggable="true"
      onDragOver={allowDrop}
      onDragStart={drag}
      onDrop={drop}
    >
      <div className={cssstyles["name"]}> {getName(props.student)}</div>
    </div>
  );
};

export default SeatName;
