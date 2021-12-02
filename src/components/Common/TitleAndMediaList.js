import React from 'react';
import styled from 'styled-components';
import { Padding } from 'styled-components-spacing';
import breakpoint from 'styled-components-breakpoint';

import { Row, Col } from '../grid';
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography';
import StyledLink from './StyledLink';
import Hr from './Hr';
import Anchor from './Anchor';

const PaddedSubtitle = styled(Subtitle)`
  padding-bottom: ${(props) => props.theme.spacing[0.5]};
`;

const MediaItems = styled.ul`
  padding-top: ${(props) => props.theme.spacing[0.5]};
`;

const RowLayout = styled(Row)`
  ${breakpoint('desktop')`
    justify-content: space-between;
  `}
`;

const MediaItem = ({ id, title, external, to, body }) => {
  const linkProps = {
    [external ? 'href' : 'to']: to,
  };

  return (
    <li key={`${id}`}>
      <PaddedSubtitle noPaddingBottom>
        <Anchor {...linkProps} title={title}>
          {title}
        </Anchor>
      </PaddedSubtitle>
      <BodyPrimary noPaddingTop>{body}</BodyPrimary>
      <Hr />
    </li>
  );
};

const TitleAndMediaList = ({
  title,
  description,
  mediaItems,
  CTAText,
  CTALink,
  external = true,
}) => {
  const styledLinkProps = {
    title: CTAText,
    ...(external ? { external: true, href: CTALink } : { to: CTALink }),
  };
  return (
    <RowLayout>
      <Col width={[1, 1, 1, 1, 1 / 2]}>
        <SectionTitle>{title}</SectionTitle>
        {description ? (
          <Col width={[1, 1, 1, 1, 5 / 6]} px={[0]}>
            <BodyPrimary>{description}</BodyPrimary>
          </Col>
        ) : null}
      </Col>
      <Col width={[1, 1, 1, 1, 6 / 12, 5 / 12]}>
        <MediaItems>
          {mediaItems.map(({ id, title, to, body }) => (
            <MediaItem
              key={id}
              external={external}
              id={id}
              title={title}
              to={to}
              body={body}
            />
          ))}
        </MediaItems>
        {CTALink && CTAText ? (
          <Padding top={3}>
            <StyledLink {...styledLinkProps}>{CTAText}</StyledLink>
          </Padding>
        ) : null}
      </Col>
    </RowLayout>
  );
};

export default TitleAndMediaList;
