import React from 'react'
import Player from 'react-youtube'
import GetYouTubeId from 'get-youtube-id'

const YouTube = ({ videoId }) => <Player videoId={GetYouTubeId(videoId)} />

export default YouTube
