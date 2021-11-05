import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';
import PaginationStyled from '../styled/Pagination';

const LayoutPagination = ({
  resp,
  request,
  isLoading,
  limit,
  address,
  maxTotalPage,
}) => {
  const [currPage, setCurrPage] = useState(1);

  const totalPages = useMemo(() => {
    if (!resp || !Object.keys(resp).length) return [];

    if (resp.total > maxTotalPage) {
      return Math.ceil(maxTotalPage / limit);
    }
    return Math.ceil(resp.total / limit);
  }, [limit, maxTotalPage, resp]);

  const jump = (page) => {
    const pageNumber = Math.max(1, page);
    setCurrPage(() => Math.min(pageNumber, totalPages));
    request({
      limit,
      offset: Math.min(pageNumber - 1, totalPages) * 10,
      address,
    });
  };

  const next = () => {
    setCurrPage((currentPage) => Math.min(currentPage + 1, totalPages));
    request({ limit, offset: Math.min(currPage, totalPages) * 10, address });
  };

  const prev = () => {
    setCurrPage((currentPage) => Math.max(currentPage - 1, 1));
    request({ limit, offset: Math.max(currPage - 2, 0) * 10, address });
  };

  // const pageItems = useMemo(
  //   () =>
  //     Array(totalPages)
  //       .fill(null)
  //       .map((item, index) => (
  //         <Pagination.Item
  //           key={index}
  //           active={index + 1 === currPage}
  //           disabled={isLoading}
  //           onClick={() => jump(index + 1)}
  //         >
  //           {index + 1}
  //         </Pagination.Item>
  //       )),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [totalPages, isLoading, currPage],
  // );

  const currPageItems = useMemo(() => {
    const currPageIndex = currPage - 1;

    const pageItems = Array(totalPages)
      .fill(null)
      .map((item, index) => (
        <Pagination.Item
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          active={index + 1 === currPage}
          disabled={isLoading}
          onClick={() => jump(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ));

    return pageItems.slice(
      Math.max(
        0,
        currPage >= totalPages ? currPageIndex - 2 : currPageIndex - 1,
      ),
      Math.max(0, currPageIndex < 1 ? currPageIndex + 3 : currPageIndex + 2),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage, totalPages, isLoading]);

  return (
    <PaginationStyled className="justify-content-end mt-3 mr-3">
      <PaginationStyled.First
        onClick={() => jump(1)}
        disabled={currPage === 1 || isLoading}
      />
      <PaginationStyled.Prev
        onClick={prev}
        disabled={currPage === 1 || isLoading}
      />
      {currPageItems.map((el) => el)}
      <PaginationStyled.Next
        onClick={next}
        disabled={currPage >= totalPages || isLoading}
      />
      <PaginationStyled.Last
        onClick={() => jump(totalPages)}
        disabled={currPage >= totalPages || isLoading}
      />
    </PaginationStyled>
  );
};

LayoutPagination.propTypes = {
  resp: PropTypes.objectOf(PropTypes.any),
  request: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  limit: PropTypes.number,
  address: PropTypes.string,
  maxTotalPage: PropTypes.number,
};

LayoutPagination.defaultProps = {
  limit: 10,
  resp: {},
  address: '',
  maxTotalPage: 4000,
};

export default LayoutPagination;
