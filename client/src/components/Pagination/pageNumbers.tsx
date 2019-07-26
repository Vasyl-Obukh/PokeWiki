import range from '../../utils/range';

const fetchPageNumbers = (pagesAmount: number, currentPage: number): (string | number)[] => {
  const dots: string = '...';
  const pageNeighbours: number = 1;
  const totalNumbers: number = pageNeighbours * 2 + 3;
  const totalBlocks: number = totalNumbers + 2;

  if (pagesAmount > totalBlocks) {
    let pages: (number | string)[];

    const leftBound: number = currentPage - pageNeighbours;
    const rightBound: number = currentPage + pageNeighbours;
    const beforeLastPage: number = pagesAmount - 1;

    const startPage: number = leftBound > 2 ? leftBound : 2;
    const endPage: number = rightBound < beforeLastPage ? rightBound : beforeLastPage;

    pages = range(startPage, endPage);

    const pagesCount: number = pages.length;
    const singleDotsOffset: number = totalNumbers - pagesCount - 1;

    const leftDots: boolean = startPage > 2;
    const rightDots: boolean = endPage < beforeLastPage;

    if (leftDots && !rightDots) {
      const extraPages: number[] = range(startPage - singleDotsOffset, startPage - 1);
      pages = [dots, ...extraPages, ...pages];
    } else if (!leftDots && rightDots) {
      const extraPages: number[] = range(endPage + 1, endPage + singleDotsOffset);
      pages = [...pages, ...extraPages, dots];
    } else if (leftDots && rightDots) {
      pages = [dots, ...pages, dots];
    }

    return [1, ...pages, pagesAmount];
  }
  return range(1, pagesAmount);
};

export default fetchPageNumbers;