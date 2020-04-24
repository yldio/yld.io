import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import remcalc from 'remcalc';
import breakpoint from 'styled-components-breakpoint';

import { Col, Row } from '../../../components/grid';
import { SectionTitle, BodyPrimary } from '../../../components/Typography';
import Image from '../../../components/Common/Image';
import VideoSection from '../../../components/Common/VideoSection';
import GreyBackground from '../../../components/Common/GreyBackground';
import { hexToRgbWithAlpha } from '../../../utils/color';

const StyledColumnImage = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[3]};

  ${breakpoint('smallTablet')`
    padding-bottom: 0;
  `}
`;

const renderImage = data => data && <Image image={data} />;

/* The reason for this is to solve inconsistent CSS Styling Between gatsby develop and build.
This solution ensures that strong is always bold and white for any environment */
const StyledBodyPrimary = styled(BodyPrimary)`
  color: ${({ theme, bpColorReverse }) =>
    bpColorReverse ? hexToRgbWithAlpha(theme.colors.white, 0.5) : null};
  font-family: ${({ bpFont }) => bpFont};
  font-size: ${({ bpFontSmall }) => (bpFontSmall ? remcalc(16) : null)};

  > strong {
    font-weight: bold;
    color: ${({ theme, bpColorReverse }) =>
      bpColorReverse ? theme.colors.white : null};
    font-family: 'Roboto', sans-serif;
  }
`;

const renderText = ({
  text,
  colorReverse,
  bpColorReverse = false,
  disallowed = [],
  bpFont = null,
  noHeaderPadding = false,
  bpFontSmall = false,
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
        ),
      }}
      source={text}
    />
  );

const MobileReverseOrderWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  ${breakpoint('smallTablet')`
    flex-direction: column;
  `}
`;

const TextAndImagePaddingSeparator = styled.div`
  padding-bottom: ${({ theme }) => theme.space[2]};
`;

const TextColumnsBlock = ({
  data: { text },
  colWidthOne = [1, 1, 1, 1, 1 / 2],
  StyledColOne = Col,
  colWidthTwo = [1, 1, 1, 1, 1 / 2],
  StyledColTwo = Col,
  middleColWidth = null,
  colorReverse = false,
  bpColorReverse = false,
  noHeaderPadding = false,
  headerBlock = true,
  headerColCss = undefined,
}) => (
  <Fragment>
    <StyledColOne width={colWidthOne} block={headerBlock} {...headerColCss}>
      {renderText({
        text,
        colorReverse,
        bpColorReverse,
        disallowed: ['paragraph'],
        noHeaderPadding,
      })}
    </StyledColOne>
    {middleColWidth && <Col width={middleColWidth} />}
    <StyledColTwo width={colWidthTwo}>
      {renderText({
        text,
        colorReverse,
        bpColorReverse,
        disallowed: ['heading'],
      })}
    </StyledColTwo>
  </Fragment>
);

const FullWidthBlock = ({ data: { text, image }, StyledCol = Col }) => (
  <StyledCol width={[1]}>
    {renderText({ text })}
    {text && image && <TextAndImagePaddingSeparator />}
    {renderImage(image)}
  </StyledCol>
);

const HalfGreyBackground = styled(GreyBackground)`
  display: ${({ mobile }) => (mobile ? 'inherit' : 'none')};
  background-image: linear-gradient(white 50%, transparent 50%);

  ${breakpoint('smallTablet')`
      display: ${({ mobile }) => (mobile ? 'none' : 'inherit')};
  `}
`;

const VideoBlock = ({ data: { text } }) => <VideoSection src={text} />;

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
);

const StyledMobilePadding = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[4]};
`;

const StyledBreakpointMobilePadding = styled(StyledMobilePadding)`
  ${breakpoint('smallTablet')`
    display: none;
  `}
`;

const TextAndImageBlock = ({
  data: { text, image },
  colWidthOne = [1, 1, 1, 1, 1 / 2],
  colWidthTwo = [1, 1, 1, 1, 1 / 2],
  middleColWidth = null,
  colorReverse = false,
}) => (
  <Fragment>
    <Col width={colWidthOne}>{renderText({ text, colorReverse })}</Col>
    {text && image && <StyledBreakpointMobilePadding width={[1]} />}
    {middleColWidth && <Col width={middleColWidth} />}
    <Col width={colWidthTwo}>{renderImage(image)}</Col>
  </Fragment>
);

const TextAndResizedImageBlock = ({ data: { text, image } }) => (
  <Fragment>
    <Col width={[1, 1, 1, 1, 4 / 8]}>{renderText({ text })}</Col>
    {text && image && <StyledMobilePadding width={[1, 1, 1, 1, 1 / 8]} />}
    <Col width={[1, 1, 1, 1, 3 / 8]}>{renderImage(image)}</Col>
  </Fragment>
);

const BlockRow = styled(Row)`
  flex-direction: ${({ columnReverse }) =>
    `column${columnReverse ? '-reverse' : null}`};
  align-items: ${({ alignCenter }) => (alignCenter ? 'center' : null)};
  padding-top: ${({ theme, mobile }) =>
    mobile && mobile.top ? theme.space[mobile.top] : null};
  padding-bottom: ${({ theme, mobile }) =>
    mobile && mobile.bottom ? theme.space[mobile.bottom] : null};
  justify-content: ${({ spaced }) => spaced && 'space-evenly'};

  ${breakpoint('phone')`
    justify-content: ${({ spaced }) => spaced && 'space-between'};
  `}

  ${breakpoint('smallTablet')`
    flex-direction: ${({ rowReverse }) => (rowReverse ? 'row-reverse' : 'row')};
    padding-top: ${({ theme, smallTablet }) =>
      smallTablet && smallTablet.top ? theme.space[smallTablet.top] : null};
    padding-bottom: ${({ theme, smallTablet }) =>
      smallTablet && smallTablet.bottom
        ? theme.space[smallTablet.bottom]
        : null};
  `}

  ${breakpoint('tablet')`
    padding-top: ${({ theme, tablet }) =>
      tablet && tablet.top ? theme.space[tablet.top] : null};
    padding-bottom: ${({ theme, tablet }) =>
      tablet && tablet.bottom ? theme.space[tablet.bottom] : null};
  `}

  ${breakpoint('desktop')`
    padding-top: ${({ theme, desktop }) =>
      desktop && desktop.top ? theme.space[desktop.top] : null};
    padding-bottom: ${({ theme, desktop }) =>
      desktop && desktop.bottom ? theme.space[desktop.bottom] : null};
  `}
`;

const getImage = (blockImages, index) => blockImages && blockImages[index];

const normaliseAll = (genericBlocks = []) =>
  genericBlocks.map(({ genericBlockText, genericBlockImages, ...props }) => ({
    image: getImage(genericBlockImages, 0),
    text: genericBlockText && genericBlockText.genericBlockText,
    ...props,
  }));

const normalise = (genericBlocks = [], index = 0) =>
  normaliseAll(genericBlocks, index)[index];

const getImages = data =>
  data.genericBlockImages ? data.genericBlockImages : [];

const shouldRender = data => data && data.length;

export {
  BlockRow,
  renderImage,
  renderText,
  MobileReverseOrderWrapper,
  TextColumnsBlock,
  FullWidthBlock,
  HalfGreyBackground,
  VideoBlock,
  ImagesBlock,
  TextAndImageBlock,
  TextAndResizedImageBlock,
  shouldRender,
  getImages,
  getImage,
  normalise,
  normaliseAll,
};
