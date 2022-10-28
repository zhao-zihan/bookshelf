class FunctionView {
  _parentElement = document.querySelector(".function__box");

  addHandlerSwitchMode(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const checkbox = e.target.closest(".switch__input");
      if (!checkbox) return;

      handler();
    });
  }
}

export default new FunctionView();
