import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Table as BTable } from 'react-bootstrap';
import Card from '../styled/Card';
import Spinner from './Spinner';

const TableResp = styled.div`
  width: 100%;
  overflow-x: auto;
  max-height: ${({ maxHeight }) =>
    typeof maxHeight === 'number' ? `${maxHeight}px` : 'auto'};
  height: ${({ maxHeight, isHeightFixed }) =>
    typeof maxHeight === 'number' && isHeightFixed ? `${maxHeight}px` : 'auto'};
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

const CellVal = styled.div`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  white-space: nowrap;
  color: ${({ color, theme }) => theme[color]} !important;
  vertical-align: middle;

  @media (max-width: ${({ theme }) => theme.lgDown}) {
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

// const debounce = (func, delay, ...args) => {
//   let inDebounce;
//   return function () {
//     clearTimeout(inDebounce);
//     inDebounce = setTimeout(() => {
//       func.apply(this, args);
//     }, delay);
//   };
// };

// const handleScroll = (e, callback) => {
//   console.log('handle scroll');
//   const el = e.target;
//   if (el.scrollTop + el.clientHeight === el.scrollHeight) {
//     callback(el);
//   }
// };

// callback
const Table = ({
  cols,
  rows,
  colLabelKey,
  colValueKey,
  isLoading,
  maxHeight,
  isHeightFixed,
}) => {
  const rowsOrdered = useMemo(
    () => orderRowsData(rows, cols, colValueKey),
    [cols, rows, colValueKey],
  );

  // const sortBy = (by) => {
  //   console.log(rowsOrdered.sort((a, b) => +a[by] - +b[by]));
  //   return;
  // };

  // useEffect(() => {
  //   const list = document.getElementById('tableWrap');
  //   list.addEventListener('scroll', (e) => handleScroll(e, callback));
  //   // list.addEventListener('scroll', (e) => debounce((e) => handleScroll(e, callback), 2000));
  //
  //   return () => {
  //     list.removeEventListener('scroll', (e) => handleScroll(e, callback));
  //     // list.removeEventListener('scroll',(e) => debounce((e) => handleScroll(e, callback), 2000));
  //   };
  // }, []);

  return (
    <Card>
      <TableResp
        id="tableWrap"
        maxHeight={maxHeight}
        isHeightFixed={isHeightFixed}
      >
        <Tbl striped hover>
          <THead>
            <tr>
              {cols.map((col, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Th key={`cell-${index}`}>
                  {col[colLabelKey] ? col[colLabelKey] : col}
                </Th>
              ))}
            </tr>
          </THead>

          <tbody>
            {/* eslint-disable-next-line no-nested-ternary */}
            {isLoading ? (
              <Tr>
                <td colSpan={cols.length} rowSpan={10} className="text-center">
                  <Spinner />
                </td>
              </Tr>
            ) : rowsOrdered && rowsOrdered.length ? (
              rowsOrdered.map((row, rowIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <Tr key={`row-${rowIndex}`}>
                  {Object.keys(row).map((cell, cellIndex) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <td key={`cell-${cellIndex}`}>
                      {row[cell].process ? (
                        row[cell].process()
                      ) : (
                        <CellVal color={row[cell] && row[cell].color}>
                          {(() => {
                            if (typeof row[cell] === 'object') {
                              if ('link' in row[cell]) {
                                return (
                                  <NavLink exact to={row[cell].link}>
                                    {row[cell].value}
                                  </NavLink>
                                );
                              }
                              return row[cell].value;
                            }
                            return row[cell];
                          })()}
                        </CellVal>
                      )}
                    </td>
                  ))}
                </Tr>
              ))
            ) : (
              <Tr>
                <td colSpan={cols.length} className="text-center">
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
  cols: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  ),
  rows: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  ),
  colLabelKey: PropTypes.string,
  colValueKey: PropTypes.string,
  isLoading: PropTypes.bool,
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isHeightFixed: PropTypes.bool,
  // callback: PropTypes.func,
};
Table.defaultProps = {
  cols: [],
  rows: [],
  colLabelKey: 'label',
  colValueKey: 'value',
  isLoading: false,
  maxHeight: 517,
  isHeightFixed: false,
  // callback: () => null,
};

export default Table;
