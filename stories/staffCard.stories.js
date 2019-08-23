import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import TableComponent from './TableComponent'
import { Grid, Row } from '../src/components/grid'
import StaffCard from '../src/components/AboutUs/StaffCard'
import logo from '../src/images/favicon.png'
import twitter from '../src/images/twiter-icon.svg'
import linkedin from '../src/images/linkedin-icon.svg'

addDecorator(Theme)

const TableComponentWithDescriptions = props => {
  const descriptions = {
    name: 'Name of the person',
    image: 'Object of { file : { url: "urlpath" } } | URL to image',
    role: 'Role of the person',
    description: 'Introduction of the person',
    socialLinks: "Person's social links"
  }
  return <TableComponent {...props} descriptions={descriptions} />
}

storiesOf('About Us Page Components', module)
  .add(
    'StaffCard',
    () => {
      return (
        <Grid>
          <Row>
            <StaffCard
              image={{
                file: {
                  url: logo
                }
              }}
              name="Nuno Job"
              role="Chief Executive Officer"
              description="Nuno is the founder and CEO of YLD Group. Previously he was the Chief Commercial Officer at Nodejitsu, where he was responsible for the world's largest Node.js cloud, providing extensive contributions to the success of Node.js. Nuno's formative work years were spent in the USA at IBM Research and MarkLogic. He is also a proud Stanford alumni."
              socialLinks={[
                {
                  name: 'twitter',
                  image: { file: { url: twitter } },
                  url: 'twitter.com/etc'
                },
                {
                  name: 'linkedin',
                  image: { file: { url: linkedin } },
                  url: 'linkedin.com/etc'
                }
              ]}
            />
          </Row>
        </Grid>
      )
    },
    {
      props: {
        TableComponent: TableComponentWithDescriptions
      }
    }
  )
  .add(
    'Multiple StaffCards',
    () => {
      const Sc = (
        <StaffCard
          image={{
            file: {
              url: logo
            }
          }}
          name="Nuno Job"
          role="Chief Executive Officer"
          description="Nuno is the founder and CEO of YLD Group. Previously he was the Chief Commercial Officer at Nodejitsu, where he was responsible for the world's largest Node.js cloud, providing extensive contributions to the success of Node.js. Nuno's formative work years were spent in the USA at IBM Research and MarkLogic. He is also a proud Stanford alumni."
          socialLinks={[
            {
              name: 'twitter',
              image: { file: { url: twitter } },
              url: 'twitter.com/etc'
            },
            {
              name: 'linkedin',
              image: { file: { url: linkedin } },
              url: 'linkedin.com/etc'
            }
          ]}
        />
      )

      return (
        <Grid>
          <Row>
            {Sc}
            {Sc}
            {Sc}
            {Sc}
            {Sc}
          </Row>
        </Grid>
      )
    },
    {
      props: {
        TableComponent: TableComponentWithDescriptions
      }
    }
  )
