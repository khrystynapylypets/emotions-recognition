export default {
  title: 'Emotions recognition',
  logOut: 'Log out',
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
      passwordError: 'Password should contain at least {number} characters',
    },
    noAccount: 'Do not have an account yet?',
    alreadyHasAccount: 'Already have an account?',
    request: {
      messages: {
        creationSuccess: 'User "{firstName} {lastName}" was successfully created.',
        generalError: 'Something goes wrong. Please try again!',
      },
    },
  },
  gallery: {
    title: 'Video gallery',
    buttons: {
      upload: 'Upload video',
    },
    empty: 'Gallery is empty, please upload video',
    item: {
      settings: {
        detailsPage: 'Open video details page',
        delete: 'Delete video',
      },
    },
    label: {
      analyzed: 'Analyzed',
      notAnalyzed: 'Not analyzed',
    },
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
    request: {
      messages: {
        uploadingSuccess: 'Video "{name}" was successfully uploaded.',
        deletingSuccess: 'Video "{name}" was successfully deleted.',
      },
    },
  },
  videoDetailsPage: {
    tabs: {
      mainInfo: 'Main information',
      analyzer: 'Analyzer',
    },
    analyzer: {
      framesPerSec: {
        label: 'Вкажіть, будь ласка, кількість кадрів (від 1 до 10)',
        errorMessage: 'Вказане число не в діапазоні від 1 до 10.',
      },
      buttons: {
        analyze: 'Проаналізувати відео',
      },
    },
  },
  generalErrors: {
    unexpected: 'Something goes wrong. Please try again!',
    required: 'Value is required',
  },
};
