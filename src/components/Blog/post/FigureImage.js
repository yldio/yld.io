import React from 'react';
import remcalc from 'remcalc';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { ImageCaption } from './Typography';

const Wrapper = styled.figure`
  text-align: center;
  padding-top: ${remcalc(37)};

  > img {
    width: 100%;
    display: block;
    max-width: 100%;
    margin-bottom: ${remcalc(25)};
  }
`;

/**
 * NOT used anywhere in the codebase, this component is utilised in the
 * blog post MDX content that is stored in Contentful
 */
const FigureImage = ({ src, alt, caption }) => (
  <Wrapper className="figure-image">
    <img className="figure-image__img" src={src} alt={alt} loading="lazy" />
    {caption && (
      <ImageCaption className="figure-image__figcaption">
        <ReactMarkdown>{caption}</ReactMarkdown>
      </ImageCaption>
    )}
  </Wrapper>
);

export default FigureImage;
