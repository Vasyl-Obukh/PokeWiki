import deepFreeze from 'deep-freeze';
import { getCardsAmount, getPagesAmount, isCardsLoading, showPagination } from './index';
import { PAGE_LIMIT } from '../constants/config';

describe('selectors', () => {
  it('getCardsAmount() success', () => {
    const state = {cards: {data: {count: 96}}};
    expect(getCardsAmount(state)).toBe(96);

    state.cards.data.count = 3;
    expect(getCardsAmount(state)).toBe(3);
  });

  it('getPagesAmount() success', () => {
    const state = {cards: {data: {count: 96}}};
    deepFreeze(state);
    expect(getPagesAmount(state)).toBe(Math.ceil(state.cards.data.count / PAGE_LIMIT));
  });

  it('isCardLoading() success', () => {
    expect(isCardsLoading({cards: {isLoading: false}})).toBe(false);
    expect(isCardsLoading({cards: {isLoading: true}})).toBe(true);
  });

  it('showPagination() success', () => {
    expect(showPagination({cards: {data: {count: 9999}, isLoading: true}})).toBe(false);
    expect(showPagination({cards: {data: {count: 9999}, isLoading: false}})).toBe(true);
    expect(showPagination({cards: {data: {count: 0}, isLoading: false}})).toBe(false);
  });
});