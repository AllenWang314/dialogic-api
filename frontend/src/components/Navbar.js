import styles from "./Navbar.module.css"
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className={styles["navbar-wrapper"]}>
      <div className={styles["navbar"]}>
          <Link className={styles["link"]} to="/">Dialogic</Link>
      </div>
      </div>
  );
}

export default Navbar;
