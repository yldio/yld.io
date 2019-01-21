import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Col } from '../grid'
import { Padding, Margin } from 'styled-components-spacing'
import theme from '../../utils/theme'
import { Paragraph } from '../Typography'
import darkIcon from '../../images/button-play-dark.svg'
import lightIcon from '../../images/button-play-light.svg'

const Wrapper = styled(Col)`
  ${breakpoint('smallTablet')`
    &:nth-child(3) {
        display: none;
    }
  `}

  ${breakpoint('tablet')`
    &:nth-child(3) {
      display: flex;
    }
  `}
`
const PlayIcon = styled.img`
  height: ${theme.spacing[2]};
  width: ${theme.spacing[2]};
  max-height: ${theme.spacing[2]};
  max-width: ${theme.spacing[2]};
`
const TruncatedParagraph = styled(Paragraph)`
  max-height: 3rem;
  overflow: hidden;
  color: ${props => props.color};
  opacity: ${props => props.opacity};

  @supports (-webkit-line-clamp: 2) {
    max-height: none;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Link = styled.a`
  display: block;
`
const Content = styled.div`
  display: flex;
`
const getColorBasedOnBackground = bg => {
  switch (bg) {
    case 'dark':
      return {
        opacity: 0.5,
        useLightIcon: true,
        color: theme.colors.white
      }
    case 'white':
    case 'grey':
    default:
      return {
        opacity: 1,
        useLightIcon: false,
        color: theme.colors.text
      }
  }
}

const CompactVideoLink = ({ children, href, bg = 'white', ...props }) => {
  const { opacity, useLightIcon, color } = getColorBasedOnBackground(bg)

  return (
    <Wrapper width={[1, 1, 1, 1, 6 / 12, 4 / 12]}>
      <Margin vertical={{ smallPhone: 1.5, smallTablet: 0 }}>
        <Padding vertical={1}>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={href}
            color={color}
            opacity={opacity}
            {...props}
          >
            <Content>
              <Margin right={1.5}>
                <PlayIcon
                  src={useLightIcon ? lightIcon : darkIcon}
                  alt="Play button"
                />
              </Margin>
              <TruncatedParagraph color={color} opacity={opacity} noMargin>
                {children}
              </TruncatedParagraph>
            </Content>
          </Link>
        </Padding>
      </Margin>
    </Wrapper>
  )
}

export default CompactVideoLink
