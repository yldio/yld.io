import React, { useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useCountUp } from 'react-countup';
import { useInView } from 'react-intersection-observer';
import breakpoint from 'styled-components-breakpoint';
import ContributionsCopy from './ContributionsCopy';
import { Grid, Row, Col } from '../grid';
import { Repo } from './Repo';
import { generate } from 'shortid';
import StyledLink from './StyledLink';
import Image from './Image';
import { BodyPrimary } from '../Typography';

const Wrapper = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.space[5]} 0;
  ${breakpoint('tablet')`
    padding: ${({ theme }) => theme.space[7]} 0;
  `}
`;

const ContributionsIcon = styled(Image)`
  max-width: 54px;
`;

const StyledBodyPrimary = styled(BodyPrimary)`
  width: 100%;
  margin-top: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[4]};

  color: ${({ theme }) => theme.colors.white};
  opacity: 0.5;
`;

const RowWithImage = styled(Row)`
  overflow: visible;
  ${breakpoint('smallTablet')`
    flex-wrap: nowrap;
  `}
`;
const StyledCol = styled(Col)`
  align-items: center;

  ${breakpoint('tablet')`
    padding-right: ${({ theme }) => theme.space[2]}
  `}
`;

const GraphicCol = styled(Col)`
  height: 320px;

  ${breakpoint('tablet')`
    padding-left: ${({ theme }) => theme.space[2]}
  `}
  ${breakpoint('smallPhone', 'smallTablet')`
    padding-top: ${({ theme }) => theme.space[4]};
  `}

  overflow: visible;
`;
const Graphic = styled(Image)`
  height: 100%;
  width: auto;
  max-width: none;
`;

const ReposWrapper = styled.div`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('smallTablet')`
    padding-top: ${({ theme }) => theme.space[5]}
  `}

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[7]};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}

  ${breakpoint('desktop')`
    padding-top: ${({ theme }) => theme.space[6]};
  `}
`;

// Used on homepage and multiple times on open source page
const Contributions = ({
  ctaCopy,
  ctaLink,
  titleStandalone,
  titleBeforeContributionCount,
  titleBetweenContributionAndProjectCount,
  titleAfterProjectCount,
  descriptionLine1,
  descriptionLine2,
  icon,
  sectionGraphic,
  githubRepos: repos,
  githubMetaData: { contributionsCount, reposContributedToCount } = {},
}) => {
  // counters

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const countUpOpts = (opts) => ({
    ...opts,
    start: 0,
    delay: 1000,
    duration: 3,
  });

  const contributions = React.useRef();
  const { start: startContributions } = useCountUp(
    countUpOpts({ end: contributionsCount || 0, ref: contributions }),
  );

  const projects = React.useRef();
  const { start: startProjects } = useCountUp(
    countUpOpts({ end: reposContributedToCount || 0, ref: projects }),
  );

  const contributionsCopy = titleBeforeContributionCount &&
    titleBetweenContributionAndProjectCount &&
    titleAfterProjectCount && {
      titleBeforeContributionCount,
      titleBetweenContributionAndProjectCount,
      titleAfterProjectCount,
    };

  const startProjectsCallback = useCallback(startProjects, [startProjects]);
  const startContributionsCallback = useCallback(startContributions, [
    startContributions,
  ]);

  useEffect(() => {
    if (inView) {
      startProjectsCallback();
      startContributionsCallback();
    }
  }, [inView, startProjectsCallback, startContributionsCallback]);

  // decide where to put GithubLink
  let leftColGithubLink = null;
  let bottomGithubLink = null;
  if (ctaLink && ctaCopy) {
    const githubLink = (
      <StyledLink external reverse="true" vibrant="true" href={ctaLink}>
        {ctaCopy}
      </StyledLink>
    );
    if (repos && repos.length) {
      bottomGithubLink = githubLink;
    } else {
      leftColGithubLink = githubLink;
    }
  }

  // render

  return (
    <div className="bkg">
      <Grid>
        <Wrapper ref={ref}>
          {icon && <ContributionsIcon image={icon} width="auto" />}
          <RowWithImage>
            <StyledCol
              width={[1, 1, 1, 1, 8 / 12, 8 / 12, 6 / 12]}
              block={false}
              css={css`
                min-width: ${100 * (7 / 12)}%;
              `}
            >
              <ContributionsCopy
                {...contributionsCopy}
                titleStandalone={titleStandalone}
                projects={projects}
                contributions={contributions}
                inView={inView}
              />
              {descriptionLine1 && (
                <StyledBodyPrimary secondary>
                  {descriptionLine1}
                  {descriptionLine2 && (
                    <>
                      <br />
                      {descriptionLine2}
                    </>
                  )}
                </StyledBodyPrimary>
              )}
              {leftColGithubLink}
            </StyledCol>

            {sectionGraphic && (
              <GraphicCol width={[1, 1, 1, 1, 4 / 12, 4 / 12, 6 / 12]}>
                <Graphic image={sectionGraphic} />
              </GraphicCol>
            )}
          </RowWithImage>
          {repos && repos.length && (
            <Row>
              <Col>
                <ReposWrapper>
                  <Row>
                    {repos.map((repo) => (
                      <Col
                        key={generate()}
                        width={[1, 1, 1, 1, 6 / 12, 6 / 12, 4 / 12]}
                      >
                        <Repo small theme="dark" {...repo} />
                      </Col>
                    ))}
                  </Row>
                </ReposWrapper>
                {ctaLink && ctaCopy && (
                  <Row>
                    <Col width={[1, 1, 1, 1, 1]}>{bottomGithubLink}</Col>
                  </Row>
                )}
              </Col>
            </Row>
          )}
        </Wrapper>
      </Grid>
    </div>
  );
};

export default Contributions;
