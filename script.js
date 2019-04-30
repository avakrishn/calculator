window.onload = () => {
    initCalc();
}

const initCalc = () =>{
    // 1. state
    const state = {
        total: 0,
        // display : 0,
        number: 0,
        operation: '',
        initial: true,
    }

    const symbolsArray = ['/', 'x', '-', '+', '='];
    const symbolsSet = new Set();
    
    // 2. references to DOM elements 
    const display = document.getElementById('display');
    const keypad = document.getElementById('keypad');

    // 3. create number buttons
    
    const numberDiv = createElWithClass('div', 'numberDiv');
    const positiveNumbers = createElWithClass('div', 'positiveNumbers');

    for(let i = 9; i > 0; i--){
        const number = createButton(i, 'number');
        positiveNumbers.append(number);
    }

    const clear = createButton('C', 'number');
    const plusMinus = createButton('+/-', 'number');
    const mod = createButton('%', 'number');
    const zero = createButton(0, 'number');
    const dot = createButton('.', 'number');


    numberDiv.append(clear, plusMinus, mod, positiveNumbers, zero, dot);

    // 4. Create symbol buttons;

    const symbolsDiv = createElWithClass('div','symbolsDiv');
    symbolsArray.forEach(s => {
        symbolsSet.add(s);
        const symbol = createButton(s, 'symbol');
        symbolsDiv.append(symbol);
    });

    keypad.append(numberDiv, symbolsDiv);
    syncDisplay('number');


    function createElWithClass(tagname, classname){
        const element = document.createElement(tagname);
        element.classList.add(classname);
        return element;
    }


    function createButton (text, className){
        const btn = createElWithClass('button', className);
        btn.setAttribute('data-key', text);
        btn.innerHTML = text;
        btn.addEventListener('click', btnClicked);
        return btn;
    }

    function btnClicked(){
        const btnData = this.getAttribute('data-key');
        if(!isNaN(parseFloat(btnData))){ // number
           if(state.operation === ''){
            updateState(parseFloat(state.number + btnData),'', 'number');

           }else{
            updateState(parseFloat(btnData), '', 'number');

           } 
        }else if(btnData === '='){
            updateState(parseFloat(state.number), btnData, 'total');
        }else if(symbolsSet.has(btnData) || btnData === '%'){
            updateState(parseFloat(state.number), btnData, 'total');
        }else if(btnData === "+/-"){
            updateState(parseFloat(state.number * -1), state.operation, 'number');
        }else{
            updateState(0, '', 'number', 0);

        } 
    }
    
    function updateState(number, operation, display, total){

        if(state.operation !== ""){
            if(state.initial === true){
                state.initial = false;
            }
            if(state.operation !== "="){
                doMath(state.operation, number);
            }
        }

        if(state.initial === true){
            state.total = number;
        }

        if(total === 0){
            state.total = total;
            state.initial = true;
        }
        
        state.number = number;
        state.operation = operation;

        syncDisplay(display);
     
        console.log(state);
    }

    function doMath(operation, number){
        let result;
        switch (operation){
            case '/':
                result = state.total / number;
                state.total = result;
                break;
            case 'x':
                result = state.total * number;
                state.total = result;
                break;
            case '-':
                result = state.total-number;
                state.total = result;
                break;
            case '+':
                result = state.total + number;
                state.total = result;
                break;
            case '%':
                result = state.total %  number;
                state.total = result;
                break;
            default:
                return;
            
        }
    }

    function syncDisplay(key){
        display.innerHTML = state[key];
    }

}