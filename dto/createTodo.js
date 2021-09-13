// eslint-disable-next-line import/extensions
import { isRequired, isString, validateSingle } from '../utils/validations.js';
import ValidationError from '../validations/error.js';

class CreateTodoDto {
  constructor(data = {}) {
    this.value = data.value;
    this.isChecked = data.isChecked ?? false;

    this.validate();
  }

  validate() {
    const error = validateSingle('value', this.value, [isRequired, isString]);

    if (error) {
      throw new ValidationError(error);
    }
  }
}

export default CreateTodoDto;
