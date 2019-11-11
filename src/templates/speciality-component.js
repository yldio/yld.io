import React, { Fragment } from 'react'
import Ajv from 'ajv'

import {
  communitySchema,
  projectsSchema,
  clientSchema,
  trainingSchema,
  howWeWorkSchema,
} from './speciality/schemas'

import { getExternalType, flattenSpeciality } from './speciality/methods'

import IntroSection from '../components/Speciality/Intro'
import ProjectsSection from '../components/Speciality/Projects'
import TrainingSection from '../components/Speciality/Training'
import CommunitySection from '../components/Speciality/Community'
import HowWeWorkWithSection from '../components/Speciality/HowWeWorkWith'
import EventSection from '../components/Common/Events'
import TalksSection from '../components/Speciality/Talks'
import TutorialsSection from '../components/Speciality/Tutorials'
import BooksSection from '../components/Speciality/Books'
import BlogListing from '../components/Common/BlogListing'

const ajv = new Ajv({ allErrors: true })

export const SpecialityView = props => {
  const {
    data: {
      contentfulSpeciality: speciality,
      allContentfulMeetupEvent: { nodes: events },
      videoIcon,
      filteredPosts = [],
    },
  } = props

  const flattenedSpeciality = flattenSpeciality(speciality)

  const validateCommunity = ajv.compile(communitySchema)
  const validateProjects = ajv.compile(projectsSchema)
  const validateClients = ajv.compile(clientSchema)
  const validateTraining = ajv.compile(trainingSchema)
  const validateHowWeWork = ajv.compile(howWeWorkSchema)

  const { title, eventIcon, relatedProjects, clients } = flattenedSpeciality

  const { edges: postEdges = [] } = filteredPosts
  const posts = postEdges.map(({ node }) => node)
  const talks = getExternalType(flattenedSpeciality, `Talk`)
  const tutorials = getExternalType(flattenedSpeciality, `Tutorial`)
  const books = getExternalType(flattenedSpeciality, `Book`)

  const renderProjectsSection =
    validateProjects(relatedProjects) || validateClients(clients)
  const renderCommunitySection = validateCommunity(flattenedSpeciality)
  const renderTrainingSection = validateTraining(flattenedSpeciality)
  const renderHowWeWorkWithSection = validateHowWeWork(flattenedSpeciality)

  const renderTalksSection = talks && talks.length > 0
  const renderBooksSection = books && books.length > 0
  const renderBlogSection = posts && posts.length > 0

  return (
    <Fragment>
      <IntroSection speciality={flattenedSpeciality} />

      {renderProjectsSection && (
        <ProjectsSection
          related={relatedProjects}
          title={title}
          clients={clients}
        />
      )}

      {renderTrainingSection && (
        <TrainingSection speciality={flattenedSpeciality} />
      )}

      {renderHowWeWorkWithSection && (
        <HowWeWorkWithSection {...flattenedSpeciality} />
      )}

      {renderCommunitySection && <CommunitySection {...flattenedSpeciality} />}
      <EventSection
        events={events}
        title={title}
        eventIcon={eventIcon}
        bgColor={speciality.eventsBackgroundColor}
      />

      {renderTalksSection && (
        <TalksSection talks={talks} videoIcon={videoIcon} />
      )}

      {renderBlogSection && (
        <BlogListing
          title="Blog posts"
          description={`${title} articles created by members of YLD for the community.`}
          posts={posts}
          bgColor={speciality.blogBackgroundColor}
        />
      )}

      {tutorials && tutorials.length > 0 && (
        <TutorialsSection speciality={title} tutorials={tutorials} />
      )}

      {renderBooksSection && <BooksSection title={title} books={books} />}
    </Fragment>
  )
}

export default SpecialityView
