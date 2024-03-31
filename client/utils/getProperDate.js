export const getCorrectTimeStamp = (date, time) => {
  time = new Date(time);
  let newTime = new Date(time.getTime() + 5.5 * 60 * 60 * 1000);
  time = newTime.toISOString();
  date = date.split("T")[0];
  time = time.split("T")[1];
  console.log("d");
  const formatteddate = new Date(
    new Date(date + "T" + time).getTime() - 5.5 * 60 * 60 * 1000
  );
  console.log(formatteddate);
  return formatteddate.getTime();
};

// getCorrectTimeStamp("2021-09-01T15:00:00.000Z", "2021-09-01T10:00:00.000Z");