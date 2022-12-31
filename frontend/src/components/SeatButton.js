import "./SeatButton.css";
import { AiOutlineClose } from "react-icons/ai";

function SeatButton(props) {
  const turnVar = 1 / props.numStudents;

  const seatClick = (_event) => {
    props.setSelected([...props.selected, props.index.toString()]);
  };

  // this part is where we did linear regression over what
  // looked nice to find the div width
  const width = 240 - 9.5 * props.numStudents;

  // 1. translate horizontally to center, we adjust by width/2 to center
  // 2. translate vertically to center in circle
  // 3. rotate so that each div (dynamically) is facing the right direction
  // 4. push everything to outside of circle
  // 5. (optional) flip the div if it's at the bottom
  const styles = {
    transform: `translate(${300 - width / 2}px) translateY(${300 - 10}px) rotate(${
      turnVar * props.index
    }turn) translateY(${-250}px)`,
    width: `${width}px`,
  };

  return (
    <div id={props.index} className="seat-button" onClick={seatClick} style={styles}>
      {props.deleteMode && <AiOutlineClose />}
    </div>
  );
}

export default SeatButton;
