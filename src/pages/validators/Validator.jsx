import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Tab, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ColStyled from '../../components/styled/ColStyled';
import Card from '../../components/styled/Card';
import { Container, Row } from '../../components/styled/CustomBsGrid';
import General from '../../components/validators/validator/General';
import BalanceDistribution from '../../components/validators/validator/charts/BalanceDistribution';
import DelegatedBalance from '../../components/validators/validator/charts/DelegatedBalance';
import NumOfDelegators from '../../components/validators/validator/charts/NumOfDelegators';
import ValidatorStats from '../../components/validators/validator/Stats';
import DelegatorsTable from '../../components/validators/validator/tables/Delegators';
import VotesTable from '../../components/validators/validator/tables/Votes';
import useRequest from '../../hooks/useRequest';
import API from '../../api';

const Validator = () => {
  const { address } = useParams();
  const { resp } = useRequest(API.getValidatorInfo, address);

  return (
    <Container>
      <Helmet>
        <title>Cosmos validator | Cosmoscan</title>
        <meta
          name="description"
          content="View information on the individual Cosmos validator."
        />
        <meta
          itemProp="description"
          content="View information on the individual Cosmos validator."
        />
        <meta
          property="og:description"
          content="View information on the individual Cosmos validator."
        />
        <meta
          name="twitter:description"
          content="View information on the individual Cosmos validator."
        />
      </Helmet>

      <Row xs={1} xl={2}>
        <ColStyled>
          <General info={resp || {}} />
        </ColStyled>
        <ColStyled>
          <BalanceDistribution />
        </ColStyled>
        <ColStyled>
          <DelegatedBalance />
        </ColStyled>
        <ColStyled>
          <NumOfDelegators />
        </ColStyled>
      </Row>

      <Row>
        <ColStyled>
          <ValidatorStats />
        </ColStyled>
      </Row>

      <Row>
        <ColStyled>
          <Card>
            <Tab.Container id="left-tabs-example" defaultActiveKey="delegators">
              <Card.Header style={{ padding: 0, border: 'none' }}>
                <Nav fill variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="delegators">Delegators</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="votes">Governance votes</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>

              <Card.Body
                style={{
                  borderLeft: '1px solid #dee2e6',
                  borderRight: '1px solid #dee2e6 ',
                  borderBottom: '1px solid #dee2e6 ',
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingBottom: 0,
                  paddingTop: 0,
                }}
              >
                <Tab.Content>
                  <Tab.Pane eventKey="delegators">
                    <DelegatorsTable />
                  </Tab.Pane>
                  <Tab.Pane eventKey="votes">
                    {resp && resp.acc_address ? (
                      <VotesTable accAddress={resp.acc_address} />
                    ) : (
                      <div>No data</div>
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Tab.Container>
          </Card>
        </ColStyled>
      </Row>
    </Container>
  );
};

export default Validator;
