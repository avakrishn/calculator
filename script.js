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
        appendNumber: true,
        // pemdas: '',
        // pemdasNumber: null,
        addDecimal: false,
        isDecimal: false,
        
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
    document.onkeypress = function (event){ btnClicked(event); }

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

    function btnClicked(event){
        const btnData = (event.key) ? event.key : this.getAttribute('data-key');
    
        if(!isNaN(parseFloat(btnData))){ // number
        //    if(state.operation === ''){
            // updateState(parseFloat(state.number + btnData), state.operation, 'number');

        //    }else{
            updateState("number", parseFloat(btnData), state.operation, 'number');

        //    } 
        }else if(btnData === '=' || btnData ==="Enter"){
            updateState("symbol", parseFloat(state.number), btnData, 'total');
        }else if(btnData === '%'){
            updateState("percent", parseFloat(state.number), btnData, 'total');
        }else if(symbolsSet.has(btnData)){
            updateState("symbol", parseFloat(state.number), btnData, 'total');
        }else if(btnData === "+/-"){
            updateState("plusMinus", parseFloat(state.number * -1), state.operation, 'number');
        }else if(btnData === "."){
            updateState('dot', parseFloat(state.number), btnData);
        }else if(btnData === "C" || btnData === 'c'){
            updateState("clear", 0, '', 'number', 0);

        } 
    }
    
    function updateState(btnPress, number, operation, display, total){
        if(btnPress === "dot"){
            if(!state.isDecimal){
                state.addDecimal = true;
                state.isDecimal = true;
                document.getElementById('display').innerHTML = state.number +".";
                return;
            }
            return;
        }

        if(btnPress === "percent"){
            // if(state.total !== state.number){
            //     state.number = (state.number /100) * state.total;
            // }else{
            //     state.number = (state.number /100)
            //     state.total = state.number;
            //     state.number = 0;
            //     syncDisplay(display);
            //     return; 
            // }
            state.total = state.total / 100;
            state.number = 0;
            syncDisplay(display);
            return;
        }

        if(btnPress === "number"){
            if(state.addDecimal === true){
                state.number = parseFloat(state.number +"."+ number);
                state.addDecimal = false;
            }else{
                state.number = parseFloat(state.number +""+ number);
            }
            
            if(state.appendNumber == true){
                state.total = state.number;
            }
            state.operation = operation;
            syncDisplay(display);
            // console.log(state);
            return;
        }

        if(btnPress === "plusMinus"){
            state.number = number;
            if(state.appendNumber == true){
                state.total = state.number;
            }
            state.operation = operation;
            syncDisplay(display);
            // console.log(state);
            return;
        }

        if(btnPress === 'clear'){
            state.total = total;
            state.appendNumber = true;
            state.number = number;
            state.operation = operation;
            state.addDecimal = false;
            state.isDecimal = false;
            // state.pemdas = "";
            // state.pemdasNumber = null;
            syncDisplay(display);
            // console.log(state);
            return;
            
        }

        if(operation !== "=" && operation !== "Enter"){
            if(state.appendNumber === true){
                state.appendNumber = false;
            }
            // let pemdas_state = (state.operation === "+" || state.operation === "-");
            // let pemdas = (operation === "x" || operation === "/" || operation === "%");
            // if(pemdas_state && pemdas){
            //     state.pemdas = state.operation;
            //     state.pemdasNumber = state.total;
            //     state.total = number;
            //     state.number = 0;
            //     state.operation = operation;
            //     syncDisplay("total");
            //     return;
            //     // doMath(state.operation, number);
            // }else{
                doMath(state.operation, number);
            // }
            
            if(operation == "" ){
                state.number = number;

            }else{
                state.number = 0;
            }
            
            state.operation = operation;
            syncDisplay(display);
            // console.log(state);
            return;
        }

        // if((operation === "=" || operation === "Enter" )&& state.pemdasNumber !== null){
        //     doMath(state.operation, number);
        //     console.log(state.total);
        //     let temp = state.total;
        //     state.total = state.pemdasNumber;
        //     state.pemdasNumber = temp;
        //     doMath(state.pemdas, state.pemdasNumber);
        //     console.log(state.total);
        //     state.number =  0;
        //     state.pemdas = "";
        //     state.pemdasNumber = null;
        //     syncDisplay("total");
        //     return;
        // }
        if(operation === "=" || operation ==="Enter"){
            doMath(state.operation, number);
            state.number = 0;
            state.operation = "";
            state.appendNumber = true;
            state.isDecimal = false;
            state.addDecimal = false;
            syncDisplay(display);
            return;
        }

     
        // console.log(state);
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
                result = state.total - number;
                state.total = result;
                break;
            case '+':
                result = state.total + number;
                state.total = result;
                break;
            // case '%':
            //     result = state.total %  number;
            //     state.total = result;
            //     break;
            default:
                return;
            
        }
    }

    function syncDisplay(key){
        display.innerHTML = state[key];
        console.log(state);
    }

}