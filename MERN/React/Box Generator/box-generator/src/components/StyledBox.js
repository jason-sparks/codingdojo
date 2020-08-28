import React from "react";

const StyledBox = ({ color }) => {
  const boxColor = {            // Inline CSS Styling 
    backgroundColor: [color],
    width: "200px",
    height: "200px",
    display: "inline-block",
  };
  return <div className="rounded m-2" style={boxColor}></div>;  // Return div with CSS styling
};

export default StyledBox;
