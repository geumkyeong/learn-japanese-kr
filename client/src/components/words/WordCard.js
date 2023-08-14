import { useEffect, useState } from "react";
import axios from "axios";
import classes from "./WordCard.module.css";

function WordCard(props) {
  const [idx, setIdx] = useState(0);
  const [word, setWord] = useState({
    id: "",
    title: "JLPT-N5",
    description: "",
  });
  const [words, setWords] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped((prevState) => !prevState);
  };

  const getDictionaryData = async () => {
    await axios
      .get("/api/dictionary")
      .then((res) => {
        const items = res.data.data;
        setWords(items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRandomWord = (direction) => {
    if (idx <= -1 && idx > 198) {
      setIdx(0);
    }

    if (direction === "left") {
      setIdx((prevState) => prevState - 1);
    }

    if (direction === "right") {
      setIdx((prevState) => prevState + 1);
    }

    const re = /[\u3040-\u309F]|[\u4E00-\u9FAF]/g;
    const [mainWord, pronounce] = words[idx].title.split(" ");
    setWord({
      ...words[idx],
      title:
        pronounce.split(/[,|·]/)[0].match(re).join("") +
        " " +
        mainWord.match(re).join(""),
    });
  };

  const synth = window.speechSynthesis;
  const speechWord = () => {
    const pronounce = word.title.split(" ")[1];
    const utterance = new SpeechSynthesisUtterance(pronounce);
    utterance.lang = "ja-JP";
    synth.speak(utterance);
  };

  useEffect(() => {
    getDictionaryData();
  }, []);

  const { title, description } = word;

  return (
    <main>
      <div
        className={classes.flipCard}
        onMouseEnter={flipCard}
        onMouseLeave={flipCard}
      >
        <div
          className={classes.flipCardInner}
          style={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div className={classes.flipCardFront}>
            <div>{title.split(" ")[1]}</div>
            <h1>{title.split(" ")[0]}</h1>
          </div>
          <div className={classes.flipCardBack}>
            <div className={classes.description}>
              {description.split(/[0-9.]/g).map((v, i) => {
                return i === 0 ? (
                  <span>{v.replace(/;/g, ", ")}</span>
                ) : (
                  <div key={i}>{v.replace(/;/g, ", ")}</div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={() => getRandomWord("left")}>
          <i className="material-symbols-rounded">skip_previous</i>
        </button>
        <button className={classes.speechBtn} onClick={speechWord}>
          <i className="material-symbols-rounded">play_arrow</i>
        </button>
        <button onClick={() => getRandomWord("right")}>
          <i className="material-symbols-rounded">skip_next</i>
        </button>
      </div>
    </main>
  );
}

export default WordCard;
