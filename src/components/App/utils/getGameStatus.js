import {PLAYER, STATUS, BOARD_SIZE} from '../constants';

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

const getLines = board => board.concat(getColumns(board), getDiagonals(board));

const everyCellEquals = value => arr => arr.every(item => item === value);

const flatten = (flatArr, arr) => {
  flatArr.push(...arr);
  return flatArr;
};

const countEmptyCells = (count, cell) => cell ? count : count + 1;

const getEmptyCellCount = board => board
  .reduce(flatten, [])
  .reduce(countEmptyCells, 0);

export const getGameStatus = board => {
  const isGameWon = player => getLines(board).some(everyCellEquals(player));

  const isGameTied = () => getEmptyCellCount(board) === 0;

  if (isGameWon(PLAYER.X)) {
    return STATUS.X_WON;
  }

  if (isGameWon(PLAYER.O)) {
    return STATUS.O_WON;
  }

  if (isGameTied()) {
    return STATUS.TIE;
  }

  return;
};
