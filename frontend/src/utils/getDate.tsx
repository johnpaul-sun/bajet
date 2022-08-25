var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = today.toLocaleString('en-us', { month: 'long' });
var yy = today.getFullYear();

const when: any = {
  today: `${mm} ${dd}, ${yy}`,
}

const getDate = (input: any) => {
  return when[input];
}

export default getDate;
