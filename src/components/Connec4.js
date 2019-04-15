import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import '../App.css';


function Connect4 (props){
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
    const [turn, updateTurn] = useState("red");
    const [playerName, updatePlayerName] = useState("");
    const [ai, updateAi] = useState(false)
  
    useEffect(() =>{
      newBoard();
      updateAi(props.ai);
    }, [])
  
    const newBoard = () =>{
      updatecurrentPlayer(player2);
      updateMessage("");
      updateGameOver(false);
      updateColor("white");
      updateTurn("red")
      updatePlayerName(props.name1)
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
    const aiPlayer = () =>{
      if (currentPlayer === 2){
        let aiMoveCol = Math.floor(Math.random() * 7);
        const table = [...board];
      let newArr = table[aiMoveCol];
      let addLast = newArr.lastIndexOf(null);
      newArr[addLast] = player2  
      updateBoard(table)
      checkAll(board)
      }
    }

    const turnColor = () => {
      if (turn === "red"){
        updateTurn("blue")
        updatePlayerName(props.name2)
      }
      else{
        updateTurn("red")
        updatePlayerName(props.name1)
      }
    }
  
    const press = (e) =>{
      
      if (ai === false){
        updatecurrentPlayer(currentPlayer === player1 ? player2 : player1)
      }
      
      let col = e.target.dataset.col;
      const table = [...board];
      let newBoard = table[col];
      let addLast = newBoard.lastIndexOf(null);
      newBoard[addLast] = currentPlayer === player1 ? player2 : player1;
  
      updateBoard(table)
      turnColor()
      if (ai === true){
        aiPlayer()
      }
      else{
        checkAll(board)
      }
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
                  updateTurn("black");
                  updatePlayerName("");
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
                  updateTurn("black");
                  updatePlayerName("");
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
                  updateTurn("black");
                  updatePlayerName("");
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
                  updateTurn("black");
                  updatePlayerName("");
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
      updatePlayer1Points(player1Points + 1);
      updatePlayer2Points(player2Points + 1);
      updateGameOver(true)
      updateMessage("Draw !!") 
      updateTurn("black");
      updatePlayerName("");  
    }

    const checkAll = (board) =>{
        return (checkH(board) || checkV(board) || checkDR(board) || checkDL(board) || checkDraw(board));
    }

    const resetPoints = () =>{
      updatePlayer1Points(0)
      updatePlayer2Points(0)
      newBoard()
    }
  
    const renderBoard = (row, index) =>{
      
      let redDiv = <div data-col={trCount.toString()} className="div redDiv" onClick={press}/>
      let blueDiv = <div data-col={trCount.toString()} className="div blueDiv" onClick={press}/>
  
  
      if (!row.includes(null)){
        redDiv = <div data-col={trCount.toString()} className="div redDiv" onClick={press} disabled/>
        blueDiv = <div data-col={trCount.toString()} className="div blueDiv" onClick={press} disabled/>
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
            <div data-col={trCount.toString()} className="div" onClick={press}/>
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
        <div className="turnName">Turn</div>
        <div className="buttons">
        <button className="btn" onClick={newBoard}>New Game</button>
        <button className="btnReset" onClick={resetPoints}>Reset</button>
        </div>
        <div className="turn" style={{backgroundColor: turn}}><b>{playerName}</b></div>
        <div className="points">
        <b><span style={{color: "red"}}>{props.name1} :</span> <span style={{fontSize: "30px"}}>{player1Points}</span> - <span style={{fontSize: "30px"}}>{player2Points}</span> <span style={{color: "blue"}}>: {props.name2}</span></b>
        </div>
        <table className="table" disabled={gameOver}>
          <tbody>
            {table}
          </tbody>
        </table>
        <div className="message" style={{color: color}}><b>{message}</b></div>
        </>
      );
  }

  export default Connect4;