import React from 'react';

const Routes = (props) => {
    if (!props.word) {
        return (
            <h4 className="mt-4">Welcome</h4>
        );
    }
    else if (isNaN(props.word)) {
        return (
            <h4 className="mt-4" style={props.font ?
                                    { color: props.font, backgroundColor: props.bground }: null }>The word is {props.word}</h4>
        );
    }
    else {
        return (
            <h4 className="mt-4">The number is {props.word}</h4>
        );
    }
}

export default Routes;