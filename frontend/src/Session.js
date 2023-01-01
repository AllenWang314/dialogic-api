import styles from "./Session.module.css";
import Seats from "./components/Seats";
import { useState, useEffect } from "react";
import AddButton from "./components/AddButton";
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

const DEFAULT_COUNT = 13;

const Session = () => {
  let { sessionId } = useParams();

  const [seats, setSeats] = useState(null); // list of student ids
  const [annotationModalStudent, setAnnotationModalStudent] = useState(null);
  const [annotationMap, setAnnotationMap] = useState(null);
  const [session, setSession] = useState(null);
  const [roster, setRoster] = useState(null);
  const [students, setStudents] = useState(null);
  const [discussionState, setDiscussionState] = useState(false); // map student id to student data from API
  const [selected, setSelected] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    SessionApi.getSession(sessionId).then((res) => {
      setSession(res.data);
      setDiscussionState(res.data.start_time > 0);
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
        if (discussionState) {
          setSeats(
            session.student_list.map((student_id) => {
              return res.data.find((student) => student.id == student_id);
            })
          );
        } else {
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

  const beginDiscussion = () => {
    SessionApi.updateSession(session.id, {
      student_list: seats.filter(Boolean).map((seat) => {
        return seat.id;
      }),
      start_time: Math.round(Date.now() / 1000),
    }).then((res) => {
      setDiscussionState(true);
      setSession(res.data);
      setSeats(
        res.data.student_list.map((student_id) => {
          return students.find((student) => student.id == student_id);
        })
      );
    });
  };

  const displayAddButtons = () => {
    return !discussionState && seats.length < 20;
  };

  const displayBeginButton = () => {
    return !discussionState && seats.filter(Boolean).length > 1;
  };

  // modal listener outer button
  const undoEdge = () => {
    edges.pop();
    setEdges(edges);
    setSelected([]);
  };

  // modal listener outer button
  const outerButtonClick = (student) => {
    setAnnotationModalStudent(student);
  };

  // listener for drawing lines
  useEffect(() => {
    if (selected.length === 2) {
      setEdges([...edges, selected]);
      setSelected([]);
    }
  }, [selected, edges]);

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
      if (!discussionState) {
        return (
          <SeatNameButton
            key={ind}
            index={ind}
            student={obj}
            adjustMode={!discussionState}
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

  if (students && roster) {
    return (
      <>
        <div className={globalstyles["App"]}>
          <Navbar />
          <div className={globalstyles["page-wrapper"]}>
            <div className={styles["begin"]}>
              {!discussionState && (
                <Roster
                  onRemove={unassignSeat}
                  students={students}
                  seats={seats}
                />
              )}
              <div className={styles["circle"]}>
                <Seats
                  seats={seats}
                  selected={selected[0]}
                  discussionState={discussionState}
                />
                <SeatButtons
                  seats={seats}
                  selected={selected}
                  setSelected={setSelected}
                  discussionState={discussionState}
                  onDelete={() => deleteSeat()}
                />
                {displayAddButtons() && generatePlusButtons(seats)}
                {generateOuterButtons(seats)}
                <Arrows seats={seats} edges={edges} />
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

              {displayBeginButton() && (
                <button
                  style={{
                    position: "absolute",
                    height: "50px",
                    width: "100px",
                  }}
                  onClick={() => beginDiscussion()}
                >
                  begin discussion
                </button>
              )}
              {discussionState && (
                <button
                  style={{
                    position: "absolute",
                    height: "50px",
                    width: "100px",
                    bottom: "10%",
                  }}
                  onClick={() => undoEdge()}
                >
                  undo
                </button>
              )}
            </div>

            {discussionState && (
              <button
                style={{
                  position: "absolute",
                  height: "50px",
                  width: "100px",
                  bottom: "10%",
                }}
                onClick={() => undoEdge()}
              >
                undo
              </button>
            )}
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
