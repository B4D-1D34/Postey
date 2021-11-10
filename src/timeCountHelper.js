export const countTime = (date) => {
  const dateInMs = new Date(date);
  const daysPassed = (Date.now() - dateInMs) / (24 * 60 * 60000);
  const hoursPassed = daysPassed * 24;
  const minutesPassed = hoursPassed * 60;
  const secondsPassed = minutesPassed * 60;

  // if (daysPassed > 365) {
  //   const yearsCount = Math.floor(daysPassed / 365);
  //   return yearsCount === 1 ? yearsCount + ` year` : yearsCount + ` years`;
  // } else if (daysPassed > 31) {
  //   const monthsCount = Math.floor(daysPassed / 31);
  //   return monthsCount === 1 ? monthsCount + ` month` : monthsCount + ` months`;
  // } else
  if (daysPassed > 1) {
    return new Date(date).toLocaleString().slice(0, -3);
  } else if (hoursPassed > 1) {
    return Math.floor(hoursPassed) + `h`;
  } else if (minutesPassed > 1) {
    if (Math.floor(minutesPassed) > 1) {
      return Math.floor(minutesPassed) + ` minutes`;
    } else {
      return Math.floor(minutesPassed) + ` minute`;
    }
  } else if (secondsPassed > 1) {
    if (Math.floor(secondsPassed) > 1) {
      return Math.floor(secondsPassed) + ` seconds`;
    } else {
      return Math.floor(secondsPassed) + ` second`;
    }
  }
};
