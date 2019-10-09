import styled from 'styled-components'
import remcalc from 'remcalc'

const H1 = styled.h1`
  font-size: ${remcalc(42)};
  line-height: ${remcalc(51)};
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  padding: ${remcalc(14)} 0;
`

const H2 = styled.h2`
  font-size: ${remcalc(28)};
  line-height: ${remcalc(42)};
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  padding: ${remcalc(11)} 0 ${remcalc(7)};
`

const Subtitle = styled.h3`
  font-size: ${remcalc(24)};
  line-height: ${remcalc(36)};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textLight};
  padding: ${remcalc(10)} 0 ${remcalc(8)};
`

const Body = styled.p`
  font-size: ${remcalc(20)};
  line-height: ${remcalc(33)};
  font-weight: 400;
  color: ${props => props.theme.colors.text};
  padding: ${remcalc(13)} 0 ${remcalc(14)};

  ::selection {
    background-color: #65ffcd;
  }

  a {
    text-decoration: underline;
    cursor: pointer;
    font-style: italic;
  }

  code {
    font-size: ${remcalc(17)};
    line-height: ${remcalc(24)};
    font-weight: 400;
    color: ${props => props.theme.colors.text};
    font-family: 'Roboto Mono', sans-serif;
    padding-left: ${remcalc(4)};
    padding-right: ${remcalc(4)};
    background-color: #e9e9e9;

    ::selection {
      background-color: #65ffcd;
    }
  }
`

const List = styled.ul`
  list-style-type: disc;
  padding-left: ${remcalc(30)};
`

const ListItem = styled.li`
  font-size: ${remcalc(20)};
  line-height: ${remcalc(33)};
  font-weight: 300;
`

const Code = styled.pre`
  font-size: ${remcalc(17)};
  line-height: ${remcalc(24)};
  font-weight: 400;
  color: ${props => props.theme.colors.text};
  background-color: #e9e9e9;
  padding: ${remcalc(20)};
  font-family: 'Roboto Mono', sans-serif;
  display: block;
  margin: ${remcalc(13)} 0 ${remcalc(14)};
`

const A = styled.a`
  text-decoration: underline;
  cursor: pointer;
  font-style: italic;
`

const Blockquote = styled.blockquote`
  font-size: ${remcalc(20)};
  line-height: ${remcalc(33)};
  font-style: italic;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  padding-left: ${remcalc(24)};
  margin: ${remcalc(13)} 0 ${remcalc(14)};
  display: block;
  border-left: 2px solid ${({ theme }) => theme.colors.text};
`

export { H1, H2, Subtitle, Body, Code, A, List, ListItem, Blockquote }
