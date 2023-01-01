import styles from "./Navbar.module.css"
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div className={styles["navbar-wrapper"]}>
      <div className={styles["navbar"]}>
          <Link className={styles["link"]} to="/">Dialogic</Link>
          {(props.seconds !== null) &&
          <div className={styles["timer"]}>{`${Math.floor(props.seconds/60)} : ${(props.seconds % 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
          })}`}</div>}
      </div>
      </div>
  );
}

export default Navbar;
