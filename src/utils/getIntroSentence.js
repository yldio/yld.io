export default caseStudy => {
  if (caseStudy.intro) {
    return (caseStudy.intro || {}).introSentence;
  }

  if (typeof caseStudy.introSentence === 'string') {
    return caseStudy.introSentence;
  }

  return (caseStudy.introSentence || {}).introSentence;
};
