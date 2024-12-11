export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.operators = ["+", "-", "*", "/", "%"];
    this.expression = "";
    this.init();
    this.filter();
  }

  init() {
    const buttons = ["+", "-", "*", "/", "%", 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    this.view.renderButtons(buttons, (btnValue) =>
      this.handleButtonClick(btnValue)
    );
    this.view.updateHistoryDisplay(this.getFilteredHistory());

    document
      .getElementById(`calculateResult-${this.view.instanceId}`)
      .addEventListener("click", () => this.calculateResult());
    document
      .getElementById(`clearDisplay-${this.view.instanceId}`)
      .addEventListener("click", () => this.clearDisplay());
    document
      .getElementById(`deletefun-${this.view.instanceId}`)
      .addEventListener("click", () => this.clearHistory());
  }

  getFilteredHistory() {
    return this.model.getHistory();
  }

  handleButtonClick(btnValue) {
    if (typeof btnValue === "number" || btnValue === 0) {
      this.expression += btnValue;
    } else if (this.operators.includes(btnValue)) {
      if (!this.operators.includes(this.expression.slice(-1))) {
        this.expression += btnValue;
      }
    }
    this.view.inputBox.value = this.expression;
  }

  calculateResult() {
    if (this.expression) {
      try {
        const result = eval(this.expression);
        this.model.saveExpression(this.expression, result);
        this.view.updateHistoryDisplay(this.getFilteredHistory());
        this.view.displayResult(result);
        this.expression = result.toString();
      } catch (error) {
        this.view.displayResult("Error");
        this.expression = "";
      }
    }
  }

  clearDisplay() {
    this.view.clearInput();
    this.expression = "";
  }

  clearHistory() {
    this.model.clearData();
    this.view.updateHistoryDisplay(this.getFilteredHistory());
  }

  filter() {
    const choice = document.getElementById(`choice-${this.view.instanceId}`);
    const filterop = document.getElementById(`filter-${this.view.instanceId}`);
    const errorDiv = document.getElementById(
      `errorDiv-${this.view.instanceId}`
    );
    const historyDiv = document.getElementById(
      `historydiv-${this.view.instanceId}`
    );

    const handleFilter = () => {
      const choiceop = parseInt(choice.value);
      const filteroutput = parseInt(filterop.value);
      errorDiv.innerHTML = "";

      if (isNaN(filteroutput)) return; // Exit if filter output is not a number

      let storedHistory = this.model.getHistory();
      historyDiv.innerHTML = "";

      if (storedHistory.length > 0) {
        let filterresult = [];

        switch (choiceop) {
          case 1:
            if (filteroutput <= 50) {
              errorDiv.innerHTML = "Error: Value must be greater than 50!";
            } else {
              filterresult = storedHistory.filter(
                (item) => item.result > filteroutput
              );
            }
            break;
          case 2:
            if (filteroutput >= 150) {
              errorDiv.innerHTML = "Error: Value must be less than 150!";
            } else {
              filterresult = storedHistory.filter(
                (item) => item.result < filteroutput
              );
            }
            break;
          case 3:
            if (filteroutput < 50 || filteroutput > 150) {
              errorDiv.innerHTML = "Error: Value must be between 50 and 150!";
            } else {
              filterresult = storedHistory.filter(
                (item) => item.result > 50 && item.result < 150
              );
            }
            break;
          case 4:
            if (filteroutput < 2) {
              errorDiv.innerHTML = "Error: Operand count must be at least 2!";
            } else {
              let matchFound = false;
              filterresult = storedHistory.filter((item) => {
                const operandsCount = item.expression
                  .split(/[+\-*/^()]/)
                  .filter(Boolean).length;
                if (operandsCount === filteroutput) {
                  matchFound = true;
                  return true;
                }
                return false;
              });
              if (!matchFound) {
                errorDiv.innerHTML = "No matching operands found.";
              }
            }
            break;
          default:
            errorDiv.innerHTML =
              "Error: Please select a valid choice (1, 2, 3, or 4).";
        }

        filterresult.forEach((item) => {
          const p = document.createElement("p");
          p.innerText = `${item.expression} = ${item.result}`;
          historyDiv.prepend(p);
        });
      }
    };

    choice.addEventListener("input", handleFilter);
    filterop.addEventListener("input", handleFilter);
  }
}
