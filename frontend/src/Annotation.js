import "./Annotation.css";


function Annotation(props) {
    return <div className={props.count == 0 ? "zero-annotation" : "annotation"}>
        <div>{props.letter}</div>
        <div>{props.count}</div>
    </div>
}

export default Annotation;