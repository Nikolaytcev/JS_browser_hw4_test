import numberFromForm from "./Form/form";

const container = document.querySelector('.container');
const form = new numberFromForm(container);

form.bindToDOM();
