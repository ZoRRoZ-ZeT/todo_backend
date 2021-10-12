class TodoDto {
  constructor({
    id,
    value,
    isChecked,
    priority,
    sort,
  }) {
    this.id = id;
    this.value = value;
    this.isChecked = isChecked;
    this.priority = priority;
    this.sort = sort;
  }
}

export default TodoDto;
