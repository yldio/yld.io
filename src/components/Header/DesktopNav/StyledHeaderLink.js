import styled from 'styled-components';
import remcalc from 'remcalc';
import InternalAnchor from '../../../components/Common/InternalAnchor';
import { breakpointsWithHeader } from '../../../utils/theme';

const StyledHeaderLink = styled(InternalAnchor)`
  font-size: ${remcalc(26)};
  margin-left: ${remcalc(12)};
  color: ${props => props.color};

  ${breakpointsWithHeader.header`
    font-size: ${remcalc(30)};
  `}

  &:hover {
    text-decoration: underline;
    color: ${props => props.color};
  }
`;

export default StyledHeaderLink;
