import React, { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'

import { Col } from '../../../components/grid'
import { SectionTitle, BodyPrimary } from '../../../components/Typography'
import Image from '../../../components/Common/Image'
import VideoSection from '../../../components/Common/VideoSection'
import GreyBackground from '../../../components/Common/GreyBackground'

const StyledColumnImage = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[3]};

  ${breakpoint('smallTablet')`
    padding-bottom: 0;
  `}
`

const renderImage = data => data && <Image image={data} />

/* The reason for this is to solve inconsistent CSS Styling Between gatsby develop and build.
This solution ensures that strong is always bold and white for any environment */
const StyledBodyPrimary = styled(BodyPrimary)`
  color: ${({ theme, bpColorReverse }) =>
    bpColorReverse ? theme.colors.opacityWhite : null};
  font-family: ${({ bpFont }) => bpFont};
  font-size: ${({ bpFontSmall }) => (bpFontSmall ? remcalc(16) : null)};

  > strong {
    font-weight: bold;
    color: ${({ theme, bpColorReverse }) =>
      bpColorReverse ? theme.colors.white : null};
    font-family: 'Roboto', sans-serif;
  }
`

const renderText = ({
  text,
  colorReverse,
  bpColorReverse = false,
  disallowed = [],
  bpFont = null,
  noHeaderPadding = false,
  bpFontSmall = false
}) =>
  text && (
    <ReactMarkdown
      disallowedTypes={disallowed}
      renderers={{
        // eslint-disable-next-line
        heading: props => (
          <SectionTitle
            noPadding={noHeaderPadding}
            reverse={colorReverse}
            {...props}
          />
        ),
        // eslint-disable-next-line
        paragraph: props => (
          <StyledBodyPrimary
            reverse={colorReverse}
            bpColorReverse={bpColorReverse}
            bpFont={bpFont}
            bpFontSmall={bpFontSmall}
            {...props}
          />
        )
      }}
      source={text}
    />
  )

const MobileReverseOrderWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  ${breakpoint('smallTablet')`
    flex-direction: column;
  `}
`

const TextAndImagePaddingSeparator = styled.div`
  padding-bottom: ${({ theme }) => theme.space[2]};
`

const TextColumnsBlock = ({
  data: { text },
  colWidthOne = [1, 1, 1, 1, 1 / 2],
  colWidthTwo = [1, 1, 1, 1, 1 / 2],
  middleColWidth = null,
  colorReverse = false,
  bpColorReverse = false,
  noHeaderPadding = false,
  headerBlock = true,
  headerColCss = undefined
}) => (
  <Fragment>
    <Col width={colWidthOne} block={headerBlock} {...headerColCss}>
      {renderText({
        text,
        colorReverse,
        bpColorReverse,
        disallowed: ['paragraph'],
        noHeaderPadding
      })}
    </Col>
    {middleColWidth && <Col width={middleColWidth} />}
    <Col width={colWidthTwo}>
      {renderText({
        text,
        colorReverse,
        bpColorReverse,
        disallowed: ['heading']
      })}
    </Col>
  </Fragment>
)

const FullWidthBlock = ({ data: { text, image } }) => (
  <Col width={[1]}>
    {renderText({ text })}
    {text && image && <TextAndImagePaddingSeparator />}
    {renderImage(image)}
  </Col>
)

const HalfGreyBackground = styled(GreyBackground)`
  display: ${({ mobile }) => (mobile ? 'inherit' : 'none')};
  background-image: linear-gradient(white 50%, transparent 50%);

  ${breakpoint('smallTablet')`
      display: ${({ mobile }) => (mobile ? 'none' : 'inherit')};
  `}
`

const VideoBlock = ({ data: { text } }) => <VideoSection src={text} />

const ImagesBlock = ({ data }) => (
  <Fragment>
    {data.map((image, index) => (
      <StyledColumnImage
        width={[2 / 5, 2 / 5, 1 / 5, 1 / 5, 1 / 4, 1 / 4]}
        key={index}
      >
        {renderImage(image)}
      </StyledColumnImage>
    ))}
  </Fragment>
)

const StyledMobilePadding = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const StyledBreakpointMobilePadding = styled(StyledMobilePadding)`
  ${breakpoint('smallTablet')`
    display: none;
  `}
`

const TextAndImageBlock = ({
  data: { text, image },
  colWidthOne = [1, 1, 1, 1, 1 / 2],
  colWidthTwo = [1, 1, 1, 1, 1 / 2],
  middleColWidth = null,
  colorReverse = false
}) => (
  <Fragment>
    <Col width={colWidthOne}>{renderText({ text, colorReverse })}</Col>
    {text && image && <StyledBreakpointMobilePadding width={[1]} />}
    {middleColWidth && <Col width={middleColWidth} />}
    <Col width={colWidthTwo}>{renderImage(image)}</Col>
  </Fragment>
)

const TextAndResizedImageBlock = ({ data: { text, image } }) => (
  <Fragment>
    <Col width={[1, 1, 1, 1, 4 / 8]}>{renderText({ text })}</Col>
    {text && image && <StyledMobilePadding width={[1, 1, 1, 1, 1 / 8]} />}
    <Col width={[1, 1, 1, 1, 3 / 8]}>{renderImage(image)}</Col>
  </Fragment>
)

export {
  renderImage,
  renderText,
  MobileReverseOrderWrapper,
  TextColumnsBlock,
  FullWidthBlock,
  HalfGreyBackground,
  VideoBlock,
  ImagesBlock,
  TextAndImageBlock,
  TextAndResizedImageBlock
}
