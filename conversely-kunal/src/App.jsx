import React, { useState } from "react";
import "./App.css";

const App = () => {
  const initialMatrix = Array(3)
    .fill(null)
    .map(() => Array(3).fill("white"));
  const [matrix, setMatrix] = useState(initialMatrix);
  const [clickOrder, setClickOrder] = useState([]);

  const handleClick = (rowIndex, colIndex) => {
    // Check if the box is already green
    if (matrix[rowIndex][colIndex] === "green") return;

    const newMatrix = matrix.map((row, rIndex) =>
      row.map((color, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? "green" : color
      )
    );

    const newClickOrder = [...clickOrder, { rowIndex, colIndex }];

    setMatrix(newMatrix);
    setClickOrder(newClickOrder);

    if (newClickOrder.length === 9) {
      setTimeout(() => changeColorsToOrange(newClickOrder), 500);
    }
  };

  const changeColorsToOrange = (order) => {
    let delay = 0;
    const newMatrix = initialMatrix.map((row) => row.slice());

    order.forEach(({ rowIndex, colIndex }) => {
      setTimeout(() => {
        newMatrix[rowIndex][colIndex] = "orange";
        setMatrix([...newMatrix]);
      }, delay);
      delay += 500; // Adjust delay for next cell
    });
  };

  const resetMatrix = () => {
    setMatrix(initialMatrix);
    setClickOrder([]);
  };

  return (
    <div className="app">
      <h1>Kunal Chhatwani Assignment</h1>
      <div className="matrix">
        {matrix.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((color, colIndex) => (
              <div
                key={colIndex}
                className="box"
                style={{ backgroundColor: color }}
                onClick={() => handleClick(rowIndex, colIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetMatrix}>
        Reset
      </button>
    </div>
  );
};

export default App;
