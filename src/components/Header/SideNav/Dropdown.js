import React, { PureComponent } from 'react'
import styled from 'styled-components'
import is from 'styled-is'

import Chevron from '../../Common/Chevron'
import InnerAnchorItem from './InnerAnchorItem'
import headerItemStyles from '../headerItemStyles'
import sideNavItemPadding from './sideNavItemPadding'
import {
  fontSizeAndWeight,
  defaultStyles,
  hoverActiveStyles
} from './outerItemStyles'

const DropdownNameWrapper = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${headerItemStyles}
  ${sideNavItemPadding}
  ${fontSizeAndWeight}
  ${defaultStyles}

  ${is('expanded')`
    ${hoverActiveStyles}
    
    &:focus {
      outline-color: ${props => props.theme.colors.white};
    }
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
    const { items, children } = this.props
    const { isExpanded } = this.state

    return (
      <div
        aria-haspopup="true"
        expanded={isExpanded}
        aria-expanded={isExpanded}
        onMouseDown={this.toggle}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={this.ref}
      >
        <DropdownNameWrapper tabIndex="0" expanded={isExpanded}>
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
      </div>
    )
  }
}
