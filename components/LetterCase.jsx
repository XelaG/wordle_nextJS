import styles from "../styles/LetterCase.module.css";


const LetterCase = (props) => {

    if (props.obj.isRightPosition) {
        return (
            <div className={styles.correct}>
            {props.obj.letter && props.obj.letter.toUpperCase()}
        </div>
        )
    } else if (props.obj.isInWord) {
        return (
            <div className={styles.inWord}>
            {props.obj.letter && props.obj.letter.toUpperCase()}
        </div>
        )
    } else {
        return (
            <div className={styles.container}>
                {props.obj.letter && props.obj.letter.toUpperCase()}
            </div>
        );
    }

}
 
export default LetterCase;