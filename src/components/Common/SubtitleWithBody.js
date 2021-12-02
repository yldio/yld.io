import React from 'react';
import styled from 'styled-components';
import { Subtitle, BodyPrimary } from '../Typography';
import theme from '../../utils/theme';

const ItemBody = styled(BodyPrimary).attrs((props) => ({
  noPaddingTop: true,
  muted: props.themeVariation === theme.variations.dark,
  reverse: props.themeVariation === theme.variations.dark,
}))`
  > a {
    text-decoration: underline;
  }
`;

const ItemSubtitle = styled(Subtitle).attrs((props) => ({
  reverse: props.themeVariation === theme.variations.dark,
}))`
  padding-bottom: 0;
`;

const SubtitleWithBody = ({ subtitle, body, themeVariation = 'white' }) => {
  return (
    <>
      <ItemSubtitle themeVariation={themeVariation}>{subtitle}</ItemSubtitle>
      <ItemBody themeVariation={themeVariation}>{body}</ItemBody>
    </>
  );
};

export { ItemSubtitle, ItemBody };

export default SubtitleWithBody;
