import React from 'react';
import styles from '../modules/Results.module.css';

const Results = (props) => {
    const { firstName, lastName, email, password, confirmPassword } = props;

    return (
        <>
            <p>Your Form Data</p>
            <div className= { styles.resultsDiv}>
                <p>First Name: { firstName }</p>
                <p>Last Name: { lastName }</p>
                <p>Email: { email }</p>
                <p>Password: { password }</p>
                <p>Confirm Password: { confirmPassword }</p>
            </div>
        </>
    );
};

export default Results;