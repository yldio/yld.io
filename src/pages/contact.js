import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import { navigate } from '@reach/router'

import { Grid, Row, Col } from '../components/grid'
import Layout from '../components/layout'
import Head from '../components/Common/Head'
import TitleSection from '../components/ContactUs/TitleSection'
import GreyBackground from '../components/Common/GreyBackground'
import ThankYouMessage from '../components/ContactUs/ThankYouMessage'
import AreasOfInterest from '../components/ContactUs/AreasOfInterest'
import { Checkbox, Input, Label, Field } from '../components/Common/Forms'
import Button from '../components/Common/Button'

const encode = data =>
  Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')

const LinkUnderline = styled(Link)`
  text-decoration: underline;
`

const getBranch = branch => {
  switch (branch) {
    case 'community':
      return (
        <Fragment>
          <p>community</p>
        </Fragment>
      )

    default:
      return (
        <Fragment>
          <p>engineering</p>
        </Fragment>
      )
  }
}

// NOT CHANGED TO HOOKS BECAUSE YOU DONT WIN ANYTHING
class ContactUs extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    submitting: false,
    triedSubmitting: false
  }

  handleChangeCheckbox = (e, branch) => {
    const target = e.target
    this.setState(prevState => ({
      ...prevState,
      [target.name]: {
        checked: target.checked,
        branch: branch
      }
    }))
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ submitting: true })

    const strippedState = Object.assign({}, this.state)
    delete strippedState.name
    delete strippedState.email
    delete strippedState.message
    delete strippedState.submitting
    delete strippedState.triedSubmitting
    delete strippedState.privacy

    // if you tick and untick a field, it remains in state as 'false'; we want ot filter those out
    const strippedFilteredState =
      Object.keys(strippedState).length > 0
        ? Object.keys(strippedState).filter(item => {
            return strippedState[item]
          })
        : []

    const branches =
      strippedFilteredState.length > 0
        ? strippedFilteredState.reduce((acc, current) => {
            return (acc = [...acc, this.state[current].branch])
          }, [])
        : ['engineering']

    const uniqueBranches = Array.from(new Set(branches))

    const chosenBranch =
      uniqueBranches.length > 1 ? 'engineering' : uniqueBranches[0]

    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encode({
        'form-name': 'contact',
        ...this.state
      })
    }).then(() => {
      this.setState({ success: true, submitting: false, branch: chosenBranch })
      navigate(`?branch=${chosenBranch}`, {
        replace: true
      })
      window.scrollTo(0, 0)
    })
  }

  handleButtonClick = () => {
    this.setState({ triedSubmitting: true })
  }

  render() {
    const { name, email, message, submitting, success, branch } = this.state
    const {
      location,
      data: {
        contentfulPage: {
          title,
          slug,
          seoTitle,
          seoMetaDescription,
          titleNotContacted,
          titleContacted,
          labelInterests,
          interests,
          labelYourMessage,
          labelYourName,
          labelYourEmail,
          privacyPolicyText,
          privacyPolicyLinkText,
          statusNotSent,
          statusSent,
          successMessage
        }
      }
    } = this.props

    return (
      <Layout location={location}>
        <Head page={{ title, slug, seoTitle, seoMetaDescription }} />
        <form
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
          style={{ width: '100%' }}
        >
          <input type="hidden" name="form-name" value="contact" />
          <TitleSection title={success ? titleContacted : titleNotContacted} />
          <GreyBackground>
            <Grid>
              <Padding
                top={{ smallPhone: 3, tablet: 4 }}
                bottom={{ smallPhone: 3.5, tablet: 5 }}
              >
                {success ? (
                  // call a function getBranch, written outside the class, to show the correct branch
                  <Fragment>
                    <ThankYouMessage message={successMessage} />
                    {getBranch(branch)}
                  </Fragment>
                ) : (
                  <Fragment>
                    <AreasOfInterest
                      title={labelInterests}
                      interests={interests}
                      onChange={this.handleChangeCheckbox}
                    />
                    <Row>
                      <Col width={[1, 1, 1, 1, 8 / 12, 8 / 12, 7 / 12]}>
                        <Label htmlFor="message">{labelYourMessage}</Label>
                        <Input
                          as="textarea"
                          noBoxShadow={!this.state.triedSubmitting}
                          rows="4"
                          value={message}
                          onChange={this.handleChange}
                          id="message"
                          name="message"
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col width={[1, 1, 1, 1, 8 / 12, 8 / 12, 5 / 12]}>
                        <Label htmlFor="name">{labelYourName}</Label>
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          value={name}
                          onChange={this.handleChange}
                          required
                        />
                        <Label htmlFor="email">{labelYourEmail}</Label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          value={email}
                          onChange={this.handleChange}
                          required
                        />
                        <Field>
                          <section key="privacy">
                            <Checkbox
                              required
                              type="checkbox"
                              id="privacy"
                              name="privacy"
                              onChange={this.handleChangeCheckbox}
                            />
                            <label htmlFor="privacy">
                              {privacyPolicyText}
                              <LinkUnderline
                                to={'/privacy-policy'}
                                title="yld Privacy Policy"
                              >
                                {privacyPolicyLinkText}
                              </LinkUnderline>
                            </label>
                          </section>
                        </Field>
                        <Button
                          onClick={this.handleButtonClick}
                          type="submit"
                          disabled={submitting}
                        >
                          {submitting ? statusSent : statusNotSent}
                        </Button>
                      </Col>
                    </Row>
                  </Fragment>
                )}
              </Padding>
            </Grid>
          </GreyBackground>
        </form>
      </Layout>
    )
  }
}

const Contact = props => (
  <StaticQuery
    query={graphql`
      query {
        contentfulPage(slug: { eq: "contact" }) {
          title
          slug
          seoTitle
          seoMetaDescription
          titleNotContacted
          titleContacted
          labelInterests
          interests {
            label
            name
            branch
          }
          labelYourMessage
          labelYourName
          labelYourEmail
          privacyPolicyText
          privacyPolicyLinkText
          statusNotSent
          statusSent
          successMessage
        }
      }
    `}
    render={data => <ContactUs data={data} {...props} />}
  />
)

export default Contact
