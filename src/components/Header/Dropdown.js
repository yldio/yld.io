import React, { PureComponent } from 'react'

import theme from '../../utils/theme'
import TopNavDropdownContainer from './TopNav/TopNavDropdownContainer'
import {
  TopNavDropdownNameWrapper,
  TopNavDropdownName
} from './TopNav/TopNavDropdownSelectButton'
import TopNavDropdownList from './TopNav/TopNavDropdownList'
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
    console.log('props', this.props)
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
        <DropdownList
          expanded={isExpanded}
          items={items}
          themeVariation={themeVariation}
          onClick={this.handleClick}
        />
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
