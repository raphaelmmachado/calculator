const numbersButtons = document.querySelectorAll('[data-number]');
const operatorsButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equal]');
const removeButton = document.querySelector('[data-remove]');
const clearButton = document.querySelector('[data-clear]');
const pointButton = document.querySelector('[data-point]')
const negativeButton = document.querySelector('[data-negative]')
const previousElement = document.querySelector('[data-output-previous]');
const currentElement = document.querySelector('[data-output-current]');


let currentOperation = ''
let previousOperation = ''
let operator = ''

function appendNumber(numberText) {

    currentElement.textContent += numberText
    currentOperation = currentElement.textContent
}

function appendOperator(operatorText) {
    if (currentElement.textContent === '' || previousElement.textContent !== '') return
    currentElement.textContent += operatorText
}
const appendPoint = pointText => {
    if (currentElement.textContent.includes('.')) return
    currentElement.textContent += pointText;
}

const appendNegative = () => {

    if (currentElement.textContent.includes('-')) return
    if (currentElement.textContent !== '') {
        return currentElement.textContent = '-' + currentElement.textContent
    }
    currentElement.textContent += '-'
    currentOperation = currentElement.textContent
}

function display() {
    if (previousElement.textContent !== '') return
    previousElement.textContent = currentElement.textContent
    currentElement.textContent = '';
}

const checkOperator = operatorText => { return operator = operatorText }

const saveOperation = () => { previousOperation = currentOperation }

const remove = () => { currentElement.textContent = currentElement.textContent.slice(0, -1); }

function eval() {
    previousElement.textContent = ''
    currentElement.textContent = ''
    let prev = parseFloat(previousOperation);
    let curr = parseFloat(currentOperation);

    switch (operator) {
        case '+':
            currentElement.textContent = prev + curr;
            currentOperation = prev + curr
            previousElement.textContent = ''
            break;
        case '-':
            currentElement.textContent = prev - curr;
            currentOperation = prev - curr
            previousElement.textContent = ''
            break;
        case '÷':
            currentElement.textContent = prev / curr;
            currentOperation = prev / curr;
            previousElement.textContent = ''
            break;
        case 'x':
            currentElement.textContent = prev * curr;
            currentOperation = prev * curr;
            previousElement.textContent = ''
            break;
    }
}

const clear = () => {
    currentElement.textContent = '';
    previousElement.textContent = '';
    currentOperation = '';
    previousOperation = '';
}

numbersButtons.forEach(button => {
    button.addEventListener('click', e => {
        let numberText = e.target.textContent
        appendNumber(numberText);
    })
})

operatorsButtons.forEach(button => {
    button.addEventListener('click', e => {
        let operatorText = e.target.textContent
        appendOperator(operatorText)
        display();
        saveOperation();
        checkOperator(operatorText);
    })
})
pointButton.addEventListener('click', e => {
    let pointText = e.target.textContent
    appendPoint(pointText)
})
negativeButton.addEventListener('click', appendNegative)

equalButton.addEventListener('click', eval)

clearButton.addEventListener('click', clear)

removeButton.addEventListener('click', remove)