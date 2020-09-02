export function getCleanedString(str: string) {
  // Characters to remove
  const specialChars = '!@#$^&%*()+=-[]\\/{}|:<>¿?,.';

  // Remove special characters
  for (let i = 0; i < specialChars.length; i++) {
    str = str.replace(new RegExp('\\' + specialChars[i], 'gi'), '');
  }

  // Change spaces to "_"
  str = str.replace(/ /gi, '_');

  // Change accents and 'ñ'
  str = str.replace(/á/gi, 'a');
  str = str.replace(/é/gi, 'e');
  str = str.replace(/í/gi, 'i');
  str = str.replace(/ó/gi, 'o');
  str = str.replace(/ú/gi, 'u');
  str = str.replace(/ñ/gi, 'n');
  return str;
}

export function removeExtension(str: string) {
  const strFilter = str.split('.');
  strFilter.pop();

  return strFilter.join('.');
}
