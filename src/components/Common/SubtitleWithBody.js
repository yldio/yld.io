import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Subtitle, BodyPrimary } from '../Typography';
import theme from '../../utils/theme';

const ItemBody = styled(BodyPrimary).attrs({
  noPaddingTop: true,
  muted: props => props.themeVariation === theme.variations.dark,
  reverse: props => props.themeVariation === theme.variations.dark,
})`
  > a {
    text-decoration: underline;
  }
`;

const ItemSubtitle = styled(Subtitle).attrs({
  reverse: props => props.themeVariation === theme.variations.dark,
})`
  padding-bottom: 0;
`;

const SubtitleWithBody = ({ subtitle, body, themeVariation = 'white' }) => (
  <Fragment>
    <ItemSubtitle themeVariation={themeVariation}>{subtitle}</ItemSubtitle>
    <ItemBody themeVariation={themeVariation}>{body}</ItemBody>
  </Fragment>
);

export { ItemSubtitle, ItemBody };

export default SubtitleWithBody;
