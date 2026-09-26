export const formatPhoneNumber = (value: string): string => {
  // Очищаем строку, оставляя только цифры
  const onlyNums = value.replace(/[^\d]/g, "");

  if (!onlyNums) return "";

  let startWith = "+7 ";
  let numberIndex = 0;

  if (onlyNums[0] === "7") {
    numberIndex = 1;
  } else if (onlyNums[0] === "8") {
    numberIndex = 1;
  } else {
    startWith = "+7 ";
  }

  const coreNumber = onlyNums.substring(numberIndex, numberIndex + 10);
  let formatted = startWith;

  if (coreNumber.length > 0) {
    formatted += `(${coreNumber.substring(0, 3)}`;
  }
  if (coreNumber.length >= 4) {
    formatted += `) ${coreNumber.substring(3, 6)}`;
  }
  if (coreNumber.length >= 7) {
    formatted += `-${coreNumber.substring(6, 8)}`;
  }
  if (coreNumber.length >= 9) {
    formatted += `-${coreNumber.substring(8, 10)}`;
  }

  return formatted;
};

export const getRawPhoneNumber = (value: string): string => {
  return value.replace(/[^\d]/g, "");
};
