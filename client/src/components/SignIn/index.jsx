import React from 'react';
import { TextInputField, Heading, Button, Link, Paragraph, Strong, Pane } from 'evergreen-ui';
import { AuthPanel } from '../../styledComponents';

import PublicLayout from '../Layout/PublicLayout';
import { useTextField } from '../../customHooks/useFormField';
import { message } from '../../helpers';
import { path } from '../../utils/constants';
import theme from '../../utils/theme';
import { authValidator } from '../../utils/validation';

const SignIn = () => {
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
    onEmailReset();
    onPasswordReset();
  };

  const validateForm = () => {
    onEmailValidate();
    onPasswordValidate();
  };

  const onFormSave = () => {
    validateForm();

    if (emailErrorMessage || passwordErrorMessage) {
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
          {message('auth.signIn.title')}
        </Heading>
        <Pane>
          <TextInputField
            required
            label={message('auth.signIn.fields.email.title')}
            placeholder={message('auth.signIn.fields.email.placeholder')}
            value={emailValue}
            onChange={({ target }) => onEmailChange(target.value)}
            validationMessage={emailErrorMessage}
            isInvalid={Boolean(emailErrorMessage)}
          />
          <TextInputField
            type='password'
            required
            label={message('auth.signIn.fields.password.title')}
            placeholder={message('auth.signIn.fields.password.placeholder')}
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
          <Strong>{message('auth.noAccount')}</Strong>
          &nbsp;
          <Link href={path.SIGN_UP} color='neutral'>{message('auth.signUp.title')}</Link>
        </Paragraph>
      </AuthPanel>
    </PublicLayout>
  );
};

export default SignIn;
