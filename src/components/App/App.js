import React from 'react';
import Board from '../Board';
import './App.scss';

import {getGameStatus} from './utils/getGameStatus.js';
import {PLAYER} from './constants';

const INITIAL_BOARD = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      board: INITIAL_BOARD,
      winner: '',
      nextPlayer: PLAYER.X,
    };
  }

  save() {
    fetch('/api/game', {
      method: 'POST',
      body: JSON.stringify({board: this.state.board}),
      headers: {'Content-Type': 'application/json'}
    });
  }

  async load() {
    const response = await fetch('/api/game');
    const {board} = await response.json();

    this.setState({board});
  }

  handleGameChange(rowIdx, cellIdx) {

    const board = this.state.board.map(row => row.map(x => x));
    const nextPlayer = this.state.nextPlayer;

    if (board[rowIdx][cellIdx]) {
      return;
    }

    board[rowIdx][cellIdx] = nextPlayer;

    if (getGameStatus(board)) {
      this.setState({
        board,
        winner: nextPlayer
      });
      return;
    }

    const newNextPlayer = nextPlayer === PLAYER.X ? PLAYER.O : PLAYER.X;

    this.setState({
      board,
      nextPlayer: newNextPlayer
    });
  }

  render() {
    const {board, winner} = this.state;

    const winnerMessage = winner && (
      <div data-hook="winner-message" className="winner-message">
        {`${winner} Wins!`}
      </div>
    );

    const saveButton = <button onClick={() => this.save()} data-hook="save">Save</button>;
    const loadButton = <button onClick={() => this.load()} data-hook="load">Load</button>;

    return (
      <div data-hook="app" className="root">
        <Board
          board={board}
          onGameChanged={(rowIndex, cellIndex) => this.handleGameChange(rowIndex, cellIndex)}
        />
        {winnerMessage}
        <div>
          {saveButton}
          {loadButton}
        </div>
      </div>
    );
  }
}

export default App;
