import React, { Component } from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'
import Layout from '../components/layout'
import styled from 'styled-components'
import { H1, Paragraph, H5 } from '../components/Typography'
import Map from '../components/map'
import Locations from '../components/Locations'
import { Padding } from 'styled-components-spacing'

const Node = styled.span`
  display: block;
  margin-bottom: 6px;
`

const mapProps = center => ({
  options: {
    center,
    zoom: 17
  },
  onMount: map => {
    // eslint-disable-next-line
    new window.google.maps.Marker({
      position: center,
      map,
      title: 'Europe'
    })
  }
})

class ContactUs extends Component {
  componentDidMount () {
    if (!window.google) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyDMpDkPdvwEG9mxQ3sA6vaKrq64V7trj_4`
      const headScript = document.getElementsByTagName('script')[0]
      headScript.parentNode.insertBefore(script, headScript)
    }
  }

  render () {
    return (
      <Layout>
        <Row>
          <Col xs={12}>
            <H1>Get in Touch</H1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={9}>
            <Paragraph>
              Do you have a project that you think we can help with? <br />
              Get in touch at <a href="mailto:hello@yld.io">hello@yld.io</a> or
              using the form below{' '}
            </Paragraph>
          </Col>
        </Row>
        <Padding bottom={5} />
        <Row>
          <Locations>
            {locations =>
              locations.map(location => (
                <Col sm={12} md={6} key={location.node.id}>
                  <Padding bottom={3}>
                    <H5 bold>{location.node.name}</H5>
                    <Paragraph style={{ minHeight: 87 }}>
                      {location.node.streetAddress.streetAddress
                        .split('\n')
                        .map(address => (
                          <Node key={address}>{address}</Node>
                        ))}

                      <Node>{location.node.telephone}</Node>
                    </Paragraph>
                    <Padding top={1}>
                      <Map
                        id={location.node.id}
                        {...mapProps({
                          lat: location.node.mapLocation.lat,
                          lng: location.node.mapLocation.lon
                        })}
                      />
                    </Padding>
                  </Padding>
                </Col>
              ))
            }
          </Locations>
        </Row>
      </Layout>
    )
  }
}
export default ContactUs
