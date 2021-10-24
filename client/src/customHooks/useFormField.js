import { useState } from 'react';

export const useTextField = ({ initialValue, resetValue, validationFunction }) => {
  const [ value, setValue ] = useState(initialValue);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const onReset = () => {
    setErrorMessage(null);
    setValue(resetValue);
  };

  const onValidate = () => {
    const errorMessage = validationFunction(value);

    setErrorMessage(errorMessage);
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
