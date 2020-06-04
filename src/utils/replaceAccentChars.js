export default function replaceAccentChars(str) {
  const chars = ['aáàãäâ', 'eéèëê', 'iíìïî', 'oóòõöô', 'uúùüû', 'cç'];
  for (let i in chars) {
    const reg = new RegExp(`[${chars[i].slice(1)}]`, 'ig');
    if (reg.test(str)) {
      str = str.replace(reg, chars[i].slice(0, 1));
      break;
    }
  }
  return str;
}
