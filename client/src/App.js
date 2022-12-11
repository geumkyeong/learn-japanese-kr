import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const synth = window.speechSynthesis;

function App() {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState({
    title: "JLPT N5",
    description: "",
  });

  const { title, description } = word;

  useEffect(() => {
    getDictionaryData();
  }, []);

  const getDictionaryData = async () => {
    await axios
      .get("/api/dictionary")
      .then((res) => {
        let dictionary = res.data.data;
        dictionary.map((word) =>
          setWords((prevState) => [
            ...prevState,
            {
              title: word.title,
              description: word.description,
            },
          ])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRandomWord = () => {
    let randomIndex = Math.floor(Math.random() * words.length);
    let item = words[randomIndex];

    setWord(item);
  };

  const speechWord = () => {
    let pronounce = title.split(" ");
    let utterance = new SpeechSynthesisUtterance(pronounce[0]);
    utterance.lang = "ja-JP";
    synth.speak(utterance);
  };

  return (
    <div className="container">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h1 id="title">{title}</h1>
          </div>
          <div className="flip-card-back">
            <p id="description">{description}</p>
          </div>
        </div>
      </div>
      <div className="actions">
        <button id="speechBtn" onClick={speechWord}>
          <i className="material-symbols-rounded">volume_up</i>
        </button>
        <button id="rotateBtn" onClick={getRandomWord}>
          <i className="material-symbols-rounded">change_circle</i>
        </button>
      </div>
    </div>
  );
}

export default App;
