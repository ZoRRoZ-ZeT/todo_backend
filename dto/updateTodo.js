// eslint-disable-next-line import/extensions
import ValidationError from '../exceptions/validation.js';
import { isBoolean, isNumber, isRequired, isString, validateMultiple } from '../utils/validations.js';

class UpdateTodoDto {
  constructor(data = {}) {
    this.id = data.id;
    this.value = data.value;
    this.isChecked = data.isChecked;

    this.validateData();
  }

  validateData() {

    const fieldsToValidate = [
      {field: 'id', value: this.id, validators: [isRequired,isNumber] },
      {field: 'value', value: this.value, validators: [isRequired,isString] },
      {field: 'isChecked', value: this.isChecked, validators: [isRequired,isBoolean] },
    ];

    const errors = validateMultiple(fieldsToValidate);

    if (errors.length) {
      throw new ValidationError(errors);
    }
  }
}

export default UpdateTodoDto;
