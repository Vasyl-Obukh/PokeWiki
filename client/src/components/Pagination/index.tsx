import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import fetchPageNumbers from './pageNumbers';
import { getPagesAmount } from '../../selectors';
import * as Styles from './styles';
import { State } from '../../store';

type StateProps = {
  pagesAmount: number,
};

type Props = StateProps & {
  currentPage: number,
  search: URLSearchParams | string
}

export const Pagination = (props: Props) => {
  const { pagesAmount, currentPage, search } = props;
  if (!pagesAmount || pagesAmount < 2) return null;

  const dots: string = '...';
  const pages: (string | number)[] = fetchPageNumbers(pagesAmount, currentPage);

  const prev = new URLSearchParams(search);
  const next = new URLSearchParams(search);
  prev.set('page', currentPage - 1 + '');
  next.set('page', currentPage + 1 + '');

  return (
    <Styles.List>
      {currentPage !== 1 ? (
        <Styles.ListItem>
          <Styles.Item as={Link} to={'?' + prev}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Styles.Item>
        </Styles.ListItem>
      ) : null}

      {pages.map((page, index) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set('page', page + '');

        return (
          <Styles.ListItem key={index}>
            {page === dots ? (
              <Styles.Item>{dots}</Styles.Item>
            ) : page === currentPage ? (
              <Styles.Item current={true}>{page}</Styles.Item>
            ) : (
              <Styles.Item as={Link} to={'?' + searchParams}>{page}</Styles.Item>
            )}
          </Styles.ListItem>
        );
      })}

      {currentPage !== pagesAmount ? (
        <Styles.ListItem>
          <Styles.Item as={Link} to={'?' + next}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Styles.Item>
        </Styles.ListItem>
      ) : null}
    </Styles.List>
  );
};

export const mapStateToProps = (state: State): StateProps => ({
  pagesAmount: getPagesAmount(state)
});

export default connect(
  mapStateToProps
)(Pagination);