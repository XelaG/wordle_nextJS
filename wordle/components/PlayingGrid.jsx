import GridRow from './GridRow';
import styles from "../styles/PlayingGrid.module.css";


const PlayingGrid = (props) => {
    return (
        <div className={styles.container}>
            {props.guesses.map((guess, idx) => {
                return <GridRow key={idx} guess={guess} />
            })}
        </div>
    );
}
 
export default PlayingGrid;