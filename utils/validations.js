export const isRequired = (value) => ((value === undefined) ? 'Field is required' : undefined);
export const isNumber = (value) => ((typeof value !== 'number') ? 'Field must be number' : undefined);

export const isString = (value) => ((typeof value !== 'string') ? 'Field must be string' : undefined);

export const isBoolean = (value) => ((typeof value !== 'boolean') ? 'Field must be boolean' : undefined);

export const isOnList = (list) => (value) => {
  if (!list.includes(value)) {
    return `Field must one of the list values [${list.join(',')}]`;
  }
  return undefined;
};

export const validateSingle = (fieldName, value, validators) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const validator of validators) {
    const validationResult = validator(value);
    if (validationResult !== undefined) {
      return {
        field: fieldName,
        message: validationResult,
      };
    }
  }
  return null;
};

export const validateMultiple = (dataToValidate) => {
  const errors = [];
  dataToValidate.forEach((item) => {
    const validationResult = validateSingle(item.field, item.value, item.validators);
    if (validationResult) {
      errors.push(validationResult);
    }
  });
  return errors;
};
