import React from 'react';
import breakpoint from 'styled-components-breakpoint';
import { Link } from 'gatsby';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Row, Col } from '../grid';
import BlueBackground from '../Common/BlueBackground';
import { SectionTitle, BodyPrimary } from '../Typography';

// Layout

export const StyledBlueBackground = styled(BlueBackground)`
  margin-top: -${remcalc(36)};
`;

export const StyledRow = styled(Row)`
  align-items: center;
`;

export const TextCol = styled(Col).attrs({
  width: [1, 1, 1, 1, 0.5, 0.5],
})`
  padding-top: ${({ theme }) => theme.space[4]};
  ${breakpoint('smallTablet')`
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}
  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[7]};
    padding-bottom: ${({ theme }) => theme.space[8]};
  `}
`;

export const IllustrationCol = styled(Col).attrs({
  width: [1, 1, 1, 1, 0.5, 0.5],
})`
  ${breakpoint('smallTablet', 'tablet')`
    padding-top: ${({ theme }) => theme.space[4]};
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}
`;

// Paragraphs / Texts

export const TitleHeadline = props => (
  <SectionTitle {...props} as="h1" reverse="true" />
);

export const CopyText = props => <BodyPrimary {...props} reverse="true" />;

export const LinksTitle = styled(BodyPrimary).attrs({
  reverse: 'true',
  bold: 'true',
})`
  padding-top: ${({ theme }) => theme.space[3]};
`;

export const LinkParagraph = props => (
  <BodyPrimary {...props} reverse="true" noPaddingBottom="true" />
);

export const Page404Link = styled(Link)`
  text-decoration: underline;
`;
