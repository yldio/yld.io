import React, { PureComponent } from 'react'

import theme from '../../utils/theme'
import {
  TopNavDropdownContainer,
  TopNavDropdownListItem,
  TopNavDropdownNameWrapper,
  TopNavDropdownName,
  TopNavDropdownList
} from './DropdownStylesTopNav'
import Chevron from '../Common/Chevron'
import Anchor from '../Common/Anchor'

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
      ListItemComponent = TopNavDropdownListItem,
      DropdownNameWrapper = TopNavDropdownNameWrapper,
      DropdownName = TopNavDropdownName,
      DropdownList = TopNavDropdownList,
      AnchorComponent = Anchor,
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
        darkTheme={themeVariation === theme.variations.dark}
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
            <ListItemComponent key={idx}>
              <AnchorComponent
                to={to}
                href={href}
                onClick={this.handleItemClick}
              >
                <span>{label}</span>
              </AnchorComponent>
            </ListItemComponent>
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
