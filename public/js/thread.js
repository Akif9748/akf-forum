import request from "./request.js";

const messages = document.getElementById("messages");
let messages_raw = [];
function renderMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.setAttribute("id", "message-" + message.id);

    messageElement.innerHTML = `
    
    <h3 style="float:right;">${new Date(message.time).toLocaleString()}</h3>

    <h2>
      <img class="circle" src=${message.author.avatar} alt=${message.author.name}>
        <a href=${"/users/" + message.author.id}> ${message.author.name}</a>:
    </h2>

    <p>${message.content.replaceAll("\n", "<br>")}</p><br>
    <div id="message-delete-${message.id}">
    ${!message.deleted ?
            `<form style="display:inline;">
        <button id="delete_message" value="${message.id}" type="submit">DELETE</button>
    </form>` :
            "<h3 style=\"display:inline;\">This message has been deleted</h3>"}
    </div>
    <div style="float: right;">
        <h3 id="count${message.id}" style="display:inline;">${message.reactCount}</h3>
        <button style="display:inline;" id="like" value="${message.id}">+🔼</button>
        <button style="display:inline;" id="dislike" value="${message.id}" >-🔽</button>
    </div>
`;

    messages.appendChild(messageElement);
    messages.innerHTML += "<br>";
};

/**
 * Main Renderer
 */
(async () => {

    messages_raw = await fetch(`/api/threads/${messages.getAttribute("value")}/messages/`).then(res => res.json());
    if (messages_raw?.error) {

        document.getElementById("messages").innerHTML
            += '<div class="message"><h1>THIS THREAD HAS NOT GOT ANY MESSAGE</h1></div>';


    } else
        for (const message of messages_raw)
            renderMessage(message);

    window.scrollTo(0, document.body.scrollHeight);

})();



/**
 * Message Sender
 */
document.getElementById("send").addEventListener("submit", async e => {

    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    request("/api/messages", "POST", { threadID: data.get("threadID"), content: data.get("content") })
        .then(res => {
            if (!res) return;
            form.reset();
            res.reactCount = 0;
            renderMessage(res);
        });
});


/**
 * Button Listener
 */
document.addEventListener("click", async e => {
    //   e.preventDefault();
    if (e.target.id === "delete_thread") {
        const response = await request("/api/threads/" + e.target.value + "/delete");
        if (response.deleted) {
            alert("Thread deleted");
            location.reload();
        }

    } else if (e.target.id === "undelete_thread") {
        const response = await request("/api/threads/" + e.target.value + "/undelete");
        if (!response.deleted) {
            alert("Thread undeleted");
            location.reload();

        }

    } else if (e.target.id === "delete_message") {
        e.preventDefault();
        const response = await request(`/api/messages/${e.target.value}/delete`);
        if (response.deleted) {
            alert("Message deleted");
            document.getElementById("message-delete-" + e.target.value).innerHTML = "<h3 style=\"display:inline;\">This message has been deleted</h3>";
        }
    } /*else if (e.target.id === "edit_thread") {
      window.location.href = "/threads/<%= thread.id }/edit";
    } */

    if (!e.target.id.includes("like")) return;
    const res = await request("/api/messages/" + e.target.value + "/react/" + e.target.id)

    document.getElementById("count" + e.target.value).innerHTML = res.reactCount;

});
