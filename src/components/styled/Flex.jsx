import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
`;

const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

const FlexCenterColumn = styled(FlexCenter)`
  flex-direction: column;
  gap: 5px;
`;

Flex.Center = FlexCenter;
Flex.FlexCenterColumn = FlexCenterColumn;

export default Flex;
