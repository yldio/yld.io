import React, { useState, forwardRef } from 'react';
import remcalc from 'remcalc';
import styled, { keyframes } from 'styled-components';
import is from 'styled-is';

import { Input } from './Forms';
import Anchor from './Anchor';

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
          data-testid="search"
          ref={ref}
          type="text"
          placeholder={placeholder}
          role="search"
          aria-label="Search"
          onChange={handleChange}
          noBoxShadow
          searchBox
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

export default SearchBox;
