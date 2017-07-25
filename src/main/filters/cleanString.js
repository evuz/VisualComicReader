/* eslint-disable*/
export function getCleanedString(cadena) {
  // Definimos los caracteres que queremos eliminar
  const specialChars = '!@#$^&%*()+=-[]\\/{}|:<>¿?,.';

  // Los eliminamos todos
  for (let i = 0; i < specialChars.length; i++) {
    cadena = cadena.replace(new RegExp('\\' + specialChars[i], 'gi'), '');
  }

  // Cambiamos los espacios por _
  cadena = cadena.replace(/ /gi, '_');

  // Quitamos acentos y 'ñ'. Fijate en que va sin comillas el primer parametro
  cadena = cadena.replace(/á/gi, 'a');
  cadena = cadena.replace(/é/gi, 'e');
  cadena = cadena.replace(/í/gi, 'i');
  cadena = cadena.replace(/ó/gi, 'o');
  cadena = cadena.replace(/ú/gi, 'u');
  cadena = cadena.replace(/ñ/gi, 'n');
  return cadena;
}
/* eslint-enable*/

export function removeExtension(str) {
  const strFilter = str.split('.');
  strFilter.pop();

  return strFilter.join('.');
}
