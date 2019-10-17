import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.figure`
  padding-bottom: ${({ theme }) => theme.space[4]};

  > img {
    width: 100%;
    display: block;
    max-width: 100%;
  }
`

const FigureImage = ({ src, caption }) => (
  <Wrapper>
    <img src={src} alt={caption} />
    {caption && <figcaption>{caption}</figcaption>}
  </Wrapper>
)

export default FigureImage
