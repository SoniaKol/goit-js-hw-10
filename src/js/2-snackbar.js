import 'modern-normalize/modern-normalize.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('[name = "delay"]'),
};

const iziSeatingsFullfield = {
  color: 'green',
  position: 'topCenter',
};

const iziSeatingsRejected = {
  color: 'red',
  position: 'topCenter',
};

elements.form.addEventListener('submit', handlerForm);

function handlerForm(evt) {
  evt.preventDefault();
  const delay = Number(elements.delayInput.value);
  let choise;
  if (evt.target.elements.state.value === 'fulfilled') {
    choise = true;
  }
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (choise) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(response =>
      iziToast.show(
        iziSeatingsFullfield,
        (iziSeatingsFullfield.message = response)
      )
    )
    .catch(err =>
      iziToast.show(iziSeatingsRejected, (iziSeatingsRejected.message = err))
    );
}
