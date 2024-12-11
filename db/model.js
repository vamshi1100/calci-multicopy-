export class Model {
  constructor(containerId, instanceId) {
    this.instanceId = instanceId;
    this.history =
      JSON.parse(localStorage.getItem(`history${this.instanceId}`)) || [];
  }

  saveExpression(expression, result) {
    this.history.push({ expression, result });
    localStorage.setItem(
      `history${this.instanceId}`,
      JSON.stringify(this.history)
    );
  }

  clearData() {
    localStorage.removeItem(`history${this.instanceId}`);
    this.history = [];
  }

  getHistory() {
    return this.history;
  }
}
