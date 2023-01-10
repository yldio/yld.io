import React from 'react';
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import styled from 'styled-components';
import { graphql } from 'gatsby';
import remcalc from 'remcalc';

import Layout from '../components/layout';
import { Grid, Row, Col } from '../components/grid';
import Image from '../components/Common/Image';
import Branding from '../components/Header/Branding';
import * as BlogTypography from '../components/Blog/post/Typography';
import GreyBackground from '../components/Common/GreyBackground';
import { LogoStyleContext } from '../context/PageContext';
import { colors } from '../utils/theme';
import * as Typography from '../components/Typography';

const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <BlogTypography.Body>{children}</BlogTypography.Body>,
    [BLOCKS.HEADING_1]: (node, children) => <BlogTypography.H1>{children}</BlogTypography.H1>,
    [BLOCKS.HEADING_2]: (node, children) => <BlogTypography.H2>{children}</BlogTypography.H2>,
    [BLOCKS.HEADING_3]: (node, children) => <BlogTypography.Subtitle>{children}</BlogTypography.Subtitle>,
    [BLOCKS.UL_LIST]: (node, children) => <BlogTypography.UnorderedList>{children}</BlogTypography.UnorderedList>,
    [BLOCKS.OL_LIST]: (node, children) => <BlogTypography.OrderedList>{children}</BlogTypography.OrderedList>,
    [BLOCKS.LIST_ITEM]: (node, children) => <BlogTypography.ListItem>{children}</BlogTypography.ListItem>,
    [BLOCKS.QUOTE]: (node, children) => <BlogTypography.Blockquote>{children}</BlogTypography.Blockquote>,
    [BLOCKS.HYPERLINK]: (node, children) => <BlogTypography.A>{children}</BlogTypography.A>,
  },
  renderMark: {
    [BLOCKS.CODE]: (node, children) => <BlogTypography.Code>{children}</BlogTypography.Code>,
  },
  // renderMark: {
  //   [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  // },
  // renderNode: {
  //   [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  // },
  // renderText: (text) => text.replace('!', '?'),
};

const LogoWrapper = styled.div`
  height: 48px;
  width: 48px;
`;

const Industry = styled(Typography.Subtitle)`
  font-weight: 400;
`;

const MainSection = styled.section`
  background: ${({ color }) => color};
`;

const HeadGrid = styled(Grid)`
  padding-bottom: ${({ theme }) => theme.space[7]};
`;

const Hashtags = styled(Row)`
  margin-top: ${({ theme }) => theme.space[3]};
`;

const Background = styled(GreyBackground)`
  # background: ${({ theme }) => theme.colors.white};
  margin-bottom: -${({ theme }) => theme.space[5]};
`;

const ContentGrid = styled(Grid)`
  top: -${({ theme }) => theme.space[5]};
`;

const ContentBlock = styled(Col)`
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[4]};

  & p {
    padding: ${({ theme }) => theme.space[2]} 0;
    font-size: ${remcalc(18)};
  }

  & li > p {
    padding: 0;
  }

  & ul {
    padding-bottom: ${({ theme }) => theme.space[2]};
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  max-width: 100%;
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const DescriptionCol = styled(ContentBlock)`
  background: ${({ theme }) => theme.colors.white};
`;

const ChallengeCol = styled(ContentBlock)`
  background: #eeeeee;
`;

const ImpactCol = styled(ContentBlock)`
  background: ${({ theme }) => theme.colors.blueBg};

  & * {
    color: ${({ theme }) => theme.colors.white} !important;
  }
`;

export default ({ location, data: { contentfulSummarisedCaseStudy } }) => {
  const {
    clientLogo,
    color,
    industry,
    title,
    hashtags,
    descriptionIcon,
    descriptionText,
    coverImage,
    challengeIcon,
    challengeText,
    impactIcon,
    impactText,
    footerContactUs,
  } = contentfulSummarisedCaseStudy;

  const value = React.useMemo(() => {
    return {
      fillColorInitial: colors.white,
      textColor: colors.blueBg,
    };
  }, []);

  return (
    <LogoStyleContext.Provider value={value}>
      <Layout
        location={location}
        footerContactUsId={footerContactUs?.id}
        headerChildren={
          <Branding slug={location.slug}>
            <LogoWrapper>
              <Image height={remcalc(48)} with="auto" image={clientLogo} />
            </LogoWrapper>
          </Branding>
        }
        bgColor={color}
        nonFixedHeader
      >
        <MainSection color={color}>
          <HeadGrid>
            <Row>
              <Col width={[1]}>
                <Industry align="center" uppercase reverse>
                  {industry}
                </Industry>
              </Col>
            </Row>
            <Row>
              <Typography.SectionTitle align="center" reverse>
                {title}
              </Typography.SectionTitle>
            </Row>
            <Hashtags justify="center">
              {hashtags.map((hashtag) => (
                <BlogTypography.Tag>{hashtag}</BlogTypography.Tag>
              ))}
            </Hashtags>
          </HeadGrid>
          <Background>
            <ContentGrid>
              <Row>
                <DescriptionCol width={[1, 1, 1, 1, 1, 6 / 12]}>
                  <IconWrapper>
                    <Image image={descriptionIcon} />
                  </IconWrapper>
                  <BlogTypography.H1>Project Description</BlogTypography.H1>
                  {descriptionText && renderRichText(descriptionText, richTextOptions)}
                </DescriptionCol>
                <Col width={[1, 1, 1, 1, 1, 6 / 12]}>
                  <Image fluid={coverImage} />
                </Col>
              </Row>
              <Row>
                <ChallengeCol width={[1, 1, 1, 1, 1, 6 / 12]}>
                  <IconWrapper>
                    <Image image={challengeIcon} />
                  </IconWrapper>
                  <BlogTypography.H1>The Challenge</BlogTypography.H1>
                  {challengeText && renderRichText(challengeText, richTextOptions)}
                </ChallengeCol>
                <ImpactCol width={[1, 1, 1, 1, 1, 6 / 12]}>
                  <IconWrapper>
                    <Image image={impactIcon} />
                  </IconWrapper>
                  <BlogTypography.H1 reverse>Solution & Results</BlogTypography.H1>
                  {impactText && renderRichText(impactText, richTextOptions)}
                </ImpactCol>
              </Row>
            </ContentGrid>
          </Background>
        </MainSection>
      </Layout>
    </LogoStyleContext.Provider>
  );
};

export const pageQuery = graphql`
  query ($id: String) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    contentfulSummarisedCaseStudy(id: { eq: $id }) {
      id
      title
      color
      clientLogo {
        file {
          url
        }
        gatsbyImageData(layout: FULL_WIDTH)
      }
      industry
      hashtags
      descriptionIcon {
        file {
          url
        }
        gatsbyImageData(layout: FULL_WIDTH)
      }
      descriptionText {
        raw
      }
      coverImage {
        file {
          url
        }
        gatsbyImageData(layout: FULL_WIDTH)
      }
      challengeIcon {
        file {
          url
        }
        gatsbyImageData(layout: FULL_WIDTH)
      }
      challengeText {
        raw
      }
      impactIcon {
        file {
          url
        }
        gatsbyImageData(layout: FULL_WIDTH)
      }
      impactText {
        raw
      }
      footerContactUs {
        id
      }
    }
  }
`;
