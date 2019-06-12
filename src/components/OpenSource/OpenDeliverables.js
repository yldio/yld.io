import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import ReactMarkdown from 'react-markdown'
import { Grid, Row, Col } from '../grid'
import { SectionTitle, BodyPrimary, Subtitle } from '../Typography'
import GreyBackground from '../Common/GreyBackground'
import RepoWithImage from '../Common/Repo/RepoWithImage'

const Wrapper = styled(GreyBackground)`
  padding: ${({ theme }) => theme.spacing[3]} 0;
  padding-bottom: ${({ theme }) => theme.spacing[3.5]};

  ${breakpoint('smallTablet')`
    padding-top: ${({ theme }) => theme.spacing[3]};
  `}

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.spacing[4]};
    `}
`

const StyledSectionTitle = styled(SectionTitle)`
  ${breakpoint('mobile')`
    padding-bottom: ${({ theme }) => theme.space[4]}
  `}
`

const StyledSubtitle = styled(Subtitle)`
  padding: ${({ theme }) => `${theme.spacing[3]} 0 ${theme.spacing[3]} 0`};

  ${breakpoint('smallTablet')`
    padding: ${({ theme }) => `${theme.spacing[3]} 0 ${theme.spacing[3]} 0`};
  `}

  ${breakpoint('tablet')`
    padding: ${({ theme }) => `${theme.spacing[4]} 0 ${theme.spacing[3]} 0`};
  `}
`

const OpenDeliverables = props => {
  const {
    contentfulOpenSourcePage: {
      openDeliverablesSectionTitle,
      openDeliverablesClientReposSubtitle,
      openDeliverablesSectionDescription: {
        openDeliverablesSectionDescription
      },
      openDeliverablesClientRepos
    }
  } = props

  return (
    <Wrapper>
      <Grid>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <StyledSectionTitle>
              {openDeliverablesSectionTitle}
            </StyledSectionTitle>
          </Col>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <ReactMarkdown
              renderers={{
                // eslint-disable-next-line react/display-name
                paragraph: props => <BodyPrimary {...props} />
              }}
              source={openDeliverablesSectionDescription}
            />
          </Col>
          <Col width={[1, 1, 1, 1, 6 / 12, 4 / 12]}>
            <StyledSubtitle>
              {openDeliverablesClientReposSubtitle}
            </StyledSubtitle>
          </Col>
        </Row>
        <Row>
          {openDeliverablesClientRepos &&
            openDeliverablesClientRepos.length &&
            openDeliverablesClientRepos.map(({ id, ...props }) => (
              <Col key={id} width={[1, 1, 1, 1, 6 / 12, 6 / 12, 4 / 12]}>
                <RepoWithImage {...props} />
              </Col>
            ))}
        </Row>
      </Grid>
    </Wrapper>
  )
}

export default OpenDeliverables
