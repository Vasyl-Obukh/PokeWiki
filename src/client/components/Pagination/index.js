import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import fetchPageNumbers from './pageNumbers';
import { getPagesAmount } from '../../selectors/index';
import * as Styles from './styles';

export const Pagination = ({
  pagesAmount,
  currentPage,
  search
}) => {
  if (!pagesAmount || pagesAmount < 2) return null;

  const dots = '...';
  const pages = fetchPageNumbers(pagesAmount, currentPage);

  const prev = new URLSearchParams(search);
  const next = new URLSearchParams(search);
  prev.set('page', currentPage - 1);
  next.set('page', currentPage + 1);

  return (
    <Styles.List>
      {currentPage !== 1 ? (
        <Styles.ListItem>
          <Styles.Item to={'?' + prev}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Styles.Item>
        </Styles.ListItem>
      ) : null}

      {pages.map((page, index) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set('page', page);
        return (
          <Styles.ListItem key={index}>
            {page === dots ? (
              <Styles.Item as='span'>{dots}</Styles.Item>
            ) : page === currentPage ? (
              <Styles.Item current as='span'>{page}</Styles.Item>
            ) : (
              <Styles.Item to={'?' + searchParams}>{page}</Styles.Item>
            )}
          </Styles.ListItem>
        );
      })}

      {currentPage !== pagesAmount ? (
        <Styles.ListItem>
          <Styles.Item to={'?' + next}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Styles.Item>
        </Styles.ListItem>
      ) : null}
    </Styles.List>
  );
};

Pagination.propTypes = {
  pagesAmount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  search: PropTypes.object
};

export const mapStateToProps = state => ({
  pagesAmount: getPagesAmount(state)
});

export default connect(
  mapStateToProps
)(Pagination);