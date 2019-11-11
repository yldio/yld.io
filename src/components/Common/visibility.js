import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export const NoMobile = styled.section`
  display: none;

  ${breakpoint('tablet')`
    display: block;
  `};
`;

export const NoDesktop = styled.section`
  display: block;

  ${breakpoint('tablet')`
    display: none;
  `};
`;
