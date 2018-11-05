import React, { Component, Fragment } from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Padding } from 'styled-components-spacing'
import NetlifyForm from 'react-netlify-form'
// eslint-disable-next-line
import styled, { withComponent } from 'styled-components'
import Layout from '../components/layout'
import { H1, Paragraph, H5 } from '../components/Typography'
import Map from '../components/map'
import Locations from '../components/locations'
import { Margin } from 'styled-components-spacing/dist/cjs/Margin'

const Node = styled.span`
  display: block;
  margin-bottom: 6px;
`

const Input = styled.input`
  padding: 12px 6px;
  width: 70%;
  margin-bottom: 24px;
`

const Label = Node.withComponent('label')
const Textarea = styled(Input)``

const Button = styled.button`
  border: 0;
  display: block;
  padding: 12px;
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.text};
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
        <Row>
          <Col xs={12}>
            <Margin top={2}>
              <NetlifyForm name="Contact Form">
                {({ loading, error, success }) => (
                  <div>
                    {loading && <div>Loading...</div>}
                    {error && (
                      <div>
                        Your information was not sent. Please try again later.
                      </div>
                    )}
                    {success && <div>Thank you for contacting us!</div>}
                    {!loading &&
                      !success && (
                      <Fragment>
                        <input
                          type="hidden"
                          name="Contact Form"
                          value="contact"
                        />
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          name="Name"
                          placeholder="John Doe"
                          required
                        />
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="example@example.com"
                          required
                        />
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" name="Message" required />
                        <Button>Submit</Button>
                      </Fragment>
                    )}
                  </div>
                )}
              </NetlifyForm>
            </Margin>
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
