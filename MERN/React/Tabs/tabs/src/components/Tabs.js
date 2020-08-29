import React from 'react';


const Tabs = (props) => {
    const onClickHandler = (value) => {
        // Lift state to parent component App.js
        props.displayTabContent(value);
        alert(value);
    };

    return props.items.map( (item, index) => {
        return (
            <button className="btn btn-outline-dark mr-1 mt-1" onClick={ (e) => onClickHandler(item.content) }>{item.heading}</button>
        )
    })
};

export default Tabs;