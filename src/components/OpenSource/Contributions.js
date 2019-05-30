import React from 'react'
import styled from 'styled-components'
import BlueBackground from '../Common/BlueBackground'
import ContributionsCopy from './ContributionsCopy'
import { Grid, Row, Col } from '../grid'
import { Repo } from '../Repo'
import { generate } from 'shortid'
import StyledLink from '../Common/StyledLink'
import { BodyPrimary } from '../Typography'

const Wrapper = styled(BlueBackground)`
  padding: ${props => props.theme.spacing[4]};
`

const StyledBodyPrimary = styled(BodyPrimary)`
  padding: ${props => props.theme.spacing[3.5]} 0;
`

const RepoWrapper = styled.div`
  padding-bottom: ${props => props.theme.spacing[3]};
`

const Contributions = ({
  contentfulOpenSourcePage: {
    contributionsSectionTitle,
    contributionsSectionDescription,
    contributionsSectionCtaText,
    contributionsSectionCtaLink,
    contributionsSectionGithubRepos: repos,
    contributionsSectionTitleLine1,
    contributionsSectionTitleLine2,
    contributionsSectionTitleLine3
  }
}) => {
  const contributions = {
    contributionsSectionTitleLine1,
    contributionsSectionTitleLine2,
    contributionsSectionTitleLine3
  }
  return (
    <Wrapper>
      <Grid>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <ContributionsCopy {...contributions} />
          </Col>
        </Row>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <StyledBodyPrimary textLight>
              {contributionsSectionDescription}
            </StyledBodyPrimary>
          </Col>
        </Row>
        <Row>
          {repos &&
            repos.length &&
            repos.map(repo => (
              <Col key={generate()} width={[1, 1, 1, 1, 4 / 12]}>
                <RepoWrapper>
                  <Repo {...repo} />
                </RepoWrapper>
              </Col>
            ))}
        </Row>

        <Row>
          <Col width={[1, 1, 1, 1, 1]}>
            <StyledLink reverse external to={contributionsSectionCtaLink}>
              {contributionsSectionCtaText}
            </StyledLink>
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  )
}

export default Contributions
