import styles from "./Splash.module.css";
import globalstyles from "./global.module.css";
import { useNavigate } from "react-router-dom";

const DEFAULT_COUNT = 13;

const Splash = () => {
  const navigate = useNavigate();

  document.addEventListener("keydown", function (_event) {
    navigate('/session');
  });

  return (
    <>
      <div className={globalstyles["App"]}>
        <div className={styles["content"]}>
          <div className={styles["header"]}>Welcome to Dialogic</div>
          <div className={styles["instruction"]}>
            <div className={styles["instruction"]}>Press any key to start</div>
          </div>
        </div>
      </div>
      <div className={globalstyles["small-screen"]}>
        Your screen is too small to view our work! Please switch over to an ipad
        or laptop. -The Dialogic Team
      </div>
    </>
  );
};

export default Splash;
