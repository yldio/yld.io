const getSlugs = (arr = []) => arr.map(({ slug }) => slug).filter((i) => i);
const getColor = (arr, findSlug) => {
  return (arr.find(({ slug }) => slug === findSlug) || {}).logoColour;
};

const getSpecialitiesToServices = (services = []) => {
  return services.reduce((acc, { slug, ...rest }) => {
    const {
      specialityAreaItems1 = [],
      specialityAreaItems2 = [],
      specialityAreaItems3 = [],
      specialityAreaItems4 = [],
    } = rest;

    const areas = [
      ...Array.prototype.concat.apply([], specialityAreaItems1),
      ...Array.prototype.concat.apply([], specialityAreaItems2),
      ...Array.prototype.concat.apply([], specialityAreaItems3),
      ...Array.prototype.concat.apply([], specialityAreaItems4),
    ].filter((i) => i);

    return {
      ...acc,
      [slug]: areas.map(({ slug }) => slug),
    };
  }, {});
};

const getService = ({ slug, map = [] }) =>
  Object.keys(map).find((key) => map[key].includes(slug));

export default ({ services, specialities, slug }) => {
  const serviceSlugs = getSlugs(services.nodes);
  const specialitySlugs = getSlugs(specialities.nodes);

  const isServicePage = serviceSlugs.includes(slug);
  const isSpecialityPage = specialitySlugs.includes(slug);
  const specialitiesToServicesMap = getSpecialitiesToServices(services.nodes);
  const service = getService({ slug, map: specialitiesToServicesMap });

  return {
    isServicePage,
    isSpecialityPage,
    specialityColor: isSpecialityPage && getColor(specialities.nodes, slug),
    service: isServicePage ? slug : service,
  };
};
