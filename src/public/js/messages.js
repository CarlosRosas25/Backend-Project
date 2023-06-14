const socket = io();
const chat = document.getElementById("chatBox");

chat.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chat.value.trim().length > 0) {
      socket.emit("message", { message: chat.value });
      chat.value = "";
    } else {
      alert("Please write a message, blank spaces aren't valid.");
    }
  }
});

socket.on("messagesLogs", (data) => {
  const messagesLogs = document.getElementById("messageLogs");
  let logs = "";
  data.forEach((log) => {
    logs += `Usuario dice: ${log.message}<br/>`;
  });
  messagesLogs.innerHTML = logs;
});
