import React from 'react';

import { Row, Col } from '../grid';
import StyledLink from '../Common/StyledLink';

const Pagination = ({ numberOfPages, currentPage }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numberOfPages;

  const prevPagePath =
    currentPage - 1 === 1 ? `` : `page/${(currentPage - 1).toString()}/`;
  const nextPagePath = `page/${(currentPage + 1).toString()}/`;

  const prevPageLink = isFirst ? null : `/blog/${prevPagePath}`;
  const nextPageLink = isLast ? null : `/blog/${nextPagePath}`;

  return (
    <Row style={{ justifyContent: 'space-between' }} block={false}>
      <Col>
        {prevPageLink && (
          <StyledLink to={prevPageLink}>Previous Page</StyledLink>
        )}
      </Col>
      <Col>
        {nextPageLink && <StyledLink to={nextPageLink}>Next Page</StyledLink>}
      </Col>
    </Row>
  );
};

export default Pagination;
