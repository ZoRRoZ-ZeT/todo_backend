/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import PRIORITIES from '../constants/priorities.js';
import ValidationError from '../exceptions/validation.js';
import {
  isBoolean, isOnList, isRequired, isString, isNumber, validateMultiple,
} from '../utils/validations.js';

class UpdateTodoDto {
  constructor(data = {}) {
    this.id = data.id;
    this.value = data.value;
    this.isChecked = data.isChecked;
    this.priority = data.priority;
    this.sort = data.sort;

    this.validateData();
  }

  validateData() {
    const fieldsToValidate = [
      { field: 'id', value: this.id, validators: [isRequired, isString] },
      { field: 'value', value: this.value, validators: [isRequired, isString] },
      { field: 'isChecked', value: this.isChecked, validators: [isRequired, isBoolean] },
      { field: 'priority', value: this.priority, validators: [isRequired, isOnList(Object.values(PRIORITIES))] },
      { field: 'sort', value: this.sort, validators: [isRequired, isNumber] },
    ];

    const errors = validateMultiple(fieldsToValidate);

    if (errors.length) {
      throw new ValidationError(errors);
    }
  }
}

export default UpdateTodoDto;
