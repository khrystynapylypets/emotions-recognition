import React from 'react';
import { TextInputField, Heading, Button, Strong, Link, Paragraph, Pane } from 'evergreen-ui';
import PublicLayout from '../Layout/PublicLayout';
import { AuthPanel } from '../../styledComponents';

import { message } from '../../helpers';
import { MIN_PASSWORD, path } from '../../utils/constants';
import { authValidator } from '../../utils/validation';
import { useTextField } from '../../customHooks/useFormField';
import theme from '../../utils/theme';

const SignUp = () => {
  const {
    value: firstNameValue,
    onChange: onFirstNameChange,
    onReset: onFirstNameReset,
    onValidate: onFirstNameValidate,
    errorMessage: firstNameErrorMessage,
  } = useTextField({ initialValue: '', resetValue: '', validationFunction: authValidator['name'] });

  const {
    value: lastNameValue,
    onChange: onLastNameChange,
    onReset: onLastNameReset,
    onValidate: onLastNameValidate,
    errorMessage: lastNameErrorMessage,
  } = useTextField({ initialValue: '', resetValue: '', validationFunction: authValidator['name'] });

  const {
    value: emailValue,
    onChange: onEmailChange,
    onReset: onEmailReset,
    onValidate: onEmailValidate,
    errorMessage: emailErrorMessage,
  } = useTextField({ initialValue: '', resetValue: '', validationFunction: authValidator['email'] });

  const {
    value: passwordValue,
    onChange: onPasswordChange,
    onReset: onPasswordReset,
    onValidate: onPasswordValidate,
    errorMessage: passwordErrorMessage,
  } = useTextField({ initialValue: '', resetValue: '', validationFunction: authValidator['password'] });

  const onFormReset = () => {
    onFirstNameReset();
    onLastNameReset();
    onEmailReset();
    onPasswordReset();
  };

  const validateForm = () => {
    onFirstNameValidate();
    onLastNameValidate();
    onEmailValidate();
    onPasswordValidate();
  };

  const onFormSave = () => {
    validateForm();

    if (firstNameErrorMessage || lastNameErrorMessage || emailErrorMessage || passwordErrorMessage) {
      return;
    }
  };

  return (
    <PublicLayout>
      <AuthPanel
        boxShadow={theme.boxShadow}
      >
        <Heading
          size={700}
          marginBottom={30}
          color={theme.textColor}
        >
          {message('auth.signUp.title')}
        </Heading>
        <Pane>
          <TextInputField
            required
            label={message('auth.signUp.fields.firstName.title')}
            placeholder={message('auth.signUp.fields.firstName.placeholder')}
            value={firstNameValue}
            onChange={({ target }) => onFirstNameChange(target.value)}
            validationMessage={firstNameErrorMessage}
            isInvalid={Boolean(firstNameErrorMessage)}
          />
          <TextInputField
            required
            label={message('auth.signUp.fields.lastName.title')}
            placeholder={message('auth.signUp.fields.lastName.placeholder')}
            value={lastNameValue}
            onChange={({ target }) => onLastNameChange(target.value)}
            validationMessage={lastNameErrorMessage}
            isInvalid={Boolean(lastNameErrorMessage)}
          />
          <TextInputField
            required
            label={message('auth.signUp.fields.email.title')}
            placeholder={message('auth.signUp.fields.email.placeholder')}
            value={emailValue}
            onChange={({ target }) => onEmailChange(target.value)}
            validationMessage={emailErrorMessage}
            isInvalid={Boolean(emailErrorMessage)}
          />
          <TextInputField
            type='password'
            required
            label={message('auth.signUp.fields.password.title')}
            placeholder={message('auth.signUp.fields.password.placeholder')}
            hint={message('auth.signUp.fields.password.hint', { number: MIN_PASSWORD })}
            value={passwordValue}
            onChange={({ target }) => onPasswordChange(target.value)}
            validationMessage={passwordErrorMessage}
            isInvalid={Boolean(passwordErrorMessage)}
          />
        </Pane>
        <Pane>
          <Button
            appearance='primary'
            intent='success'
            marginRight={15}
            onClick={onFormSave}
          >
            {message('auth.buttons.save')}
          </Button>
          <Button onClick={onFormReset}>{message('auth.buttons.cancel')}</Button>
        </Pane>
        <Paragraph marginTop={40} textAlign='center'>
          <Strong>{message('auth.alreadyHasAccount')}</Strong>
          &nbsp;
          <Link href={path.SIGN_IN} color='neutral'>{message('auth.signIn.title')}</Link>
        </Paragraph>
      </AuthPanel>
    </PublicLayout>
  );
};

export default SignUp;
