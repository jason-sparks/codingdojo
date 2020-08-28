import React, { useState } from "react";


const ColorForm = ({ results, setResults }) => {
    const [newColor, setNewColor] = useState("");

    const onChange = (e) => {
        setNewColor(e.target.value);
  };

    const addBox = () => {
        setResults({
            ...results,
            colors: [...results.colors, newColor],
        });

    // clears out the input value attribute
    setNewColor("");
  };

  return (
        <form class="input-group mb-3" onSubmit={ (e) => { 
            e.preventDefault();
            addBox();
        }}>
            <input
            onChange={onChange}
            type="text"
            class="form-control"
            name="newColor"
            placeholder="Type a color..."
            value={newColor}
            />
            <div class="input-group-append">
                <button class="btn btn-primary">
                Add Box
                </button>
            </div>
        </form>
  );
};

export default ColorForm;