import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import ConferenceCard from '../src/components/Events/ConferenceCard'
import { Grid } from '../src/components/grid'

addDecorator(Theme)

const conferance = {
  status: 'Upcoming',
  date: '21 August 2019',
  eventName: 'GraphQL helps rockstar developers',
  address: 'London',
  blurb:
    'GraphQL is an easy way to consume information. It is great. It can do CRUD. It is a perfect tool for rockstar devleopers. This conferencec will feature a number of excellent talks from GraphQL gurus who will show you their tips and tricks to get the best experience possible',
  homepage: 'www.event.com',
  ctaLink: 'www.event.com/tickets',
  image: {
    fluid: {
      base64:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAB6VBMVEUEGT0EGDwEGDsEFzoEFzkEFjgEFjcEFTYEFTUEFTQEFDMDFDIDEzEDEzADEi8DEi4DES0FGj4FGT4EFjYDES4FGj8FG0AFGkADEjAFG0EYJX0PIGwPIGsOIGoOH2oNHWMEFzgFHEIpLrUB47wA6r4IpKsDEzIFHEMD3cELvMgEGDoFHUQGyL8IubsSlcsB5r8SI0IkM1AoNlIfLkofLUkFHUUaZcoQEHoRbLAIuL0Sns8LeqEEGTwPIUIaK0oFFzgQIUAEFDQFHkZYfc8tL3hGYb1XZrdaidJUg7hLWnVKWXQUMFcFIEUiM1IYJ0UFHkeZqchocYKdqLGClaRve59+ia2ltM2fsrxVb40MNXMfOVkQI0QiMU4MHDwFH0gpLraSorxfbHzF0dXL1dnc6Onm9PS4y9vH0tjY5OY1t6YDT14NHz8ZKkgGH0kqLrZAlpg0jJM6ua9AnphGrKJXtbxPZ35CW3JFYno2eogiQ14fMlIfMVEfMVA4R2IsPFgtO1cGIEoIpKwFG0IkNlcGIEspL7QMgqULhaYOYZgFHEQaLlAOI0YGIUwHIU8HIE4HH00HH0wGHksGHkoGHUgdMVMfMlMfMVIeMVEeMFAeME8GIU0GH0oFHkgFHUYGIk4GIEwGIk8GI1AGIU6GIVpLAAAACXBIWXMAABcRAAAXEQHKJvM/AAAAB3RJTUUH4wEZDwsueAthEAAAATRJREFUGNNjZGBgRAMMDMyCXN8ZwIDnF4RmYP3HzMvEARH9BRP9y8rMw8SIJsr9g4WZkYWRC2jSEwbpZ7xfQYJfeFg4wEYzMP5neCIDEZV+xsTGwMDCCmT+/6/2ROoz9////59IsbD85mRkZPvK8J/hhsYtGQGwm1i4voNM5GZ8+876mIYwkHmC0YKF9y0v2MnmjIxe27y3g8zlZeFl4IX7JYJR7ZbMszBGFn5bJB9eApqbzjiLMRfd50DMIvxuC8idscuip//N7Xtvc0zjFgNjC9TxjPOipxcytoFEbzL2QLUtCpn360c1VP+sTz8YxC/pb/abARL9+/8PUC3jvD+fhJ9CRL/9gYoyMbHw/ZZ+qXfRd1MGFwsbBzDQBI8wBwJ9/kvgufIlu80M//8yMv77z8QOAHJeb6gXDUlSAAAAAElFTkSuQmCC',
      aspectRatio: 1,
      src:
        '//images.ctfassets.net/22g1lenhck4z/18KTBFOFsaIE6gcMQQMWkk/792ebef4cd9b995618b11aa8d09bd56c/trainline_export__1_.png?w=600&q=50',
      srcSet:
        '//images.ctfassets.net/22g1lenhck4z/18KTBFOFsaIE6gcMQQMWkk/792ebef4cd9b995618b11aa8d09bd56c/trainline_export__1_.png?w=150&h=150&q=50 150w,\n//images.ctfassets.net/22g1lenhck4z/18KTBFOFsaIE6gcMQQMWkk/792ebef4cd9b995618b11aa8d09bd56c/trainline_export__1_.png?w=300&h=300&q=50 300w,\n//images.ctfassets.net/22g1lenhck4z/18KTBFOFsaIE6gcMQQMWkk/792ebef4cd9b995618b11aa8d09bd56c/trainline_export__1_.png?w=550&h=550&q=50 550w',
      srcWebp:
        '//images.ctfassets.net/22g1lenhck4z/18KTBFOFsaIE6gcMQQMWkk/792ebef4cd9b995618b11aa8d09bd56c/trainline_export__1_.png?w=600&q=50&fm=webp',
      srcSetWebp:
        '//images.ctfassets.net/22g1lenhck4z/18KTBFOFsaIE6gcMQQMWkk/792ebef4cd9b995618b11aa8d09bd56c/trainline_export__1_.png?w=150&h=150&q=50&fm=webp 150w,\n//images.ctfassets.net/22g1lenhck4z/18KTBFOFsaIE6gcMQQMWkk/792ebef4cd9b995618b11aa8d09bd56c/trainline_export__1_.png?w=300&h=300&q=50&fm=webp 300w,\n//images.ctfassets.net/22g1lenhck4z/18KTBFOFsaIE6gcMQQMWkk/792ebef4cd9b995618b11aa8d09bd56c/trainline_export__1_.png?w=550&h=550&q=50&fm=webp 550w',
      sizes: '(max-width: 600px) 100vw, 600px'
    },
    title: 'Trainline case study featured image ',
    file: {
      url:
        '//images.ctfassets.net/22g1lenhck4z/18KTBFOFsaIE6gcMQQMWkk/792ebef4cd9b995618b11aa8d09bd56c/trainline_export__1_.png'
    }
  }
}

storiesOf('Conference Card', module).add('Conference Card', () => {
  return (
    <Grid style={{ width: '100%' }}>
      <ConferenceCard conferance={conferance} />
    </Grid>
  )
})
