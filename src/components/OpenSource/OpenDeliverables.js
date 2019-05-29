import React from 'react'
import styled from 'styled-components'
import { Grid, Row, Col } from '../grid'
import { SectionTitle, BodyPrimary, Subtitle } from '../Typography'
import GreyBackground from '../Common/GreyBackground'
import RepoWithImage from '../Repo/RepoWithImage'

const Wrapper = styled(GreyBackground)`
  padding: ${props => props.theme.spacing[4]} 0;
`

const StyledSubtitle = styled(Subtitle)`
  padding: ${({ theme: { spacing } }) => `${spacing[4]} 0 ${spacing[3.5]} 0`};
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
            <SectionTitle>{openDeliverablesSectionTitle}</SectionTitle>
          </Col>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <BodyPrimary>{openDeliverablesSectionDescription}</BodyPrimary>
          </Col>
          <Col width={[1, 1, 1, 1, 4 / 12]}>
            <StyledSubtitle>
              {openDeliverablesClientReposSubtitle}
            </StyledSubtitle>
          </Col>
          <Col width={[1, 1, 1, 1, 1]}>
            {openDeliverablesClientRepos &&
              openDeliverablesClientRepos.length &&
              openDeliverablesClientRepos.map(({ id, ...props }) => (
                <RepoWithImage key={id} {...props} />
              ))}
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  )
}

export default OpenDeliverables
// export default styled(OpenDeliverables)`
//   padding: ${props => props.theme.spacing};
// `
