import range from '../../utils/range';

const fetchPageNumbers = (pagesAmount, currentPage) => {
  const dots = '...';
  const pageNeighbours = 1;
  const totalNumbers = pageNeighbours * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (pagesAmount > totalBlocks) {
    let pages;

    const leftBound = currentPage - pageNeighbours;
    const rightBound = currentPage + pageNeighbours;
    const beforeLastPage = pagesAmount - 1;

    const startPage = leftBound > 2 ? leftBound : 2;
    const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

    pages = range(startPage, endPage);

    const pagesCount = pages.length;
    const singleDotsOffset = totalNumbers - pagesCount - 1;

    const leftDots = startPage > 2;
    const rightDots = endPage < beforeLastPage;

    if (leftDots && !rightDots) {
      const extraPages = range(startPage - singleDotsOffset, startPage - 1);
      pages = [dots, ...extraPages, ...pages];
    } else if (!leftDots && rightDots) {
      const extraPages = range(endPage + 1, endPage + singleDotsOffset);
      pages = [...pages, ...extraPages, dots];
    } else if (leftDots && rightDots) {
      pages = [dots, ...pages, dots];
    }

    return [1, ...pages, pagesAmount];
  }
  return range(1, pagesAmount);
};

export default fetchPageNumbers;