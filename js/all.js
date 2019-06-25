class MyCalculator {
  constructor(preExpression, curExpression) {
    this.preInnerText = preExpression;
    this.curInnerText = curExpression;
    this.Clear();
  }

  Clear(zero) {
    this.preOperand = '';
    this.operator = '';
    if (zero) {
      this.curOperand = '0';
    } else {
      this.curOperand = '';
    }
  }

  appendNum(num) {
    let n = num;
    if (n === '.' && this.curOperand.includes('.')) return;
    if (this.curOperand === '' && n === '00') {
      n = '0';
    }
    if (this.curOperand === '0' && n === '00') return;
    if (this.curOperand === '0' && n !== '.') {
      this.curOperand = this.curOperand.slice(0, -1);
    }
    this.curOperand = this.curOperand + n;
  }

  chooseoperator(operator) {
    if (this.curOperand === '') return;
    if (this.curOperand !== '') {
      this.computed();
    }
    this.operator = operator;
    this.preOperand = this.curOperand;
    this.curOperand = '';
  }

  computed() {
    let sum;
    const preValue = parseFloat(this.preOperand);
    const curValue = parseFloat(this.curOperand);
    if (Number.isNaN(preValue) || Number.isNaN(curValue)) return;
    switch (this.operator) {
      case '+':
        sum = preValue + curValue;
        break;
      case '-':
        sum = preValue - curValue;
        break;
      case '×':
        sum = preValue * curValue;
        break;
      case '÷':
        sum = preValue / curValue;
        break;
      default:
        break;
    }
    this.preOperand = '';
    this.curOperand = sum;
    this.operator = '';
  }

  delete() {
    this.curOperand = this.curOperand.toString().slice(0, -1);
  }

  // eslint-disable-next-line class-methods-use-this
  getThousands(num) {
    let n = num;
    if (typeof n === 'number') {
      n = n.toString();
    }
    let integerNum = parseFloat(n.split('.')[0]);
    const decimalNum = n.split('.')[1];
    if (Number.isNaN(integerNum)) {
      integerNum = '';
    } else {
      integerNum = integerNum.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalNum !== undefined) {
      return `${integerNum}.${decimalNum}`;
    }
    return integerNum;
  }

  displayText() {
    this.curInnerText.innerText = this.getThousands(this.curOperand);
    if (this.operator !== '') {
      this.preInnerText.innerText = `${this.getThousands(this.preOperand)} ${this.operator}`;
    } else {
      this.preInnerText.innerText = '';
    }
  }
}

const preExpression = document.querySelector('.calculator__header__expression');
const curExpression = document.querySelector('.calculator__header__result');
const numButton = document.querySelectorAll('.num');
const operatorsButton = document.querySelectorAll('.operator');
const allClearButton = document.querySelector('.allClear');
const backspaceButton = document.querySelector('.backspace');
const equalButton = document.querySelector('.equal');

const calculator = new MyCalculator(preExpression, curExpression);

numButton.forEach((btn) => {
  btn.addEventListener('click', () => {
    calculator.appendNum(btn.innerText);
    calculator.displayText();
  });
});

operatorsButton.forEach((btn) => {
  btn.addEventListener('click', () => {
    calculator.chooseoperator(btn.innerText);
    calculator.displayText();
  });
});

equalButton.addEventListener('click', () => {
  calculator.computed();
  calculator.displayText();
});

backspaceButton.addEventListener('click', () => {
  calculator.delete();
  calculator.displayText();
});

allClearButton.addEventListener('click', () => {
  calculator.Clear(true);
  calculator.displayText();
});
