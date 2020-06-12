import React from 'react';
import { Grid } from '../grid';
import Helmet from 'react-helmet';
import ReactMarkdown from 'react-markdown';

import Layout from '../layout';

import {
  StyledBlueBackground,
  StyledRow,
  TextCol,
  IllustrationCol,
  TitleHeadline,
  CopyText,
} from './Ui';

import { LogoStyleContext } from '../../context/PageContext';

import illustration from '../../images/404-illustration.svg';

import { colors } from '../../utils/theme';

const Page404 = ({ siteTitle, footerId, titleHeadline, copy, children }) => (
  <LogoStyleContext.Provider
    value={{
      fillColorInitial: colors.white,
      textColor: colors.blueBg,
    }}
  >
    <Layout is404={true} bgColor="blueBg" footerContactUsId={footerId}>
      <Helmet
        title={`${siteTitle} - Not Found`}
        meta={[
          {
            name: 'description',
            content: 'YLD - Engineering - Digital, NodeJS, React, AWS',
          },
        ]}
      >
        <html lang="en" />
      </Helmet>
      <StyledBlueBackground>
        <Grid>
          <StyledRow>
            <TextCol>
              <TitleHeadline>{titleHeadline}</TitleHeadline>
              <ReactMarkdown
                renderers={{
                  paragraph: CopyText,
                }}
                source={copy}
              />
              {children}
            </TextCol>
            <IllustrationCol>
              <img
                src={illustration}
                alt="There's nothing to see here - ilustration"
              />
            </IllustrationCol>
          </StyledRow>
        </Grid>
      </StyledBlueBackground>
    </Layout>
  </LogoStyleContext.Provider>
);

export default Page404;
