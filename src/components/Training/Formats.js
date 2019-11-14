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
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('desktop')`
    padding-bottom: ${({ theme }) => theme.space[0]}
  `};
`;

const Icon = styled.img`
  padding-bottom: 2;
`;

const Bullets = styled.div`
  padding-top: 2;
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
        {formats.map(format => (
          <FormatCol width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 3]} key={format.id}>
            <Icon
              src={`https://${format.icon.file.url}`}
              alt={format.icon.title}
            />
            <Subtitle noPadding reverse>
              {format.title}
            </Subtitle>
            <BodyPrimary muted reverse>
              {format.description}
            </BodyPrimary>
            <Bullets>
              {format.bulletPoints.map((point, idx) => (
                <CustomisedBulletpoint key={idx} muted reverse>
                  {point}
                </CustomisedBulletpoint>
              ))}
            </Bullets>
          </FormatCol>
        ))}
      </FormatsRow>
    </Grid>
  </BlueBackground>
);

export default Formats;
