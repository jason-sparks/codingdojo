import React from 'react';
import styles from '../modules/HookForm.module.css';

const HookForm = (props) => {
    const {setFirstName, setLastName, setEmail, setPassword, setConfirmPassword} = props;

    return (
    <form>
        <div className={styles.formField}>
            <label for="firstName" className={styles.formLabel}>First Name</label>
            <input type="text" id="firstName" name="firstName" onChange={ (e) => setFirstName(e.target.value)}></input>
        </div>
        <div className={styles.formField}>
            <label for="lastName" className={styles.formLabel}>Last Name</label>
            <input type="text" id="lastName" name="lastName" onChange={ (e) => setLastName(e.target.value)}></input>
        </div>
        <div className={styles.formField}>
            <label for="email" className={styles.formLabel}>Email</label>
            <input type="email" id="email" name="email" onChange={ (e) => setEmail(e.target.value)}></input>
        </div>
        <div className={styles.formField}>
            <label for="password" className={styles.formLabel}>Password</label>
            <input type="password" id="password" name="password" onChange={ (e) => setPassword(e.target.value)}></input>
        </div>
        <div className={styles.formField}>
            <label for="confirmPassword" className={styles.formLabel}>Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" className={styles.formInput} onChange={ (e) => setConfirmPassword(e.target.value)}></input>
        </div>
        </form>
    );
};

export default HookForm;