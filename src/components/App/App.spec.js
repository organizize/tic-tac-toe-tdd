import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import App from './App';
import {getGameStatus} from './utils/getGameStatus';
import {BOARD_SIZE} from './constants';

const HOOK = {
  CELL: '[data-hook="cell"]',
  WINNER_MSG: '[data-hook="winner-message"]',
};

const getCellIndex = (rowNum, cellNum) => (rowNum * BOARD_SIZE) + cellNum;

let wrapper;

const render = element => mount(
  element,
  {attachTo: document.createElement('div')}
);

const clickACellAt = (rowIdx, cellIdx) => wrapper
  .find(HOOK.CELL)
  .at(getCellIndex(rowIdx, cellIdx))
  .simulate('click');

const getCellTextAt = (rowIdx, cellIdx) => wrapper
  .find(HOOK.CELL)
  .at(getCellIndex(rowIdx, cellIdx))
  .text();

const getWinnerMessage = () => wrapper
  .find(HOOK.WINNER_MSG)
  .text();

describe('App', () => {

  beforeEach(() => wrapper = render(<App/>));
  afterEach(() => wrapper.detach());

  it('should have "O" after second user plays', () => {
    clickACellAt(0, 0);
    clickACellAt(0, 1);
    expect(getCellTextAt(0, 1)).to.equal('O');
    wrapper.detach();
  });

  it('player "O" should win the game', () => {
    clickACellAt(1, 1);
    clickACellAt(0, 0);
    clickACellAt(1, 2);
    clickACellAt(0, 1);
    clickACellAt(2, 0);
    clickACellAt(0, 2);
    expect(getWinnerMessage()).to.equal('O Wins!');
  });

  it('should not be possible to make a move on non-empty cell', () => {
    clickACellAt(0, 0);
    clickACellAt(0, 0);
    clickACellAt(0, 1);
    expect(getCellTextAt(0, 0)).to.equal('X');
    expect(getCellTextAt(0, 1)).to.equal('O');
  });
});

describe('getGameStatus', () => {
  it('should identify horizontal win', () => {
    const board = [
      ['X', 'X', 'X'],
      ['', '', ''],
      ['', '', '']
    ];
    expect(getGameStatus(board)).to.equal(true);
  });

  it('should identify vertical win', () => {
    const board = [
      ['X', '', ''],
      ['X', '', ''],
      ['X', '', '']
    ];
    expect(getGameStatus(board)).to.equal(true);
  });

  it('should identify a diagonal win', () => {
    const board = [
      ['X', '', ''],
      ['', 'X', ''],
      ['', '', 'X']
    ];
    expect(getGameStatus(board)).to.equal(true);
  });

  it('should identify a diagonal win', () => {
    const board = [
      ['', '', 'X'],
      ['', 'X', ''],
      ['X', '', '']
    ];
    expect(getGameStatus(board)).to.equal(true);
  });
});
