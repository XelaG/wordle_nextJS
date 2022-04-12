import styles from "../styles/GridRow.module.css";
import LetterCase from "./LetterCase";

const GridRow = (props) => {
    return (
        <div className={styles.container}>
            {props.guess.map((letter, idx) => {
                return <LetterCase key={idx} obj={letter} />
            })}
        </div>
    );
}
 
export default GridRow;