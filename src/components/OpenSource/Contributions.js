import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import ContributionsCopy from './ContributionsCopy'
import { Grid, Row, Col } from '../grid'
import { Repo } from '../Common/Repo'
import { generate } from 'shortid'
import StyledLink from '../Common/StyledLink'
import Image from '../Common/Image'
import { BodyPrimary } from '../Typography'

const Wrapper = styled.div`
  padding-top: ${props => props.theme.spacing[3]};
  padding-bottom: ${props => props.theme.spacing[3]};

  ${breakpoint('tablet')`
    padding-top: ${props => props.theme.spacing[4]};
    padding-bottom: ${props => props.theme.spacing[4]};
  `}
`

const StyledBodyPrimary = styled(BodyPrimary)`
  padding-bottom: ${props => props.theme.spacing[3]};
  padding-top: ${props => props.theme.spacing[2]};

  ${breakpoint('tablet')`
    padding-top: ${props => props.theme.spacing[2]};
    padding-bottom: ${props => props.theme.spacing[4]};
  `}
`

const StyledImage = styled(Image)`
  max-width: 54px;

  ${breakpoint('smallTablet')`
    padding-bottom: ${props => props.theme.spacing[2]};
  `}
`

const ReposWrapper = styled.div`
  ${breakpoint('smallTablet')`
    padding-bottom: ${props => props.theme.spacing[3]};
  `}

  ${breakpoint('tablet')`  
    padding-bottom: ${props => props.theme.spacing[4]};
  `}
`

const Contributions = ({
  contentfulOpenSourcePage: {
    contributionsSectionImage,
    contributionsSectionDescription,
    contributionsSectionCtaText,
    contributionsSectionCtaLink,
    contributionsSectionGithubRepos: repos,
    contributionsSectionTitleLine1,
    contributionsSectionTitleLine2,
    contributionsSectionTitleLine3,
    openSourceMetaRepoCount,
    openSourceMetaPullRequestCount
  }
}) => {
  const contributions = {
    contributionsSectionTitleLine1,
    contributionsSectionTitleLine2,
    contributionsSectionTitleLine3,
    openSourceMetaRepoCount,
    openSourceMetaPullRequestCount
  }

  return (
    <Grid>
      <Wrapper>
        <Row>
          <Col width={[1, 1, 1, 1, 7 / 12, 8 / 12, 6 / 12]}>
            <StyledImage image={contributionsSectionImage} />
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
        <ReposWrapper>
          <Row>
            {repos &&
              repos.length &&
              repos.map(repo => (
                <Col
                  key={generate()}
                  width={[1, 1, 6 / 12, 6 / 12, 6 / 12, 4 / 12]}
                >
                  <Repo theme="dark" small {...repo} />
                </Col>
              ))}
          </Row>
        </ReposWrapper>
        <Row>
          <Col width={[1, 1, 1, 1, 1]}>
            <StyledLink
              reverse="true"
              external
              to={contributionsSectionCtaLink}
            >
              {contributionsSectionCtaText}
            </StyledLink>
          </Col>
        </Row>
      </Wrapper>
    </Grid>
  )
}

export default Contributions
