import React, { PureComponent } from 'react'
import styled from 'styled-components'
import is from 'styled-is'
import remcalc from 'remcalc'
import generate from 'shortid'

import Chevron from '../../Common/Chevron'
import InnerAnchorItem from './InnerAnchorItem'
import headerItemStyles from '../utils/headerItemStyles'
import outlineStyles from '../utils/outlineStyles'
import DesktopNavItemStyles from './desktopNavItemStyles'
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
  ${headerItemStyles}
  ${DesktopNavItemStyles}
  ${({ isExpanded }) => !isExpanded && outlineStyles}
  display: flex;
  align-items: center;
  /* bumping the z-index so that the outline doesn't get behind the dropdown items list */
  z-index: 2;

  > span {
    padding-right: ${remcalc(6)};
    outline: none;
    user-select: none;
  }
`

const DropdownList = styled.ul`
  position: absolute;
  width: ${remcalc(160)};
  display: flex;
  flex-direction: column;
  top: 100%;
  transition: opacity ${props => props.theme.animations.normal} ease;
  background: ${props => props.theme.colors.greyBg};
  z-index: ${props => props.theme.zIndexes.header};

  display: none;
  opacity: 0;

  ${is('expanded')`
    display: block;
    opacity: 1;
  `};
`

export default class Dropdown extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false
    }

    this.myRef = React.createRef()
  }

  /**
   * The outline is not desired when the user opens the dropdown with the mouse
   * so we're detecting it on mouse down
   */
  handleMouseDown = () => {
    if (this.hasTouch()) {
      return
    }
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }))
  }

  handleClick = () => {
    if (!this.hasTouch()) {
      return
    }

    this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }))
  }

  handleItemMouseDown = e => {
    if (this.hasTouch()) {
      return
    }

    e.preventDefault()
    this.setState({ isExpanded: false })
  }

  handleFocus = () => {
    if (this.hasTouch()) {
      return
    }
    this.setState({ isExpanded: true })
  }

  handleBlur = e => {
    if (this.hasTouch()) {
      return
    }
    /**
     * Here the event gives us `relatedTarget`, this value is a
     * DOM node of the new focused element, knowing this value
     * and setting a ref on the DropdownContainer, we can work
     * out if the new relatedTarget is a child of the DropdownContainer.
     * This functionality is to make sure that users are able to
     * tab through the navigation properly.
     */
    const isExpanded = this.myRef.current.contains(e.relatedTarget)
    this.setState({ isExpanded })
  }

  hasTouch = () => {
    return 'ontouchstart' in window
  }

  render() {
    const { items, themeVariation, children, dataEvent } = this.props
    const { isExpanded } = this.state

    return (
      <DropdownContainer
        ref={this.myRef}
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
          isExpanded={isExpanded}
          themeVariation={themeVariation}
        >
          <span data-event={dataEvent}>{children}</span>
          <Chevron direction={isExpanded ? 'up' : 'down'} />
        </DropdownNameWrapper>
        <DropdownList expanded={isExpanded}>
          {items.map(({ to, href, label }) => (
            <InnerAnchorItem
              key={generate()}
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
