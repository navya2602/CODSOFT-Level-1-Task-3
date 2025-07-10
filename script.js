let currentInput = '0';
let previousInput = '';
let operation = null;
let resetInput = false;

const display = document.getElementById('display');
const themeToggle = document.getElementById('themeToggle');

function updateDisplay() {
    display.textContent = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || resetInput) {
        currentInput = number;
        resetInput = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetInput = true;
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = prev / current; break;
        default: return;
    }

    currentInput = result.toString();
    operation = null;
    resetInput = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function backspace() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function percentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

document.addEventListener('keydown', (e) => {
    if (/[0-9]/.test(e.key)) appendNumber(e.key);
    else if (e.key === '.') appendNumber('.');
    else if (e.key === 'Enter') calculate();
    else if (e.key === 'Escape') clearDisplay();
    else if (e.key === 'Backspace') backspace();
    else if (/[+\-*/]/.test(e.key)) appendOperator(e.key);
    else if (e.key === '%') percentage();
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀';
});