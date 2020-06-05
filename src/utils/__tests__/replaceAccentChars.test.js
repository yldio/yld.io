import replaceAccentChars from '../replaceAccentChars';

test.each`
  str                | expected
  ${'José'}          | ${'Jose'}
  ${'randôm'}        | ${'random'}
  ${'caçarola'}      | ${'cacarola'}
  ${'Luís'}          | ${'Luis'}
  ${'João Guimãres'} | ${'Joao Guimares'}
  ${'Joãó'}          | ${'Joao'}
  ${'gërmãn'}        | ${'german'}
`('should replace all accent chars from $str', ({ str, expected }) => {
  expect(replaceAccentChars(str)).toEqual(expected);
});
