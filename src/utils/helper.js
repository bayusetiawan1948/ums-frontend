const formatRupiahToNumber = (str) => {
  const separateNumber = str
    .replace(/[^\d.]/g, '')
    .trim()
    .split('.')
    .join('');
  if (isNaN(parseInt(separateNumber))) {
    return 0;
  }
  return parseInt(separateNumber);
};

const formatRupiah = (number) => {
  const convertToString = number.toString();
  let tmp = '';
  let increment = 1;
  for (let index = convertToString.length - 1; index >= 0; index--) {
    if (increment === 3) {
      tmp += convertToString[index];
      tmp += '.';
      increment = 0;
    } else {
      tmp += convertToString[index];
    }
    increment++;
  }
  if (tmp[tmp.length - 1] === '.') {
    tmp = tmp.substring(tmp.length - 1, 0);
  }
  let result = 'Rp.';
  for (let index = tmp.length - 1; index >= 0; index--) {
    result += tmp[index];
  }
  return result;
};

export { formatRupiah, formatRupiahToNumber };
