import styles from './Button.module.css';

export default function Button(props) {
    if (props.size == "large") {
        return <button disabled={props.disabled} onClick={props.onClick} className={styles["big-button"]}>
            {props.children}
        </button> 
    }
    return <button disabled={props.disabled} onClick={props.onClick} className={styles["button"]}>
        {props.children}
    </button>
}