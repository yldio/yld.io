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
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`

const StyledBodyPrimary = styled(BodyPrimary)`
  padding-bottom: ${({ theme }) => theme.space[4]};
  padding-top: ${({ theme }) => theme.space[3]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[3]};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`

const StyledImage = styled(Image)`
  max-width: 54px;

  ${breakpoint('smallTablet')`
    padding-bottom: ${({ theme }) => theme.space[3]};
  `}
`

const ReposWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`  
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`

const Contributions = ({
  contentfulOpenSourcePage: {
    contributionsSectionImage,
    contributionsSectionDescriptionLine1,
    contributionsSectionDescriptionLine2,
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
              {contributionsSectionDescriptionLine1}
              <br />
              {contributionsSectionDescriptionLine2}
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
                  width={[1, 1, 1, 1, 6 / 12, 6 / 12, 4 / 12]}
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
