import { useState } from 'react';

export const useTextField = ({ initialValue, resetValue = initialValue, validationFunction = null }) => {
  const [ value, setValue ] = useState(initialValue);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const onReset = () => {
    setErrorMessage(null);
    setValue(resetValue);
  };

  const onValidate = () => {
    if (!validationFunction) {
      return null;
    }

    const errorMessage = validationFunction(value);

    setErrorMessage(errorMessage);
    return errorMessage;
  };

  const onChange = (newValue) => {
    setValue(newValue);
    setErrorMessage(null);
  };

  return {
    value,
    onChange,
    onReset,
    onValidate,
    errorMessage,
    setErrorMessage,
  };
};
