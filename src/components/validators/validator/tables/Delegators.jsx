import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import Table from '../../../Table';
import { formatATOM } from '../../../../utils';
import useRequest from '../../../../hooks/useRequest';
import API from '../../../../api';


const PagoinationStyled = styled(Pagination)`
  ${({ theme: { blue, blue4 } }) => css`
    .page-link {
      color: ${blue};
    }
    
    .page-item.active .page-link {
      background-color: ${blue};
      border-color: ${blue};
    }
    
    .page-item.disabled .page-link {
      color: ${blue4};
    }
  `}
`;

const cols = [
  { value: 'address', label: 'Address' },
  { value: 'amount', label: 'Amount' },
  { value: 'since', label: 'Delegating since' },
  { value: 'delta', label: '24h change' },
];
const defineDeltaColor = (delta) => {
  const sign = Math.sign(Number(delta));

  switch (sign) {
    case -1:
      return 'danger';
    case +1:
      return 'success';
    default:
      return '';
  }
};

const limit = 10;

const Delegators = () => {
  const { address } = useParams();
  const { resp, isLoading, request } = useRequest(
    API.getValidatorDelegators,
    { limit, offset: 0, address },
  );


  const [currPage, setCurrPage] = useState(1);
  const totalPages = useMemo(() => {
    if (!resp || !Object.keys(resp).length) return [];

    return Math.ceil(resp.total / limit);
  }, [resp]);


  const jump = (page) => {
    const pageNumber = Math.max(1, page);
    setCurrPage(() => Math.min(pageNumber, totalPages));
    request({ limit, offset: Math.min(pageNumber - 1, totalPages) * 10, address });
  };

  const next = () => {
    setCurrPage((currentPage) => Math.min(currentPage + 1, totalPages));
    request({ limit, offset: Math.min(currPage, totalPages) * 10, address });
  };

  const prev = () => {
    setCurrPage((currentPage) => Math.max(currentPage - 1, 1));
    request({ limit, offset: Math.max(currPage - 2, 0) * 10, address });
  };

  const pageItems = useMemo(() => Array(totalPages).fill(null).map((item, index) => (
    <Pagination.Item
      key={index}
      active={index + 1 === currPage}
      disabled={isLoading}
      onClick={() => jump(index + 1)}
    >
      { index + 1 }
    </Pagination.Item>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  )), [totalPages, isLoading, currPage]);

  const currPageItems = useMemo(() => {
    const currPageIndex = currPage - 1;

    return pageItems.slice(
      Math.max(0, currPage >= totalPages ? currPageIndex - 2 : currPageIndex - 1),
      Math.max(0, currPageIndex < 1 ? currPageIndex + 3 : currPageIndex + 2),
    );
  }, [pageItems, currPage, totalPages]);

  const delegators = useMemo(() => {
    if (!resp || !Object.keys(resp).length) return [];

    return resp.items.map((delegator) => ({
      address: delegator.delegator,
      amount: formatATOM(delegator.amount),
      since: moment.unix(delegator.since).format('DD-MM-YYYY'),
      delta: {
        value: formatATOM(delegator.delta),
        color: defineDeltaColor(delegator.delta),
      },
    }));
  }, [resp]);

  return (
    <>
      <Table
        isLoading={isLoading}
        isHeightFixed
        cols={cols}
        rows={delegators}
      />
      <PagoinationStyled className="justify-content-end mt-3 mr-3">
        <PagoinationStyled.First
          onClick={() => jump(1)}
          disabled={currPage === 1 || isLoading}
        />
        <PagoinationStyled.Prev
          onClick={prev}
          disabled={currPage === 1 || isLoading}
        />
        {currPageItems.map((el) => el)}
        <PagoinationStyled.Next
          onClick={next}
          disabled={currPage >= totalPages || isLoading}
        />
        <PagoinationStyled.Last
          onClick={() => jump(totalPages)}
          disabled={currPage >= totalPages || isLoading}
        />
      </PagoinationStyled>
    </>
  );
};

export default Delegators;
