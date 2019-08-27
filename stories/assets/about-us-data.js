const statements = {
  statementText:
    'We’re a software engineering and design consultancy, helping you succeed by moving your team from a culture of delivery to a culture of learning.',
  supportingStatements: [
    {
      icon: {
        file: {
          url:
            '//images.ctfassets.net/22g1lenhck4z/3nY47YCXwddZVLJrujz7hR/bf332f4e48512cb3d284e382401d49a3/icon_outperform.svg',
          title: 'Outperform Icon',
          fluid: {}
        }
      },
      text:
        'Offering some of the best engineers and designers in Europe, we augment your talent and deliver solutions so that you out-perform in your market.'
    },
    {
      icon: {
        file: {
          url:
            '//images.ctfassets.net/22g1lenhck4z/2x8pYI2nw4JkmsY28MXyNG/fff47431227f3b10c26645cd2a8aa995/icon_continuous_innovation.svg',
          title: 'Continuous Icon',
          fluid: {}
        }
      },
      text:
        'With newly elevated skills and knowledge, you’re able to continuously innovate long after YLD’s involvement has ended.'
    }
  ]
}

const clientTestimonial = {
  title: 'Testimonial Video Title',
  video: {
    link: 'https://www.youtube.com/watch?v=Jv5J6a7QJug'
  }
}

const partners = {
  title: 'Technology partnerships',
  partners: [
    {
      id: 0,
      title: 'nodeJS',
      url: 'https://foundation.nodejs.org/',
      image: {
        file: {
          url: 'img1.jpg'
        }
      }
    },
    {
      id: 1,
      title: 'aws',
      url: 'https://aws.amazon.com/pt/',
      image: {
        file: {
          url: 'img2.jpg'
        }
      }
    },
    {
      id: 2,
      title: 'another partner',
      image: {
        file: {
          url: 'img3.jpg'
        }
      }
    }
  ]
}

const teamMember = {
  name: 'Nuno Job',
  image: {
    file: {
      url: 'img1.jpg'
    }
  },
  role: 'Co-founder & Chief Executive Officer - YLD',
  description:
    "Nuno is the Co-founder and CEO of YLD Group. Previously he was the Chief Commercial Officer at Nodejitsu, where he was responsible for the world's largest Node.js cloud, providing extensive contributions to the success of Node.js. Nuno's formative work years were spent in the USA at IBM Research and MarkLogic. He is also a proud Stanford alumni.",
  socialLinks: [
    {
      image: {
        title: 'LinkedIn Icon',
        file: {
          url:
            '//images.ctfassets.net/22g1lenhck4z/3uuYxyNek0bMtaGIwoXFei/586067fb0cf887cbf18bcb12588bda71/linkedin-icon.svg'
        },
        fluid: {}
      },
      name: 'Nuno Job Linkedin',
      url: 'https://www.linkedin.com/in/nunojob/'
    }
  ]
}

const subsidiaries = {
  title: 'Subsidiary list',
  subsidiaries: [
    {
      image: {
        file: {
          title: 'subsidiary1',
          url: 'img1.jpg'
        }
      },
      description: 'this is a subsidiary',
      linkUrl: 'https://www.subs1.com',
      linkText: 'Subs1'
    }
  ]
}

export { statements, clientTestimonial, partners, teamMember, subsidiaries }
