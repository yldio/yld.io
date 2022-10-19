import remcalc from 'remcalc';
import styled from 'styled-components';
import is from 'styled-is';

export const Checkbox = styled.input`
  appearance: none;
  width: ${remcalc(24)};
  height: ${remcalc(24)};
  min-width: ${remcalc(24)};
  min-height: ${remcalc(24)};
  border: solid 2px ${(props) => props.theme.colors.text};
  margin-right: ${remcalc(9)};
  margin-left: ${remcalc(0)};
  position: relative;
  cursor: pointer;

  &:checked:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    background: ${(props) => props.theme.colors.text};
    width: ${remcalc(12)};
    height: ${remcalc(12)};
    transform: translateX(-50%) translateY(-50%);
  }
`;

export const Input = styled.input`
  border: solid 2px ${(props) => props.theme.colors.text};
  padding: ${remcalc(16)} ${remcalc(24)};
  margin-bottom: 36px;
  display: block;
  width: 100%;
  max-width: 100%;
  line-height: ${remcalc(24)};
  font-size: ${remcalc(18)};
  background: ${(props) => props.theme.colors.greyBg};
  box-sizing: border-box;

  ${is('noBoxShadow')`
    box-shadow:none;
  `};

  ${is('searchBox')`
    border:none;
    &:focus {
      outline: ${(props) => props.theme.colors.vibrant} solid 1px;
      outline-offset: -1px;
    }
  `};
`;

export const Label = styled('label')`
  font-weight: bold;
  padding-bottom: ${remcalc(12)};
  display: block;
`;

export const Textarea = styled('textarea')`
  padding-bottom: ${remcalc(12)};
  display: block;
  width: 100%;
  height: ${remcalc(200)};
  padding: ${remcalc(20)};
  margin-bottom: 36px;
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
