import React, { useState } from 'react';
import {Helmet} from "react-helmet";
import '../App.css';

function Name (props) {
    const [name1, updateName1] = useState("Player1");
    const [name2, updateName2] = useState("Player2");
  
    const onChange1 = (e) => {
      updateName1(e.target.value)
      props.onChange1(e);
    };
    const onChange2 = (e) => {
      updateName2(e.target.value)
      props.onChange2(e);
    };
    
    return( 
    <>
    <Helmet title="Connect 4 - Name Players"/>
    <h1 className="loginH1">Connect 4 - Name Players</h1>
    <div className="loginMain">
    <input maxLength="11" className="loginTextInput1" onChange={onChange1} type="text" placeholder={name1}/>
    <span className="vs"> <b>VS</b> </span>
    <input maxLength="11" className="loginTextInput2" onChange={onChange2} type="text" placeholder={name2}/><br/>
    <button className="loginBtn" onClick={props.onLogin} >Play</button>
    </div>
    </>
    );
  }
  export default Name;