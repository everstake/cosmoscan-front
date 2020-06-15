import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../../styled/Title';
import { Row } from '../../styled/CustomBsGrid';
import Card from '../../styled/Card';
import TitleMinor from '../../styled/TitleMinor';
import Section from './Section';
import ColStyled from './ColStyled';
import SelectPeriodStyled from './SelectPeriodStyled';
import { periodOptsStats } from '../../../utils/constants';
import { formatNum } from '../../../utils';


// const networkStats = [
//   { title: 'Total staking balance', value: '120 777 222 ATOM' },
//   { title: 'Number of delegators', value: '120 777' },
//   { title: 'Number of multidelegators', value: '120 777' },
//   { title: 'Network size', value: '120 777' },
//   { title: 'Proposal voting', value: '40%' },
// ];
const defaultPeriod = periodOptsStats[2];

const SectionNetwork = ({ stats }) => {
  const [period, setPeriod] = useState(periodOptsStats[2].value);

  return (
    <Section>
      <Title>
        Network
      </Title>

      <SelectPeriodStyled
        defaultOpt={defaultPeriod}
        opts={periodOptsStats}
        onChange={setPeriod}
      />

      <Row
        xs={1}
        md={2}
        lg={3}
        xl={4}
      >
        <ColStyled>
          <Card modifiers={['height100', 'flexCol']}>
            <Card.Body>
              <TitleMinor>
                # of delegators
              </TitleMinor>
              <div>
                <span className="d-flex justify-content-between">
                  <span>
                    { stats.delegators ? formatNum(Number(stats.delegators[period])) : '-----' }
                  </span>
                </span>
              </div>
            </Card.Body>
          </Card>
        </ColStyled>
        <ColStyled>
          <Card modifiers={['height100', 'flexCol']}>
            <Card.Body>
              <TitleMinor>
                # of multi-delegators
              </TitleMinor>
              <div>
                <span className="d-flex justify-content-between">
                  <span>
                    { stats.delegators ? formatNum(Number(stats.multiDelegators[period])) : '-----' }
                  </span>
                </span>
              </div>
            </Card.Body>
          </Card>
        </ColStyled>
      </Row>
    </Section>
  );
};

SectionNetwork.propTypes = {
  stats: PropTypes.objectOf(PropTypes.object),
};
SectionNetwork.defaultProps = {
  stats: {},
};

export default SectionNetwork;
