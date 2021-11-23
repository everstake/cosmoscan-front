import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
`;

const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

Flex.Center = FlexCenter;

export default Flex;
