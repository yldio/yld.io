import React from 'react'
import styled from 'styled-components'
import { Row, Col, Grid } from '../grid'
import breakpoint from 'styled-components-breakpoint'
import ReactMarkdown from 'react-markdown'

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
`

const HowWeWorkWithSection = ({ howWeWorkWithTitle, howWeWorkWithCopy }) => {
  return (
    <GreyBackground>
      <Grid>
        <StyledRow style={{ justifyContent: 'space-between' }}>
          <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
            <SectionTitle>{howWeWorkWithTitle}</SectionTitle>
          </Col>
          <Col width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
            <ReactMarkdown
              source={howWeWorkWithCopy}
              renderers={{
                // eslint-disable-next-line react/display-name
                heading: props => <Subtitle noPaddingBottom {...props} />,
                // eslint-disable-next-line react/display-name
                paragraph: props => <BodyPrimary {...props} />,
                // eslint-disable-next-line react/display-name
                listItem: props => <CustomisedBulletpoint {...props} />
              }}
            />
          </Col>
        </StyledRow>
      </Grid>
    </GreyBackground>
  )
}

export default HowWeWorkWithSection
