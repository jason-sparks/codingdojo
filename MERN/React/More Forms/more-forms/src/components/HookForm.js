import React, { useState } from 'react';
import styles from '../modules/HookForm.module.css';

const HookForm = (props) => {
    const {setFirstName, setLastName, setEmail, password, setPassword, setConfirmPassword} = props;
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordMismatchError, setPasswordMismatchError] = useState("");


    const validateFirstName = (e) => {
        setFirstName(e.target.value);
        console.log(e.target.value.length);
        (e.target.value.length < 2 && e.target.value.length !== 0) ?
        setFirstNameError("First Name must be at least 2 characters"):
        setFirstNameError("");
    }

    const validateLastName = (e) => {
        setLastName(e.target.value);
        console.log(e.target.value.length);
        (e.target.value.length < 2 && e.target.value.length !== 0) ?
        setLastNameError("Last Name must be at least 2 characters"):
        setLastNameError("");
    }

    const validateEmail = (e) => {
        setEmail(e.target.value);
        console.log(e.target.value.length);
        (e.target.value.length < 5 && e.target.value.length !== 0) ?
        setEmailError("Email must be at least 5 characters"):
        setEmailError("");
    }

    const validatePasswordLength = (e) => {
        setPassword(e.target.value);
        console.log(e.target.value);
        console.log(password);
        (e.target.value.length < 8 && e.target.value.length !== 0) ?
        setPasswordError("Password must be at least 8 characters"):
        setPasswordError("");
    }

    const validatePasswordsMatch = (e) => {
        setConfirmPassword(e.target.value);
        console.log(e.target.value.length);
        // console.log();
        (e.target.value.length !== 0 && e.target.value !== password) ?
        setPasswordMismatchError("Passwords don't match"):
        setPasswordMismatchError("");
    }

    return (
    <form>
        <div className={styles.formField}>
            <label htmlFor="firstName" className={styles.formLabel}>First Name</label>
            <input type="text" id="firstName" name="firstName" onChange={validateFirstName}></input>
        </div>
        {
            firstNameError ?
            <p style={{color:'red'}}>{firstNameError}</p> :
            ''
        }
        <div className={styles.formField}>
            <label htmlFor="lastName" className={styles.formLabel}>Last Name</label>
            <input type="text" id="lastName" name="lastName" onChange={validateLastName}></input>
        </div>
        {
            lastNameError ?
            <p style={{color:'red'}}>{lastNameError}</p> :
            ''
        }
        <div className={styles.formField}>
            <label htmlFor="email" className={styles.formLabel}>Email</label>
            <input type="email" id="email" name="email" onChange={validateEmail}></input>
        </div>
        {
            emailError ?
            <p style={{color:'red'}}>{emailError}</p> :
            ''
        }
        <div className={styles.formField}>
            <label htmlFor="password" className={styles.formLabel}>Password</label>
            <input type="password" id="password" name="password" onChange={validatePasswordLength}></input>
        </div>
        {
            passwordError ?
            <p style={{color:'red'}}>{passwordError}</p> :
            ''
        }
        <div className={styles.formField}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" className={styles.formInput} onChange={validatePasswordsMatch}></input>
        </div>
        {
            passwordMismatchError ?
            <p style={{color:'red'}}>{passwordMismatchError}</p> :
            ''
        }
        </form>
    );
};

export default HookForm;