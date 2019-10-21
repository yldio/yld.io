import React from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'

const Wrapper = styled.figure`
  text-align: center;
  padding-top: ${remcalc(37)};

  > img {
    width: 100%;
    display: block;
    max-width: 100%;
    margin-bottom: ${remcalc(24)};
  }

  figcaption {
    color: ${({ theme }) => theme.colors.textLight};
    padding-bottom: ${remcalc(12)};
    max-width: 70%;
    margin: 0 auto;
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
