import React from 'react'
import styled from 'styled-components'
import { Row, Col, Grid } from '../grid'
import breakpoint from 'styled-components-breakpoint'
import ReactMarkdown from 'react-markdown'
import generate from 'shortid'
import is from 'styled-is'

import CustomisedBulletpoint from '../Common/CustomisedBulletpoint'
import GreyBackground from '../Common/GreyBackground'
import { SectionTitle, BodyPrimary, Subtitle } from '../Typography'

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

  ${is('noPaddingBottom')`
    padding-bottom: 0 !important;  
    `}

  ${is('noPaddingTop')`
    padding-top: 0 !important; 
    `}
`

const PractiseCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
  `}
`

const HowWeWorkWithSection = ({
  howWeWorkWithTitle: title,
  howWeWorkWithCopy: copy,
  howWeWorkWithPractises: practises = []
}) => {
  const hasPractises = practises && practises.length
  return (
    <GreyBackground>
      <Grid>
        <StyledRow
          noPaddingBottom={hasPractises}
          style={{ justifyContent: 'space-between' }}
        >
          <Col width={[1, 1, 1, 1, 5 / 12, 6 / 12, 5 / 12]}>
            <SectionTitle>{title}</SectionTitle>
          </Col>
          <Col width={[1, 1, 1, 1, 7 / 12, 6 / 12, 5 / 12]}>
            <MarkDownRender source={copy} />
          </Col>
        </StyledRow>
        {hasPractises > 0 && (
          <StyledRow noPaddingTop>
            {practises.map(({ content: { content: source } }) => (
              <PractiseCol
                key={generate}
                width={[1, 1, 1, 1, 6 / 12, 6 / 12, 4 / 12]}
              >
                <MarkDownRender source={source} />
              </PractiseCol>
            ))}
          </StyledRow>
        )}
      </Grid>
    </GreyBackground>
  )
}

const MarkDownRender = ({ source }) => (
  <ReactMarkdown
    source={source}
    renderers={{
      // eslint-disable-next-line react/display-name
      heading: props => <Subtitle noPaddingBottom {...props} />,
      // eslint-disable-next-line react/display-name
      paragraph: props => <BodyPrimary noPaddingTop {...props} />,
      // eslint-disable-next-line react/display-name
      listItem: props => <CustomisedBulletpoint {...props} />
    }}
  />
)

export default HowWeWorkWithSection
