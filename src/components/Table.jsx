import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table as BTable } from 'react-bootstrap';
import Card from './styled/Card';
import Spinner from './Spinner';


const TableResp = styled.div`
  width: 100%;
  overflow-x: auto;
  max-height: 507px;
  border-radius: 8px;
`;

const Tbl = styled(BTable)`
  margin-bottom: 0;
`;

const THead = styled.thead`
  color: ${({ theme: { white } }) => white};
`;

const Tr = styled.tr`
  transition: background-color 0.2s;
`;

const Th = styled.th`
  background-color: ${({ theme: { blue } }) => blue};
  position: sticky;
  top: -1px;
`;

const CellVal = styled.span`
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  //word-break: break-all;
  display: inline-block;
  white-space: nowrap;
  color: ${({ color, theme }) => theme[color]} !important;
  
  @media(max-width: ${({ theme }) => theme.lgDown}) {
    max-width: 200px;
  }
`;

const orderRowsData = (rows, cols, colValueKey) => {
  if (!rows || !rows.length || !cols || !cols.length) return [];

  return rows.reduce((agg, row, idx) => {
    const res = [...agg];

    cols.forEach((col) => {
      // Needed to parse table headers if they are array of strings-keys for data object in rows
      const colVal = col[colValueKey] || col;

      if (!res[idx]) {
        res[idx] = { [colVal]: row[colVal] };
      } else {
        res[idx][[colVal]] = row[colVal];
      }
    });
    return res;
  }, []);
};

const Table = ({
  cols, rows, colLabelKey, colValueKey, isLoading,
}) => {
  const rowsOrdered = useMemo(() => orderRowsData(rows, cols, colValueKey), [cols, rows, colValueKey]);

  // useEffect(() => {
  //   const list = document.getElementById('tableWrap');
  //   console.log('Load more');
  //   list.addEventListener('scroll', (e) => {
  //     const el = e.target;
  //     if (el.scrollTop + el.clientHeight === el.scrollHeight) {
  //       console.log('Load more');
  //     }
  //   });
  //
  //   return () => {
  //     list.removeEventListener('scroll');
  //   };
  // }, []);

  return (
    <Card>
      <TableResp id="tableWrap">
        <Tbl
          striped
          hover
        >
          <THead>
            <tr>
              {cols.map((col, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Th key={`cell-${index}`}>
                  { col[colLabelKey] ? col[colLabelKey] : col}
                </Th>
              ))}
            </tr>
          </THead>
          <tbody>
            {/* eslint-disable-next-line no-nested-ternary */}
            {isLoading
              ? (
                <Tr>
                  <td
                    colSpan={cols.length}
                    className="text-center"
                  >
                    <Spinner />
                  </td>
                </Tr>
              )
              : rowsOrdered && rowsOrdered.length
                ? rowsOrdered.map((row, rowIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Tr key={`row-${rowIndex}`}>
                    {Object.keys(row).map((cell, cellIndex) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <td key={`cell-${cellIndex}`}>
                        <CellVal color={row[cell].color}>
                          {typeof row[cell] === 'object' ? row[cell].value : row[cell]}
                        </CellVal>
                      </td>
                    ))}
                  </Tr>
                ))
                : (
                  <Tr>
                    <td
                      colSpan={cols.length}
                      className="text-center"
                    >
                      No data
                    </td>
                  </Tr>
                )}
          </tbody>
        </Tbl>
      </TableResp>
    </Card>
  );
};

Table.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])),
  rows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])),
  colLabelKey: PropTypes.string,
  colValueKey: PropTypes.string,
  isLoading: PropTypes.bool,
};
Table.defaultProps = {
  cols: [],
  rows: [],
  colLabelKey: 'label',
  colValueKey: 'value',
  isLoading: false,
};

export default Table;
