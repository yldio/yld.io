import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import AboutUsHero from '../src/components/AboutUs/AboutUsHero'
import ClientTestimonial from '../src/components/AboutUs/ClientTestimonial'
import Partners from '../src/components/AboutUs/Partners'
import StaffCard from '../src/components/AboutUs/StaffCard'
import Subsidiaries from '../src/components/AboutUs/Subsidiaries'
import {
  statements,
  clientTestimonial,
  partners,
  teamMember,
  subsidiaries
} from './assets/about-us-data.js'

addDecorator(Theme)

storiesOf('AboutUs', module)
  .add('AboutUsHero', () => <AboutUsHero {...statements} />)
  .add('ClientTestimonial', () => <ClientTestimonial {...clientTestimonial} />)
  .add('Partners', () => <Partners {...partners} />)
  .add('StaffCard', () => <StaffCard {...teamMember} />)
  .add('Subsidiaries', () => <Subsidiaries {...subsidiaries} />)
