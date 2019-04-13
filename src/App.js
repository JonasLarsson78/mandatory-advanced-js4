import React, { useState } from 'react';
import Connect4 from './components/Connec4.js'
import Name from './components/Name.js';
import './App.css';

function App () {
  
  const [isLoggedIn, updateIsLoggedIn] = useState(false);
  const [name1, updateName1] = useState("Player1");
  const [name2, updateName2] = useState("Player2");

  const onChange1 = (e) => updateName1(e.target.value);
  const onChange2 = (e) => updateName2(e.target.value);

  const onLogin = () => updateIsLoggedIn(true);

  const onOut = () => { updateIsLoggedIn(false);
                        updateName1("Player1");
                        updateName2("Player2")
                      };

  return (
    isLoggedIn ? <Connect4 name1={name1} name2={name2} onOut={onOut} /> : <Name onChange1={onChange1} onChange2={onChange2} onLogin={onLogin}/> 
    );
};

export default App;
