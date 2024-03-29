import React from 'react';
import styled from 'styled-components';
import BodyStylised from '../../Typography/BodyStylised';
import remcalc from 'remcalc';
import Subtitle from '../../Typography/Subtitle';
import Hr from '../Hr';
import ExternalAnchor from '../ExternalAnchor';

const StyledHr = styled(Hr)`
  margin-top: ${remcalc(30)};
  border-color: rgba(255, 255, 255, 0.5);
`;

const Wrapper = styled.div`
  ${({ theme, isImage }) =>
    isImage ? `` : `padding-bottom: ${theme.space[3]};`}
`;

const Ellipsis = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledBodyStylised = styled(BodyStylised)`
  color: ${({ isDark, theme }) => (isDark ? theme.colors.white : null)};
  opacity: ${({ isDark }) => (isDark ? 0.5 : null)};
`;

/**
 *
 * Repo component is used within RepoWithImage component, having
 * an anchor as a parent of another anchor is a no no and write a
 * warning to the console. Passing a conditional link allows us to
 * conditionally render an external anchor or not.
 *
 */
const ConditionalLink = ({ titleLink, url, children }) =>
  titleLink ? <ExternalAnchor href={url}>{children}</ExternalAnchor> : children;

const Repo = ({
  url,
  nameWithOwner,
  yldContributionsCount,
  starCount,
  isImage = false,
  titleLink = true,
  theme,
}) => {
  const isDark = theme === 'dark';
  return (
    <Wrapper isImage={isImage}>
      <ConditionalLink titleLink={titleLink} url={url}>
        <Subtitle noPaddingBottom reverse={isDark} noPaddingTop={isImage}>
          <Ellipsis>{nameWithOwner}</Ellipsis>
        </Subtitle>
      </ConditionalLink>
      {yldContributionsCount !== null && (
        <Ellipsis>
          <StyledBodyStylised noPadding isDark={isDark} small={isImage}>
            {yldContributionsCount} Contributions
          </StyledBodyStylised>
        </Ellipsis>
      )}
      <StyledBodyStylised noPadding isDark={isDark} small={isImage}>
        {starCount} Stars
      </StyledBodyStylised>
      {!isImage && <StyledHr short />}
    </Wrapper>
  );
};

export default Repo;
