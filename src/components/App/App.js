import React from 'react';
import classnames from 'classnames';
import Board from '../Board';
import './App.scss';

import {getGameStatus} from './utils/getGameStatus.js';
import {PLAYER, STATUS} from './constants';

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
      gameStatus: null,
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
    const {board, nextPlayer} = this.state;

    if (board[rowIdx][cellIdx]) {
      return;
    }

    const newBoard = board.map(row => row.map(x => x));

    newBoard[rowIdx][cellIdx] = nextPlayer;

    const newNextPlayer = nextPlayer === PLAYER.X
      ? PLAYER.O
      : PLAYER.X;

    this.setState({
      board: newBoard,
      gameStatus: getGameStatus(newBoard),
      nextPlayer: newNextPlayer,
    });
  }

  render() {
    const {board, gameStatus, nextPlayer} = this.state;

    const playersHeader = (
      <div>
        <span
          className={classnames({'active-player': nextPlayer === PLAYER.X})}
          data-hook="player-name"
        >
          {PLAYER.X}
        </span>
        <span
          className={classnames({'active-player': nextPlayer === PLAYER.O})}
          data-hook="player-name"
        >
          {PLAYER.O}
        </span>
      </div>
    );

    const statusMessage = gameStatus && (
      <div data-hook="status-message" className="status-message">
        {
          gameStatus === STATUS.TIE
          ? 'Its a tie!'
          : `${gameStatus} Wins!`
        }
      </div>
    );

    const saveButton = <button onClick={() => this.save()} data-hook="save">Save</button>;
    const loadButton = <button onClick={() => this.load()} data-hook="load">Load</button>;

    return (
      <div data-hook="app" className="root">
        {playersHeader}
        <Board
          board={board}
          onGameChanged={(rowIndex, cellIndex) => this.handleGameChange(rowIndex, cellIndex)}
        />
        {statusMessage}
        <div>
          {saveButton}
          {loadButton}
        </div>
      </div>
    );
  }
}

export default App;
