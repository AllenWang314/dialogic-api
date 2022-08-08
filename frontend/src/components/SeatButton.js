import "./SeatButton.css";

function SeatButton(props) {
  const turnVar = 1 / props.numStudents;

  const seatClick = (_event) => {
    props.setSelected([...props.selected, props.index.toString()]);
  };

  // this part is where we did linear regression over what
  // looked nice to find the div width
  const width = 240 - 9.5 * props.numStudents;

  const styles = {
    transform: `translate(${300 - width / 2}px) translateY(${300 - 10}px) rotate(${
      turnVar * props.index
    }turn) translateY(${-250}px)`,
    width: `${width}px`,
  };

  return <div id={props.index} className="seat-button" onClick={seatClick} style={styles}></div>;
}

export default SeatButton;
