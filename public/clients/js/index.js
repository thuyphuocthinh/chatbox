// start change mode

const getChangeModeBtn = document.querySelector("#change-mode");
const mode = localStorage.getItem("mode");
const rootElement = document.querySelector(".root");
if (mode) {
  rootElement.classList.remove("light");
  rootElement.classList.add("dark");
}
if (getChangeModeBtn) {
  getChangeModeBtn.addEventListener("click", () => {
    if (rootElement) {
      if (rootElement.classList.contains("light")) {
        rootElement.classList.remove("light");
        rootElement.classList.add("dark");
        localStorage.setItem("mode", "dark");
      } else {
        rootElement.classList.remove("dark");
        rootElement.classList.add("light");
        localStorage.removeItem("mode");
      }
    }
  });
}

// end change mode