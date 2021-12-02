import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { Col } from '../grid';

const PaddedCol = styled(Col).attrs(() => ({ block: false }))`
  flex-direction: column;
  align-items: flex-start;

  ${breakpoint('smallPhone')`
    padding-bottom: ${(props) => props.theme.spacing[3]}
    &:last-child {
      padding-bottom: 0
    }
  `}
  ${breakpoint('tablet')`
    padding-bottom: 0
  `}
`;

export default PaddedCol;
