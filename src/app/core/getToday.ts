export const getToday = () => {
  const day = new Date();
  let mounth = `${day.getMonth() + 1}`;
  if (mounth.length === 1) {
    mounth = '0' + mounth;
  }
};
