import Head from "next/head";
import { useState, useEffect } from "react";
import PlayingGrid from "../components/PlayingGrid";
import styles from "../styles/Home.module.css";
import Keyboard from './../components/Keyboard';


const Home = () => {
    const [guesses, setGuesses] = useState(null)
    const [word, setWord] = useState(null)
    const [guessIdx, setGuessIdx] = useState(0)
    const [isGameFinished, setIsGameFinished] = useState(false)

    async function getWord() {
        setWord('fable')
    }

    function initGuesses() {
        var guessObj = [
            {
                'letter': null,
                'isRightPosition': false,
                'isInWord': false
            },
            {
                'letter': null,
                'isRightPosition': false,
                'isInWord': false
            },
            {
                'letter': null,
                'isRightPosition': false,
                'isInWord': false
            },
            {
                'letter': null,
                'isRightPosition': false,
                'isInWord': false
            },
            {
                'letter': null,
                'isRightPosition': false,
                'isInWord': false
            },
        ]

        var guessesTmp = []
        guessesTmp.push(JSON.parse(JSON.stringify(guessObj)))
        guessesTmp.push(JSON.parse(JSON.stringify(guessObj)))
        guessesTmp.push(JSON.parse(JSON.stringify(guessObj)))
        guessesTmp.push(JSON.parse(JSON.stringify(guessObj)))
        guessesTmp.push(JSON.parse(JSON.stringify(guessObj)))
        guessesTmp.push(JSON.parse(JSON.stringify(guessObj)))
        setGuesses(guessesTmp)
    }

    useEffect(() => {
        getWord()
        initGuesses()
    }, []);

    if (!word || !guesses) {
        return (
            <div className={styles.container}>
                <Head>
                    <title>Wordle Written in Next.js</title>
                    <meta
                    name="keywords"
                    content="wordle,
                    next.js, nextjs, alex gaignard, Alex, Gaignard"
                    />
                </Head>
                <h1>Loading...</h1>
            </div>
        )
    }

    // TODO check how many occurences of a letter to not say 
    // it's in word if already said
    function checkForGuess(idx) {
        var cpyGuesses = [...guesses]
        var isFinished = true
        for (let i = 0; i < cpyGuesses[idx].length; i++) {
            if (word.indexOf(cpyGuesses[idx][i].letter) >= 0) {
                cpyGuesses[idx][i].isInWord = true
            }
            if (word[i] === cpyGuesses[idx][i].letter) {
                cpyGuesses[idx][i].isRightPosition = true
            } else {
                isFinished = false
            }
        }
        setIsGameFinished(isFinished)
        setGuesses(cpyGuesses)
    }

    function handleEvent(key) {
        var cpyGuesses = [...guesses]
        if (guessIdx >= guesses.length) return

        if (key === 'Backspace') {
            for (let i = cpyGuesses[guessIdx].length - 1; i >= 0; i--) {
                if (cpyGuesses[guessIdx][i].letter) {
                    cpyGuesses[guessIdx][i].letter = null;
                    break
                }
            }
        } else if (key === 'Enter') {
            if (guessIdx < guesses.length) {
                var isAnyLetterMissing = false
                for (let i = 0; i < cpyGuesses[guessIdx].length; i++) {
                    if (!cpyGuesses[guessIdx][i].letter) {
                        isAnyLetterMissing = true
                        break
                    }
                }
                if(!isAnyLetterMissing) {
                    checkForGuess(guessIdx)
                    setGuessIdx(guessIdx++)
                } else {
                    alert("Missing some letter to submit")
                }

            }
        } else if (key.length === 1 && key.toLowerCase().charCodeAt(0) > 96 && key.toLowerCase().charCodeAt(0) < 123) {
            for (let i = 0; i < cpyGuesses[guessIdx].length; i++) {
                if (!cpyGuesses[guessIdx][i].letter) {
                    cpyGuesses[guessIdx][i].letter = key;
                    break
                }
            }
        }
        setGuesses(cpyGuesses)
    }

    return (
    <div className={styles.container}>
        <Head>
            <title>Wordle Written in Next.js</title>
            <meta
            name="keywords"
            content="wordle,
            next.js, nextjs, alex gaignard, Alex, Gaignard"
            />
        </Head>
        <PlayingGrid guesses={guesses} word={word} guessIdx={guessIdx}/>
        {!isGameFinished && <Keyboard handleEvent={handleEvent} guesses={guesses} word={word}/>}
    </div>
    )
}

export default Home;


