import "./Annotation.css";

const Annotation = (props) => {
  // if there are 0 annotations for letter, gray out
  return (
    <div className={props.count == 0 ? "zero-annotation" : "annotation"}>
      <div>{props.letter}</div>
      <div>{props.count}</div>
    </div>
  );
};

export default Annotation;
