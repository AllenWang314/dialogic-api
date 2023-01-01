import styles from "./Splash.module.css";
import globalstyles from "./global.module.css";
import Button from "./components/Button";
import { useNavigate} from "react-router-dom";
import SessionApi from "./api/Session";

const REACT_APP_AVERAGE_ROSTER_ID = process.env.REACT_APP_AVERAGE_ROSTER_ID;

const Splash = () => {
  const navigate = useNavigate();

  const onClick = (_event) => {
    SessionApi.createSession({
      roster: REACT_APP_AVERAGE_ROSTER_ID,
      name: "Crusades - Economic / Religious Gain",
      student_list: [],
      graph: [],
      start_time: -1,
      end_time: -1,
      group_score: -1,
    }).then((res) => {
      return navigate(`/session/${res.data.id}`);
    })
  }

  return (
    <>
      <div className={globalstyles["App"]}>
        <div className={styles["content"]}>
          <div className={styles["header"]}>Welcome to Dialogic</div>
          <div className={styles["instruction"]}>
            <Button size="large" onClick={onClick}>Click to start</Button>
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
