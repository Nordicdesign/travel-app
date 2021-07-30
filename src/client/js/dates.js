export const populateDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formDate = tomorrow.toISOString().slice(0,10);
  document.getElementById('when').value = formDate;
};

export const dateWithinAWeek = (date) => {
  const today = new Date();
  const when = new Date(date);
  const miliseconds = when - today;
  const totalSeconds = parseInt(Math.floor(miliseconds / 1000));
  const totalMinutes = parseInt(Math.floor(totalSeconds / 60));
  const totalHours = parseInt(Math.floor(totalMinutes / 60));
  const days = (totalHours / 24);

  if (days <= 7) {
    return true;
  } else {
    return false;
  };
};
