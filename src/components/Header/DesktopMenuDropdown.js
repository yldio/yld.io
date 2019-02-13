import React, { PureComponent } from 'react'
import styled from 'styled-components'
import is from 'styled-is'
import remcalc from 'remcalc'
import Chevron from '../Common/Chevron'
import { DesktopMenuItem } from './elements'
import Anchor from '../Common/Anchor'

const dropDownItemPadding = `padding: 10px 15px 14px 15px;`

const DesktopMenuDropdownContainer = styled(DesktopMenuItem)`
  position: relative;
  transition: color ${props => props.theme.animations.fast} ease-in-out,
    background ${props => props.theme.animations.fast} ease-in-out;
  cursor: pointer;
  background: ${props => props.theme.colors.white};

  &:hover {
    background: ${props => props.theme.colors.greyBG};
  }

  ${is('expanded')`
    color: ${props => props.theme.colors.white};
    background: ${props => props.theme.colors.text};
    &:hover {
      background: ${props => props.theme.colors.text};
    }
  `}
`

const DesktopMenuDropdownItems = styled.ul`
  position: absolute;
  width: ${remcalc(160)};
  display: flex;
  flex-direction: column;
  top: ${remcalc(48)};
  left: -9999px;
  opacity: 0;
  transition: opacity ${props => props.theme.animations.normal} ease;
  background: ${props => props.theme.colors.white};

  ${is('expanded')`
    left: 0;
    opacity: 1;
  `}

  li {
    display: flex;
  }

  a {
    color: ${props => props.theme.colors.text};
    width: 100%;
    ${dropDownItemPadding}

    &:active,
    &:focus,
    &:hover {
      background: ${props => props.theme.colors.greyBG};
    }
  }
`

const DropdownNameWrapper = styled.span`
  display: flex;
  align-items: center;
  ${dropDownItemPadding}
`

const DropdownName = styled.span`
  margin-right: ${remcalc(6)};
`

export default class DesktopMenuDropdown extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false
    }
    this.ref = React.createRef()
  }

  render() {
    const { items, bg, children } = this.props
    const { isExpanded } = this.state

    return (
      <DesktopMenuDropdownContainer
        bg={bg}
        ref={this.ref}
        aria-haspopup="true"
        expanded={isExpanded}
        aria-expanded={isExpanded}
        onMouseDown={this.toggle}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <DropdownNameWrapper tabIndex="0">
          <DropdownName>{children}</DropdownName>
          <Chevron direction={isExpanded ? 'up' : 'down'} />
        </DropdownNameWrapper>
        <DesktopMenuDropdownItems expanded={isExpanded}>
          {items.map(({ to, href, label }, idx) => (
            <li key={idx}>
              <Anchor to={to} href={href} onClick={this.handleItemClick}>
                <span>{label}</span>
              </Anchor>
            </li>
          ))}
        </DesktopMenuDropdownItems>
      </DesktopMenuDropdownContainer>
    )
  }

  toggle = e => {
    this.setState({ isExpanded: !this.state.isExpanded })
  }

  handleItemClick = () => {
    this.setState({ isExpanded: false })
  }

  handleFocus = (e, ...rest) => {
    console.log('focus')
    this.setState({ isExpanded: true })
    // this.ref.current.parentElement.querySelectorAll('li').forEach(el => el !== this.ref.current && el.setAttribute('tabindex', '-1'))
  }

  handleBlur = () => {
    console.log('blur')
    this.setState({ isExpanded: false })
    // this.ref.current.parentElement.querySelectorAll('li').forEach(el => el !== this.ref.current && el.setAttribute('tabindex', '0'))
  }
}
