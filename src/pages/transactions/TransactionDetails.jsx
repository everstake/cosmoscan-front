import React, { useContext, useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import useRequest from '../../hooks/useRequest';
import API from '../../api';
import TemplateCard from '../../components/reusable/TemplateCard';
import { formatToken, formatTokenAmount } from '../../utils';
import Icon from '../../components/styled/Icon';
import { Container } from '../../components/styled/CustomBsGrid';
import Card from '../../components/styled/Card';
import BreakTxt from '../../components/styled/BreakTxt';
import TitleMinor from '../../components/styled/TitleMinor';
import Flex from '../../components/styled/Flex';
import Spinner from '../../components/reusable/Spinner';
import Subtitle from '../../components/styled/Subtitle';
import Store from '../../store';

const Row = styled.div`
  display: flex;
  gap: 15px;
`;

const Label = styled(TitleMinor)`
  min-width: 170px;
`;

const Wrapper = styled.div`
  max-height: 500px;
  overflow-y: scroll;
`;

const TransactionDetails = () => {
  const { id } = useParams();
  const { resp, isLoading } = useRequest(API.getTransactionDetails, id);
  const { chain } = useContext(Store);

  const items = useMemo(() => {
    if (!resp || !Object.keys(resp).length) return [];

    return [
      {
        key: 'hash',
        label: 'Hash',
        value: resp.hash,
      },
      {
        key: 'status',
        label: 'Status',
        process() {
          return (
            <div>
              <Icon
                icon={resp.status ? 'check' : 'times'}
                color={resp.status ? 'success' : 'danger'}
                className="mr-1"
              />
              {resp.status ? 'Success' : 'Fail'}
            </div>
          );
        },
      },
      {
        key: 'fee',
        label: 'Fee',
        value: formatToken(resp.fee),
      },
      {
        key: 'height',
        label: 'Height',
        value: resp.height,
      },
      {
        key: 'created_at',
        label: 'Time',
        value: moment.unix(resp.created_at).format('DD-MM-YYYY LTS'),
      },
      {
        key: 'gas',
        label: 'Gas(used / wanted)',
        value: `${formatTokenAmount(resp.gas_used)} / ${formatTokenAmount(
          resp.gas_wanted,
        )}`,
      },
      {
        key: 'memo',
        label: 'Memo',
        value: resp.memo,
      },
    ];
  }, [resp]);

  const messages = useMemo(() => {
    if (!resp || !resp.messages.length) return [];

    return resp.messages.reduce((acc, elem) => {
      const t = {
        type: '',
        body: [],
      };

      function parsing(obj) {
        // eslint-disable-next-line no-restricted-syntax
        for (const prop in obj) {
          if (typeof obj[prop] === 'object') {
            parsing(obj[prop]);
          } else if ('type' in obj) {
            t.type = obj[prop];
          } else if (prop === 'amount') {
            t.body.push({ [prop]: formatToken(Number(obj[prop])) });
          } else if (
            (typeof obj[prop] === 'string' &&
              obj[prop].includes(`${chain.value}`) &&
              obj[prop].length === 45) ||
            obj[prop].length === 46 ||
            obj[prop].length === 50
          ) {
            t.body.push({
              [prop]: {
                link: `/${chain.value}/account/${obj[prop]}`,
                value: obj[prop],
              },
            });
          } else if (prop !== 'denom') {
            t.body.push({ [prop]: obj[prop] });
          }
        }
      }

      parsing(elem);
      acc.push(t);
      return acc;
    }, []);
  }, [resp, chain]);

  return (
    <Container>
      <TemplateCard
        title="Transaction details"
        items={items}
        isLoading={isLoading}
      />

      <div className="mt-4">
        <Card>
          <Subtitle p="10px">Messages</Subtitle>

          {isLoading ? (
            <Flex.Center className="p-5">
              <Spinner />
            </Flex.Center>
          ) : (
            messages.map((elem, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i}>
                <Card.Header>{elem.type}</Card.Header>

                <Wrapper>
                  {Object.values(elem.body).map((el) =>
                    Object.keys(el).map((e, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Card.Body key={index}>
                        <Row>
                          <Label as="span">{e}:</Label>

                          <BreakTxt>
                            {(() => {
                              if (typeof el[e] === 'object') {
                                if ('link' in el[e]) {
                                  return (
                                    <NavLink exact to={el[e].link}>
                                      {el[e].value}
                                    </NavLink>
                                  );
                                }
                              }
                              return el[e];
                            })()}
                          </BreakTxt>
                        </Row>
                      </Card.Body>
                    )),
                  )}
                </Wrapper>
              </div>
            ))
          )}
        </Card>
      </div>
    </Container>
  );
};

export default TransactionDetails;
