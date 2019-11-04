import React from 'react'
import { Gist } from '@blocks/kit'
import remcalc from 'remcalc'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-top: ${remcalc(36)};
`

/**
 * Blocks/Gist doesn't take className prop :(
 */
const WrappedGist = ({ id }) => (
  <Wrapper className="gist">
    <Gist id={id} />
  </Wrapper>
)

export default WrappedGist
