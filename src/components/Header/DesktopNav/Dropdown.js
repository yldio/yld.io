import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'
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
  ${props => !props.clicked && outlineStyles}
  display: flex;
  align-items: center;
  /* bumping the z-index so that the outline doesn't get behind the dropdown items list */
  z-index: 2;

  /* ${props =>
    props.clicked &&
    props.themeVariation === props.theme.variations.dark &&
    props.expanded === true &&
    css`
      &:focus {
        outline-color: rebeccapurple;
      }
    `} */

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
      isExpanded: false,
      clicked: false
    }
    this.ref = React.createRef()
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
      ...prevState,
      clicked: !prevState.clicked,
      isExpanded: !prevState.isExpanded
    }))
  }

  handleClick = () => {
    if (!this.hasTouch()) {
      console.log('clicked')
      return
    }

    this.setState(prevState => ({
      clicked: !prevState.clicked,
      isExpanded: !prevState.isExpanded
    }))
  }

  handleItemMouseDown = e => {
    console.log('on mouse item down')
    console.log(e)

    // this.setState({ clicked: false })
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
    console.log('blur')
    this.setState({ clicked: false, isExpanded: false })
  }

  hasTouch = () => {
    return 'ontouchstart' in window
  }

  render() {
    const { items, themeVariation, children, dataEvent } = this.props
    const { isExpanded, clicked } = this.state

    console.log({ isExpanded, clicked })
    return (
      <DropdownContainer
        ref={this.ref}
        expanded={isExpanded}
        aria-haspopup="true"
        aria-expanded={isExpanded}
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
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
