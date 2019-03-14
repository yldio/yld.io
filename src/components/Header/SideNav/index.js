import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import Flex from 'styled-flex-component'
import is from 'styled-is'

import ButtonAsIconWrapper from '../../Common/ButtonAsIconWrapper'
import outlineStyles from '../outlineStyles'
import close from '../../../images/close.svg'
import Dropdown from './Dropdown'
import OuterAnchorItem from './OuterAnchorItem'

const CloseIcon = styled.img`
  fill: ${props => props.theme.colors.white};
`

const StyledButton = styled(ButtonAsIconWrapper)`
  width: ${remcalc(80)};
  height: ${remcalc(80)};

  margin: ${remcalc(4)};
  ${outlineStyles}
`

const CloseButton = ({ onClick, src, alt }) => (
  <StyledButton onClick={onClick}>
    <CloseIcon src={src} alt={alt} />
  </StyledButton>
)

const SideNavList = styled.ul``

const SideNavPanel = styled.div.attrs({
  as: 'nav'
})`
  position: fixed;
  background: ${props => props.theme.colors.blueBg};
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  z-index: ${props => props.theme.zIndexes.header};
  transform: translateX(100%);
  transition: transform ${props => props.theme.animations.fast} ease-in-out;

  /* Thinner version' of the navbar */
  @media screen and (min-width: 600px) and (max-width: 959px) {
    width: ${remcalc(295)};
    left: auto;
    right: 0;
    z-index: 10;
  }

  ${is('open')`
    transform: translateX(0%);
  `};

  @media screen and (min-width: 960px) {
    display: none;
  }
`

const SideNav = ({ links, isOpen, onClose }) => (
  <SideNavPanel open={isOpen}>
    <Flex justifyEnd>
      <CloseButton onClick={onClose} src={close} alt="Close menu" />
    </Flex>
    <SideNavList>
      <OuterAnchorItem activeClassName="active" to="/">
        Home
      </OuterAnchorItem>
      {links.map((link, idx) => {
        if (link.dropdownItems) {
          const { label, dropdownItems } = link
          return (
            <Dropdown key={idx} items={dropdownItems}>
              {label}
            </Dropdown>
          )
        } else {
          const { label, to, href } = link
          return (
            <OuterAnchorItem
              key={idx}
              activeClassName="active"
              to={to}
              href={href}
            >
              {label}
            </OuterAnchorItem>
          )
        }
      })}
    </SideNavList>
  </SideNavPanel>
)

export default SideNav
