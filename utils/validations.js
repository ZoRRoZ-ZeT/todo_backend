export const isRequired = (value) => {
  return (value === undefined) ? 'Field is required' : undefined;
}
export const isNumber = (value) => {
  return (typeof value !== 'number') ? 'Field must be number' : undefined;
}

export const isString = (value) => {
  return (typeof value !== 'string') ? 'Field must be string' : undefined;
}

export const isBoolean = (value) => {
  return (typeof value !== 'boolean') ? 'Field must be boolean' : undefined;
}

export const validateMultiple = (dataToValidate) => {
  const errors = [];
  dataToValidate.forEach((item) => {
    const validationResult = validateSingle(item.field, item.value, item.validators);
    if(validationResult) {
      errors.push(validationResult);
    }
  })
  return errors;
}

export const validateSingle = (fieldName, value, validators) => {
  for(const validator of validators) {
    const validationResult = validator(value);
    if(validationResult !== undefined) {
      return {
        field: fieldName,
        message: validationResult
      };
    }
  }
  return null;
}