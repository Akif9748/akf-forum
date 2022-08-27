import request from "./request.js";

const message_div = document.getElementById("messages");

const messages_raw = await fetch(`/api/threads/${message_div.getAttribute("value")}/messages/`).then(res => res.json());
for (const message of messages_raw)
    renderMessage(message);

function renderMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.setAttribute("id", "message-" + message.id);

    messageElement.innerHTML = `
    
    <h3 style="float:right;">${new Date(message.time).toLocaleString()}</h3>

    <h2>
      <img class="circle" src="${message.author.avatar}" alt="${message.author.name}">
        <a href="/users/${message.author.id}"> ${message.author.name}</a>:
    </h2>

    <p>${message.content.replaceAll("\n", "<br>")}</p><br>
    <div id="message-delete-${message.id}">
    ${/* if */!message.deleted ?
            `
            <a onclick="delete_message('${message.id}');">DELETE</a>
            <a onclick="edit_message('${message.id}');">EDIT</a>
            ` /* else */ :
            `<h3 style=\"display:inline;\">This message has been deleted</h3>
            <a onclick="undelete_message('${message.id}');">UNDELETE</a>
           `

        }
    </div>
    <div style="float: right;">
    <h3 id="count${message.id}" style="display:inline;">0</h3>
    <a onclick="react('${message.id}', 'like');">+🔼</a>
    <a onclick="react('${message.id}', 'dislike');">-🔽</a>
    </div>
`;

    message_div.appendChild(messageElement);
    message_div.innerHTML += "<br>";
};

window.scrollTo(0, document.body.scrollHeight);

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
 * OTHER FUNCTIONS
 */

async function delete_thread(id) {
    const response = await request("/api/threads/" + id + "/delete");
    if (response.deleted) {
        alert("Thread deleted");
        location.reload();
    }

}
async function undelete_thread(id) {
    const response = await request("/api/threads/" + id + "/undelete");
    if (!response.deleted) {
        alert("Thread undeleted");
        location.reload();

    }

}
async function undelete_message(id) {
    const response = await request(`/api/messages/${id}/undelete`);
    if (!response.deleted)
        document.getElementById("message-delete-" + id).innerHTML = `<a onclick=\"delete_message('${id}');\">DELETE</a>`;

}
async function delete_message(id) {
    const response = await request(`/api/messages/${id}/delete`);
    if (response.deleted) {
        alert("Message deleted");
        document.getElementById("message-delete-" + id).innerHTML = `
        <h3 style=\"display:inline;\">This message has been deleted</h3>        
        <a onclick="undelete_message('${id}');">UNDELETE</a>`;// ADMIN PERM FIX
    }
}
async function react(id, type) {
    const res = await request(`/api/messages/${id}/react/${type}`)
    document.getElementById(`count${id}`).innerHTML = res.reactCount;
}

window.delete_message = delete_message;
window.undelete_message = undelete_message;
window.react = react;
window.delete_thread = delete_thread;
window.undelete_thread = undelete_thread;