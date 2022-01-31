const numbersButtons = document.querySelectorAll('[data-number]');
const operatorsButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equal]');
const removeButton = document.querySelector('[data-remove]');
const clearButton = document.querySelector('[data-clear]');
const pointButton = document.querySelector('[data-point]')
const commaButton = document.querySelector('[data-comma]')
const previousElement = document.querySelector('[data-output-previous]');
const currentElement = document.querySelector('[data-output-current]');


let current = ''
let previous = ''
let operator = ''
let result = ''


const appendNumber = numberText => {
    current += numberText
}

const appendPoint = pointText => {
    if (current.includes('.')) return
    if (current === '') {
        current = '0'
    }
    current += pointText
}

const display = () => {
    if (previous === '') {
        operator = ''
    }
    currentElement.textContent = `${current}`
    previousElement.textContent = `${previous} ${operator}`

}

const checkOperator = operatorText => {

    return operator = operatorText
}

const saveOperation = () => {
    if (current === '' && previous === '') return
    if (current === '' && previous !== '' && operator != undefined) {
        return
    }
    if (current !== '' && previous !== '' && operator != undefined) {
        calculate()
    }
    previous = current
    current = ''
    display()
}

const remove = () => {
    current = current.slice(0, -1);
    display()
}

const calculate = () => {
    let prev = parseFloat(previous)
    let curr = parseFloat(current)
    if (isNaN(prev) || isNaN(curr) || operator == undefined) {

        alert("Error")
        return
    }
    switch (operator) {
        case '+':
            result = prev + curr
            break;
        case '-':
            result = prev - curr
            break;
        case 'x':
            result = prev * curr
            break;
        case '÷':
            result = prev / curr
            break;

        default:
            return
    }
    current = result.toString();

    previous = ''
    operator = ''

    display()
}

const handleKeyboardInput = inputed => {
    let key = inputed.key
    if (key == '*') key = 'x'
    if (key == '/') key = '÷'
    if (key >= 0 && key <= 9) appendNumber(key)
    if (key == '.') appendPoint(key)
    if (key == '+' || key == '-' || key == '÷' || key == 'x') {
        checkOperator(key)
        saveOperation()
    }
    if (key == 'Enter' || key == '=') calculate()
    if (key == 'Backspace') remove()
    if (key == 'Delete') clear()
    display()
}

const clear = () => {
    current = ''
    previous = ''
    operator = ''
    currentElement.textContent = ''
    previousElement.textContent = ''
}

numbersButtons.forEach(button => {
    button.addEventListener('click', e => {
        let numberText = e.target.textContent
        appendNumber(numberText);
        display()
    })
})

operatorsButtons.forEach(button => {
    button.addEventListener('click', e => {
        let operatorText = e.target.textContent
        saveOperation()
        checkOperator(operatorText)
        display()
    })
})

pointButton.addEventListener('click', e => {
    let pointText = e.target.textContent
    appendPoint(pointText)
    display()
})

equalButton.addEventListener('click', calculate)

clearButton.addEventListener('click', clear)

removeButton.addEventListener('click', remove)

window.addEventListener('keydown', handleKeyboardInput)

