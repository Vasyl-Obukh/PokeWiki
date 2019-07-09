import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import fetchPageNumbers from './pageNumbers';
import { getPagesAmount } from '../../selectors/index';

const PaginationList = styled.ul`
  display: flex;
  padding: 0;
  justify-content: center;
`;

const PaginationListItem = styled.li`
  list-style: none;
  color: white;
`;

const PaginationItem = styled.a`
  display: flex;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 5px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.current ? 'white' : props.theme.backgroundPrimary};
  border: ${props => props.current ? `1px solid ${props.theme.backgroundPrimary}` : 'none' };
  color: ${props => props.current ? props.theme.backgroundPrimary : 'inherit'};
  text-decoration: none;
`;

const Pagination = ({
  pagesAmount,
  currentPage,
  search
}) => {
  if (!pagesAmount || pagesAmount === 1) return null;

  const dots = '...';
  const pages = fetchPageNumbers(pagesAmount, currentPage);

  const prev = new URLSearchParams(search);
  const next = new URLSearchParams(search);
  prev.set('page', currentPage - 1);
  next.set('page', currentPage + 1);

  return (
    <PaginationList>
      {currentPage !== 1 ? (
        <PaginationListItem>
          <PaginationItem as={Link} to={'?' + prev}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </PaginationItem>
        </PaginationListItem>
      ) : null}

      {pages.map((page, index) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set('page', page);
        return (
          <PaginationListItem key={index}>
            {page === dots ? (
              <PaginationItem as='span'>{dots}</PaginationItem>
            ) : page === currentPage ? (
              <PaginationItem current as='span'>{page}</PaginationItem>
            ) : (
              <PaginationItem as={Link} to={'?' + searchParams}>{page}</PaginationItem>
            )}
          </PaginationListItem>
        );
      })}

      {currentPage !== pagesAmount ? (
        <PaginationListItem>
          <PaginationItem as={Link} to={'?' + next}>
            <FontAwesomeIcon icon={faChevronRight} />
          </PaginationItem>
        </PaginationListItem>
      ) : null}
    </PaginationList>
  );
};

Pagination.propTypes = {
  pagesAmount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  search: PropTypes.object
};

export default connect(
  state => ({
    pagesAmount: getPagesAmount(state)
  })
)(Pagination);