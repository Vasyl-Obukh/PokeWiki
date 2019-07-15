import fetchPageNumbers from './pageNumbers';

describe('Page numbers structure tests', () => {
  test('Should return array without dots', () => {
    const pagesAmount = 7;
    const currentPage = 1;
    expect(fetchPageNumbers(pagesAmount, currentPage)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  test('Should return array with dot only on second position', () => {
    const pagesAmount = 8;
    const currentPage = 6;
    expect(fetchPageNumbers(pagesAmount, currentPage)).toEqual([1, '...', 4, 5, 6, 7, 8]);
  });

  test('Should return array with dot only on pre-last position', () => {
    const pagesAmount = 8;
    const currentPage = 3;
    expect(fetchPageNumbers(pagesAmount, currentPage)).toEqual([1, 2, 3, 4, 5, '...', 8]);
  });

  test('Should return array with dots on second and pre-last position', () => {
    const pagesAmount = 8;
    const currentPage = 4;
    expect(fetchPageNumbers(pagesAmount, currentPage)).toEqual([1, '...', 3, 4, 5, '...', 8]);
  });
});