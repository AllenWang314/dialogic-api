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

  function drop(ev) {
    ev.preventDefault();
  }
  return (
    <div
      className="name"
      draggable="true"
      onDragOver={allowDrop}
      onDrop={drop}
      onDragStart={drag}
      id={getName(props.student.name)}
    >
      {getName(props.student.name)}
    </div>
  );
};

export default RosterStudent;
