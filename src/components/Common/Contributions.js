import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import ContributionsCopy from './ContributionsCopy'
import { Grid, Row, Col } from '../grid'
import { Repo } from './Repo'
import { generate } from 'shortid'
import StyledLink from './StyledLink'
import Image from './Image'
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
  color: #848194;
  padding-top: ${({ theme }) => theme.space[3]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[3]};
  `}
`

const StyledImage = styled(Image)`
  max-width: 54px;
  padding-bottom: ${({ theme }) => theme.space[2]};

  ${breakpoint('smallTablet')`
    padding-bottom: ${({ theme }) => theme.space[3]};
  `}
`

const ReposWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.space[4]};
  padding-top: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`  
    padding-bottom: ${({ theme }) => theme.space[6]};
    padding-top: ${({ theme }) => theme.space[6]};
  `}
`

const Contributions = ({
  ctaCopy,
  ctaLink,
  descriptionLine1,
  descriptionLine2,
  titleSectionLine1,
  titleSectionLine2,
  titleSectionLine3,
  icon,
  sectionGraphic,
  githubRepos: repos,
  githubMetaData: { openSourceMetaReposCount, openSourceMetaPullRequestsCount }
}) => {
  const contributions = {
    titleSectionLine1,
    titleSectionLine2,
    titleSectionLine3,
    openSourceMetaReposCount,
    openSourceMetaPullRequestsCount
  }

  return (
    <Grid>
      <Wrapper>
        <Row>
          <Col width={[1]}>
            <StyledImage image={icon} />
          </Col>
          <Col width={[1, 1, 1, 1, 7 / 12, 8 / 12, 6 / 12]} block={false}>
            <ContributionsCopy {...contributions} />
            <StyledBodyPrimary textLight>
              {descriptionLine1}
              <br />
              {descriptionLine2}
            </StyledBodyPrimary>

            {!repos && (
              <StyledLink reverse="true" external href={ctaLink}>
                {ctaCopy}
              </StyledLink>
            )}
          </Col>

          {sectionGraphic && (
            <Col width={[1, 1, 1, 1, 5 / 12, 8 / 12, 6 / 12]}>
              <Image image={sectionGraphic} />
            </Col>
          )}
        </Row>
        {repos && repos.length && (
          <>
            <ReposWrapper>
              <Row>
                {repos.map(repo => (
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
                <StyledLink reverse="true" external href={ctaLink}>
                  {ctaCopy}
                </StyledLink>
              </Col>
            </Row>
          </>
        )}
      </Wrapper>
    </Grid>
  )
}

export default Contributions