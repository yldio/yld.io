import React from 'react'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'

import { Row, Col } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import ExternalAnchor from './ExternalAnchor'
import StyledLink from './StyledLink'
import Hr from './Hr'

const PaddedSubtitle = styled(Subtitle)`
  padding-bottom: ${props => props.theme.spacing[0.5]};
`

const MediaItems = styled.ul`
  padding-top: ${props => props.theme.spacing[0.5]};
`

const RowLayout = styled(Row)`
  ${breakpoint('desktop')`
    justify-content: space-between;
  `}
`

const MediaItem = ({ id, title, href, body }) => (
  <li key={`${id}`}>
    <PaddedSubtitle noPaddingBottom>
      <ExternalAnchor href={href} title={title}>
        {title}
      </ExternalAnchor>
    </PaddedSubtitle>
    <BodyPrimary noPaddingTop>{body}</BodyPrimary>
    <Hr />
  </li>
)

const TitleAndMediaList = ({
  title,
  description,
  mediaItems,
  CTAText,
  CTALink,
  internal
}) => (
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
        {mediaItems.map(({ id, title, href, body }) => (
          <MediaItem key={id} id={id} title={title} href={href} body={body} />
        ))}
      </MediaItems>
      {CTALink && CTAText ? (
        <Padding top={3}>
          {internal ? (
            <StyledLink to={CTALink} title={CTAText}>
              {CTAText}
            </StyledLink>
          ) : (
            <StyledLink external href={CTALink} title={CTAText}>
              {CTAText}
            </StyledLink>
          )}
        </Padding>
      ) : null}
    </Col>
  </RowLayout>
)

export default TitleAndMediaList
