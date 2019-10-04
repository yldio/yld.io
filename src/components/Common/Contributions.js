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

const UnpaddedGrid = styled(Grid)`
  ${breakpoint('smallPhone', 'smallTablet')`
    padding-left: 0;
    padding-right: 0;
    max-width: 100%;
  `}
`
const StyledCol = styled(Col)`
  ${breakpoint('smallPhone', 'smallTablet')`
    padding-left: ${({ theme }) => theme.space[3]};
    padding-right: ${({ theme }) => theme.space[3]};
  `}
`

const Wrapper = styled.div`
  position: relative;
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
  display: none;

  ${breakpoint('smallTablet')`
    display: block;
    position: absolute;
    z-index: 0;
    top: 50%;
    height: 320px;
    transform: translateY(-50%);
  `}

  ${breakpoint('tablet')`
  // initial margin - (WrapperWidth + GridMargin - Breakpoint)/2
  // starts with -6px and adds 0.5px for each 1px screen size is over breakpoint
    margin-left: calc(-6px - calc(calc(100% + 96px) - ${({ theme }) =>
      theme.breakpoints.tablet}px)/2);
  `}

  ${breakpoint('desktop')`
    margin-left: -154px;
  `}
`

const StaticRow = styled(Row)`
  position: static;
`

const GraphicCol = styled(Col)`
  position: static;

  ${breakpoint('smallPhone', 'smallTablet')`
    min-height: 220px;
    background-image: url(${({ image }) => image.file.url});
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: ${({ theme }) => theme.space[3]};
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
      <UnpaddedGrid>
        <Wrapper ref={ref}>
          <StaticRow>
            <StyledCol width={[1]}>
              <StyledImage image={icon} height="100%" width="auto" />
            </StyledCol>
            <StyledCol
              width={[1, 1, 1, 1, 8 / 12, 8 / 12, 6 / 12]}
              block={false}
            >
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
            </StyledCol>

            {sectionGraphic && (
              <GraphicCol
                width={[1, 1, 1, 1, 4 / 12, 4 / 12, 6 / 12]}
                image={sectionGraphic}
              >
                <Graphic image={sectionGraphic} />
              </GraphicCol>
            )}
          </StaticRow>
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
      </UnpaddedGrid>
    </div>
  )
}

export default Contributions
