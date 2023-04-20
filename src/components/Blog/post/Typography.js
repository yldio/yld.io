import styled from 'styled-components';
import remcalc from 'remcalc';
import breakpoint from 'styled-components-breakpoint';

const DESKTOP_BREAKPOINT = 'smallTablet';

const H1 = styled.h1`
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  padding: ${remcalc(14)} 0;

  font-size: ${remcalc(28)};
  line-height: ${remcalc(36)};

  ${breakpoint('smallTablet')`
    font-size: ${remcalc(42)};
    line-height: ${remcalc(51)};
  `}

  *::selection,
  ::selection {
    background-color: ${({ theme }) => theme.colors.vibrant};
  }
`;

const H2 = styled.h2`
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  padding: ${remcalc(11)} 0 ${remcalc(7)};

  font-size: ${remcalc(21)};
  line-height: ${remcalc(26)};

  ${breakpoint(DESKTOP_BREAKPOINT)`
    font-size: ${remcalc(28)};
    line-height: ${remcalc(42)};
  `}

  *::selection,
  ::selection {
    background-color: ${({ theme }) => theme.colors.vibrant};
  }
`;

const Subtitle = styled.h3`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.secondaryText};
  padding: ${remcalc(12)} 0 ${remcalc(24)};

  font-size: ${remcalc(21)};
  line-height: ${remcalc(30)};

  ${breakpoint(DESKTOP_BREAKPOINT)`
    font-size: ${remcalc(24)};
    line-height: ${remcalc(36)};
  `}

  *::selection,
  ::selection {
    background-color: ${({ theme }) => theme.colors.vibrant};
  }
`;

const Body = styled.p`
  font-size: ${remcalc(18)};
  line-height: ${remcalc(30)};

  ${breakpoint(DESKTOP_BREAKPOINT)`
    font-size: ${remcalc(20)};
    line-height: ${remcalc(33)};
  `}

  font-weight: 400;
  color: ${(props) => props.theme.colors.text};
  padding: ${remcalc(37)} 0;

  & ~ p {
    padding-top: 0;
  }

  *::selection,
  ::selection {
    background-color: ${({ theme }) => theme.colors.vibrant};
  }

  a {
    text-decoration: underline;
    cursor: pointer;
    font-style: italic;
  }

  em {
    font-style: italic;
  }

  code {
    font-size: ${remcalc(15)};
    line-height: ${remcalc(24)};

    ${breakpoint(DESKTOP_BREAKPOINT)`
      font-size: ${remcalc(17)};
    `}

    font-weight: 400;
    color: ${(props) => props.theme.colors.text};
    font-family: 'Roboto Mono', sans-serif;
    padding: ${remcalc(4)};
    background-color: #e9e9e9;

    ::selection {
      background-color: ${({ theme }) => theme.colors.vibrant};
    }
  }

  strong {
    font-weight: 500;
  }
`;

const UnorderedList = styled.ul`
  list-style-type: disc;
  padding-left: ${remcalc(30)};
  padding-bottom: ${remcalc(36)};
`;

const OrderedList = styled.ol`
  list-style-type: decimal;
  padding-left: ${remcalc(30)};
  padding-bottom: ${remcalc(36)};
`;

const ListItem = styled.li`
  font-size: ${remcalc(20)};
  line-height: ${remcalc(33)};
  padding: ${remcalc(8)} 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  & p:last-child {
    padding-bottom: 0;
  }

  & p:first-child {
    padding-top: 0;
  }
`;

const Code = styled.code`
  font-size: ${remcalc(15)};
  line-height: ${remcalc(24)};

  ${breakpoint(DESKTOP_BREAKPOINT)`
    font-size: ${remcalc(17)};
    line-height: ${remcalc(24)};
  `}

  overflow: scroll;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text};
  background-color: #e9e9e9;
  padding: ${remcalc(20)};
  font-family: 'Roboto Mono', sans-serif;
`;

const A = styled.a`
  text-decoration: underline;
  cursor: pointer;
  font-style: italic;
`;

const PostInfo = styled(Body)`
  font-size: ${remcalc(16)};
  line-height: ${remcalc(28)};
  padding-bottom: ${remcalc(24)};

  ${breakpoint(DESKTOP_BREAKPOINT)`
    font-size: ${remcalc(18)};
    line-height: ${remcalc(31)};
    padding-bottom: ${remcalc(36)};
  `}

  padding-top: 0;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const ImageCaption = styled.figcaption`
  font-size: ${remcalc(16)};
  line-height: ${remcalc(24)};
  padding-bottom: ${remcalc(12)};
  color: ${({ theme }) => theme.colors.secondaryText};
  text-align: center;
  margin: 0 auto;

  ${breakpoint(DESKTOP_BREAKPOINT)`
    max-width: 70%;
  `}
`;

const PostTitle = styled(H1)`
  ${({ hasSubtitle }) =>
    hasSubtitle ? `padding-bottom: 0` : `padding-bottom: ${remcalc(24)};`}

  ${breakpoint(DESKTOP_BREAKPOINT)`
    ${({ hasSubtitle }) =>
      hasSubtitle ? `padding-bottom: 0` : `padding-bottom: ${remcalc(36)};`}
    `}
`;

const Tag = styled.li`
  margin-right: ${remcalc(10)};
  margin-bottom: ${remcalc(12)};

  ${breakpoint(DESKTOP_BREAKPOINT)`
    margin-right: ${remcalc(10)};
    margin-bottom: ${remcalc(24)};
  `}

  display: inline-block;
  background-color: #f1f1f3;
  color: ${({ theme }) => theme.colors.text};
  padding: ${remcalc(6)} ${remcalc(12)};
  font-family: 'PT Mono';
`;

const Blockquote = styled.blockquote`
  font-size: ${remcalc(18)};
  line-height: ${remcalc(30)};

  ${breakpoint(DESKTOP_BREAKPOINT)`
    font-size: ${remcalc(20)};
    line-height: ${remcalc(33)};
  `}

  font-style: italic;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  padding-left: ${remcalc(35)};
  margin: ${remcalc(37)} 0;
  display: block;
  border-left: 2px solid ${({ theme }) => theme.colors.text};

  p {
    padding: 0;
    font-weight: 500;
  }

  strong {
    font-weight: 700;
  }
`;

const PostWrapper = styled.div`
  strong {
    font-weight: 600;
  }

  h1 + h3 {
    margin-top: ${remcalc(12)};
  }

  h2 + p {
    padding-top: ${remcalc(13)};
  }

  h2 + blockquote {
    margin-top: 0;
  }

  h2 + ul {
    padding-top: ${remcalc(37)};
  }

  p + p {
    padding-top: 0;
  }

  p + blockquote {
    margin-top: 0;
  }

  p + h2 {
    padding-top: ${remcalc(18)};
  }

  p + .gist,
  p + .figure-image {
    padding-top: 0;
  }

  ul + p,
  ol + p {
    padding-top: 0;
  }

  blockquote + h2 {
    padding-top: ${remcalc(22)};
  }

  blockquote + p {
    padding-top: 0;
  }

  pre + h2 {
    padding-top: ${remcalc(37)};
  }

  .figure-image + p {
    padding-top: ${remcalc(37)};
  }

  .figure-image + h2 {
    padding-top: ${remcalc(43)};
  }

  .figure-image + blockquote {
    margin-top: ${remcalc(43)};
  }

  iframe {
    width: 100%;
  }

  .gist {
    /*
    Remove padding set internally in iframe,
    Gist from @blocks/kit removes left and right margin
     */
    margin-top: -8px;
    margin-bottom: -8px;

    iframe {
      min-height: initial;
    }
  }

  .gatsby-highlight code {
    padding: 0;
  }

  .gatsby-highlight pre[class*='language-'].line-numbers {
    padding-left: 2.8em;
  }

  /**
  * If you only want to use line numbering
  */

  .gatsby-highlight {
    border-radius: 0.3em;
    padding: 1em;
    overflow: auto;
  }

  .gatsby-highlight pre[class*='language-'].line-numbers {
    padding: 0;
    padding-left: 2.8em;
    overflow: initial;
  }
`;

export {
  H1,
  H2,
  PostTitle,
  Subtitle,
  Body,
  Code,
  A,
  UnorderedList,
  OrderedList,
  ListItem,
  Blockquote,
  ImageCaption,
  PostInfo,
  PostWrapper,
  Tag,
};
