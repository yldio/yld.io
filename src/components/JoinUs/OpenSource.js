import React from 'react'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import styled from 'styled-components'
import getYoutubeId from 'get-youtube-id'
import { Padding, Margin } from 'styled-components-spacing'
import { Row, CompensatedRow, CompensatedCol } from '../grid'
import Image from '../Common/Image'
import { H2, Paragraph } from '../Typography'
import playIcon from '../../images/button-play-default.svg'

import {
  Section,
  FirstColumn,
  SecondColum,
  Separator,
  List,
  TitleAndBody
} from './elements'

const MAX_VIDEOS = 3

const getThumbnail = videoId =>
  `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

const TalkLink = styled.a`
  border: 1px solid #eeefee;
  display: block;
  flex: 1;
`
const TalkTitle = styled.div`
  display: flex;
`
const PlayIcon = styled.img`
  min-height: ${remcalc(36)};
  max-width: ${remcalc(36)};
`
const TruncatedParagraph = styled(Paragraph)`
  max-height: 3rem;
  overflow: hidden;

  @supports (-webkit-line-clamp: 2) {
    max-height: none;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const TalkColumn = styled(CompensatedCol)`
  ${breakpoint('largePhone')`
    &:last-child {
      display: none;
    }
  `}

  ${breakpoint('tablet')`
    &:last-child {
      display: flex;
    }
  `}
`

const Talks = ({ data }) => (
  <CompensatedRow>
    {data.slice(0, MAX_VIDEOS).map(({ title, link }, idx) => (
      <TalkColumn width={[1, 1, 1, 6 / 12, 6 / 12, 4 / 12]} key={idx}>
        <Padding top={2}>
          <TalkLink px={2} py={2} href={link} target="_blank">
            <Padding horizontal={2} vertical={2}>
              <Margin bottom={1}>
                <Image
                  image={{
                    file: { url: getThumbnail(getYoutubeId(link)) },
                    title
                  }}
                />
              </Margin>
              <TalkTitle>
                <Margin right={[1.5, 1.5, 1.5, 2]}>
                  <PlayIcon src={playIcon} alt="Play button" />
                </Margin>
                <TruncatedParagraph noMargin>{title}</TruncatedParagraph>
              </TalkTitle>
            </Padding>
          </TalkLink>
        </Padding>
      </TalkColumn>
    ))}
  </CompensatedRow>
)

const OpenSource = ({ data: { title, list, text, featuredTalks } }) => (
  <Section greyBg>
    <Row>
      <FirstColumn>
        <H2>{title}</H2>
      </FirstColumn>
      <SecondColum width={[1, 1, 1, 1, 6 / 12, 5 / 12]}>
        <List list={list} />
      </SecondColum>
    </Row>
    <Separator />
    <TitleAndBody title="Recent Talks" body={text} />
    <Talks data={featuredTalks} />
  </Section>
)

export default OpenSource
