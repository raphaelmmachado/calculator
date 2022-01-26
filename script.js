const numbersButtons = document.querySelectorAll('[data-number]');
const operatorsButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equal]');
const removeButton = document.querySelector('[data-remove]');
const clearButton = document.querySelector('[data-clear]');
const previousElement = document.querySelector('[data-output-previous]');
const currentElement = document.querySelector('[data-output-current]');

let currentOperation = ''
let previousOperation = ''
let operator = ''

//mostrar texto e salvar texto atual na var
function appendNumber(numberText) {
    currentElement.textContent += numberText
    currentOperation = currentElement.textContent
}
//juntar operador com numeros
function appendOperator(operatorText) {
    if (currentElement.textContent === '' || previousElement.textContent !== '') return
    currentElement.textContent += operatorText
}
//mudar texto atual e anterior quando clica em algum operador
function display() {
    if (previousElement.textContent !== '') return
    previousElement.textContent = currentElement.textContent
    currentElement.textContent = '';
}
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
        case '/' || '÷':
            currentElement.textContent = prev / curr;
            currentOperation = prev / curr
            previousElement.textContent = ''
            break;
        case '*':
            currentElement.textContent = prev * curr;
            currentOperation = prev * curr
            previousElement.textContent = ''
            break;
    }
}


function checkOperator(operatorText) {
    if (operatorText === '÷') {
        operatorText = '/'
    }
    return operator = operatorText
}
const saveOperation = () => { previousOperation = currentOperation }
const remove = () => { currentElement.textContent = currentElement.textContent.slice(0, -1); }

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
        checkOperator(operatorText)
    })
})

equalButton.addEventListener('click', eval)

clearButton.addEventListener('click', clear)

removeButton.addEventListener('click', remove)
