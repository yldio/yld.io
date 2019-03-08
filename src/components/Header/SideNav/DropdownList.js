import React from 'react'
import styled from 'styled-components'
import is from 'styled-is'

import InnerAnchorItem from './InnerAnchorItem'

const StyledList = styled.ul`
  display: none;
  opacity: 0;

  ${is('expanded')`
    display: flex;
    flex-direction: column;
    width: 100%;
    opacity: 1;
    transition: opacity ${props => props.theme.animations.normal} ease;
    background: ${props => props.theme.colors.greyBG};
  `}
`

const DropdownList = ({ expanded, items, themeVariation, onClick }) => (
  <StyledList expanded={expanded}>
    {items.map(({ to, href, label }, idx) => (
      <InnerAnchorItem
        key={idx}
        href={href}
        to={to}
        activeClassName="active"
        onClick={onClick}
      >
        {label}
      </InnerAnchorItem>
    ))}
  </StyledList>
)

export default DropdownList
