import React from 'react';
import './App.css';
import { useState, useEffect } from "react";

function App() {
  const sequence = ['#8A2BE2', '#CA1F7B', '#DC143C', '#FFD700', '#FE5A1D', '#0070BB', '#89CFF0', '#50C878', '#228B22'];
  const [shuffle, setShuffle] = useState([]);
  const [clicked, setClicked] = useState(Array(9).fill(null));
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const shuffled = sequence.sort(() => Math.random() - 0.5);
    setShuffle(shuffled);
  }, []);

  function clickHandler(index) {
    const updatedClicked = [...clicked];
    updatedClicked[index] = shuffle[index];

    if(shuffle[index] === sequence[updatedClicked.filter(Boolean).length - 1]) {
      setClicked(updatedClicked);

      if(updatedClicked.filter(Boolean).length === sequence.length) {
        console.log("Finished");
        setClicked(Array(9).fill(null));
        setIdx(0);
        setClicked(shuffle.slice(0,9));
      }
    } else {
      setClicked(Array(9).fill(null));
      setIdx(0);
      console.log("Incorrect");
    }
  }

  return (
    <div className="App">
      {/* Color sequence (top bar) */}
      <div className = "sequence">
        {sequence.map((color, index) => (
          <div key={index} className = "colored-box" style={{backgroundColor : color}}>
          </div>
        ))}
      </div>

      {/*3x3 Grid*/}
      <div className="box-grid-container">
        <div className="box-grid">
          {clicked.map((color, index) => (
            <div 
              key = {index}
              className={`box ${color ? 'box-clicked' : ''}`}
              onClick={() => clickHandler(index)}
              style={{ 
                backgroundColor: color ? color : '#008B8B',
                cursor: color ? 'default' : 'pointer',
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
