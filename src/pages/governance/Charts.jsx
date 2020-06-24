import React, { useMemo, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Col } from 'react-bootstrap';
import { Container, Row } from '../../components/styled/CustomBsGrid';
import ChartContainer from '../../layouts/ChartContainer';
import useRequest from '../../hooks/useRequest';
import API from '../../api';
import BarChart from '../../components/chart-types/BarChart';
import { formatPercentValue, formatId } from '../../utils';

const ColStyled = styled(Col)`
  margin-bottom: ${({ theme: { marginSectionsStandard } }) => marginSectionsStandard};
`;

const chartName = 'All props participation in %';
const yAxisWidth = 40;
const yAxisTickCount = 10;
const barName = 'Props participation';
const tooltipLabelFormatter = (val) => `Proposal ${formatId(val)}`

const Charts = () => {
  const theme = useContext(ThemeContext);
  const { resp, isLoading } = useRequest(API.getProposalsCharts);

  const participationPercents = useMemo(() => {
    if (!resp || !resp.length) return [];

    return resp.map((proposal) => ({
      name: proposal.proposal_id,
      dataPiece: proposal.turnout,
    })).reverse();
  }, [resp]);

  return (
    <Container>
      <Row xs={1} xl={2}>
        <ColStyled>
          <ChartContainer
            title={chartName}
            chart={(
              <BarChart
                isLoading={isLoading}
                data={participationPercents}
                yAxisWidth={yAxisWidth}
                yAxisTickCount={yAxisTickCount}
                yAxisLabelsFormatter={formatPercentValue}
                xAxisTickFormatter={formatId}
                tooltipLabelFormatter={tooltipLabelFormatter}
                tooltipFormatter={formatPercentValue}
                barColor={theme.blue}
                barName={barName}
              />
            )}
          />
        </ColStyled>
        <ColStyled>
          All props participation, amount of addresses
        </ColStyled>
        <ColStyled>
          Validator amount holding 33.4% voting power
        </ColStyled>
        <ColStyled>
          Most vetoed proposals
        </ColStyled>
        <ColStyled>
          Most active delegators
        </ColStyled>
        <ColStyled>
          Time to quorum
        </ColStyled>
      </Row>
    </Container>
  );
};

export default Charts;
