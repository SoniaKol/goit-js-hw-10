import 'modern-normalize/modern-normalize.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = new Date();
let currentDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    checkDate(userSelectedDate);
  },
};

flatpickr('#datetime-picker', options);

const elements = {
  button: document.querySelector('button[data-start]'),
  input: document.querySelector('.flatpickr-input.flatpickr-mobile'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

disabledBtn(elements.button);
elements.button.addEventListener('click', clickHandler);
console.log(elements.input);
function clickHandler() {
  let value = checkDate(userSelectedDate);
  let dateObj = convertMs(value);
  startTimmer(dateObj, value);
}

function startTimmer(obj, number) {
  disabledBtn(elements.button);
  disabledInput(elements.input);

  let { days, hours, minutes, seconds } = obj;

  let id = setInterval(() => {
    elements.days.textContent = days.toString().padStart(2, '0');
    elements.hours.textContent = hours.toString().padStart(2, '0');
    elements.minutes.textContent = minutes.toString().padStart(2, '0');
    elements.seconds.textContent = seconds.toString().padStart(2, '0');

    seconds -= 1;
    number -= 1000;

    if (number < 0) {
      clearInterval(id);
      elements.input.removeAttribute('disabled');
    }

    if (seconds < 0 && minutes > 0) {
      seconds = 59;
      minutes -= 1;
      if (minutes < 0 && hours > 0) {
        minutes = 59;
        hours -= 1;
        if (hours > 0 && days > 0) {
          days = -1;
          hours = 23;
        }
      }
    }
  }, 1000);
}

function checkDate(date) {
  const userDate = date.getTime();
  const nowDate = currentDate.getTime();
  const diff = userDate - nowDate;
  if (diff <= 0) {
    iziToast.show({
      message: 'Please choose a date in the future',
      position: 'topRight',
      messageColor: 'black',
      color: 'red',
    });
    return;
  }
  abledBtn(elements.button);
  return diff;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function disabledBtn(btn) {
  btn.setAttribute('disabled', '');
  btn.style.backgroundColor = '#cfcfcf';
  btn.style.color = '#989898';
}

function abledBtn(btn) {
  btn.removeAttribute('disabled');
  btn.style.backgroundColor = '#4e75ff';
  btn.style.color = '#fff';
}

function disabledInput(input) {
  input.setAttribute('disabled', '');
}
