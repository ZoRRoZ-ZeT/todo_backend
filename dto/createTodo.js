class CreateTodoDto {
  constructor(data = {}) {
    this.value = data.value;
    this.isChecked = data.isChecked ?? false;
  }
}

export default CreateTodoDto;
