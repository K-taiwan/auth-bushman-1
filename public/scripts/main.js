console.log('Ground control to Major Tom...');
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('nav li');
const form = document.querySelector('form');


// REMOVE ALERTS
if (document.querySelector('.alert')) {
  let delay = 0;
  setTimeout(() => {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
      delay += 500;
      setTimeout(() => {
        alert.remove();
      }, delay)
    });
  }, 3000);
}


// ADD NAV ACTIVE CLASS
navLinks.forEach(link => {
  if (currentPath === link.firstChild.getAttribute('href')) {
    link.classList.add('active')
  }
});


// navLinks.forEach(link => currentPath === link.firstChild.getAttribute('href') ? link.classList.add('active') : null);


// EVENT LISTENERS
form && form.addEventListener('submit', (e) => {
  let formIsValid = true;
  const userData = {};
  e.preventDefault();

  // Clear Alert Messages
  [...document.querySelectorAll('.alert')].forEach(alert => alert.parentNode.removeChild(alert));

  // Add Alert Message
  [...form.elements].forEach(input => {
    if (input.type !== 'submit' && input.value === '') {
      formIsValid = false;
      // e.preventDefault();
      input.classList.add('input-error');
      input.insertAdjacentHTML('afterend', `
        <div class='alert ${input.id}-message'>
          Please enter your ${input.id}
        </div>
    `);
    } else if (input.type === 'password' && input.value.length < 4) {
      formIsValid = false;
      // e.preventDefault();
      input.classList.add('input-error');
      input.insertAdjacentHTML('afterend', `
        <div class='alert ${input.id}-message'>
          Password must be at least 4 characters
        </div>
    `);
    }

    if (input.type !== 'submit' && formIsValid) {
      // console.log(input.value);
      userData[input.name] = input.value;
    }
  });

  // Handle Signup Form
  if (form.id === 'signup' && formIsValid) {
    console.log('Submitting new user --> ', userData);
    fetch('/api/v1/signup', {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(userData)
    })
      .then(dataStream => dataStream.json())
      .then(res => {
        console.log(res);
        if (res.status === 201) return window.location = '/login';
      })
      .catch(err => console.log(err));
  }

  // Handle Login Form
  if (form.id === 'login' && formIsValid) {
    console.log('Submitting user login --> ', userData);
    fetch('/api/v1/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(dataStream => dataStream.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) return window.location = `/profile/${res.data.id}`;
      })
      .catch(err => console.log(err));
  }
  
});


document.addEventListener('blur', (e) => {  
  if (e.target.value === '') {
    e.target.classList.add('input-error');
    e.target.insertAdjacentHTML('afterend', `
      <div class='alert ${e.target.id}-message'>
        Please enter your ${e.target.id}
      </div>
    `);
    e.preventDefault();
  } else if (e.target.type === 'password' && e.target.value.length < 4) {
    e.preventDefault();
    e.target.classList.add('input-error');
    e.target.insertAdjacentHTML('afterend', `
      <div class='alert ${e.target.id}-message'>
        Password must be at least 4 characters
      </div>
    `);
  }
}, true);


document.addEventListener('focus', (e) => {
  if (e.target.classList) {
    e.target.classList.remove('input-error');
  }
  const inputMessage = document.querySelector(`.${e.target.id}-message`);
  if (inputMessage) {
    inputMessage.parentNode.removeChild(inputMessage);
  }
}, true);
