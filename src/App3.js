import React, { PureComponent } from 'react';
import './App.css';

class Board extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      table: [],
      player1: 1,
      player2: 2,
      currentPlayer: null};
    this.trCount = 0;
  }
  
  componentDidMount(){
    
    let newBoard = [];
    for (let col = 0; col < 7; col++){
      let rows = [];
      for (let row = 0; row < 6; row++){
        rows.push(null);
      }
      newBoard.push(rows);
    }
    this.setState({table: newBoard,
      currentPlayer: this.state.player1,
    })

  }
  
  onClick = (e) =>{
    let x = e.target.id.split("");
    
    let col = x[0];
    let row = x[1];
    console.log("Col " + col);
    console.log("Row " + row);
    const table = [...this.state.table];
    let newArr = table[col];
    let addLast = newArr.lastIndexOf(null);
    newArr[addLast] = this.state.currentPlayer;
    table[col] = newArr
    
    
    console.log(table)

    
   // this.setState({table});
    
          
          

  }

  renderRow = (row, index) =>{
    let rows = row.map((x, index) =>{
      return (
      <td className="td" key={index + 1}>
        <div id={this.trCount.toString() + (index)} className="div" onClick={this.onClick}></div>
      </td>
    )
  });
    this.trCount++; 
    return(
      <tr key={index} className="tr">
        {rows}
      </tr>
    )
  }

  render() {
    console.log(this.state.table)
   const row  = this.state.table.map(this.renderRow);
    return(
      <table className="table">
        <tbody>
          {row}
        </tbody>
      </table>
    );
  }
}

class App extends PureComponent {
  render() {
    return (
     <Board></Board>
    );
  }
}

export default App;
