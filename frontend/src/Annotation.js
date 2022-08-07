import "./Annotation.css";


function Annotation(props) {
    return <div className={props.count == 0 ? "zero-annotation" : "annotation"}>
        {props.letter} {props.count}
    </div>
}

export default Annotation;