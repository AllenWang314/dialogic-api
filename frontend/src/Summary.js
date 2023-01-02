import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RosterApi from "./api/Roster";
import SessionApi from "./api/Session";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import SeatButtons from "./components/SeatButtons";
import SeatNameButtons from "./components/SeatNameButtons";
import Seats from "./components/Seats";
import globalstyles from "./global.module.css";
import styles from "./Session.module.css";

const Summary = () => {
  let { sessionId } = useParams();
  const [edges, setEdges] = useState(null);
  const [seats, setSeats] = useState(null); // list of student ids
  const [replayIndex, setReplayIndex] = useState(1); // list of student ids
  const [sessionTime, setSessionTime] = useState(null); // list of student ids
  useEffect(() => {
    SessionApi.getSession(sessionId).then((session) => {
      setEdges(session.data.graph);
      console.log(session.data);
      setSessionTime(session.data.end_time - session.data.start_time);
      RosterApi.getStudents(session.data.roster).then((res) => {
        setSeats(
          session.data.student_list.map((student_id) => {
            return res.data.find((student) => student.id == student_id);
          })
        );
      });
    });
  }, []);

  if (seats && edges) {
    return (
      <div className={globalstyles["App"]}>
        <Navbar />
        <div className={globalstyles["page-wrapper"]}>
          <div className={styles["begin"]} style={{ flexDirection: "column" }}>
            <h1> Summary</h1>
            <div className={styles["circle"]}>
              <Seats seats={seats} selected={-1} discussionState={true} />
              <Arrows seats={seats} edges={edges.slice(0, replayIndex + 1)} />
              <SeatButtons
                seats={seats}
                selected={-1}
                setSelected={null}
                discussionState={true}
                onDelete={null}
              />
            </div>
            <div>
              Graph density:{" "}
              {(edges.length / (seats.length * (seats.length - 1)) / 2).toFixed(
                2
              )}
            </div>
            <div className={styles["timer"]}>{`Discussion length: ${Math.floor(
              sessionTime / 60
            )}:${(sessionTime % 60).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
            })}`}</div>
            <div>Total turns taken: {edges.length}</div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              {replayIndex < edges.length - 1 && (
                <Button
                  style={{
                    position: "absolute",
                    height: "50px",
                    width: "100px",
                    bottom: "10%",
                  }}
                  onClick={() => setReplayIndex(replayIndex + 1)}
                >
                  <div>Forward</div>
                </Button>
              )}
              {replayIndex > 0 && (
                <Button
                  style={{
                    position: "absolute",
                    height: "50px",
                    width: "100px",
                    bottom: "10%",
                  }}
                  onClick={() => setReplayIndex(replayIndex - 1)}
                >
                  <div>Backward</div>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default Summary;
