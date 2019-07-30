import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'
import is from 'styled-is'
import remcalc from 'remcalc'

import Chevron from '../../Common/Chevron'
import InnerAnchorItem from './InnerAnchorItem'
import headerItemStyles from '../headerItemStyles'
import outlineStyles from '../outlineStyles'
import topNavItemStyles from './topNavItemStyles'
import TopNavItem from './TopNavItem'

const DropdownContainer = styled(TopNavItem)`
  position: relative;
  cursor: pointer;
  background: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

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
        ${props => props.states.hover}
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
  ${props => !props.clicked && outlineStyles}

  ${props =>
    props.clicked &&
    props.themeVariation === props.theme.variations.dark &&
    props.expanded === true &&
    css`
      &:focus {
        outline-color: ${props.theme.colors.white};
      }
    `}
`

const DropdownName = styled.span`
  padding-right: ${remcalc(6)};
  outline: none;
  user-select: none;
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
  background: ${props => props.theme.colors.greyBg};
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
      isExpanded: false,
      clicked: false
    }
  }

  /**
   * The outline is not desired when the user opens the dropdown with the mouse
   * so we're detecting it on mouse down
   */
  handleMouseDown = () => {
    if (this.hasTouch()) {
      return
    }
    this.setState({ clicked: true })
  }

  handleClick = () => {
    if (!this.hasTouch()) {
      return
    }

    this.setState(prevState => ({
      clicked: true,
      isExpanded: !prevState.isExpanded
    }))
  }

  handleItemMouseDown = e => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ clicked: false })
  }

  handleFocus = () => {
    if (this.hasTouch()) {
      return
    }
    this.setState({ isExpanded: true })
  }

  handleBlur = () => {
    if (this.hasTouch()) {
      return
    }
    this.setState({ clicked: false, isExpanded: false })
  }

  hasTouch = () => {
    return 'ontouchstart' in window
  }

  render() {
    const { items, themeVariation, children, dataEvent } = this.props
    const { isExpanded, clicked } = this.state

    return (
      <DropdownContainer
        expanded={isExpanded}
        aria-haspopup="true"
        aria-expanded={isExpanded}
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        themeVariation={themeVariation}
      >
        <DropdownNameWrapper
          tabIndex="0"
          expanded={isExpanded}
          clicked={clicked}
          themeVariation={themeVariation}
        >
          <DropdownName data-event={dataEvent}>{children}</DropdownName>
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
              onMouseDown={this.handleItemMouseDown}
              label={label}
            >
              {label}
            </InnerAnchorItem>
          ))}
        </DropdownList>
      </DropdownContainer>
    )
  }
}
