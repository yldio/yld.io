import React, { PureComponent } from 'react'
import styled from 'styled-components'

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

  &:hover,
  &:focus {
    ${props => props.states.hoverActive}
  }
`

const DropdownName = styled.span`
  max-width: 320px;
  flex: 1;
`

const DropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${props => props.theme.colors.greyBg};
  padding: ${props => props.theme.spacing[1]} 0
    ${props => props.theme.spacing[1]} 0;
`
export default class Dropdown extends PureComponent {
  constructor(props) {
    super(props)

    const { items, path } = props

    this.state = {
      isExpanded: items.some(({ to }) => path === to)
    }

    this.ref = React.createRef()
  }

  toggle = e => {
    e.preventDefault()
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }))
  }

  handleFocus = () => {
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
          onMouseDown={this.toggle}
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
