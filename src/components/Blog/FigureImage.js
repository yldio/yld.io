import React from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'

const Wrapper = styled.figure`
  padding-bottom: ${remcalc(24)};

  > img {
    width: 100%;
    display: block;
    max-width: 100%;
  }
`

const FigureImage = ({ src, caption }) => (
  <Wrapper className="figure-image">
    <img className="figure-image__img" src={src} alt={caption} />
    {caption && (
      <figcaption className="figure-image__figcaption">{caption}</figcaption>
    )}
  </Wrapper>
)

export default FigureImage
