import React from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { ImageCaption } from './Typography'

const Wrapper = styled.figure`
  text-align: center;
  padding-top: ${remcalc(37)};

  > img {
    width: 100%;
    display: block;
    max-width: 100%;
    margin-bottom: ${remcalc(25)};
  }
`

const FigureImage = ({ src, caption }) => (
  <Wrapper className="figure-image">
    <img className="figure-image__img" src={src} alt={caption} />
    {caption && (
      <ImageCaption className="figure-image__figcaption">
        <ReactMarkdown source={caption} />
      </ImageCaption>
    )}
  </Wrapper>
)

export default FigureImage
