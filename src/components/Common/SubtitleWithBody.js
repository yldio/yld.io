import React from 'react'
import styled from 'styled-components'
import { Subtitle, BodyPrimary } from '../Typography'

const ItemBody = styled(BodyPrimary).attrs({
  noPaddingTop: true,
  muted: props => props.bg === 'dark',
  reverse: props => props.bg === 'dark'
})`
  > a {
    text-decoration: underline;
  }
`

const ItemSubtitle = styled(Subtitle).attrs({
  reverse: props => props.bg === 'dark'
})`
  padding-bottom: 0;
`

const SubtitleWithBody = ({ subtitle, body, bg = 'white' }) => (
  <React.Fragment>
    <ItemSubtitle bg={bg}>{subtitle}</ItemSubtitle>
    <ItemBody bg={bg}>{body}</ItemBody>
  </React.Fragment>
)

export { ItemSubtitle, ItemBody }

export default SubtitleWithBody
