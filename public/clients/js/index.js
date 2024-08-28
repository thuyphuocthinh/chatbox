// scroll to bottom on load
const chatDisplayContainer = document.querySelector(".chat-display-container");
$(".chat-display-container").animate(
  {
    scrollTop: chatDisplayContainer.scrollHeight,
  },
  1500
);

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
const msg = `Python đã được Guido van Rossum tạo ra vào những năm 1980[39] tại 
  Trung tâm Toán học Tin học (Centrum Wiskunde & Informatica, CWI) ở Hà Lan như là một ngôn
   ngữ kế tục ngôn ngữ ABC một ngôn ngữ được lấy cảm hứng từ SETL,[40] có khả năng xử lí
    ngoại lệ và giao tiếp với hệ điều hành Amoeba Nó bắt đầu được triển khai vào tháng 12
     năm 1989.[42] Van Rossum đã tự mình gánh vác trách nhiệm cho dự án, với
      vai trò là nhà phát triển chính, cho đến ngày 12 tháng 7 năm 2018, khi ông 
      thông báo rằng ông sẽ rời bỏ trách nhiệm của ông và cả danh hiệu Nhà độc tài 
      nhân từ cho cuộc sống của Python, một danh hiệu mà cộng đồng Python đã trao tặng cho
       ông vì sự tận tụy lâu dài của ông với vai trò là người ra quyết định chính cho dự án.[43]
       Vào tháng 1 năm 2019, các nhà phát triển phần lõi Python đã bầu ra một Hội đồng chèo lái 
       gồm năm thành viên để dẫn dắt dự án [44][45]`;
const textAreaElement = document.querySelector('[name="message"]');
const chatDisplayElement = document.querySelector(".chat-display");

function printResponse(chatDisplayElement) {
  const boxAi = document.createElement("div");
  boxAi.classList.add("box");
  boxAi.classList.add("box-ai");
  chatDisplayElement.appendChild(boxAi);
  const msgArr = msg.split(" ");
  let i = 0;
  let intervalId;
  if (i < msgArr.length) {
    intervalId = setInterval(() => {
      boxAi.textContent += msgArr[i] + " ";
      i++;

      boxAi.scrollIntoView(true);

      if (i >= msgArr.length) {
        clearInterval(intervalId);
      }
    }, 50);
  }
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

function sendMessage(value) {
  if (sendButton) {
    sendButton.onclick = () => {
      printQuestion(value, chatDisplayElement);
      textAreaElement.value = "";
      textAreaElement.focus();
      sendButton.classList.add("button-disabled");
      sendButton.disabled = true;
      setTimeout(() => {
        printResponse(chatDisplayElement);
      }, 1000);
    };
  }
}
// end send message