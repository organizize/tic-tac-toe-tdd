import {PLAYER} from '../constants';

export const getGameStatus = board => {
  const isGameWon = player => board[0].every(cell => cell === player);

  return isGameWon(PLAYER.X) || isGameWon(PLAYER.O);
};
