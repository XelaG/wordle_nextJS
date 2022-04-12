import { useState, useEffect } from "react";

const Keyboard = (props) => {

    const [keyboardObj, setKeyboardObj] = useState(null)

    function initKeyboardObj() {
        
    }

    function keyPress(event) {
        props.handleEvent(event.key)
    }

    useEffect(() => {
        initKeyboardObj()
        document.addEventListener("keydown", keyPress, false);
        return (() => {
            document.removeEventListener("keydown", keyPress, false);
        })
    }, []);

    if (!keyboardObj) {
        return (
            <div>
                <h1>Loading Keyboard</h1>
            </div>
        );
    }

    return (
        <div>

        </div>
    );
}
 
export default Keyboard;