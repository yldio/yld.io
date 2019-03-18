import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'
import is from 'styled-is'
import remcalc from 'remcalc'

import Chevron from '../../Common/Chevron'
import InnerAnchorItem from './InnerAnchorItem'
import headerItemStyles from '../headerItemStyles'
import outlineStyles from '../outlineStyles'
import topNavItemStyles from './topNavItemStyles'
import { lightStates, darkStates } from './outerItemStates'

const DropdownContainer = styled.li.attrs(props => ({
  states: props.themeVariation === 'dark' ? darkStates : lightStates
}))`
  position: relative;
  cursor: pointer;
  background: transparent;

  > span {
    ${props => props.states.default}

    &:hover {
      ${props => props.states.hover}
    }
  }

  ${is('expanded')`
    > span {
      ${props => props.states.clickTap}

      &:hover {
        ${props => props.states.activeAndHover}
      }
    }
  `}
`

const DropdownNameWrapper = styled.span`
  display: flex;
  align-items: center;
  transition: outline ${props => props.theme.animations.normal} ease-out;
  /* bumping the z-index so that the outline doesn't get behind the dropdown items list */
  z-index: 2;
  ${headerItemStyles}
  ${topNavItemStyles}
  ${outlineStyles}

  ${props =>
    props.themeVariation === props.theme.variations.dark &&
    props.expanded === true &&
    css`
      &:focus {
        outline-color: ${props.theme.colors.white};
      }
    `}
`

const DropdownName = styled.span`
  margin-right: ${remcalc(6)};
  outline: none;
`

const DropdownList = styled.ul`
  position: absolute;
  width: ${remcalc(160)};
  display: flex;
  flex-direction: column;
  top: ${remcalc(48)};
  left: -9999px;
  opacity: 0;
  transition: opacity ${props => props.theme.animations.normal} ease;
  background: ${props => props.theme.colors.greyBG};
  z-index: ${props => props.theme.zIndexes.header};
  ${is('expanded')`
    left: 0;
    opacity: 1;
  `};
`

export default class Dropdown extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false
    }
    this.ref = React.createRef()
  }

  toggle = e => {
    this.setState({ isExpanded: !this.state.isExpanded })
  }

  handleItemClick = () => {
    this.setState({ isExpanded: false })
  }

  handleFocus = (e, ...rest) => {
    this.setState({ isExpanded: true })
  }

  handleBlur = () => {
    this.setState({ isExpanded: false })
  }

  render() {
    const { items, themeVariation, children } = this.props
    const { isExpanded } = this.state

    return (
      <DropdownContainer
        aria-haspopup="true"
        expanded={isExpanded}
        aria-expanded={isExpanded}
        onMouseDown={this.toggle}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        themeVariation={themeVariation}
        ref={this.ref}
      >
        <DropdownNameWrapper
          tabIndex="0"
          expanded={isExpanded}
          themeVariation={themeVariation}
        >
          <DropdownName>{children}</DropdownName>
          <Chevron direction={isExpanded ? 'up' : 'down'} />
        </DropdownNameWrapper>
        <DropdownList expanded={isExpanded}>
          {items.map(({ to, href, label }, idx) => (
            <InnerAnchorItem
              key={idx}
              themeVariation={themeVariation}
              href={href}
              to={to}
              activeClassName="active"
              onClick={this.handleClick}
            >
              {label}
            </InnerAnchorItem>
          ))}
        </DropdownList>
      </DropdownContainer>
    )
  }
}
