import React from 'react'
import { Link } from 'gatsby'
// eslint-disable-next-line no-unused-vars
import styled, { withComponent } from 'styled-components'
import remcalc from 'remcalc'

const Anchor = styled(Link)`
  margin-top: ${remcalc(12)};
  margin-bottom: ${remcalc(22)};
  line-height: ${remcalc(24)};
  padding-bottom: ${remcalc(6)};
  color: ${props => props.theme.colors.text};
  font-weight: 700;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    display: block;
    height: ${remcalc(2)};
    width: 100%;
    margin-top: ${remcalc(6)};
    background: ${props => props.theme.colors.text};
  }
`

const StyledAnchor = Anchor.withComponent('a')

const StyledLink = ({ to, href, children, ...props }) => {
  if (to) {
    return (
      <Anchor to={to} {...props}>
        {children}
      </Anchor>
    )
  }

  return (
    <StyledAnchor href={href} {...props}>
      {children}
    </StyledAnchor>
  )
}

export default StyledLink
