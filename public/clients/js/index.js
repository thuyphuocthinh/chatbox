// scroll to bottom on load
const chatDisplayContainer = document.querySelector(".chat-display-container");
$(".chat-display-container").animate(
  {
    scrollTop: chatDisplayContainer.scrollHeight,
  },
  1500
);

$(document).ready(() => {});

// end scroll to bottom on load

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

// start send messages
const sendButton = document.querySelector("#send-button");
const textAreaElement = document.querySelector('[name="message"]');
const chatDisplayElement = document.querySelector(".chat-display");
const chatInputContainer = document.querySelector(".chat-input-container");
let converter = new showdown.Converter();

function printResponse(answer, chatDisplayElement) {
  const boxAi = document.createElement("div");
  boxAi.classList.add("box");
  boxAi.classList.add("box-ai");
  const html = converter.makeHtml(answer);
  boxAi.innerHTML = html;
  chatDisplayElement.appendChild(boxAi);
  boxAi.scrollIntoView(true);
}

function printQuestion(content, chatDisplayElement) {
  const boxUser = document.createElement("div");
  boxUser.classList.add("box");
  boxUser.classList.add("box-user");
  boxUser.textContent = content;
  chatDisplayElement.appendChild(boxUser);
  boxUser.scrollIntoView(true);
}

function isEmpty(element) {
  return element.value;
}

if (!isEmpty(textAreaElement)) {
  sendButton.classList.add("button-disabled");
  sendButton.disabled = true;
}

textAreaElement.addEventListener("keyup", (e) => {
  const { name, value } = e.target;
  if (isEmpty(textAreaElement)) {
    sendButton.classList.remove("button-disabled");
    sendButton.disabled = false;
    sendMessage(value);
  } else {
    sendButton.classList.add("button-disabled");
    sendButton.disabled = true;
  }
});

function addWaitingResponse(chatInputContainer) {
  const waitingResponse = chatInputContainer.querySelector(".waiting-response");
  waitingResponse.style.display = "block";
}

function removeWaitingResponse(chatInputContainer) {
  const waitingResponse = chatInputContainer.querySelector(".waiting-response");
  waitingResponse.style.display = "none";
}

function sendMessage(value) {
  if (sendButton) {
    sendButton.onclick = () => {
      printQuestion(value, chatDisplayElement);
      const sendStr = {
        prompt: value,
      };
      textAreaElement.value = "";
      textAreaElement.focus();
      sendButton.classList.add("button-disabled");
      sendButton.disabled = true;

      // display waiting response
      addWaitingResponse(chatInputContainer);

      // fetch API
      fetch("http://localhost:3000/api/v1/chat/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(sendStr),
      })
        .then((resp) => resp.json())
        .then((result) => {
          // hide waiting response
          removeWaitingResponse(chatInputContainer);
          // display answer
          printResponse(result.data, chatDisplayElement);
        })
        .catch((error) => console.log(error));
    };
  }
}
// end send message
