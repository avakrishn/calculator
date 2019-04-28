window.onload = () => {
    initCalc();
}

const initCalc = () =>{
    // 1. state
    const state = {
        display : 0
    }

    const symbolsArray = ['/', 'x', '-', '+', '='];
    
    // 2. references to DOM elements 
    const display = document.getElementById('display');
    const keypad = document.getElementById('keypad');

    // 3. create number buttons
    
    const numberDiv = createDivWithClass('numberDiv');
    const positiveNumbers = createDivWithClass('positiveNumbers');

    for(let i = 9; i > 0; i--){
        const number = createButton(i, 'number');
        positiveNumbers.append(number);
    }

    const clear = createButton('AC', 'number');
    const plusMinus = createButton('+/-', 'number');
    const mod = createButton('%', 'number');
    const zero = createButton(0, 'number');
    zero.setAttribute('id', 'zero');
    const dot = createButton('.', 'number');


    numberDiv.append(clear, plusMinus, mod, positiveNumbers, zero, dot);

    // 4. Create symbol buttons;

    const symbolsDiv = createDivWithClass('symbolsDiv');
    symbolsArray.forEach(s => {
        const symbol = createButton(s, 'symbol');
        symbolsDiv.append(symbol);
    });

    keypad.append(numberDiv, symbolsDiv);
    display.innerHTML = state.display;




    function createDivWithClass(classname){
        const element = document.createElement('div');
        element.classList.add(classname);
        return element;
    }


    function createButton (id, className){
        const btn = document.createElement('button');
        btn.classList.add(className);
        btn.innerHTML = id;
        return btn;
    }
    
}