class TodoDTO {
  constructor(data = null) {
    this.id = data?.id;
    this.value = data?.value;
    this.isChecked = data?.isChecked;
  }
}

export default TodoDTO;
