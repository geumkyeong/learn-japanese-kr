import { useState } from "react";
import "./App.css";

function App() {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState({
    title: "JLPT N5",
    description: "",
  });

  const { title, description } = word;

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
        <button id="randomBtn">
          <i className="material-symbols-rounded">change_circle</i>
        </button>
      </div>
    </div>
  );
}

export default App;
