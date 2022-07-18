import './style.css'
const numbersButtons = document.querySelectorAll("[data-number]");
const operatorsButtons = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equal]");
const removeButton = document.querySelector("[data-remove]");
const clearButton = document.querySelector("[data-clear]");
const pointButton = document.querySelector("[data-point]");

const previousElement = document.querySelector("[data-output-previous]");
const currentElement = document.querySelector("[data-output-current]");

let current = "";
let previous = "";
let operator = "";
let result: number;

const appendNumber = (numberText: string) => {
  if (current === "0") current = ""
  current += numberText;
};

const appendPoint = (pointText: string) => {
  if (current.includes(".")) return;
  if (current === "") {
    current = "0";
  }
  current += pointText;
};

const display = () => {
  if (previous === "") {
    operator = "";
  }
  if (currentElement) currentElement.textContent = `${current}`;
  if (previousElement) previousElement.textContent = `${previous} ${operator}`;
};

const checkOperator = (operatorText: string) => {
  return (operator = operatorText);
};

const saveOperation = () => {
  if (current === "" && previous === "") return;
  if (current === "" && previous !== "" && operator != undefined) {
    return;
  }
  if (current !== "" && previous !== "" && operator != undefined) {
    calculate();
  }
  previous = current;
  current = "";
  display();
};

const remove = () => {
  current = current.slice(0, -1);
  display();
};

const calculate = () => {
  let prev = parseFloat(previous);
  let curr = parseFloat(current);

  checkIfIsNan(prev,curr,operator)

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "x":
      result = prev * curr;
      break;
    case "÷":
      result = prev / curr;
      break;

    default:
      return;
  }
  current = result.toString();

  previous = "";
  operator = "";

  display();
};
const checkIfIsNan = (prev:number, curr:number, operator:string) => {
  if (isNaN(prev) || isNaN(curr) || operator == undefined) throw new Error("Not a number");
  ;
};
const handleKeyboardInput = (inputed: any) => {
  let key = inputed.key;
  if (key == "*") key = "x";
  if (key == "/") key = "÷";
  if (key >= 0 && key <= 9) appendNumber(key);
  if (key == ".") appendPoint(key);
  if (key == "+" || key == "-" || key == "÷" || key == "x") {
    checkOperator(key);
    saveOperation();
  }
  if (key == "Enter" || key == "=") calculate();
  if (key == "Backspace") remove();
  if (key == "Delete" || key == "c") clear();
  display();
};

const clear = () => {
  current = "";
  previous = "";
  operator = "";
  if (currentElement) currentElement.textContent = "";
  if (previousElement) previousElement.textContent = "";
};

numbersButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let numberText = (e.target as HTMLElement).textContent;
    if (numberText) appendNumber(numberText);
    display();
  });
});

operatorsButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let operatorText = (e.target as HTMLElement).textContent;
    saveOperation();
    if (operatorText) checkOperator(operatorText);
    display();
  });
});

pointButton?.addEventListener("click", (e) => {
  let pointText = (e.target as HTMLElement).textContent;
  if (pointText) appendPoint(pointText);
  display();
});

equalButton?.addEventListener("click", calculate);

clearButton?.addEventListener("click", clear);

removeButton?.addEventListener("click", remove);

window.addEventListener("keydown", handleKeyboardInput);
