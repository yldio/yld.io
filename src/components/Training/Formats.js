import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { SectionTitle, Subtitle, BodyPrimary } from '../Typography';
import { Grid, Row, Col } from '../grid';
import BlueBackground from '../Common/BlueBackground';
import CustomisedBulletpoint from '../Common/CustomisedBulletpoint';

const TitleRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[6]}
  `}
`;

const FormatsRow = styled(Row)`
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[7]}
  `};
`;

const FormatCol = styled(Col)`
  ${breakpoint('smallPhone', 'desktop')`
    padding-bottom: ${({ theme }) => theme.space[4]};
  `};
`;

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  max-width: 100%;
  padding-bottom: ${({ theme }) => theme.space[2]};
`;

const BulletPointWrapper = styled.div`
  padding-top: ${({ theme }) => theme.space[2]};
  max-width: 80%;
`;

const Formats = ({ formats }) => (
  <BlueBackground>
    <Grid>
      <TitleRow>
        <Col width={[1]}>
          <SectionTitle reverse>Training formats</SectionTitle>
          <BodyPrimary muted reverse>
            We thoughtfully tailor training based on your needs and expertise.
          </BodyPrimary>
        </Col>
      </TitleRow>
      <FormatsRow>
        {formats.map((format) => (
          <FormatCol key={format.id} width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 3]}>
            <ImageWrapper>
              <img
                src={`https://${format.icon.file.url}`}
                alt={format.icon.title}
                loading="lazy"
              />
            </ImageWrapper>
            <Subtitle noPadding reverse>
              {format.title}
            </Subtitle>
            <BodyPrimary muted reverse noPaddingTop>
              {format.description}
            </BodyPrimary>
            <BulletPointWrapper>
              {format.bulletPoints.map((point, idx) => (
                <CustomisedBulletpoint key={idx} muted reverse>
                  {point}
                </CustomisedBulletpoint>
              ))}
            </BulletPointWrapper>
          </FormatCol>
        ))}
      </FormatsRow>
    </Grid>
  </BlueBackground>
);

export default Formats;
