import React from 'react';
import StyledLink from '../Common/StyledLink';
import styled from 'styled-components';

import { Grid, Row, Col } from '../grid';
import { BodyPrimary, SectionTitle } from '../Typography';

import Image from '../Common/Image';

const JoinContentCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[7]};
  padding-bottom: ${({ theme }) => theme.space[7]};
`;

const getCtaLink = ({ ctaReference = {}, ctaUrl }) => {
  return ctaReference.slug ? `/career-framework/${ctaReference.slug}` : ctaUrl;
};

const Join = ({ title, ctaTitle, ctaUrl, ctaReference, content, image }) => {
  const to = getCtaLink({ ctaReference, ctaUrl });

  return (
    <Grid>
      <Row>
        <JoinContentCol width={[1, 1, 1, 1, 6 / 12]}>
          <SectionTitle reverse>{title}</SectionTitle>
          {content.content && (
            <BodyPrimary muted reverse>
              {content.content}
            </BodyPrimary>
          )}
          <StyledLink muted to={to} reverse="true">
            {ctaTitle}
          </StyledLink>
        </JoinContentCol>
        <Col
          width={[1, 1, 1, 1, 6 / 12]}
          block={false}
          style={{ alignItems: 'center' }}
        >
          <Image image={image} />
        </Col>
      </Row>
    </Grid>
  );
};

export default Join;
