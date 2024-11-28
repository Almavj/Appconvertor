// Toggle Light/Dark Mode
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// --- Main Page Functionality ---
document.getElementById('convert-btn').addEventListener('click', () => {
    const input = document.getElementById('input-number').value.toUpperCase();
    const fromBase = document.getElementById('conversion-base').value;
    const toBase = document.getElementById('main-output-base').value;

    try {
        // Convert input to decimal
        const decimalValue = convertToDecimal(input, fromBase);

        if (isNaN(decimalValue)) {
            throw new Error(`Invalid input value: "${input}" for base "${fromBase}".`);
        }

        // Convert decimal to the desired output base
        const result = convertFromDecimal(decimalValue, toBase);

        // Display the result
        document.getElementById('main-output').textContent = `Output: ${result}`;
    } catch (error) {
        document.getElementById('main-output').textContent = `Error: ${error.message}`;
    }
});

// --- Programming Calculator Functionality ---
document.getElementById('programming-calculator-btn').addEventListener('click', () => {
    document.getElementById('calculator-modal').style.display = 'flex';
});
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('calculator-modal').style.display = 'none';
});

document.getElementById('calculate-btn').addEventListener('click', () => {
    const value1 = document.getElementById('calc-input1').value.toUpperCase();
    const base1 = document.getElementById('calc-base1').value;
    const operator = document.getElementById('calc-operator').value;
    const value2 = document.getElementById('calc-input2').value.toUpperCase();
    const base2 = document.getElementById('calc-base2').value;
    const outputBase = document.getElementById('output-base').value;

    try {
        // Convert both inputs to decimal
        const decimal1 = convertToDecimal(value1, base1);
        const decimal2 = convertToDecimal(value2, base2);

        if (isNaN(decimal1) || isNaN(decimal2)) {
            throw new Error('Invalid input values for the selected bases.');
        }

        // Perform the chosen operation
        let result;
        switch (operator) {
            case 'add':
                result = decimal1 + decimal2;
                break;
            case 'subtract':
                result = decimal1 - decimal2;
                break;
            case 'multiply':
                result = decimal1 * decimal2;
                break;
            case 'divide':
                if (decimal2 === 0) throw new Error('Cannot divide by zero.');
                result = decimal1 / decimal2;
                break;
            default:
                throw new Error('Unknown operator.');
        }

        // Convert result to the selected output base
        const formattedResult = convertFromDecimal(result, outputBase);
        document.getElementById('calc-result').textContent = `Result: ${formattedResult}`;
    } catch (error) {
        document.getElementById('calc-result').textContent = `Error: ${error.message}`;
    }
});

// --- Helper Functions ---
function convertToDecimal(input, base) {
    let parsedValue;

    switch (base) {
        case 'decimal':
            parsedValue = parseFloat(input);
            break;
        case 'binary':
            parsedValue = parseInt(input, 2);
            break;
        case 'octal':
            parsedValue = parseInt(input, 8);
            break;
        case 'hexadecimal':
            parsedValue = parseExtendedHexToDecimal(input);
            break;
        default:
            throw new Error('Invalid base selected.');
    }

    if (isNaN(parsedValue)) {
        throw new Error(`Invalid input value: "${input}" for base "${base}".`);
    }

    return parsedValue;
}

function convertFromDecimal(decimalValue, base) {
    if (isNaN(decimalValue)) throw new Error('Invalid decimal value for conversion.');

    switch (base) {
        case 'decimal':
            return decimalValue.toString(10);
        case 'binary':
            return decimalValue.toString(2);
        case 'octal':
            return decimalValue.toString(8);
        case 'hexadecimal':
            return convertToCustomHex(decimalValue);
        default:
            throw new Error('Invalid output base selected.');
    }
}

function parseExtendedHexToDecimal(input) {
    let decimalValue = 0;
    const base = 36;

    for (let i = 0; i < input.length; i++) {
        const char = input[input.length - 1 - i];
        let value;

        if (char >= '0' && char <= '9') {
            value = parseInt(char);
        } else if (char >= 'A' && char <= 'Z') {
            value = char.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
        } else {
            throw new Error(`Invalid character '${char}' in extended hexadecimal.`);
        }

        decimalValue += value * Math.pow(base, i);
    }

    return decimalValue;
}

function convertToCustomHex(decimalValue) {
    const base = 36;
    let result = '';

    let value = Math.abs(decimalValue);
    while (value > 0) {
        const remainder = value % base;
        result = (remainder < 10 ? remainder : String.fromCharCode('A'.charCodeAt(0) + remainder - 10)) + result;
        value = Math.floor(value / base);
    }

    return (decimalValue < 0 ? '-' : '') + (result || '0');
}
