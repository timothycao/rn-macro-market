export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDs0HbU12gD5UdqaGyFmfgt_lo7kJjR-OI',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorId = errorData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'Email already exists!';
      }
      throw new Error(message);
    }

    const data = await response.json();
    dispatch({ type: SIGNUP });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDs0HbU12gD5UdqaGyFmfgt_lo7kJjR-OI',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorId = errorData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'Email not found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'Incorrect password!';
      }
      throw new Error(message);
    }

    const data = await response.json();
    dispatch({ type: LOGIN });
  };
};
