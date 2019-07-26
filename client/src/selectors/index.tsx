import { createSelector } from 'reselect';
import { PAGE_LIMIT } from '../constants/config';
import { State } from '../store';

export const getCardsAmount = (state: State): number => state.cards.data.count;

export const getPagesAmount = createSelector(
  getCardsAmount,
  (cardsAmount: number): number => Math.ceil(cardsAmount / PAGE_LIMIT)
);

export const isCardsLoading = (state: State): boolean => state.cards.isLoading;

export const showPagination = createSelector(
  [isCardsLoading, getPagesAmount],
  (loading: boolean, pages: number): boolean => !loading && pages > 1
);