export const countTime = (date) => {
  const dateInMs = new Date(date);
  const daysPassed = (Date.now() - dateInMs) / (24 * 60 * 60000);

  if (daysPassed > 365) {
    const yearsCount = Math.floor(daysPassed / 365);
    return yearsCount === 1 ? yearsCount + ` year` : yearsCount + ` years`;
  } else if (daysPassed > 31) {
    const monthsCount = Math.floor(daysPassed / 31);
    return monthsCount === 1 ? monthsCount + ` month` : monthsCount + ` months`;
  } else if (daysPassed > 1) {
    return Math.floor(daysPassed) + `d`;
  } else {
    return Math.floor(daysPassed * 24) + `h`;
  }
};
