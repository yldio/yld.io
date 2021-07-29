const getTagsForTitle = (title) => {
  const titleWithoutJs = title.split('.js')[0].toLowerCase().trim();
  const titleWithoutDots = title.replace('.', '').toLowerCase().trim();
  const titleWithoutSpaces = titleWithoutJs.replace(
    new RegExp(/\s/, 'gm'),
    '-',
  );

  return [titleWithoutDots, titleWithoutJs, titleWithoutSpaces];
};

exports.getTagsForTitle = getTagsForTitle;
