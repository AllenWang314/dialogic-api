import { STUDENTS_FEW, STUDENTS_AVERAGE, STUDENTS_MORE, ANNOTATIONS } from "./../constants.js";
import RosterStudent from "./RosterStudent.js";



const Roster = (props) => {
    
    return STUDENTS_AVERAGE.map((obj, ind) => {
        return (
          <RosterStudent
            key={ind}
            index={ind}
            student={obj}
          />
        );
      });
  };
  
  export default Roster;
  