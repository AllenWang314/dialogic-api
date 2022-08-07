import "./Modal.css";

function Modal(props) {
  if (props.student == null) {
    return <></>;
  }

  const modalClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  const changed = (letter, val) => {
    const annotations = props.annotationMap[props.student.student_id];
    const newAnnotations = {...annotations, [letter]: val}
    console.log(annotations)
    console.log(newAnnotations)
    props.setAnnotationMap({...props.annotationMap, [props.student.student_id]: newAnnotations})
  }

  return (
    <div className="annotation-modal-root" onClick={props.closeModal}>
      <div className="annotation-modal" onClick={modalClick}>
        <div className="annotation-modal-header">
          <div>Edit Annotations for {props.student.name}</div>
          <div className="annotation-modal-close" onClick={props.closeModal}>
            x
          </div>
        </div>
        <div className="annotation-modal-body">
          <div className="annotation-row">
            <div>T: <input onChange={(event) => {changed("T", event.target.value)}} type="number" value={props.annotationMap[props.student.student_id]["T"]}></input></div>
            <div>A: <input onChange={(event) => {changed("A", event.target.value)}} type="number" value={props.annotationMap[props.student.student_id]["A"]}></input></div>
            <div>C: <input onChange={(event) => {changed("C", event.target.value)}} type="number" value={props.annotationMap[props.student.student_id]["C"]}></input></div>
          </div>
          <div className="annotation-row">
          <div>Q: <input onChange={(event) => {changed("Q", event.target.value)}} type="number" value={props.annotationMap[props.student.student_id]["Q"]}></input></div>
          <div>R: <input onChange={(event) => {changed("R", event.target.value)}} type="number" value={props.annotationMap[props.student.student_id]["R"]}></input></div>
          <div>F: <input onChange={(event) => {changed("F", event.target.value)}} type="number" value={props.annotationMap[props.student.student_id]["F"]}></input></div>
          </div>
        </div>
        <div className="modal-save" onClick={props.closeModal}>Save</div>
      </div>
    </div>
  );
}

export default Modal;
