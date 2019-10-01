import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useCountUp } from 'react-countup'
import { useInView } from 'react-intersection-observer'
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
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[7]};
  `}
`

const StyledBodyPrimary = styled(BodyPrimary)`
  color: #848194;
  width: 100%;
  margin-top: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[4]};
`

const StyledImage = styled(Image)`
  max-width: 54px;
  padding-bottom: ${({ theme }) => theme.space[2]};
`

const ReposWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.space[4]};
  padding-top: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`  
    padding-bottom: ${({ theme }) => theme.space[6]};
    padding-top: ${({ theme }) => theme.space[6]};
  `}
`

const GithubLink = styled(StyledLink)`
  ${breakpoint('tablet')`
    margin-bottom: ${({ theme }) => theme.space[4]};
  `}
`

const Graphic = styled(Image)`
  width: auto;
  max-width: initial;
  height: calc(100% - ${({ theme }) => theme.space[4]});
`

const GraphicCol = styled(Col)`
  display: flex;
  align-items: flex-end;
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
  const [ref, inView] = useInView({
    triggerOnce: true
  })

  const countUpOpts = ({ end }) => ({
    start: 0,
    end,
    delay: 1000,
    duration: 3
  })

  const { countUp: contributions, start: startContributions } = useCountUp(
    countUpOpts({ end: openSourceMetaPullRequestsCount })
  )

  const { countUp: projects, start: startProjects } = useCountUp(
    countUpOpts({ end: openSourceMetaReposCount })
  )

  const contributionsCopy = {
    titleSectionLine1,
    titleSectionLine2,
    titleSectionLine3
  }

  const startProjectsCallback = useCallback(startProjects, [])
  const startContributionsCallback = useCallback(startContributions, [])

  useEffect(
    () => {
      if (inView) {
        startProjectsCallback()
        startContributionsCallback()
      }
    },
    [inView, startProjectsCallback, startContributionsCallback]
  )

  return (
    <div className="bkg">
      <Grid>
        <Wrapper ref={ref}>
          <Row>
            <Col width={[1]}>
              <StyledImage image={icon} height="100%" width="auto" />
            </Col>
            <Col width={[1, 1, 1, 1, 7 / 12, 7 / 12, 6 / 12]} block={false}>
              <ContributionsCopy
                {...contributionsCopy}
                projects={projects}
                contributions={contributions}
                inView={inView}
              />
              <StyledBodyPrimary textLight>
                {descriptionLine1}
                <br />
                {descriptionLine2}
              </StyledBodyPrimary>

              {!repos && (
                <GithubLink reverse="true" external href={ctaLink}>
                  {ctaCopy}
                </GithubLink>
              )}
            </Col>

            {sectionGraphic && (
              <GraphicCol width={[1, 1, 1, 1, 5 / 12, 4 / 12, 6 / 12]}>
                <Graphic image={sectionGraphic} />
              </GraphicCol>
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
                  <GithubLink reverse="true" external href={ctaLink}>
                    {ctaCopy}
                  </GithubLink>
                </Col>
              </Row>
            </>
          )}
        </Wrapper>
      </Grid>
    </div>
  )
}

export default Contributions
