import React, { useState } from 'react';
import {Helmet} from "react-helmet";
import '../App.css';

function Name (props) {
    const [name1, updateName1] = useState("Player1");
    const [name2, updateName2] = useState("Player2");
    const [aiOn, updateAiOn] = useState(false)
  
    const onChange1 = (e) => {
      updateName1(e.target.value)
      props.onChange1(e);
    };
    const onChange2 = (e) => {
      updateName2(e.target.value)
      props.onChange2(e);
    };
    const onChangeAiOn = () => {
      updateAiOn(true);
      props.onChangeAiOn()
      updateName2("Computer")
    }
    const onChangeAiOff = () => {
      updateAiOn(false);
      props.onChangeAiOff()
      updateName2("Player2")
    }
    
    
    return( 
    <>
    <Helmet title="Connect 4 - Name Players"/>
    <h1 className="loginH1">Connect 4 - Name Players</h1>
    <div className="loginMain">
    <input maxLength="11" className="loginTextInput1" value={name1} onChange={onChange1} type="text"/>
    <span className="vs"> <b>VS</b> </span>
    <input maxLength="11" className="loginTextInput2" value={name2} onChange={onChange2} type="text" disabled={aiOn}/><br/>
    <div className="loginAi">
    <input onChange={onChangeAiOff} type="radio" name="ai" defaultChecked={true}/><label>AI Off </label>
    <input onChange={onChangeAiOn} type="radio" name="ai"/><label>AI On</label>
    </div>
    <button className="loginBtn" onClick={props.onLogin} >Play</button>
    </div>
    </>
    );
  }
  export default Name;