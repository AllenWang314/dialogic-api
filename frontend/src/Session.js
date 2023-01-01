import styles from "./Session.module.css";
import Seats from "./components/Seats";
import { useState, useEffect } from "react";
import AddButton from "./components/AddButton";
import Button from "./components/Button";
import SeatNameButton from "./components/SeatNameButtons";
import Roster from "./components/Roster";
import { STUDENTS_MORE, ANNOTATIONS } from "./constants.js";
import globalstyles from "./global.module.css";
import Navbar from "./components/Navbar";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import SeatButtons from "./components/SeatButtons";
import OuterButton from "./components/OuterButton";
import Modal from "./components/Modal";
import RosterApi from "./api/Roster";
import SessionApi from "./api/Session";
import Arrows from "./components/Arrows";
import { FaPlayCircle, FaStopCircle, FaUndo, FaRegEdit } from "react-icons/fa";

const DEFAULT_COUNT = 8;

const Session = () => {
  let { sessionId } = useParams();

  const [seats, setSeats] = useState(null); // list of student ids
  const [annotationModalStudent, setAnnotationModalStudent] = useState(null);
  const [annotationMap, setAnnotationMap] = useState(null);
  const [session, setSession] = useState(null);
  const [roster, setRoster] = useState(null);
  const [students, setStudents] = useState(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [notes, setNotes] = useState("");
  // discussion state: "initial" "discussing" "adjust" "finished"
  const [discussionState, setDiscussionState] = useState("initial"); // map student id to student data from API
  const [selected, setSelected] = useState(null);
  const [edges, setEdges] = useState(null);

  useEffect(() => {
    SessionApi.getSession(sessionId).then((res) => {
      // set initial session data
      setSession(res.data);
      setNotes(res.data.notes)

      if (res.data.discussion_state !== "initial") {
        setDiscussionState(res.data.discussion_state);
        setSecondsElapsed(
          Math.round((Date.now() - res.data.start_time * 1000) / 1000)
        );
      }
      setEdges(res.data.graph);
    });
  }, []);

  useEffect(() => {
    if (session) {
      RosterApi.getRoster(session.roster).then((res) => {
        setRoster(res.data);
      });

      RosterApi.getStudents(session.roster).then((res) => {
        // set students
        setStudents(res.data);

        // set seats based on session data and discussion state
        if (session.discussion_state != "initial") {
          setSeats(
            session.student_list.map((student_id) => {
              return res.data.find((student) => student.id == student_id);
            })
          );
          setSecondsElapsed(
            Math.round((Date.now() - session.start_time * 1000) / 1000)
          );
        } else {
          console.log("what");
          setSeats(Array(DEFAULT_COUNT).fill(null));
        }
      });
    }
  }, [session]);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      //if esc key was not pressed in combination with ctrl or alt or shift
      const isNotCombinedKey = !(
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      );
      if (isNotCombinedKey) {
        setSelected([]);
      }
    }
  });

  setInterval(() => {
    if (session && discussionState !== "initial" && secondsElapsed) {
      setSecondsElapsed(
        Math.round((Date.now() - session.start_time * 1000) / 1000)
      );
    }
  }, 50);

  setInterval(() => {
    if (session && (discussionState == "discussing" || discussionState == "adjust")) {
      SessionApi.updateSession(sessionId, {
        notes: notes,
      });
    }
  }, 60000);

  const beginDiscussion = () => {
    SessionApi.updateSession(session.id, {
      student_list: seats.filter(Boolean).map((seat) => {
        return seat.id;
      }),
      discussion_state: "discussing",
      start_time: Math.round(Date.now() / 1000),
      notes: notes,
    }).then((res) => {
      setDiscussionState(res.data.discussion_state);
      setSession(res.data);
      setSeats(
        res.data.student_list.map((student_id) => {
          return students.find((student) => student.id == student_id);
        })
      );
    });
  };

  const finishAdjustment = () => {
    SessionApi.updateSession(session.id, {
      student_list: seats.filter(Boolean).map((seat) => {
        return seat.id;
      }),
      notes: notes,
    }).then((res) => {
      setSession(res.data);
      setDiscussionState("discussing")
      setSeats(
        res.data.student_list.map((student_id) => {
          return students.find((student) => student.id == student_id);
        })
      );
    }); 
  }

  const displayAddButtons = () => {
    return (
      (discussionState == "initial" || discussionState == "adjust") &&
      seats.length < 20
    );
  };

  const displayBeginButton = () => {
    return (
      (discussionState == "initial" || discussionState == "adjust") &&
      seats.filter(Boolean).length > 1
    );
  };

  const undoEdge = () => {
    edges.pop();
    if (edges.length === 1) {
      edges.pop();
    }
    setEdges([...edges]);
    setSelected(null);
  };

  // modal listener outer button
  const outerButtonClick = (student) => {
    setAnnotationModalStudent(student);
  };

  // listener for drawing lines
  useEffect(() => {
    if (selected) {
      setEdges([...edges, selected]);
    }
  }, [selected]);

  useEffect(() => {
    if (edges) {
      SessionApi.updateSession(sessionId, {
        graph: edges,
        notes: notes,
      });
    }
  }, [edges]);

  const addSeat = (ind) => {
    // adds a seat in students after index ind
    // note that 0th index always rendered at center top of page
    if (displayAddButtons()) {
      seats.splice(ind + 1, 0, null);
      setSeats([...seats]);
    }
  };

  const deleteSeat = (ind) => {
    // deletes seat at index ind
    // note that 0th index always rendered at center top of page
    seats.splice(ind, 1);
    setSeats([...seats]);
  };

  const assignSeat = (student_id, ind) => {
    seats.splice(
      ind,
      1,
      students.find((student) => student.id == student_id)
    );
    setSeats([...seats]);
  };

  const unassignSeat = (ind) => {
    if (ind) {
      seats.splice(ind, 1, null);
      setSeats([...seats]);
    }
  };

  // programatically generate plus buttons
  const generatePlusButtons = (students) => {
    return students.map((obj, ind) => {
      return (
        <AddButton
          key={ind}
          index={ind}
          student={obj}
          numStudents={students.length}
          onClick={() => {
            addSeat(ind);
          }}
        />
      );
    });
  };

  const generateOuterButtons = (students) => {
    return students.map((obj, ind) => {
      if (discussionState == "initial" || discussionState == "adjust") {
        return (
          <SeatNameButton
            key={ind}
            index={ind}
            student={obj}
            adjustMode={
              discussionState == "initial" || discussionState == "adjust"
            }
            numStudents={students.length}
            onAssign={(student_id) => {
              assignSeat(student_id, ind);
            }}
            onRemove={unassignSeat}
          />
        );
      } else {
        return (
          <OuterButton
            key={ind}
            index={ind}
            student={obj}
            numStudents={students.length}
            annotationMap={annotationMap}
            setAnnotationMap={setAnnotationMap}
            outerButtonClick={outerButtonClick}
            showAnnotations={true}
          />
        );
      }
    });
  };

  const notesOnChange = (event) => {
    event.preventDefault()
    setNotes(event.target.value)
  }

  if (students && roster) {
    return (
      <>
        <div className={globalstyles["App"]}>
          <Navbar
            seconds={discussionState !== "initial" ? secondsElapsed : null}
          />
          <div className={globalstyles["page-wrapper"]}>
            <div className={styles["begin"]}>
              {(discussionState == "initial" ||
                discussionState == "adjust") && (
                <Roster
                  onRemove={unassignSeat}
                  students={students}
                  seats={seats}
                />
              )}
              <div className={styles["circle"]}>
                <Seats
                  seats={seats}
                  selected={selected}
                  discussionState={discussionState == "discussing"}
                />
                <SeatButtons
                  seats={seats}
                  selected={selected}
                  setSelected={setSelected}
                  discussionState={discussionState == "discussing"}
                  onDelete={() => deleteSeat()}
                />
                {displayAddButtons() && generatePlusButtons(seats)}
                {generateOuterButtons(seats)}
                {discussionState == "discussing" && (
                  <Arrows seats={seats} edges={edges} />
                )}
              </div>
              <Modal
                student={annotationModalStudent}
                annotationMap={annotationMap}
                setAnnotationMap={setAnnotationMap}
                closeModal={() => {
                  setAnnotationModalStudent(null);
                }}
                openModal={outerButtonClick}
              />
          {(discussionState === "initial" || discussionState === "adjust") &&
              <div className={styles["begin-button"]}>
                {discussionState === "initial" ? (
                  <Button
                    size="large"
                    disabled={!displayBeginButton()}
                    onClick={() => beginDiscussion()}
                  >
                    Start Discussion
                  </Button>
                ) : (
                  <Button
                    size="large"
                    disabled={!displayBeginButton()}
                    onClick={() => finishAdjustment()}
                  >
                    Finish Adjustment
                  </Button>
                )}
              </div>
  }
              {!(
                discussionState == "initial" || discussionState == "adjust"
              ) && (
                <div className={styles["session-right"]}>
                  <textarea className={styles["notes"]} onChange={notesOnChange}>{notes}</textarea>
                  <div className={styles["button-panel"]}>
                    <Button
                      style={{
                        position: "absolute",
                        height: "50px",
                        width: "100px",
                        bottom: "10%",
                      }}
                      onClick={() => undoEdge()}
                    >
                      <div>Stop</div> <FaStopCircle />
                    </Button>
                    <Button
                      style={{
                        position: "absolute",
                        height: "50px",
                        width: "100px",
                        bottom: "10%",
                      }}
                      onClick={() => undoEdge()}
                    >
                      <div>Undo</div> <FaUndo />
                    </Button>
                    <Button
                      style={{
                        position: "absolute",
                        height: "50px",
                        width: "100px",
                        bottom: "10%",
                      }}
                      onClick={() => setDiscussionState("adjust")}
                    >
                      <div>Adjust</div> <FaRegEdit />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={globalstyles["small-screen"]}>
          Your screen is too small to view our work! Please switch over to an
          ipad or laptop. -The Dialogic Team
        </div>
      </>
    );
  }

  return <div>Loading...</div>;
};

export default Session;
