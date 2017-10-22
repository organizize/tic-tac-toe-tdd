import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import App from './App';
import {getGameStatus} from './utils/getGameStatus';

const HOOK = {
  CELL: '[data-hook="cell"]',
  WINNER_MSG: '[data-hook="winner-message"]',
};

const BOARD_SIZE = 3;

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

  afterEach(() => wrapper.detach());

  it('should have "O" after second user plays', () => {
    wrapper = render(<App/>);
    clickACellAt(0, 0);
    clickACellAt(0, 1);
    expect(getCellTextAt(0, 1)).to.equal('O');
  });

  it('player "O" should win the game', () => {
    wrapper = render(<App/>);
    clickACellAt(1, 1);
    clickACellAt(0, 0);
    clickACellAt(1, 2);
    clickACellAt(0, 1);
    clickACellAt(2, 0);
    clickACellAt(0, 2);
    expect(getWinnerMessage()).to.equal('O Wins!');
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

});
