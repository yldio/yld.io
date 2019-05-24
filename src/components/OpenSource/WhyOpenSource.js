import React, { Fragment } from 'react'
import SubtitleWithBody from '../Common/SubtitleWithBody'
import styled from 'styled-components'

const StyledSubtitleWithBody = styled(SubtitleWithBody)`
  padding-top: ${props => props.theme.spacing['1']};
  padding-bottom: ${props => props.theme.spacing['1']};
  margin-top: ${props => props.theme.spacing['1']};
  margin-bottom: ${props => props.theme.spacing['2']};
`

const WhyOpenSource = ({ subtitle, body, themeVariation = 'white' }) => (
  <Fragment>
    <StyledSubtitleWithBody
      subtitle={subtitle}
      body={body}
      themeVariation={themeVariation}
    />
  </Fragment>
)

export default WhyOpenSource
