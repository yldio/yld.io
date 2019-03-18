import React, { PureComponent } from 'react'
import styled from 'styled-components'
import is from 'styled-is'

import Chevron from '../../Common/Chevron'
import InnerAnchorItem from './InnerAnchorItem'
import headerItemStyles from '../headerItemStyles'
import sideNavItemStyles from './sideNavItemStyles'
import outerItemStates from './outerItemStates'
import outlineStyles from '../outlineStyles'

const DropdownNameWrapper = styled.span.attrs(props => ({
  states: outerItemStates
}))`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${headerItemStyles}
  ${sideNavItemStyles}
  ${outlineStyles}

  ${props => props.states.default}

  ${is('expanded')`
    ${props => props.states.hoverActive}
  `}
`

const DropdownName = styled.span`
  width: 320px;
`

const DropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${props => props.theme.colors.greyBG};
  padding: ${props => props.theme.spacing[1]} 0
    ${props => props.theme.spacing[1]} 0;
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

  render() {
    const { items, children } = this.props
    const { isExpanded } = this.state

    return (
      <li aria-haspopup="true" aria-expanded={isExpanded} ref={this.ref}>
        <DropdownNameWrapper
          tabIndex="0"
          expanded={isExpanded}
          onClick={this.toggle}
          onFocus={this.handleFocus}
        >
          <DropdownName>{children}</DropdownName>
          <Chevron direction={isExpanded ? 'up' : 'down'} />
        </DropdownNameWrapper>
        {isExpanded && (
          <DropdownList>
            {items.map(({ to, href, label }, idx) => (
              <InnerAnchorItem
                key={idx}
                href={href}
                to={to}
                activeClassName="active"
                onClick={this.handleItemClick}
              >
                {label}
              </InnerAnchorItem>
            ))}
          </DropdownList>
        )}
      </li>
    )
  }
}
