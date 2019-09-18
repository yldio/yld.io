import React from 'react'
import { generate } from 'shortid'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import RatioContainer from '../Common/RatioContainer'
import Marker from './Marker'
import mapStyles from './mapStyles'
const StyledRatioContainer = styled(RatioContainer)`
  > * {
    position: absolute !important;
  }
`

const Map = ({ locations }) => (
  <StyledRatioContainer width={3} height={2}>
    <GoogleMapReact
      center={{ lat: 51.48431530675587, lng: -0.1216834827836015 }}
      options={{
        styles: mapStyles
      }}
      bootstrapURLKeys={{
        key: 'AIzaSyBKK8Yx8_oj20eSw4pqnsflHrEsTHjnG5k'
      }}
      defaultZoom={10}
    >
      {locations &&
        locations.map(({ lat, lng }) => (
          <Marker key={generate()} lat={lat} lng={lng} />
        ))}
    </GoogleMapReact>
  </StyledRatioContainer>
)

export default Map
