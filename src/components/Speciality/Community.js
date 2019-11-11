import React from 'react';
import { Row, Col, Grid } from '../grid';
import { SectionTitle, BodyPrimary } from '../Typography';
import breakpoint from 'styled-components-breakpoint';
import BlueBackground from '../Common/BlueBackground';
import styled from 'styled-components';
import Image from '../Common/Image';

const ImgContainerCol = styled(Col)`
  align-items: center;
  justify-content: center;

  ${breakpoint('smallPhone', 'phone')`
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}
`;

const Wrapper = styled(Grid)`
  padding-top: ${({ theme }) => theme.space[5]};
  padding-bottom: ${({ theme }) => theme.space[5]};
  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[7]};
    padding-bottom: ${({ theme }) => theme.space[7]};
  `}
`;

const CommunitySection = ({
  communityText,
  communityLogoTitle,
  communityLogo,
  title,
}) => (
  <BlueBackground>
    <Wrapper>
      <Row>
        <ImgContainerCol width={[1, 1, 1, 1, 6 / 12]} block={false}>
          {communityLogo ? (
            <Image
              alt={communityLogoTitle}
              image={communityLogo}
              style={{ maxHeight: '150px', maxWidth: '300px' }}
            />
          ) : null}
        </ImgContainerCol>
        <Col width={[1, 1, 1, 1, 6 / 12]}>
          <SectionTitle
            small
            reverse
          >{`${title.trim()} community`}</SectionTitle>
          <BodyPrimary reverse muted>
            {communityText}
          </BodyPrimary>
        </Col>
      </Row>
    </Wrapper>
  </BlueBackground>
);

export default CommunitySection;
