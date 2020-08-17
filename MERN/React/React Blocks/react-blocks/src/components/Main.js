import React, { Component } from "react";
import styles from "../modules/Main.module.css";
import SubContents from "./SubContents";
import Advertisement from "./Advertisement";

class Main extends Component {
    render() {
        return (
            <>
            <div className= { styles.main } >
                <SubContents />
                <SubContents />
                <SubContents />
                <Advertisement />
            </div>
            </>
        );
    }
}

export default Main;