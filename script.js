window.onload = () => {
    initCalc();
}

const initCalc = () =>{
    // 1. state
    const state = {
        total: 0,
        display : 0,
        number: 0,
        operation: ''
    }

    const symbolsArray = ['/', 'x', '-', '+', '='];
    
    // 2. references to DOM elements 
    const display = document.getElementById('display');
    const keypad = document.getElementById('keypad');

    // 3. create number buttons
    
    const numberDiv = createElWithClass('div', 'numberDiv');
    const positiveNumbers = createElWithClass('div', 'positiveNumbers');

    for(let i = 9; i > 0; i--){
        const number = createButton(i, 'number', i);
        positiveNumbers.append(number);
    }

    const clear = createButton('C', 'number', 'clear');
    const plusMinus = createButton('+/-', 'number', 'plusMinus');
    const mod = createButton('%', 'number', 'mod');
    const zero = createButton(0, 'number', 0);
    const dot = createButton('.', 'number', 'dot');


    numberDiv.append(clear, plusMinus, mod, positiveNumbers, zero, dot);

    // 4. Create symbol buttons;

    const symbolsDiv = createElWithClass('div','symbolsDiv');
    symbolsArray.forEach(s => {
        const symbol = createButton(s, 'symbol');
        symbolsDiv.append(symbol);
    });

    keypad.append(numberDiv, symbolsDiv);
    syncDisplay();

    function syncDisplay(){
        display.innerHTML = state.display;
    }

    function createElWithClass(tagname, classname){
        const element = document.createElement(tagname);
        element.classList.add(classname);
        return element;
    }


    function createButton (text, className, dataKey){
        const btn = createElWithClass('button', className);
        btn.setAttribute('data-key', dataKey);
        btn.innerHTML = text;
        btn.addEventListener('click', btnClicked);
        return btn;
    }

    function btnClicked(){
        const btnData = this.getAttribute('data-key');
       if(!isNaN(parseInt(btnData))){
            updateState('display', btnData);
       }else{
        updateState('total', 0);
        updateState('display', 0);
        updateState('number', 0);
        updateState('operation', '');
       } 
    }
    
    function updateState(key, value){
        state[key] = value;
        if(key === 'display'){
            syncDisplay();
        }
    }

}