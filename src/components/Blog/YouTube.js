import React from 'react'
import Player from 'react-youtube'
import GetYouTubeId from 'get-youtube-id'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-bottom: ${900 / 16 + '%'};
  height: 0;
  position: relative;
  overflow: hidden;
  background-color: #eee;

  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    border: 0;
  }
`
const YouTube = ({ videoId }) => (
  <Wrapper>
    <Player videoId={GetYouTubeId(videoId)} />
  </Wrapper>
)

export default YouTube
