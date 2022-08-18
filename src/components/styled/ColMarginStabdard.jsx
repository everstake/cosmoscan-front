import styled from 'styled-components';
import { Col } from 'react-bootstrap';

const ColMarginStandard = styled(Col)`
  margin-bottom: ${({ theme: { marginSectionsStandard } }) =>
    marginSectionsStandard};
`;

export default ColMarginStandard;
