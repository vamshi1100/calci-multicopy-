export class View {
  constructor(containerId, instanceId) {
    this.containerId = containerId;
    this.instanceId = instanceId;
    this.createCalculator();
    this.historyDiv = document.getElementById(`historydiv-${this.instanceId}`);
    this.inputBox = document.getElementById(`inputbox-${this.instanceId}`);
  }

  createCalculator() {
    const container = document.getElementById(this.containerId);
    const calculatorHTML = `
      <div class="main" id="calculator-${this.instanceId}">
        <div class="container">
          <h1>CALCULATOR</h1>
          <div class="display">
            <input type="text" id="inputbox-${this.instanceId}" placeholder="Enter numbers" value="" />
          </div>
          <div class="buttons" id="buttons-${this.instanceId}">
          <button id="clearDisplay-${this.instanceId}">C</button>
          <button id="calculateResult-${this.instanceId}" class="calculatebtn">CALCULATE</button>
          </div>
          
        </div>
        <div class="history">
        <div class="filter">
  <h1>filter(choices)</h1>
  <h1>1:>50, 2:<150 <br /> 3:b/w 50 &150, <br /> 4:no. of operands</h1>
  <input type="number" id="choice-${this.instanceId}" placeholder="Enter choice" />
  <input type="number" id="filter-${this.instanceId}" placeholder="Enter value" />
  <div id="errorDiv-${this.instanceId}" style="color: red"></div>
</div>

          <h1>HISTORY</h1>
          <div id="historydiv-${this.instanceId}"></div>
          <button id="deletefun-${this.instanceId}">DELETE HISTORY</button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", calculatorHTML);
  }

  renderButtons(buttons, onClick) {
    const buttonsDiv = document.getElementById(`buttons-${this.instanceId}`);
    buttons.forEach((button) => {
      const btn = document.createElement("button");
      btn.textContent = button;
      buttonsDiv.prepend(btn);
      btn.addEventListener("click", () => onClick(button));
    });
  }

  updateHistoryDisplay(history) {
    this.historyDiv.innerHTML = "";
    history.forEach((item) => {
      const p = document.createElement("p");
      p.innerText = `${item.expression} = ${item.result}`;
      this.historyDiv.prepend(p);
    });
  }

  clearInput() {
    this.inputBox.value = "";
  }

  displayResult(result) {
    this.inputBox.value = result;
  }
}
