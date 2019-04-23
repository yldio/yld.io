import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'

const StyledSVG = styled.svg`
  height: ${remcalc(48)};
  width: ${remcalc(48)};

  @media screen and (min-width: 960px) {
    height: ${remcalc(54)};
    width: ${remcalc(54)};
  }
`

const ServiceSpecialityLogo = ({
  backgroundColor,
  textColor,
  hoverBackgroundColor
}) => (
  <StyledSVG
    viewBox="0 0 54 54"
    onMouseEnter={e =>
      hoverBackgroundColor
        ? e.target.setAttribute('fill', hoverBackgroundColor)
        : e.target.setAttribute('opacity', 0.5)
    }
    onMouseLeave={e =>
      hoverBackgroundColor
        ? e.target.setAttribute('fill', backgroundColor || '#333333')
        : e.target.removeAttribute('opacity')
    }
  >
    <title>service speciality logo</title>
    <g id="yld-service-speciality-logo" stroke="none" fill="none">
      <g id="Logo-group">
        <rect
          id="Logo-rectangle"
          fill={backgroundColor || '#333333'}
          x="0"
          y="0"
          width="54"
          height="54"
        />
        <path
          d="M16.8201464,23.2905974 C18.4977896,23.2905974 19.8575263,21.9304179 19.8575263,20.2527747 C19.8575263,18.5751314 18.4977896,17.2153947 16.8201464,17.2153947 C15.1425032,17.2153947 13.7823237,18.5751314 13.7823237,20.2527747 C13.7823237,21.9304179 15.1425032,23.2905974 16.8201464,23.2905974 L16.8201464,23.2905974 Z M38.4789676,28.2522416 C38.4789676,26.5768122 37.1165743,25.2144189 35.4415877,25.2144189 C33.7666011,25.2144189 32.403765,26.5768122 32.403765,28.2522416 C32.403765,29.9267854 33.7666011,31.2896215 35.4415877,31.2896215 C37.1165743,31.2896215 38.4789676,29.9267854 38.4789676,28.2522416 L38.4789676,28.2522416 Z M42.557735,16 L42.557735,35.1881828 L38.5073047,35.1881828 L38.5073047,34.6325105 C37.5779373,35.0810332 36.5409776,35.339609 35.4415877,35.339609 C31.5332856,35.339609 28.3537775,32.1601009 28.3537775,28.2522416 C28.3537775,24.3434967 31.5332856,21.1639886 35.4415877,21.1639886 C36.5409776,21.1639886 37.5779373,21.4230072 38.5073047,21.8715299 L38.5073047,16 L42.557735,16 Z M28.3537775,16 L28.3537775,28.2522416 L28.3537775,35.1881828 L24.3033473,35.1881828 L24.3033473,23.7931376 L16.8205892,40.632 L12.388494,40.632 L14.6244661,35.6003986 L9,23.2905974 L13.453348,23.2905974 L16.8201464,30.6595644 L20.0948493,23.2905974 L24.3033473,23.2905974 L24.3033473,16 L28.3537775,16 Z"
          id="Logo-fill"
          fill={textColor || '#FFFFFF'}
        />
      </g>
    </g>
  </StyledSVG>
)

export default ServiceSpecialityLogo
