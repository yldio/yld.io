import React from 'react'
import { Link } from 'gatsby'
import { Row, Col } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import { H2, Paragraph, H3, H6 } from '../components/Typography'
import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <Row>
      <Col xs={5}>
        <H2>Moving Trainline beyond legacy</H2>
        <Paragraph>
          YLD wrapped the platforms in an efficient and scalable Node.js layer
          contributing to an enhanced user experience.
        </Paragraph>
        <Link to={'/'}>Learn More</Link>
      </Col>
      <Col xs={6} xsOffset={1}>
        <Flex center full style={{ background: '#03112d' }} />
      </Col>
    </Row>
    <Padding bottom={6} />
    <Padding bottom={4} />
    <Row>
      <Col xs={10}>
        <H3>
          We help our clients move from a culture of delivery to a culture of
          learning through our expertise in{' '}
          <Link to={'/'}>software engineering</Link>,{' '}
          <Link to={'/'}>design</Link>, <Link to={'/'}>training</Link> and{' '}
          <Link to={'/'}>open-source</Link>.
        </H3>
      </Col>
    </Row>
    <Padding bottom={4} />
    <Row>Clients</Row>
    <Padding bottom={5} />
    <Row>
      <Col xs={6}>
        <H2>Engineering</H2>
        <Paragraph>
          We modernise both practices and software. Applying expertise in a
          range of programming languages and an inherent culture of innovation.
        </Paragraph>
        <Row>
          <Col xs={7}>
            <H6>
              Node.js / React.js / React Native / Kubernetes / GraphQL / Vue.js
              / TypeScript
            </H6>
          </Col>
        </Row>
        <Link to={'/'}>Learn More</Link>
        <Padding bottom={2} />
        CARD
      </Col>
      <Col xs={6}>
        <Padding top={7} />
        <H2>Design</H2>
        <Paragraph>
          We create with you, not for you. Guiding your product together towards
          beautiful, functional longevity.
        </Paragraph>
        <Row>
          <Col xs={7}>
            <H6>
              Product strategy / UX/UI / Visual design / Design systems and
              Brand design
            </H6>
          </Col>
        </Row>
        <Link to={'/'}>Learn More</Link>
        <Padding bottom={2} />
        CARD
      </Col>
    </Row>

    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
)

export default IndexPage
