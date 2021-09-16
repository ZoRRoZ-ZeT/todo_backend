class TodoDto {
  constructor({
    id,
    value,
    isChecked,
    priority,
  }) {
    this.id = id;
    this.value = value;
    this.isChecked = isChecked;
    this.priority = priority;
  }
}

export default TodoDto;
