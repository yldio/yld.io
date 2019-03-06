import React, { PureComponent } from 'react'

import theme from '../../utils/theme'
import {
  TopNavDropdownContainer,
  TopNavDropdownNameWrapper,
  TopNavDropdownName,
  TopNavDropdownList
} from './TopNav/DropdownStylesTopNav'
import TopNavAnchorItem from './TopNav/TopNavAnchorItem'
import Chevron from '../Common/Chevron'

export default class Dropdown extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false
    }
    this.ref = React.createRef()
  }

  render() {
    const {
      items,
      DropdownContainer = TopNavDropdownContainer,
      DropdownNameWrapper = TopNavDropdownNameWrapper,
      DropdownName = TopNavDropdownName,
      DropdownList = TopNavDropdownList,
      themeVariation,
      children
    } = this.props
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
          darkTheme={themeVariation === theme.variations.dark}
          expanded={isExpanded}
        >
          <DropdownName>{children}</DropdownName>
          <Chevron direction={isExpanded ? 'up' : 'down'} />
        </DropdownNameWrapper>
        <DropdownList expanded={isExpanded}>
          {items.map(({ to, href, label }, idx) => (
            <TopNavAnchorItem
              key={idx}
              themeVariation="light"
              activeClassName="active"
              onClick={this.handleItemClick}
              to={to}
              href={href}
            >
              {label}
            </TopNavAnchorItem>
          ))}
        </DropdownList>
      </DropdownContainer>
    )
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
}
