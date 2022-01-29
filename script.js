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
    currentElement.textContent = current
    previousElement.textContent = `${previous}${operator}`
}

const checkOperator = operatorText => {
    return operator = operatorText
}

const saveOperation = operatorText => {
    if (current === '' && previous === '') {
        return
    } else if (current === '' && previous.includes(operatorText)) {
        return
    } else if (current !== '' && previous !== '') {
        eval()
    }
    previous = current
    current = ''
    display()
}

const remove = () => {
    current = current.slice(0, -1);
    display()
}

const eval = () => {
    let prev = parseFloat(previous)
    let curr = parseFloat(current)
    if (isNaN(prev) || isNaN(curr)) {
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
    result = result.toString();
    current = result;
    previous = ''
    operator = ''
    display()
}

const clear = () => {
    current = ''
    previous = ''
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
        saveOperation(operatorText)
        checkOperator(operatorText)
        display()
    })
})

pointButton.addEventListener('click', e => {
    let pointText = e.target.textContent
    appendPoint(pointText)
    display()
})

equalButton.addEventListener('click', eval)

clearButton.addEventListener('click', clear)

removeButton.addEventListener('click', remove)

