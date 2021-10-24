export default {
  title: 'Emotions recognition',
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
      emailError: 'Email address is incorrect',
      passwordError: 'Password is incorrect',
    },
    noAccount: 'Do not have an account yet?',
    alreadyHasAccount: 'Already have an account?',
  },
  menu: {
    openButton: 'Menu',
    items: {
      gallery: 'Gallery',
      profile: 'Profile',
      logOutButton: 'Log out',
    },
  },
  gallery: {
    title: 'Video gallery',
    buttons: {
      upload: 'Upload video',
    },
    empty: 'Gallery is empty, please upload video',
  },
  uploadVideoPanel: {
    title: 'Upload video',
    description: 'Please fill in all needed fields to upload video to the gallery',
    fields: {
      name: {
        title: 'Title',
        placeholder: 'Please enter video title',
      },
      description: {
        title: 'Description',
        placeholder: 'Please enter your video description',
      },
      videoFile: {
        title: 'Video file',
        placeholder: 'Select the file here!',
      },
    },
    buttons: {
      save: 'Save',
      cancel: 'Cancel',
    },
  },
  generalErrors: {
    required: 'Values id required',
  },
};
