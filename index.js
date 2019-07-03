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
        state.output = state.output + output;
        state.input = state.input + input;
        state.typesLog = newTypesLog;
        render();
    };

    const handleClickNum = (e) => {
        const {typesLog} = state;
        const currentType = typesLog[typesLog.length - 1];
        if (currentType === 'closeBracket') return
        changeState(e.target.innerText, e.target.innerText, ['number'])
    };

    const handleClickPi = () => {
        const {typesLog} = state;
        const currentType = typesLog[typesLog.length - 1];
        const types = ['plus', 'multiply', 'openBracket', 'begin'];
        if (!types.includes(currentType)) return
        changeState('Math.PI', 'π', ['constPI'])
    };

    const handleClickE = () => {
        const {typesLog} = state;
        const currentType = typesLog[typesLog.length - 1];
        const types = ['plus', 'multiply', 'openBracket', 'begin'];
        if (!types.includes(currentType)) return
        changeState('Math.E', 'e', ['constE'])
    };

    const handleClickPlus = e => {
        const {typesLog} = state;
        const currentType = typesLog[typesLog.length - 1];
        const types = ['constPI', 'constE', 'openBracket', 'closeBracket', 'zero', 'begin', 'number'];
        if (!types.includes(currentType)) return
        changeState(e.target.innerText, e.target.innerText, ['plus'])    
    };

    const handleClickMultiply = e => {
        const {typesLog} = state;
        const currentType = typesLog[typesLog.length - 1];
        const types = ['constE', 'constPI', 'closeBracket', 'zero', 'number'];
        if (!types.includes(currentType)) return
        changeState(e.target.innerText, e.target.innerText, ['multiply'])
    };

    const handleClickZero = () => {
        const {typesLog} = state;
        const types = ['plus', 'multiply', 'begin', 'openBracket'];
        const currentType = typesLog[typesLog.length - 1];
        if (currentType === 'closeBracket' || currentType === 'zero' && types.includes(typesLog[typesLog.length - 2])) return
        changeState('0', '0', ['zero'])
    };

    const handleClickDote = () => {
        const {typesLog} = state;
        const currentType = typesLog[typesLog.length - 1];
        if (currentType !== 'number' && currentType !== 'zero') return
        const types = ['plus', 'multiply', 'begin'];
        for (let i = typesLog.length - 1; i >= 0; i -= 1) {
          if (typesLog[i] === 'dote') return
          if (types.includes(typesLog[i])) break
        };
        changeState('.', '.', ['dote'])
    };

    const handleClickOpenBracket = () => {
        const {typesLog} = state;
        const currentType = typesLog[typesLog.length - 1];
        const types = ['plus', 'multiply', 'openBracket', 'function', 'begin', 'pow', 'sqrt'];
        if (!types.includes(currentType)) return
        changeState('(', '(', ['openBracket'])
    }; 
    
    const handleClickCloseBracket = () => {
        const {typesLog} = state;
        const currentType = typesLog[typesLog.length - 1];
        const types = ['constE', 'constPI', 'closeBracket', 'zero', 'number'];
        if (!types.includes(currentType)) return
        changeState(')', ')', ['closeBracket'])
    }; 

    const handleClickBack = () => {
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

    const handleClickEqually = () => {
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

    const handleClickC = () => {
        state.output = '';
        state.input = '';
        state.typesLog = ['begin'];
        render()
    };

    const clickSimple = () => {
        state.calculatorType = 'simple';
        render()
    };

    const clickEngineering = () => {
        state.calculatorType = 'engineering';
        render();
    }

    const handleClickPow = () => {
      const {typesLog} = state;
      const currentType = typesLog[typesLog.length - 1];
      const types = ['constE', 'constPI', 'closeBracket', 'zero', 'number'];
      if (!types.includes(currentType)) return
      changeState('**(', '^(', ['pow', 'openBracket'])    
    };
  
    const handleClickSin = () => {
      const {typesLog} = state;
      const currentType = typesLog[typesLog.length - 1];
      const types = ['plus', 'multiply', 'openBracket', 'begin'];
      if (!types.includes(currentType)) return
      changeState('Math.sin(', 'sin(', ['function', 'openBracket'])      
    };
  
    const handleClickCos = () => {
      const {typesLog} = state;
      const currentType = typesLog[typesLog.length - 1];
      const types = ['plus', 'multiply', 'openBracket', 'begin'];
      if (!types.includes(currentType)) return
      changeState('Math.cos(', 'cos(', ['function', 'openBracket'])      
    };
  
    const handleClickTan = () => {
      const {typesLog} = state;
      const currentType = typesLog[typesLog.length - 1];
      const types = ['plus', 'multiply', 'openBracket', 'begin'];
      if (!types.includes(currentType)) return
      changeState('Math.tan(', 'tan(', ['function', 'openBracket'])      
    };
  
    const handleClickSqrt = () => {
      const {typesLog} = state;
      const currentType = typesLog[typesLog.length - 1];
      const types = ['plus', 'multiply', 'openBracket', 'begin'];
      if (!types.includes(currentType)) return
      changeState('Math.sqrt(', '√(', ['sqrt', 'openBracket'])     
    };

    const handleClickPow2 = () => {
      const {typesLog} = state;
      const currentType = typesLog[typesLog.length - 1];
      const types = ['constE', 'constPI', 'closeBracket', 'zero', 'number'];
      if (!types.includes(currentType)) return
      changeState('**(2)', '^(2)', ['pow', 'openBracket', 'number', 'closeBracket'])
    };

    const changeDecimalPlace = (e) => {
      const decimalPlace = e.target.value;
      state.decimalPlace = decimalPlace;
      console.log(decimalPlace);
      render()
    }

    const decimalPlace = document.querySelector('#decimalPlace');
    decimalPlace.addEventListener('change', changeDecimalPlace);


    //adding of events
    const addEvent = (arr) => {
      for (let i = 0; i < arr.length; i += 1) {
        const selector = arr[i][0];
        const func = arr[i][1];
        const buttons = document.querySelectorAll(selector);
        [...buttons].forEach(button => {
          button.addEventListener('click', func)
        })
      }
    }

    //array of selectors and functions
    const selectorsAndFunctions = [
      ['.minusPlus', handleClickPlus],
      ['.pow', handleClickPow],
      ['.constPI', handleClickPi],
      ['.constE', handleClickE],
      ['.C', handleClickC],
      ['.equally', handleClickEqually],
      ['.openBracket', handleClickOpenBracket],
      ['.closeBracket', handleClickCloseBracket],
      ['.number', handleClickNum],
      ['.multiply', handleClickMultiply],
      ['.zero', handleClickZero],
      ['.dote', handleClickDote],
      ['.back', handleClickBack],
      ['.sin', handleClickSin],
      ['.tan', handleClickTan],
      ['.cos', handleClickCos],
      ['.sqrt', handleClickSqrt],
      ['.pow2', handleClickPow2]
    ];

    addEvent(selectorsAndFunctions);

    const simple = document.querySelector('#simple');
    simple.addEventListener('click', clickSimple);

    const engineering = document.querySelector('#engineering');
    engineering.addEventListener('click', clickEngineering);

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
}

  calculator();