import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextInputField, Heading, Button, Link, Paragraph, Strong, Pane } from 'evergreen-ui';
import { AuthPanel } from '../../styledComponents';

import PublicLayout from '../Layout/PublicLayout';
import { useTextField } from '../../customHooks/useFormField';
import authActions from '../../redux/actions/auth';

import { message } from '../../helpers';
import { path } from '../../utils/constants';
import theme from '../../utils/theme';
import { authValidator } from '../../utils/validation';
import { useHistory } from 'react-router';

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isSigningIn = useSelector((state) => state.auth.isSigningIn);

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
    const emailError = onEmailValidate(), passwordError = onPasswordValidate();

    return emailError || passwordError;
  };

  const onFormSave = () => {
    const hasError = validateForm();

    if (hasError) {
      return;
    }

    dispatch(authActions.signInAction({
      password: passwordValue,
      email: emailValue,
    }))
      .then(() => {
        history.push(path.GALLERY);
      })
      .catch(() => {
        onPasswordReset();
      });
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
            isLoading={isSigningIn}
            onClick={onFormSave}
          >
            {message('auth.buttons.save')}
          </Button>
          <Button
            isLoading={isSigningIn}
            onClick={onFormReset}
          >
            {message('auth.buttons.cancel')}
          </Button>
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
