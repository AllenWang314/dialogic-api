import toast from "react-hot-toast";
import "./InnerButton.css";

function InnerButton(props) {
  const turnVar = 1 / props.numStudents;
  const STROKE_FRACTION = 0.7;

  const seatClick = (event) => {
    props.setSelected([...props.selected, props.index.toString()]);
  };

  const width = 240 - 9 * props.numStudents;

  const styles = {
    transform: `translate(${300 - width / 2}px) translateY(${300 - 10}px) rotate(${
      turnVar * props.index
    }turn) translateY(${-250}px)`,
    width: `${width}px`,
  };

  return <div id={props.index} className="inner-button" onClick={seatClick} style={styles}></div>;
}

export default InnerButton;
