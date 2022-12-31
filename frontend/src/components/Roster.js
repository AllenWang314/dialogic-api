import styles from "./Roster.module.css";

const RosterStudent = (props) => {
  const getName = (name) => {
    const words = name.split(" ");
    return words[0] + " " + words[words.length - 1][0] + ".";
  };

  function drag(ev) {
    ev.dataTransfer.setData("studentID", ev.target.id);
  }

  return (
    <div
      className={styles["rosterName"]}
      draggable={!props.assigned}
      onDragStart={drag}
      id={props.student.id}
      style={props.assigned ? { opacity: 0.6, cursor: "not-allowed" } : {}}
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
  function allowDrop(ev) {
    ev.preventDefault();
  }
  return (
    <div className={styles["roster"]}>
      <div className={styles["header"]}>Students</div>
      <div onDrop={drop} onDragOver={allowDrop} className={styles["classList"]}>
        {props.students.map((obj, ind) => {
          return (
            <RosterStudent
              key={ind}
              index={ind}
              student={obj}
              assigned={props.seats.some((student) => student?.student?.id == obj.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Roster;
