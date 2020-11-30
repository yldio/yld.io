import React, { PureComponent } from 'react';
import styled from 'styled-components';
import generate from 'shortid';
import remcalc from 'remcalc';
import is from 'styled-is';

import Chevron from '../../Common/Chevron';
import InnerAnchorItem from './InnerAnchorItem';
import headerItemStyles from '../utils/headerItemStyles';
import mobileNavItemStyles from './mobileNavItemStyles';
import outerItemStates from './outerItemStates';
import outlineStyles from '../utils/outlineStyles';
import { underlinePseudoElement } from '../../Common/StyledLink';

const themeFn = ({ theme, themeVariation }) =>
  themeVariation === 'white' ? theme.colors.blueBg : theme.colors.vibrant;

const DropdownContainer = styled.li`
  > span {
    > span {
      &:after {
        ${underlinePseudoElement}
        background: ${props => themeFn(props)};
        opacity: 0;
        transition: all ${({ theme }) => theme.animations.fast} ease-out;
      }

      ${is('expanded')`
        &:after {
          opacity: 1;
        }
      `}
      }
    }
    
    svg {
      color: ${props => themeFn(props)};
      margin-bottom: ${remcalc(10)};
    }
  }
`;

const DropdownNameWrapper = styled.span.attrs(() => ({
  states: outerItemStates,
}))`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${headerItemStyles}
  ${mobileNavItemStyles}
  ${outlineStyles}

  ${({ states, themeVariation }) =>
    themeVariation === 'white' ? states.white : states.dark}
`;

const DropdownName = styled.span`
  max-width: ${remcalc(320)};
  padding-right: ${remcalc(15)};
`;
const DropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 ${props => props.theme.spacing[1]};
`;

export default class Dropdown extends PureComponent {
  constructor(props) {
    super(props);

    const { items, path } = props;

    this.state = {
      isExpanded: items.some(({ to }) => path === to),
    };
  }

  toggle = e => {
    e.preventDefault();
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded,
    }));
  };

  handleFocus = () => {
    this.setState({ isExpanded: true });
  };

  render() {
    const { items, children, dataEvent, themeVariation } = this.props;
    const { isExpanded } = this.state;

    return (
      <DropdownContainer
        aria-haspopup="true"
        aria-expanded={isExpanded}
        expanded={isExpanded}
        themeVariation={themeVariation}
      >
        <DropdownNameWrapper
          tabIndex="0"
          expanded={isExpanded}
          onMouseDown={this.toggle}
          onFocus={this.handleFocus}
          data-event={dataEvent}
          themeVariation={themeVariation}
        >
          <DropdownName>{children}</DropdownName>
          <Chevron direction={isExpanded ? 'up' : 'down'} size={10} />
        </DropdownNameWrapper>
        {isExpanded && (
          <DropdownList>
            {items.map(({ to, href, label }) => (
              <InnerAnchorItem
                key={generate()}
                href={href}
                to={to}
                currentClassName="current"
                label={label}
                themeVariation={themeVariation}
              >
                {label}
              </InnerAnchorItem>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>
    );
  }
}
