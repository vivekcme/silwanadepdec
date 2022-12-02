import countryCodes from "country-codes-list";

const countries = countryCodes.all();
export const callingCode = Object.keys(countries).map((key, index) => ({
  value: countries[key]["countryCallingCode"],
  label:
    countries[key]["countryCallingCode"] +
    " " +
    countries[key]["countryNameEn"],
}));

export const Nationality = Object.keys(countries).map((key, index) => ({
  value: countries[key]["countryNameEn"],
  label: countries[key]["countryNameEn"],
}));

const dateFormatter = (changeDate) => {
  let date = changeDate.split("-");
  const day = date[0];
  const month = date[1];
  const year = date[2];

  const newDate = year + "-" + month + "-" + day;
  return newDate;
};

export const changeDateFormatter = (datesss) => {
  let date = datesss;

  if (datesss.split("-")[0].length !== 4) {
    date = dateFormatter(datesss);
  }

  const [year, month, day] = date.split("-");
  const newDate = `${month}/${day}/${year}`;

  var datess = new Date(String(newDate));
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  return datess.toLocaleDateString("en-US", options);
};

export const getTwelveHourFormatTime = (date) => {
  return new Date("1970-01-01T" + date + "Z").toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
};

export const TranferDateFormatter = (datesss) => {
  const date = datesss;
  if (date !== undefined && date !== null) {
    const [year, month, day] = date.split("-");
    const newDate = `${month}/${day}/${year}`;
    var datess = new Date(newDate);
    var options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return datess.toLocaleDateString("en-US", options);
  }
};

export const getTwentyFourHourTime = (amPmString) => {
  console.log(amPmString, "time");
  // var d = new Date("1/1/2013 " + amPmString);
  // return d.getHours() + ":" + d.getMinutes();
};

export const diffDate = (d1, d2) => {
  return parseInt((new Date(d1) - new Date(d2)) / (1000 * 60 * 60 * 24), 10);
};

export const calculateTranferTime = (pickup, est) => {
  let pickHour = parseFloat(pickup.split(":")[0]);
  let pickMin = parseFloat(pickup.split(":")[1]);
  let EstHour = parseFloat(est.split(".")[0]);
  let EstMin = parseFloat(est.split(".")[1]);
  let totalHour = pickHour + EstHour;
  let totalMin = pickMin + EstMin;
  return totalHour + ":" + totalMin;
};

export function timeConvert(time) {
  var ts = time;
  var H = +ts.substr(0, 2);
  var h = H % 12 || 12;
  h = h < 10 ? "0" + h : h; // leading 0 at the left for 1 digit hours
  var ampm = H < 12 ? " AM" : " PM";
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
}

export const IsotoSimpleDate = (datesss) => {
  const date = datesss;
  if (date !== undefined) {
    const new_date = date.split("T");
    return new_date[0];
  }
};

export function diff_hours(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}

export const scrollFunc = () => {
  window.scrollTo(0, 900);
};
