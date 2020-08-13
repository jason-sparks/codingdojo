import React, { Component } from "react";

class PersonCard extends Component {
    render() {
        const { firstName, lastName, age, hairColor } = this.props
        return (
            <>
        <h2>{ lastName }, { firstName }</h2>
        <p>Age: { age }</p>
        <p>Hair Color: { hairColor }</p>
            </>
        );
    }
}

export default PersonCard;