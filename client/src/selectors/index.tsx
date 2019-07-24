import { createSelector } from 'reselect';
import { PAGE_LIMIT } from '../constants/config';

export const getCardsAmount = state => state.cards.data.count;

export const getPagesAmount = createSelector(
  getCardsAmount,
  cardsAmount => Math.ceil(cardsAmount / PAGE_LIMIT)
);

export const isCardsLoading = state => state.cards.isLoading;

export const showPagination = createSelector(
  [isCardsLoading, getPagesAmount],
  (loading, pages) => !loading && pages > 1
);