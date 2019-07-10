const calculator = () => {

    const state = {
        output: '',
        input: '',
        typesLog: ['begin'],
        calculatorType: 'engineering',
        decimalPlace: 2,
      };

      const changeState = (input, output, newType) => {
        const {typesLog} = state;
        const newTypesLog = typesLog.slice()
        newTypesLog.push(...newType);
        state.output += output;
        state.input += input;
        state.typesLog = newTypesLog;
        render();
    };

    const clickCalculatorButton = (e) => {
        const buttonType = e.target.dataset.type;
        const {typesLog} = state;
        const currentType = typesLog[typesLog.length - 1];
        switch (buttonType) {
            case 'multiply':
                const multiplyTypes = ['constE', 'constPI', 'closeBracket', 'zero', 'number'];
                if (!multiplyTypes.includes(currentType)) return
                changeState(e.target.innerText, e.target.innerText, ['multiply']);
                break
            case 'number':
                if (currentType === 'closeBracket') return
                changeState(e.target.innerText, e.target.innerText, ['number']);
                break
            case 'constPI':
                const constPITypes = ['plus', 'multiply', 'openBracket', 'begin'];
                if (!constPITypes.includes(currentType)) return
                changeState('Math.PI', 'π', ['constPI']);
                break
            case 'constE':
                const constETypes = ['plus', 'multiply', 'openBracket', 'begin'];
                if (!constETypes.includes(currentType)) return
                changeState('Math.E', 'e', ['constE']);
                break
            case 'minusPlus':
                const minusPlusTypes = ['constPI', 'constE', 'openBracket', 'closeBracket', 'zero', 'begin', 'number'];
                if (!minusPlusTypes.includes(currentType)) return
                changeState(e.target.innerText, e.target.innerText, ['plus']);
                break
            case 'zero':
                const zeroTypes = ['plus', 'multiply', 'begin', 'openBracket'];
                if (currentType === 'closeBracket' || currentType === 'zero' && zeroTypes.includes(typesLog[typesLog.length - 2])) return
                changeState('0', '0', ['zero']);
                break
            case 'dote':
                if (currentType !== 'number' && currentType !== 'zero') return
                const doteTypes = ['plus', 'multiply', 'begin'];
                for (let i = typesLog.length - 1; i >= 0; i -= 1) {
                    if (typesLog[i] === 'dote') return
                  if (doteTypes.includes(typesLog[i])) break
                };
                changeState('.', '.', ['dote']);
                break
            case 'openBracket': 
                const openBracketTypes = ['plus', 'multiply', 'openBracket', 'function', 'begin', 'pow', 'sqrt'];
                if (!openBracketTypes.includes(currentType)) return
                changeState('(', '(', ['openBracket']);
                break
            case 'closeBracket':
                const closeBracketTypes = ['constE', 'constPI', 'closeBracket', 'zero', 'number'];
                if (!closeBracketTypes.includes(currentType)) return
                changeState(')', ')', ['closeBracket']);
                break
            case 'pow':
                const powTypes = ['constE', 'constPI', 'closeBracket', 'zero', 'number'];
                if (!powTypes.includes(currentType)) return
                changeState('**(', '^(', ['pow', 'openBracket']);
                break
            case 'sin':
                const sinTypes = ['plus', 'multiply', 'openBracket', 'begin'];
                if (!sinTypes.includes(currentType)) return
                changeState('Math.sin(', 'sin(', ['function', 'openBracket']);
                break
            case 'cos':
                const cosTypes = ['plus', 'multiply', 'openBracket', 'begin'];
                if (!cosTypes.includes(currentType)) return
                changeState('Math.cos(', 'cos(', ['function', 'openBracket']);
                break
            case 'tan': 
                const tanTypes = ['plus', 'multiply', 'openBracket', 'begin'];
                if (!tanTypes.includes(currentType)) return
                changeState('Math.tan(', 'tan(', ['function', 'openBracket']);
                break
            case 'sqrt':
                const sqrtTypes = ['plus', 'multiply', 'openBracket', 'begin'];
                if (!sqrtTypes.includes(currentType)) return
                changeState('Math.sqrt(', '√(', ['sqrt', 'openBracket']);
                break
            case 'pow2':
                const pow2Types = ['constE', 'constPI', 'closeBracket', 'zero', 'number'];
                if (!pow2Types.includes(currentType)) return
                changeState('**(2)', '^(2)', ['pow', 'openBracket', 'number', 'closeBracket']);
                break
            case 'back':
                clickBack();
                break
            case 'equally':
                clickEqually();
                break
            case 'C':
                clickC();
                break    
            default:
                break
        };
    };

    const clickBack = () => {
        const {typesLog, input, output} = state;
        const currentType = typesLog[typesLog.length - 1];
        const newState = {};
        newState.typesLog = typesLog.slice(0, typesLog.length - 1);
        switch (currentType) {
          case 'pow':
            newState.output = output.slice(0, output.length - 1);
            newState.input =  input.slice(0, input.length - 2);
            break;
          case 'function':
            newState.output = output.slice(0, output.length - 3);
            newState.input =  input.slice(0, input.length - 8);
            break;
          case 'sqrt':
            newState.output = output.slice(0, output.length - 1);
            newState.input = input.slice(0, input.length - 9);
            break;
          case 'constPi':
            newState.output = output.slice(0, output.length - 1);
            newState.input = input.slice(0, input.length - 7);
            break;
          case 'constE':
            newState.output = output.slice(0, output.length - 1);
            newState.input = input.slice(0, input.length - 6);
            break;
          case 'begin':
            return;
          default: 
            newState.output = output.slice(0, output.length - 1);
            newState.input =  input.slice(0, input.length - 1);
            break;
        };
          state.output = newState.output;
          state.input = newState.input;
          state.typesLog = newState.typesLog;
          render()
    };

    const clickEqually = () => {
        const {input} = state;
        if (input.length === 0) return; 
        try {
          eval(input);
        }
        catch (err) {
          alert('incorrect statement!');
        }
         state.output = Math.round(eval(input) * 10 ** state.decimalPlace) / 10 ** state.decimalPlace;
         state.input = Math.round(eval(input) * 10 ** state.decimalPlace) / 10 ** state.decimalPlace;
        render();
    };

    const clickC = () => {
        state.output = '';
        state.input = '';
        state.typesLog = ['begin'];
        render()
    };

    const render = () => {
        const {calculatorType} = state;
        const engineering = document.querySelector('.calculatorEngineering');
        const simple = document.querySelector('.calculatorSimple');
        if (calculatorType === 'engineering') {
            simple.classList.add('hidden');
            engineering.classList.remove('hidden');
        }
        else {
            simple.classList.remove('hidden');
            engineering.classList.add('hidden');
        }
        const outputs = document.querySelectorAll('.output');
        [...outputs].forEach(output => {
          output.innerText = state.output;
        })
    };

    const buttons = document.getElementsByClassName('num-button');
    [...buttons].forEach(button => {
        button.addEventListener('click', clickCalculatorButton)
    });

    const engineering = document.querySelector('.calculatorEngineering');
    engineering.addEventListener('click', () => {
        state.calculatorType = 'engineering';
        render();    
    });

    const simple = document.querySelector('.calculatorSimple');
    simple.addEventListener('click', () => {
        state.calculatorType = 'simple';
        render()    
    });

    const decimalPlace = document.querySelector('#decimalPlace');
    decimalPlace.addEventListener('change', (e) => {
        state.decimalPlace = e.target.value;
    });
}

calculator();

