import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme, color }) => theme[color]};
`;

export default Icon;
