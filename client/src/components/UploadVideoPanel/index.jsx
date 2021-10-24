import React from 'react';
import { SideSheet, Paragraph, Pane, Heading, TextInputField, Button, FilePicker } from 'evergreen-ui';
import { useTextField } from '../../customHooks/useFormField';
import theme from '../../utils/theme';
import { uploadVideoValidator } from '../../utils/validation';
import { message } from '../../helpers';

const UploadVideoPanel = ({ closePanel }) => {
  const {
    value: titleValue,
    onChange: onTitleChange,
    onReset: onTitleReset,
    onValidate: onTitleValidate,
    errorMessage: titleErrorMessage,
  } = useTextField({ initialValue: '', resetValue: '', validationFunction: uploadVideoValidator['title'] });

  const {
    value: descriptionValue,
    onChange: onDescriptionChange,
    onReset: onDescriptionReset,
  } = useTextField({ initialValue: '', resetValue: '' });

  const {
    value: fileValue,
    onChange: onFileChange,
    onReset: onFileReset,
    onValidate: onFileValidate,
    errorMessage: fileErrorMessage,
  } = useTextField({ initialValue: null, resetValue: null, validationFunction: uploadVideoValidator['file'] });

  const onFormReset = () => {
    onTitleReset();
    onDescriptionReset();
    onFileReset();
  };

  const validateForm = () => {
    onTitleValidate();
    onFileValidate();
  };

  const onFormSave = () => {
    validateForm();

    if (titleErrorMessage || fileErrorMessage) {
      return;
    }

    closePanel();
  };

  return (
    <SideSheet
      isShown
      preventBodyScrolling
      onCloseComplete={closePanel}
      width={500}
    >
      <Pane
        zIndex={1}
        flexShrink={0}
        elevation={0}
        backgroundColor={theme.primaryLightColor}
      >
        <Pane padding={20}>
          <Heading size={600} color={theme.textColor}>{message('uploadVideoPanel.title')}</Heading>
        </Pane>
      </Pane>
      <Pane padding={20}>
        <Paragraph marginBottom={25}>{message('uploadVideoPanel.description')}</Paragraph>
        <TextInputField
          required
          label={message('uploadVideoPanel.fields.name.title')}
          placeholder={message('uploadVideoPanel.fields.name.placeholder')}
          value={titleValue}
          onChange={({ target }) => onTitleChange(target.value)}
          validationMessage={titleErrorMessage}
          isInvalid={Boolean(titleErrorMessage)}
        />
        <TextInputField
          label={message('uploadVideoPanel.fields.description.title')}
          placeholder={message('uploadVideoPanel.fields.description.placeholder')}
          value={descriptionValue}
          onChange={({ target }) => onDescriptionChange(target.value)}
        />
        <Pane>
          <Heading size={400} marginBottom={8}>
            {message('uploadVideoPanel.fields.videoFile.title')} <span>*</span>
          </Heading>
          <FilePicker
            required
            value={fileValue}
            placeholder={message('uploadVideoPanel.fields.videoFile.placeholder')}
            onChange={(files) => onFileChange(files[0])}
          />
        </Pane>
        <Pane marginTop={35}>
          <Button
            appearance='primary'
            intent='success'
            marginRight={15}
            onClick={onFormSave}
          >
            {message('uploadVideoPanel.buttons.save')}
          </Button>
          <Button onClick={onFormReset}>{message('uploadVideoPanel.buttons.cancel')}</Button>
        </Pane>
      </Pane>
    </SideSheet>
  );
};

export default UploadVideoPanel;
