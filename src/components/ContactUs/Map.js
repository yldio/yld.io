import React from 'react'
import { generate } from 'shortid'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import RatioContainer from '../Common/RatioContainer'
import MapMarker from './Marker'
import mapStyles from './mapStyles'
import getLatLngMidpoint from '../../utils/getLatLngMidpoint'

const StyledRatioContainer = styled(RatioContainer)`
  > * {
    position: absolute !important;
  }
`

const Map = ({ locations }) => {
  return (
    <StyledRatioContainer width={3} height={2}>
      <GoogleMapReact
        center={getLatLngMidpoint(locations)}
        options={{
          styles: mapStyles,
        }}
        bootstrapURLKeys={{
          key: 'AIzaSyBKK8Yx8_oj20eSw4pqnsflHrEsTHjnG5k',
        }}
        defaultZoom={5}
      >
        {locations &&
          locations.map(({ lat, lng }) => (
            <MapMarker key={generate()} lat={lat} lng={lng} />
          ))}
      </GoogleMapReact>
    </StyledRatioContainer>
  )
}

export default Map
