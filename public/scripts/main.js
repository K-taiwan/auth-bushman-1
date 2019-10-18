console.log('Ground control to Major Tom...');

const form = document.querySelector('form');

// console.log(form.elements);

form && form.addEventListener('submit', (event) => {
  let formIsValid = true;
  const userData = {};
  event.preventDefault();
  
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

  console.log(userData);

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
        // if (res.status === 201) return window.location = '/login';
      })
      .catch(err => console.log(err));
  }

  // Handle Logim
  if (form.id === 'login' && formIsValid) {
    console.log('Submitting user login --> ', userData);
    // fetch('/api/v1/login', {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(userData)
    // })
    //   .then(dataStream => dataStream.json())
    //   .then(res => {
    //     console.log(res);
    //     if (res.status === 200) return window.location = `/profile/${res.data.id}`;
    //   })
    //   .catch(err => console.log(err));
  }

});
