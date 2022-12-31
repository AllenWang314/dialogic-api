import styles from "./Roster.module.css";

const RosterStudent = (props) => {
  const getName = (name) => {
    const words = name.split(" ");
    return words[0] + " " + words[words.length - 1][0] + ".";
  };
  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  return (
    <div
      className={styles["rosterName"]}
      draggable="true"
      onDragOver={allowDrop}
      onDragStart={drag}
      id={props.student.id}
      on
    >
      {getName(props.student.name)}
    </div>
  );
};

const Roster = (props) => {
  function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("index");
    props.onRemove(data);
  }
  return (
    <div onDrop={drop} className={styles["roster"]}>
      {props.students.map((obj, ind) => {
        return <RosterStudent key={ind} index={ind} student={obj} />;
      })}
    </div>
  );
};

export default Roster;
