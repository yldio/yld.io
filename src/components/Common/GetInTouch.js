import React from 'react';
import breakpoint from 'styled-components-breakpoint';
import styled from 'styled-components';
import remcalc from 'remcalc';
import PropTypes from 'prop-types';
import generate from 'shortid';
import { Row, Col, Grid } from '../grid';
import { DisplayTitle, BodyPrimary, Subtitle } from '../Typography';
import Image from './Image';
import StyledLink from './StyledLink';
import SocialLink from './SocialLink';
import InternalAnchor from '../Common/InternalAnchor';
import { hexToRgbWithAlpha } from '../../utils/color';

const PersonProfileCol = styled(Col)`
  display: flex;
  align-items: end;

  ${breakpoint('smallTablet')`
    flex-wrap: nowrap;
  `};
`;

const IMAGE_SIZE = 24;

const ProfileImageWrapper = styled.div`
  width: 100%;
  max-width: 144px;
  margin-right: ${({ theme }) => theme.space[3]};

  ${breakpoint('smallPhone', 'largePhone')`
    padding-bottom: ${({ theme }) => theme.space[2]}
  `}
`;

const LinksContainer = styled.div`
  display: flex;
  margin-bottom: -${({ theme }) => remcalc((theme.elementSizes.tappableArea - IMAGE_SIZE) / 2)};
  padding-top: ${({ theme }) => theme.space[2]};

  ${breakpoint('smallTablet')`
    padding-top: 0;
  `};
`;

const ProfileRow = styled(Row)`
  align-items: end;
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('smallTablet')`
    padding-top: ${({ theme }) => theme.space[5]};
  `}

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[7]};
  `}
`;

const ProfileTitleCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[3]};

  ${breakpoint('smallTablet')`
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[5]};
  `}
`;

const PersonCopyWrapper = styled.div`
  padding-top: ${({ theme }) => theme.space[3]};
  padding-bottom: ${({ theme }) => theme.space[3]};

  ${breakpoint('smallTablet')`
    padding-top: 0;
  `}

  ${breakpoint('desktop')`
    padding-bottom: 0;
  `}
`;

const PersonCta = styled.div`
  align-self: flex-end;
  ${breakpoint('tablet')`
    > p,
    > a {
      display: inline;
    }
  `}

  a {
    text-decoration: underline;
  }
`;

const ProfileContentWrapper = styled.div`
  ${breakpoint('smallPhone', 'largePhone')`
    width: 100%;
    padding-bottom: ${({ theme }) => theme.space[2]}
  `}

  display: flex;
  flex-grow: 2;
  flex-direction: column;
  align-self: stretch;
  justify-content: space-between;

  ${breakpoint('tablet')`
    border-right: 1px solid ${({ theme }) =>
      hexToRgbWithAlpha(theme.colors.text, 0.25)}
  `};
`;

const PersonBodyPrimary = styled(BodyPrimary)`
  ${breakpoint('smallPhone', 'tablet')`
      display: block
  `}
`;

const Profile = props => {
  const {
    title,
    person,
    personCopyTitle,
    personCopy: { personCopy },
    personCtaCopy,
    personCtaLinkUrl,
    personCtaLinkCopy,
  } = props;

  return (
    <Grid>
      <ProfileRow>
        <ProfileTitleCol width={[1]}>
          <DisplayTitle>{title}</DisplayTitle>
        </ProfileTitleCol>
        <PersonProfileCol width={[1, 1, 1, 1, 7 / 12, 7 / 12, 6 / 12]}>
          <ProfileImageWrapper>
            <Image image={person.image} />
          </ProfileImageWrapper>
          <ProfileContentWrapper>
            <div>
              <Subtitle noPadding>{person.name}</Subtitle>
              <Subtitle noPaddingTop muted>
                {person.footerRole}
              </Subtitle>
              <BodyPrimary
                as={'a'}
                style={{
                  textDecoration: 'underline',
                }}
                href={`mailto:${person.emailAddress}`}
                noPadding
              >
                {person.emailAddress}
              </BodyPrimary>
            </div>
            <LinksContainer>
              {person.socialLinks &&
                person.socialLinks.length > 0 &&
                person.socialLinks.map(link => (
                  <SocialLink
                    imageSize={IMAGE_SIZE}
                    key={generate()}
                    {...link}
                  />
                ))}
            </LinksContainer>
          </ProfileContentWrapper>
        </PersonProfileCol>
        <Col
          width={[1, 1, 1, 1, 5 / 12, 5 / 12]}
          block={false}
          style={{ alignSelf: 'stretch' }}
        >
          <PersonCopyWrapper>
            <BodyPrimary bold noPadding>
              {personCopyTitle}
            </BodyPrimary>
            <BodyPrimary noPadding secondary>
              {personCopy}
            </BodyPrimary>
          </PersonCopyWrapper>
          <PersonCta>
            <PersonBodyPrimary secondary>{personCtaCopy}</PersonBodyPrimary>{' '}
            <InternalAnchor to={personCtaLinkUrl}>
              {personCtaLinkCopy}
            </InternalAnchor>
          </PersonCta>
        </Col>
      </ProfileRow>
    </Grid>
  );
};

const GenericRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('smallTablet')`
    padding-top: ${({ theme }) => theme.space[5]};
    padding-bottom: ${({ theme }) => theme.space[5]};
  `}

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`;

const GenericCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[4]};
`;

const Generic = props => {
  const { title, genericCopy, genericCtaText, genericCtaUrl } = props;
  return (
    <Grid>
      <GenericRow>
        <GenericCol width={[1]}>
          <DisplayTitle>{title}</DisplayTitle>
        </GenericCol>
        <GenericCol width={[1, 1, 1, 1, 6 / 12, 5 / 12]}>
          <BodyPrimary noPadding>{genericCopy.genericCopy}</BodyPrimary>
        </GenericCol>
        <Col width={[1]}>
          <StyledLink to={genericCtaUrl} title={genericCtaText}>
            {genericCtaText}
          </StyledLink>
        </Col>
      </GenericRow>
    </Grid>
  );
};
const GetInTouch = props => {
  const { genericCopy } = props;

  return genericCopy ? <Generic {...props} /> : <Profile {...props} />;
};

GetInTouch.propTypes = {
  title: PropTypes.string.isRequired,
  contactText: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
};

GetInTouch.defaultProps = {
  ctaText: 'Get in touch',
};

export default GetInTouch;
