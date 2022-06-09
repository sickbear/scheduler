function pad(n) {
  return (n < 10) ? ('0' + n) : n;
}

function getDates() {
  const dates = [];
  const date = new Date();

  for (let i = 0; i < 7; i++){
    const tempDate = new Date();
    tempDate.setDate(date.getDate() + i);
    const str = `${pad(tempDate.getDate())}.${pad(tempDate.getMonth() + 1)}`;
    dates.push(str);
  }
  return dates;
}

function formatDate(date) {
  const formattableDate = new Date(date);
  const month = (formattableDate.getMonth() + 1) < 10 ? `0${formattableDate.getMonth() + 1}` : formattableDate.getMonth() + 1;
  const day = formattableDate.getDate() < 10 ? `0${formattableDate.getDate()}` : formattableDate.getDate();
  return `${day}.${month}`;
}

function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { capitalize, getDates, formatDate };
