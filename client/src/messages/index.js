export default {
  auth: {
    signUp: {
      title: 'Sign Up',
      fields: {
        firstName: {
          title: 'First name',
          placeholder: 'Please enter your first name',
        },
        lastName: {
          title: 'Last name',
          placeholder: 'Please enter your last name',
        },
        email: {
          title: 'Email',
          placeholder: 'username@example.com',
        },
        password: {
          title: 'Password',
          placeholder: 'Please enter a password',
          hint: 'Password should contain at least {number} characters',
        },
      },
    },
    signIn: {
      title: 'Sign In',
      fields: {
        email: {
          title: 'Email',
          placeholder: 'username@example.com',
        },
        password: {
          title: 'Password',
          placeholder: 'Please enter a password',
        },
      },
    },
    buttons: {
      save: 'Save',
      cancel: 'Cancel',
    },
    errors: {
      required: 'Value is required',
      emailError: 'Email address is incorrect',
      passwordError: 'Password is incorrect',
    },
    noAccount: 'Do not have an account yet?',
    alreadyHasAccount: 'Already have an account?',
  },
};
