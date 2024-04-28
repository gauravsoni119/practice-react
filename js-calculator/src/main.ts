const OPERATORS = ['+', '-', '*', '/', '%', '.'];
// const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
function isNum(text: string | null) {
  return text ? !!parseInt(text) : false;
}

function isOp(text: string | null) {
  return text ? !!OPERATORS.includes(text) : false;
}

function showResult(text: string | null) {
  return text === '=';
}

const calcArea = document.querySelector('textarea') as HTMLTextAreaElement;
const buttons = document.querySelectorAll('#input .panel span');

if (!calcArea) {
  throw 'calc area shoule be defined';
}

function addNums(text: string) {
  const { value } = calcArea;
  const rule = value.length === 0 && text === '.';
  if (!rule) {
    calcArea.value = calcArea.value.concat(text);
  }
}

function deleteVal() {
  const { value } = calcArea;
  calcArea.value = value.substring(0, value.length - 1);
}

function calc() {
  const { value } = calcArea;
  const result = eval(value);
  if (!isNaN(result)) {
    calcArea.value = result;
  } else {
    alert('Wrong expression');
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    console.log(
      'on button click',
      (event.target as HTMLButtonElement).textContent
    );
    const text = (event.target as HTMLButtonElement).textContent;
    if (isNum(text)) {
      addNums(text as string);
    } else if (isOp(text)) {
      addOp(text as string);
    } else if (showResult(text)) {
      calc();
    } else if (text === 'C') {
      calcArea.value = '';
    } else if (text === '<') {
      deleteVal();
    }
  });
});

function addOp(op: string) {
  const { value } = calcArea;
  const lastChar = value[value.length - 1];
  if (lastChar !== op) {
    if (value.length > 0) {
      calcArea.value += op;
    }
  }
  if (OPERATORS.includes(lastChar)) {
    calcArea.value = value.substring(0, value.length - 1).concat(op);
  }
}
