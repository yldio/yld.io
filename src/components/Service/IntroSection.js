import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { SectionTitle, BodyPrimary, Subtitle } from '../Typography';
import { Grid, Row, Col } from '../grid';

const IntroTitleRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[7]};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`;

const IntroBlocksRow = styled(Row)`
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('smallTablet')`
    padding-bottom: ${({ theme }) => theme.space[5]};
  `}

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[7]};
  `}
`;

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  max-width: 100%;
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const IntroBlockCol = styled(Col)`
  ${breakpoint('smallPhone', 'tablet')`
    padding-top: ${({ theme }) => theme.space[4]};
  `}
`;

const IntroSection = ({ introSentence, introBlocks }) => (
  <Grid>
    <IntroTitleRow>
      <Col width={[1, 1, 1, 11 / 12, 11 / 12, 11 / 12, 8 / 12]}>
        <SectionTitle>{introSentence}</SectionTitle>
      </Col>
    </IntroTitleRow>
    <IntroBlocksRow>
      {introBlocks.map(({ subtitle, body, icon }) => (
        <IntroBlockCol key={subtitle} width={[1, 1, 1, 6 / 12, 6 / 12, 4 / 12]}>
          <ImageWrapper>
            {icon && <img src={icon.file.url} alt={subtitle} />}
          </ImageWrapper>
          {subtitle && <Subtitle noPaddingBottom>{subtitle}</Subtitle>}
          {body && (
            <BodyPrimary muted noPaddingTop="true">
              {body}
            </BodyPrimary>
          )}
        </IntroBlockCol>
      ))}
    </IntroBlocksRow>
  </Grid>
);

export default IntroSection;
