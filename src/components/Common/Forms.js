import React, { useState, forwardRef } from 'react';
import remcalc from 'remcalc';
import styled, { keyframes } from 'styled-components';
import is from 'styled-is';

import Anchor from './Anchor';

export const Checkbox = styled.input`
  appearance: none;
  width: ${remcalc(24)};
  height: ${remcalc(24)};
  min-width: ${remcalc(24)};
  min-height: ${remcalc(24)};
  border: solid 2px ${props => props.theme.colors.text};
  margin-right: ${remcalc(9)};
  margin-left: ${remcalc(0)};
  position: relative;
  cursor: pointer;

  &:checked:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    background: ${props => props.theme.colors.text};
    width: ${remcalc(12)};
    height: ${remcalc(12)};
    transform: translateX(-50%) translateY(-50%);
  }
`;

export const Input = styled.input`
  border: solid 2px ${props => props.theme.colors.text};
  padding: ${remcalc(16)} ${remcalc(24)};
  margin-bottom: 36px;
  display: block;
  width: 100%;
  max-width: 100%;
  line-height: ${remcalc(24)};
  font-size: ${remcalc(18)};
  background: ${props => props.theme.colors.greyBg};
  box-sizing: border-box;

  ${is('noBoxShadow')`
    box-shadow:none;
  `};

  ${is('serachBox')`
    border:none;
    &:focus {
      outline: ${props => props.theme.colors.vibrant} solid 1px;
      outline-offset: -1px;
    }
  `};
`;

export const Label = styled('label')`
  font-weight: bold;
  padding-bottom: ${remcalc(12)};
  display: block;
`;

export const Field = styled.section`
  margin-bottom: ${remcalc(36)};

  > section {
    display: flex;
    align-items: center;
    margin-bottom: ${remcalc(24)};
  }
`;

export const Fieldset = styled.section`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  margin-bottom: ${remcalc(36)};

  > * {
    display: flex;
    align-items: center;
    margin-bottom: ${remcalc(24)};
  }
`;

const fadeIn = keyframes`
  from{
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const SearchField = styled.section`
  position: relative;
  margin-bottom: ${remcalc(36)};
`;

export const Results = styled.ul`
  width: 100%;
  max-height: ${remcalc(200)};
  list-style-type: none;
  background: ${props => props.theme.colors.greyBg};
  position: absolute;
  left: 0;
  top: ${remcalc(56)};
  z-index: 10;
  overflow-x: auto;
  overflow-y: scroll;
  will-change: opacity;
  animation: ${fadeIn} ${props => props.theme.animations.long} linear;
`;

export const Result = styled.li`
  padding: ${remcalc(8)} ${remcalc(24)};
  font-size: ${remcalc(18)};
  line-height: ${remcalc(24)};
  font-weight: 300;
  color: ${props => props.theme.colors.text};
  background: transparent;
  transition: background ${props => props.theme.animations.normal} ease-in-out,
    color ${props => props.theme.animations.normal} ease-in-out;
  &:hover {
    background: ${props => props.theme.colors.vibrant};
    > a {
      color: ${props => props.theme.colors.blueBg};
    }
  }
  ${is('notFound')`
    pointer-events:none;
    color: ${props => props.theme.colors.grey};
    font-weight: 500;
  `};
`;

export const SearchBox = forwardRef(
  ({ placeholder = 'Search...', searchedData }, ref) => {
    const [isListBoxOpen, setOpen] = useState(false);
    const [results, setResults] = useState([]);

    const handleChange = () => {
      const newResults = searchedData();
      if (ref.current.value.length >= 2) {
        setResults(newResults);
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    return (
      <SearchField>
        <Input
          ref={ref}
          type="search"
          placeholder={placeholder}
          aria-label="Search"
          onChange={handleChange}
          noBoxShadow
          serachBox
        />
        {isListBoxOpen && (
          <Results role="listbox">
            {results.length > 0 ? (
              results.map(({ title, slug }, idx) => (
                <Result key={idx}>
                  <Anchor to={slug}>
                    {title.length > 55 ? `${title.slice(0, 52)}...` : title}
                  </Anchor>
                </Result>
              ))
            ) : (
              <Result notFound>Not Found !!!</Result>
            )}
          </Results>
        )}
      </SearchField>
    );
  },
);

SearchBox.displayName = 'SearchBox';
