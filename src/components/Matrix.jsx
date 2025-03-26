import React, { useState } from "react";
import "./Matrix.css";

const Matrix = () => {
  // State to store the colors of the boxes
  const [matrix, setMatrix] = useState(Array(9).fill(null));
  // State to store the order in which the boxes are clicked
  const [clickOrder, setClickOrder] = useState([]);

  // Function to handle box click
  const handleClick = (index) => {
    // Check if the box is not already clicked
    if (matrix[index] === null) {
      // Update the color of the clicked box to green
      const newMatrix = [...matrix];
      newMatrix[index] = "green";
      setMatrix(newMatrix);
      // Update the click order
      setClickOrder([...clickOrder, index]);

      // If all boxes are clicked, change colors to orange in sequence
      if (clickOrder.length === 8) {
        changeColorsInSequence([...clickOrder, index]);
      }
    }
  };

  // Function to change colors to orange in sequence of clicks
  const changeColorsInSequence = (order, i = 0) => {
    if (i < order.length) {
      setTimeout(() => {
        // Update the color of the current box to orange
        setMatrix((prevMatrix) => {
          const newMatrix = [...prevMatrix];
          newMatrix[order[i]] = "orange";
          return newMatrix;
        });
        // Recursively call the function for the next box
        changeColorsInSequence(order, i + 1);
      }, 500); // Delay between color changes
    }
  };

  return (
    // Render the 3x3 grid of boxes
    <div className="matrix">
      {matrix.map((color, index) => (
        <div
          key={index}
          className="box"
          style={{ backgroundColor: color }}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Matrix;