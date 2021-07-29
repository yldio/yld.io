export default function replaceAccentChars(str) {
  const chars = ['aáàãäâ', 'eéèëê', 'iíìïî', 'oóòõöô', 'uúùüû', 'cç'];
  // eslint-disable-next-line guard-for-in
  for (const i in chars) {
    const reg = new RegExp(`[${chars[i].slice(1)}]`, 'ig');
    if (reg.test(str)) {
      str = str.replace(reg, chars[i].slice(0, 1));
    }
  }

  return str;
}
