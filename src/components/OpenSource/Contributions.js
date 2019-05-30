import React from 'react'
import styled from 'styled-components'
import BlueBackground from '../Common/BlueBackground'
import ContributionsCopy from './ContributionsCopy'
import { Grid, Row, Col } from '../grid'
import { Repo } from '../Repo'
import { generate } from 'shortid'
import Hr from '../Common/Hr'
import StyledLink from '../Common/StyledLink'
import { BodyPrimary } from '../Typography'

const Wrapper = styled(BlueBackground)`
  padding: ${props => props.theme.spacing[4]};
`
const Contributions = ({
  contentfulOpenSourcePage: {
    contributionsSectionTitle,
    contributionsSectionDescription,
    contributionsSectionCtaText,
    contributionsSectionCtaLink,
    contributionsSectionGithubRepos: repos
  }
}) => {
  return (
    <Wrapper>
      <Grid>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <ContributionsCopy
              title={contributionsSectionTitle}
              subtitle={contributionsSectionDescription}
            />
          </Col>
        </Row>
        <Row>
          <Col width={[1, 1, 1, 1, 6 / 12]}>
            <BodyPrimary textLight>
              {contributionsSectionDescription}
            </BodyPrimary>
          </Col>
        </Row>
        <Row>
          {repos &&
            repos.length &&
            repos.map(repo => (
              <Col key={generate()} width={[1, 1, 1, 1]}>
                <Repo {...repo} />
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
