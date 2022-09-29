const selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");
const hour = 12;
const minutes = 60;
let alarmTime;
let isAlarm = false;
let ampm = ["AM", "PM"];
let ringtone = new Audio("/files/ringtone.mp3");

for (let i = 1; i <= hour; i++) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value='${i}'>${i}</option>`;
  selectMenu[0].innerHTML += option;
}
for (let i = 0; i < minutes; i++) {
  i = i < 10 ? "0" + i : i;
  selectMenu[1].innerHTML += `<option value='${i}'>${i}</option>`;
}
for (let i = 0; i < ampm.length; i++) {
  selectMenu[2].innerHTML += `<option>${ampm[i]}</option>`;
}

setInterval(() => {
  let now = new Date();
  let h = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
  h = h < 10 ? "0" + h : h;
  let m = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  let s = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  let ampm = now.getHours() > 12 ? "PM" : "AM";
  currentTime.textContent = `${h}:${m}:${s} ${ampm}`;
  if (alarmTime == `${h} ${m} ${ampm}`) {
    ringtone.play();
  }
}, 1000);

setAlarmBtn.addEventListener("click", alarmFunc);
function alarmFunc() {
  if (isAlarm) {
    content.classList.remove("disable");
    setAlarmBtn.textContent = "Set Alarm";
    alarmTime = "";
    ringtone.pause();
    return (isAlarm = false);
  }
  time = `${selectMenu[0].value} ${selectMenu[1].value} ${selectMenu[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("put a valid alarm,Temi");
  }
  isAlarm = true;
  content.classList.add("disable");
  setAlarmBtn.textContent = "Clear Alarm";
  alarmTime = time;
}
