import {PLAYER, BOARD_SIZE} from '../constants';

const getColumns = board => {
  const cols = [];

  for (let colIdx = 0; colIdx < BOARD_SIZE; colIdx++) {
    cols.push(board.map(row => row[colIdx]));
  }

  return cols;
};

const getDiagonals = board => {
  const diagonal1 = [];
  const diagonal2 = [];

  for (let idx = 0; idx < BOARD_SIZE; idx++) {
    diagonal1.push(board[idx][idx]);
    diagonal2.push(board[idx][BOARD_SIZE - 1 - idx]);
  }

  return [diagonal1, diagonal2];
};

const everyCellEquals = value => arr => arr.every(item => item === value);

export const getGameStatus = board => {
  const isGameWon = player => {
    if (board.some(everyCellEquals(player))) {
      return true;
    }

    const columns = getColumns(board);
    if (columns.some(everyCellEquals(player))) {
      return true;
    }

    const diagonals = getDiagonals(board);
    if (diagonals.some(everyCellEquals(player))) {
      return true;
    }

    return false;
  };

  return isGameWon(PLAYER.X) || isGameWon(PLAYER.O);
};
