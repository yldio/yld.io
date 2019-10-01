export default (siteUrl, pages = []) =>
  siteUrl &&
  pages &&
  pages.length > 0 &&
  pages.map(({ name, pathname, position }) => {
    if (!pathname || !position || !name) {
      throw new Error('Missing breadcrumb data')
    }

    return {
      '@type': 'ListItem',
      item: {
        '@id': `${siteUrl}${pathname}`,
        name
      },
      position
    }
  })
