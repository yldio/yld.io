import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import GetInTouch from '../src/components/Common/GetInTouch'

addDecorator(Theme)

const profileProps = {
  id: '9621d712-b52c-57a5-98a7-621a5657a260',
  person: {
    name: 'Nick Osborn',
    footerRole: 'Talent Manager',
    emailAddress: 'nick@yld.io',
    description: {
      description:
        'Nick oversees our talent requisition, ensuring the YLD has excellent people onboard by brining the right talent to our growing team of expert engineers and designers.'
    },
    image: {
      title: 'Nick Image',
      fluid: {
        base64:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAABcRAAAXEQHKJvM/AAAAB3RJTUUH4wkMCDgW9ppGVwAABElJREFUOMsFwVtvFFUAAOBzzpy578zsdHdmr6WhZUGBAtYIBpWgJkLxBR64ibcH1MQH/TUaY4zBoMbEEBKDMRbUYAzWh7ZArVsotNuWsu1Sprs7Ozu3c/H7YGnQ0S25vRFKKrIcCQLY8SKacM6gnMGKJoZdAgWORU4oFEWBMhr3iYARFrGQK1pRNxUEqFsYIgQ5AxBiAWMopoSmMWGMZ10RY6QZOsacEZbGjMYMACAYlo4EkK9aAyUdSzB8yjJcHx0aHttV87wgJok2AN2SnneLreYWZ0SQIEkZhBAwhDkFxWGr64VBJ+R9IBDRKdtxFCdhpAhYFzXd7q+v+FHQY4zZJdnbCBnlCEGSUsF2Tc6ovxnFfSpj+dXnDpx7c/y906ePHTtuqXJ7qw2M3tpSJOtSGtO4TzgFgANOoWrKwtjR3YxTWZUZpbkB89ThI3uHh61cXrOzhVLZNrQfr/3FIE9CwimAAOoDiMaQpiCJiDA0UmmtPNUtzcwpUgbBQHLzuX+mb+dsy3Vyg4XSnYXZHvQQFhRdKo/o/TZJQgY4EBWMHs4tU8YHHCeNWHOp4/tBysCe4e2GgIjfhrLYaG10mlQSJUnG60th3OdpwhAG2YKG3cEsJaTnt7xWR9Gxa5uCKIqi8HD1kWvJ08urW92OXcwohtT1eiSmHAG7aDKeyIosbN9VMS3FsrOKnoY94vtBr7W1Z8fwSvPR3P26VSo9RX7Oyfe8CMEYilCUxXzZclwlTlO01ngSBMxrbQEIsSJ1cJRz7IyeAZB63eDw3jHqaXPT88UhTc4IfT9FEG6uthf/81brnmDnDJrS5upWeyOCHGWycrMVLi4vRlFy4cz5dYJVo6pphsj0BwtL1e3lbrsTBkkUpLopCrKsUEI5BYIIRVl0C9tEbr7x8ouHDoz9NHn3h2t/1Gq1mzcnx0+cfOng69NTk05VSmI69EzOMHXBLdkkYYDz4ZGd2wZHy25NNewjR15pdkOf4U8/+VBRJCNjnRh/zXVdUXR4Cu7V62ZW5wSifiehCYcQvnXuozTi+0ZHF+brX1y+8ufUnGVmFx40Ll36XpJwzw9mZ+eftDbfPvvxgF15vOQ9qDcRwoBzYGazExM3Ar97e2ZmudEgKZmb+1dTtZ+v/Tp56+8kIbduTX32+ZeVUmnP3pELZ9/vdWKacMwZgBCahqMq2sUPLlJKK9XBQ4cOztfrx48dVVVp9+5nT50cn7j++zvvnltcaNy/3ygUtyEkpJQgSgBCwDAtAKHj5Ovz99bWHt+ZnaWMtZ5sNpaXVVWxrEzWshYfLl29crVeX5yeuisrCoQAZ11FNYR+P5i9OzNx3f3u8rduodButwUEDd36+qtvisUChOjGb9d7fvD8wRf2je4iJFJ+sbo8wIwA73FU3Z+XxUTV1P0H9pcqVTtrZXRdyyjVaqW2s4YQXF15dP78GUlSdtSGwiislIudzfX/AVpAJfBS2j6IAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==',
        aspectRatio: 0.9970238095238095,
        src:
          '//images.ctfassets.net/22g1lenhck4z/6TJmhMdsGxLNVTridSk0lL/01f0437c2fdd505786f6d24d573a2a06/nick-update.png?w=500&q=50',
        srcSet:
          '//images.ctfassets.net/22g1lenhck4z/6TJmhMdsGxLNVTridSk0lL/01f0437c2fdd505786f6d24d573a2a06/nick-update.png?w=125&h=125&q=50 125w,\n//images.ctfassets.net/22g1lenhck4z/6TJmhMdsGxLNVTridSk0lL/01f0437c2fdd505786f6d24d573a2a06/nick-update.png?w=250&h=251&q=50 250w,\n//images.ctfassets.net/22g1lenhck4z/6TJmhMdsGxLNVTridSk0lL/01f0437c2fdd505786f6d24d573a2a06/nick-update.png?w=500&h=501&q=50 500w,\n//images.ctfassets.net/22g1lenhck4z/6TJmhMdsGxLNVTridSk0lL/01f0437c2fdd505786f6d24d573a2a06/nick-update.png?w=670&h=672&q=50 670w',
        srcWebp:
          '//images.ctfassets.net/22g1lenhck4z/6TJmhMdsGxLNVTridSk0lL/01f0437c2fdd505786f6d24d573a2a06/nick-update.png?w=500&q=50&fm=webp',
        srcSetWebp:
          '//images.ctfassets.net/22g1lenhck4z/6TJmhMdsGxLNVTridSk0lL/01f0437c2fdd505786f6d24d573a2a06/nick-update.png?w=125&h=125&q=50&fm=webp 125w,\n//images.ctfassets.net/22g1lenhck4z/6TJmhMdsGxLNVTridSk0lL/01f0437c2fdd505786f6d24d573a2a06/nick-update.png?w=250&h=251&q=50&fm=webp 250w,\n//images.ctfassets.net/22g1lenhck4z/6TJmhMdsGxLNVTridSk0lL/01f0437c2fdd505786f6d24d573a2a06/nick-update.png?w=500&h=501&q=50&fm=webp 500w,\n//images.ctfassets.net/22g1lenhck4z/6TJmhMdsGxLNVTridSk0lL/01f0437c2fdd505786f6d24d573a2a06/nick-update.png?w=670&h=672&q=50&fm=webp 670w',
        sizes: '(max-width: 500px) 100vw, 500px'
      },
      file: {
        url:
          '//images.ctfassets.net/22g1lenhck4z/6TJmhMdsGxLNVTridSk0lL/01f0437c2fdd505786f6d24d573a2a06/nick-update.png'
      }
    },
    socialLinks: [
      {
        name: 'Nick Osborn LinkedIn',
        url: 'https://www.linkedin.com/in/osbornnick/',
        image: {
          title: 'LinkedIn Icon',
          fluid: {
            base64: null,
            aspectRatio: null,
            src: null,
            srcSet: null,
            srcWebp: null,
            srcSetWebp: null,
            sizes: null
          },
          file: {
            url:
              '//images.ctfassets.net/22g1lenhck4z/3uuYxyNek0bMtaGIwoXFei/586067fb0cf887cbf18bcb12588bda71/linkedin-icon.svg'
          }
        }
      }
    ]
  },
  title: 'Want to talk to someone about this?',
  personCopyTitle: 'Why reach out to Nick?',
  personCopy: {
    personCopy:
      'Nick oversees our talent requisition, ensuring the YLD has excellent people onboard by brining the right talent to our growing team of expert engineers and designers.'
  },
  personCtaCopy: 'Something else you want to chat about?',
  personCtaLinkUrl: 'contact',
  personCtaLinkCopy: 'Get in touch',
  genericCopy: null,
  genericCtaUrl: null,
  genericCtaText: null,
  ctaText: 'Get in touch'
}

const genericProps = {
  id: '62e8fb51-f98f-5f09-82de-92993b8ed9e8',
  person: null,
  title: 'Want to talk to someone about this?',
  personCopyTitle: null,
  personCopy: null,
  personCtaCopy: null,
  personCtaLinkUrl: null,
  personCtaLinkCopy: null,
  genericCopy: {
    genericCopy:
      'Our experts work with you to understand your goals and help you build the capabilities you need to succeed'
  },
  genericCtaUrl: 'contact',
  genericCtaText: 'Get in touch',
  ctaText: 'Get in touch'
}

storiesOf('GetInTouch', module)
  .add('GetInTouch - Profile', () => <GetInTouch {...profileProps} />)
  .add('GetInTouch - Generic', () => <GetInTouch {...genericProps} />)
