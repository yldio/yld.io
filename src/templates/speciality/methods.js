import Get from 'lodash.get'
import IsNull from 'lodash.isnull'

const getExternalType = (flattenedSpeciality, type) =>
  flattenedSpeciality.externalResources.filter(
    additionalInfo => additionalInfo.type === type,
  ) || []

const flattenSpeciality = speciality => {
  return {
    slug: Get(speciality, 'slug', undefined),
    title: Get(speciality, 'title', undefined), // required
    seoTitle: Get(speciality, 'seoTitle', undefined), // required
    seoMetaDescription: Get(speciality, 'seoMetaDescription', undefined), // required
    seoText: Get(speciality, 'seoText.content[0].content[0].value', undefined), // required
    introGraphicTitle: Get(speciality, 'introGraphic.title', undefined), // required
    introGraphicFile: Get(speciality, 'introGraphic', undefined), // required
    introTitle: Get(speciality, 'introTitle', undefined), // required
    introTextTitle1: Get(speciality, 'introTextTitle1', undefined), // required
    introTextBody1: Get(
      speciality,
      'introTextBody1.content[0].content[0].value',
      undefined,
    ), // required
    introTextTitle2: Get(speciality, 'introTextTitle2', undefined), // required
    introTextBody2: Get(
      speciality,
      'introTextBody2.content[0].content[0].value',
      undefined,
    ), // required
    introTextTitle3: Get(speciality, 'introTextTitle3', undefined), // required
    introTextBody3: Get(
      speciality,
      'introTextBody3.content[0].content[0].value',
      undefined,
    ), // required
    trainingIntroText: Get(
      speciality,
      'trainingIntroText.content[0].content[0].value',
      undefined,
    ), // required
    trainingTextIcon1Title: Get(
      speciality,
      'trainingTextIcon1.title',
      undefined,
    ), // required
    trainingTextIcon1: Get(speciality, 'trainingTextIcon1', undefined), // required
    trainingTextTitle1: Get(speciality, 'trainingTextTitle1', undefined), // required
    trainingTextBody1: Get(
      speciality,
      'trainingTextBody1.content[0].content[0].value',
      undefined,
    ), // required
    trainingTextIcon2Title: Get(
      speciality,
      'trainingTextIcon2.title',
      undefined,
    ), // required
    trainingTextIcon2: Get(speciality, 'trainingTextIcon2', undefined), // required
    trainingTextTitle2: Get(speciality, 'trainingTextTitle2', undefined), // required
    trainingTextBody2: Get(
      speciality,
      'trainingTextBody2.content[0].content[0].value',
      undefined,
    ), // required
    trainingTextIcon3Title: Get(
      speciality,
      'trainingTextIcon3.title',
      undefined,
    ), // required
    trainingTextIcon3: Get(speciality, 'trainingTextIcon3', undefined), // required
    trainingTextTitle3: Get(speciality, 'trainingTextTitle3', undefined), // required
    trainingTextBody3: Get(
      speciality,
      'trainingTextBody3.content[0].content[0].value',
      undefined,
    ), // required
    communityText: Get(
      speciality,
      'communityText.content[0].content[0].value',
      undefined,
    ),
    communityLogoTitle: Get(speciality, 'communityLogo.title', undefined),
    communityLogo: Get(speciality, 'communityLogo', undefined),
    communityBackgroundTitle: Get(
      speciality,
      'communityBackground.title',
      undefined,
    ),
    communityBackground: Get(speciality, 'communityBackground', undefined),
    eventIconTitle: Get(speciality, 'eventIcon.title', undefined),
    eventIconUrl: Get(speciality, 'eventIcon.file.url', undefined),
    contactText: Get(speciality, 'contactText', undefined), // required
    eventIcon: Get(speciality, 'eventIcon', undefined),
    howWeWorkWithTitle: Get(speciality, 'howWeWorkWithTitle', undefined),
    howWeWorkWithCopy: Get(
      speciality,
      'howWeWorkWithCopy.howWeWorkWithCopy',
      undefined,
    ),
    howWeWorkWithPractises: Get(
      speciality,
      'howWeWorkWithPractises',
      undefined,
    ),
    externalResources: IsNull(speciality.externalResources)
      ? []
      : Get(speciality, 'externalResources', []),
    relatedProjects: IsNull(speciality.relatedProjects)
      ? []
      : Get(speciality, 'relatedProjects', []),
    clients: IsNull(speciality.clients) ? [] : Get(speciality, 'clients', []),
  }
}

export { getExternalType, flattenSpeciality }
