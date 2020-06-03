import React, { useState } from 'react';
import remcalc from 'remcalc';
import styled from 'styled-components';
import is from 'styled-is';

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

const SearchField = styled.section`
  position: relative;
  margin-bottom: ${remcalc(36)};
`;

const Results = styled.ul`
  width: 100%;
  list-style-type: none;
  background: ${props => props.theme.colors.greyBg};
  margin-top: -${remcalc(36)};
`;

const Result = styled.li`
  padding: ${remcalc(8)} ${remcalc(24)};
  font-size: ${remcalc(18)};
  line-height: ${remcalc(24)};
  font-weight: 300;
  color: ${props => props.theme.colors.text};
  background: transparent;
  transition: background 350ms ease-in-out, color 350ms ease-in-out;
  &:hover {
    background: ${props => props.theme.colors.vibrant};
    color: ${props => props.theme.colors.blueBg};
  }
`;

export const SearchBox = ({ placeholder = 'Search...', results = [] }) => {
  const [value, setValue] = useState('');
  const handleChange = e => {
    e.preventDefault();
    setValue(e.target.value);
  };
  return (
    <SearchField>
      <Input
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        value={value}
        onChange={handleChange}
        noBoxShadow
        serachBox
      />
      {results.length > 0 && (
        <Results role="listbox">
          {results.map((result, idx) => (
            <Result key={idx}>{result}</Result>
          ))}
        </Results>
      )}
    </SearchField>
  );
};
