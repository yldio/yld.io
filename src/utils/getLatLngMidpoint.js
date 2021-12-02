const decimelToRadian = (degrees) => {
  return degrees * (Math.PI / 180);
};

const radianToDecimel = (radians) => {
  return radians * (180 / Math.PI);
};

const getAverage = (arr, key) => {
  return arr.reduce((acc, current) => acc + current[key], 0) / arr.length;
};

const checkLocationData = (locations) =>
  locations.every(
    (location) =>
      location &&
      location.lat &&
      location.lng &&
      typeof location.lat === 'number' &&
      typeof location.lng === 'number',
  );

// http://geomidpoint.com/calculation.ht
export default (locations) => {
  if ((locations && locations.length < 1) || !locations) {
    throw new Error(`Location data: ${locations}`);
  }

  if (!checkLocationData(locations)) {
    throw new Error(`Locations missing lat/lng data: ${locations}`);
  }

  const latLongRadians = locations.map((location) => ({
    lat: decimelToRadian(location.lat),
    lng: decimelToRadian(location.lng),
  }));

  const latLongCatesian = latLongRadians.map((radian) => ({
    x: Math.cos(radian.lat) * Math.cos(radian.lng),
    y: Math.cos(radian.lat) * Math.sin(radian.lng),
    z: Math.sin(radian.lat),
  }));

  const radianAv = {
    x: getAverage(latLongCatesian, 'x'),
    y: getAverage(latLongCatesian, 'y'),
    z: getAverage(latLongCatesian, 'z'),
  };

  const lng = Math.atan2(radianAv.y, radianAv.x);
  const hyp = Math.sqrt(radianAv.x * radianAv.x + radianAv.y * radianAv.y);
  const lat = Math.atan2(radianAv.z, hyp);

  const midPointsToDecimels = {
    lat: radianToDecimel(lat),
    lng: radianToDecimel(lng),
  };

  return midPointsToDecimels;
};
