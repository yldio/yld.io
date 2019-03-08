import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

import InnerAnchorItem from './InnerAnchorItem'

const StyledList = styled.ul`
  position: absolute;
  width: ${remcalc(160)};
  display: flex;
  flex-direction: column;
  top: ${remcalc(48)};
  left: -9999px;
  opacity: 0;
  transition: opacity ${props => props.theme.animations.normal} ease;
  background: ${props => props.theme.colors.greyBG};
  z-index: ${props => props.theme.zIndexes.header} ${is('expanded')`
    left: 0;
    opacity: 1;
  `};
`

const TopNavDropdownList = ({ expanded, items, themeVariation, onClick }) => (
  <StyledList expanded={expanded}>
    {items.map(({ to, href, label }, idx) => (
      <InnerAnchorItem
        key={idx}
        themeVariation={themeVariation}
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

export default TopNavDropdownList
