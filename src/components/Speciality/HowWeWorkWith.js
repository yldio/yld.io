import React from 'react'
import styled from 'styled-components'
import { Row, Col, Grid } from '../grid'
import breakpoint from 'styled-components-breakpoint'

import GreyBackground from '../Common/GreyBackground'
import { SectionTitle, BodyPrimary } from '../Typography'
import Hr from '../Common/Hr'

const StyledRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[5]};
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('smallTablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[6]};
    `}

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[7]};
    padding-bottom: ${({ theme }) => theme.space[7]};
  `}
`

const HowWeWorkWithSection = ({
  howWeWorkWithTitle,
  howWeWorkWithCopy,
  howWeWorkWithPractises
}) => {
  return (
    <GreyBackground>
      <Grid>
        <StyledRow style={{ justifyContent: 'space-between' }}>
          <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
            <SectionTitle>{howWeWorkWithTitle}</SectionTitle>
          </Col>
          <Col width={[1, 1, 1, 6 / 12]}>
            <BodyPrimary>{howWeWorkWithCopy}</BodyPrimary>
            {howWeWorkWithPractises &&
              howWeWorkWithPractises.length > 0 &&
              howWeWorkWithPractises.map(practise => (
                <>
                  <BodyPrimary key={practise}>{practise}</BodyPrimary>
                  <Hr short />
                </>
              ))}
          </Col>
        </StyledRow>
      </Grid>
    </GreyBackground>
  )
}

export default HowWeWorkWithSection
