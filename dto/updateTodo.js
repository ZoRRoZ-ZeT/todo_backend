class UpdateTodoDto {
  constructor(data = {}) {
    this.id = data.id;
    this.value = data.value;
    this.isChecked = data.isChecked ?? false;
  }
}

export default UpdateTodoDto;
