import toast from "react-hot-toast";
import "./OuterButton.css";
import Annotation from "./Annotation.js"

function OuterButton(props) {
  const turnVar = 1 / props.numStudents;
  const STROKE_FRACTION = 0.7;

  const seatClick = (event) => {
      console.log("shit")
    toast.success(`clicked on ${props.student.name}`);
  };

  const width = 240 - 9 * props.numStudents;

  const styles = {
    transform: `translate(${300-width/2}px) translateY(${300-20}px) rotate(${turnVar * props.index}turn) translateY(${-300}px)`,
    width: `${width}px`
  };

  return (
    <div className="outer-button" onClick={seatClick} style={styles}>
        <Annotation letter="A"/>
    </div>
  );
}

export default OuterButton;
