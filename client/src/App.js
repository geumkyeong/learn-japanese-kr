import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

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

  const getDictionaryData = () => {
    axios
      .get("http://localhost:5000/api/dictionary")
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
    let index = Math.floor(Math.random() * words.length);

    setWord({
      title: words[index].title,
      description: words[index].description,
    });
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
        <button id="speechBtn">
          <i className="material-symbols-rounded">volume_up</i>
        </button>
        <button id="randomBtn" onClick={getRandomWord}>
          <i className="material-symbols-rounded">change_circle</i>
        </button>
      </div>
    </div>
  );
}

export default App;
