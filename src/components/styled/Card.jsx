import styled, { css } from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

const MODIFIER_CONFIG = {
  height100: () => css`
    height: 100%;
  `,

  flexCol: () => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
};

const Card = styled.div`
  background-color: ${({ theme: { white } }) => white};
  border: ${({ theme: { border } }) => border};
  box-shadow: ${({ theme: { shadow } }) => shadow};
  border-radius: ${({ theme: { borderRadiusStandard } }) =>
    borderRadiusStandard};
  display: flex;
  flex-direction: column;

  ${applyStyleModifiers(MODIFIER_CONFIG)};
`;

const CardHeader = styled.div`
  background-color: ${({ theme: { whiteGrey2 } }) => whiteGrey2};
  border-top-right-radius: ${({ theme: { borderRadiusStandard } }) =>
    borderRadiusStandard};
  border-top-left-radius: ${({ theme: { borderRadiusStandard } }) =>
    borderRadiusStandard};
  border-bottom: ${({ theme: { border } }) => border};
  padding: 10px;
`;

const CardBody = styled.div`
  padding: 10px;
  flex: 1 0 auto;

  ${applyStyleModifiers(MODIFIER_CONFIG)};
`;

const CardFooter = styled.div`
  background-color: ${({ theme: { whiteGrey2 } }) => whiteGrey2};
  border-bottom-right-radius: ${({ theme: { borderRadiusStandard } }) =>
    borderRadiusStandard};
  border-bottom-left-radius: ${({ theme: { borderRadiusStandard } }) =>
    borderRadiusStandard};
  border-top: ${({ theme: { border } }) => border};
  padding: 10px;
`;

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
