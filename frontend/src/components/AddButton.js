import cssstyles from "./AddButton.module.css";
import { AiOutlinePlus } from "react-icons/ai";

function AddButton(props) {
  const turnVar = 1 / props.numStudents;

  const onClick = (_event) => {
    props.onClick();
  };

  // this part is where we did linear regression over what
  // looked nice to find the div width
  const width = 30;

  // 1. translate horizontally to center, we adjust by width/2 to center
  // 2. translate vertically to center in circle
  // 3. rotate so that each div (dynamically) is facing the right direction
  // 4. push everything to outside of circle
  // 5. (optional) flip the div if it's at the bottom
  const styles = {
    transform: `translate(${300 - width / 2}px) translateY(${
      300 - 10
    }px) rotate(${turnVar * (props.index + 0.5)}turn) translateY(${-230}px)`,
    width: `${width}px`,
    color: `white`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
    fontSize: `20px`,
  };

  return (
    <div
      id={props.index}
      className={cssstyles["add-button"]}
      onClick={onClick}
      style={styles}
    >
      <AiOutlinePlus />
    </div>
  );
}

export default AddButton;
