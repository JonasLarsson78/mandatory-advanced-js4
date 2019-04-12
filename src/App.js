import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import './App.css';


function Board (props){
  let trCount = 0
  const [player1] = useState(1);
  const [player2] = useState(2);
  const [player1Points, updatePlayer1Points] = useState(0);
  const [player2Points, updatePlayer2Points] = useState(0);
  const [currentPlayer, updatecurrentPlayer] = useState(null);
  const [board, updateBoard] = useState([]);
  const [gameOver, updateGameOver] = useState(false);
  const [message, updateMessage] = useState("");
  const [color, updateColor] = useState("white");

  useEffect(() =>{
    newBoard();
  }, [])

  const newBoard = () =>{
    updatecurrentPlayer(player2);
    updateMessage("");
    updateGameOver(false);
    updateColor("white");
    let newBoard = [];
    for (let row = 0; row < 7; row++){
      let rows = [];
      for (let col = 0; col < 6; col++){
        rows.push(null);
      }
      newBoard.push(rows);
    }
    updateBoard(newBoard) ;
  }
  

  const press = (e) =>{
   updatecurrentPlayer(currentPlayer === player1 ? player2 : player1)
    let x = e.target.id.split("");
    
    let col = x[0];
    /* let row = x[1];
    console.log("Col " + col);
    console.log("Row " + row); */
    const table = [...board];
    let newArr = table[col];
    let addLast = newArr.lastIndexOf(null);
    newArr[addLast] = currentPlayer === player1 ? player2 : player1;

    updateBoard(table)

    checkH(board)
    checkV(board)
    checkDR(board)
    checkDL(board)
    checkDraw(board)
  }

  const winMess = (x) =>{
    if (x === 1){
      updateColor("red");
      updatePlayer1Points(player1Points + 1);
      return (props.name1 + " Wins !!");
    }
    else{
      updateColor("blue");
      updatePlayer2Points(player2Points + 1);
      return (props.name2 + " Wins !!");
    }
  }

  const checkH = (board) =>{
    for (let r = 3; r < 7; r++) {
      for (const [c] of board.entries()) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c] &&
              board[r][c] === board[r - 2][c] &&
              board[r][c] === board[r - 3][c]) {
                updateGameOver(true);
                updateMessage(winMess(board[r][c]));
          }
        }
      }
    }
  }

  const checkV = (board) =>{
    for (const [r] of board.entries()) {
      for (const [c] of board.entries()) {
        if (board[r][c]) {
          if (board[r][c] === board[r][c + 1] && 
              board[r][c] === board[r][c + 2] &&
              board[r][c] === board[r][c + 3]) {
                updateGameOver(true)
                updateMessage(winMess(board[r][c]));
          }
        }
      }
    }
  }

  const checkDR = (board) =>{
    for (let r = 3; r < 7; r++) {
      for (const [c] of board.entries()) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c + 1] &&
              board[r][c] === board[r - 2][c + 2] &&
              board[r][c] === board[r - 3][c + 3]) {
                updateGameOver(true);
                updateMessage(winMess(board[r][c]));
          }
        }
      }
    }
  }

  const checkDL = (board) =>{
    for (let r = 3; r < 7; r++) {
      for (let c = 3; c < 6; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c - 1] &&
              board[r][c] === board[r - 2][c - 2] &&
              board[r][c] === board[r - 3][c - 3]) {
                updateGameOver(true)
                updateMessage(winMess(board[r][c]));
          }
        }
      }
    }
  }

  const checkDraw = (board) =>{
    for (const [r] of board.entries()) {
      for (const [c] of board.entries()) {
        if (board[r][c] === null) {
          return null;
        }
      }
    }
    updateGameOver(true)
    updateMessage("Draw !!")   
  }
  const resetPoints = () =>{
    updatePlayer1Points(0)
    updatePlayer2Points(0)
    newBoard()
  }

  const renderBoard = (row, index) =>{
    let redDiv = <div style={{ backgroundImage: "radial-gradient(circle, #340101, #630011, #960015, #ca0013, #ff0000)"}} id={trCount.toString() + (index)} className="div" onClick={press}/>
    let blueDiv = <div style={{ backgroundImage: "radial-gradient(circle, #010134, #001164, #001697, #0015cb, #2c00ff)"}} id={trCount.toString() + (index)} className="div" onClick={press}/>


    if (!row.includes(null)){
      redDiv = <div style={{ backgroundImage: "radial-gradient(circle, #340101, #630011, #960015, #ca0013, #ff0000)"}} id={trCount.toString() + (index)} className="div" onClick={press} disabled/>
      blueDiv = <div style={{ backgroundImage: "radial-gradient(circle, #010134, #001164, #001697, #0015cb, #2c00ff)"}} id={trCount.toString() + (index)} className="div" onClick={press} disabled/>
    }
    
    let rows = row.map((x, index) => {
      if (x === 1){
        return(
          <td className="td" key={index + 1}>
            {redDiv}
          </td>
          );
      }
      else if (x === 2){
        return(
          <td className="td" key={index + 1}>
            {blueDiv}
          </td>
          );
      }
      return(
        <td className="td" key={index + 1}>
          <div style={{ backgroundImage: "radial-gradient(circle, #ffffff, #b9b9b9, #777777, #3b3b3b, #000000)"}} id={trCount.toString() + (index)} className="div" onClick={press}/>
        </td>
    );
    })
    trCount++; 
    return(
        <tr key={index + 1} className="tr">{rows}</tr>
    );
  }
    const table = board.map(renderBoard);
    return(
      <>
      <Helmet title="Connect 4 - Labb 4 AvJs"/>
      <h1 className="mainH1">Connect 4 - Labb 4 AvJs</h1>
      <button className="logOutBtn" onClick={props.onOut}>Log Out</button>
      <div className="buttons">
      <button className="btn" onClick={newBoard}>New Game</button>
      <button className="btnReset" onClick={resetPoints}>Reset</button>
      </div>
      <div className="points"><b><span style={{color: "red"}}>{props.name1} :</span> <span style={{fontSize: "30px"}}>{player1Points}</span> - <span style={{fontSize: "30px"}}>{player2Points}</span> <span style={{color: "blue"}}>: {props.name2}</span></b></div>
      <table className="table" disabled={gameOver}>
        <tbody>
          {table}
        </tbody>
      </table>
      <div className="message" style={{color: color}}><b>{message}</b></div>
      </>
    );
}
function Login (props) {
  const [name1, updateName1] = useState("Player1");
  const [name2, updateName2] = useState("Player2");
  const [x, updateX] = useState(false);
  const [y, updateY] = useState(false);

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
  <input maxLength="11" className="loginTextInput1" onChange={onChange1} type="text" placeholder={name1} defaultValue="Player1"/>
  <span className="vs"> <b>VS</b> </span>
  <input maxLength="11" className="loginTextInput2" onChange={onChange2} type="text" placeholder={name2}/><br/>
  <button className="loginBtn" onClick={props.onLogin} >Play</button>
  </div>
  </>
  );
}

function App (props) {
  
  const [isLoggedIn, updateIsLoggedIn] = useState(false);
  const [name1, updateName1] = useState("Player1");
  const [name2, updateName2] = useState("Player2");

  const onChange1 = (e) => {
    
    updateName1(e.target.value)
    
  };
  const onChange2 = (e) => {
    
    updateName2(e.target.value)
    
  };

  const onLogin = () => updateIsLoggedIn(true);
  const onOut = () => {
    updateIsLoggedIn(false);
    updateName1("Player1")
    updateName2("Player2")
  }
    
  return ( isLoggedIn ? <Board name1={name1} name2={name2} onOut={onOut} /> : <Login onChange1={onChange1} onChange2={onChange2} onLogin={onLogin}/> );
  
}

export default App;
