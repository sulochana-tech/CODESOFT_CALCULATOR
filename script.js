
      // Calculator state variables
      let currentInput = "0";
      let previousInput = "";
      let operator = "";
      let expression = "";
      let resetScreen = false;

  
      const resultDisplay = document.getElementById("result");
      const expressionDisplay = document.getElementById("expression");

    
      updateDisplay();

      // Input a number
      function inputNumber(num) {
        if (resetScreen) {
          currentInput = num;
          resetScreen = false;
        } else {
          currentInput = currentInput === "0" ? num : currentInput + num;
        }
        updateDisplay();
      }

      // Input a decimal point
      function inputDecimal() {
        if (resetScreen) {
          currentInput = "0.";
          resetScreen = false;
        } else if (!currentInput.includes(".")) {
          currentInput += ".";
        }
        updateDisplay();
      }

      // Input an operator
      function inputOperator(op) {
    
        if (operator && previousInput && !resetScreen) {
          calculate();
        }

     
        operator = op;
        previousInput = currentInput;
        expression = `${previousInput} ${operator}`;
        resetScreen = true;

        updateDisplay();
      }


      function calculate() {
        if (!operator || !previousInput) return;

        let prev = parseFloat(previousInput);
        let current = parseFloat(currentInput);
        let result;


        if (operator === "÷" && current === 0) {
          alert("Error: Cannot divide by zero!");
          clearAll();
          return;
        }

        // Perform calculation based on operator
        switch (operator) {
          case "+":
            result = prev + current;
            break;
          case "-":
            result = prev - current;
            break;
          case "×":
            result = prev * current;
            break;
          case "÷":
            result = prev / current;
            break;
          default:
            return;
        }
        expression = `${previousInput} ${operator} ${currentInput} =`;

        currentInput = result.toString();

        // Reset operator and previous input
        operator = "";
        previousInput = "";

        resetScreen = true;

        updateDisplay();
      }

      function clearAll() {
        currentInput = "0";
        previousInput = "";
        operator = "";
        expression = "";
        resetScreen = false;
        updateDisplay();
      }

      // Backspace - remove last character
      function backspace() {
        if (currentInput.length === 1) {
          currentInput = "0";
        } else {
          currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
      }

     
      function updateDisplay() {
        resultDisplay.textContent = currentInput;
        expressionDisplay.textContent = expression;
      }
      document.addEventListener("keydown", function (event) {
        const key = event.key;

     
        if (key >= "0" && key <= "9") {
          inputNumber(key);
        }

    
        else if (key === ".") {
          inputDecimal();
        }


        else if (key === "+") {
          inputOperator("+");
        } else if (key === "-") {
          inputOperator("-");
        } else if (key === "*") {
          inputOperator("×");
        } else if (key === "/") {
          event.preventDefault(); // Prevent browser search
          inputOperator("÷");
        }

        else if (key === "=" || key === "Enter") {
          event.preventDefault();
          calculate();
        }

    
        else if (key === "Escape" || key === "Delete") {
          clearAll();
        }

        // Backspace
        else if (key === "Backspace") {
          backspace();
        }
      });
  
