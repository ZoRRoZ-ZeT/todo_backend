/* eslint-disable import/extensions */
import PRIORITIES from '../constants/priorities.js';
import ValidationError from '../exceptions/validation.js';
import { isRequired, isString, validateSingle } from '../utils/validations.js';

class CreateTodoDto {
  constructor(data = {}) {
    this.value = data.value;
    this.isChecked = data.isChecked ?? false;
    this.priority = PRIORITIES.NONE;

    this.validate();
  }

  validate() {
    const errors = [];
    const validationResult = validateSingle('value', this.value, [isRequired, isString]);
    if (validationResult) {
      errors.push(validationResult);
    }

    if (errors.length) {
      throw new ValidationError(errors);
    }
  }
}

export default CreateTodoDto;
