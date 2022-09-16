import request from "./request.js";

// THREAD:

window.edit_thread = async function (id) {
    const title = prompt("Enter new title!");
    const res = await request(`/api/threads/${id}/`, "PATCH", { title });
    if (res.error) return;
    alert(`Thread updated`);
    document.getElementById("title").innerHTML = title;

}
window.delete_thread = async function (id) {
    const res = await request(`/api/threads/${id}/`, "DELETE");
    if (res.error) return;
    alert(`Thread deleted`);
    location.reload();
}

window.undelete_thread = async function (id) {
    const res = await request(`/api/threads/${id}/undelete`);
    if (res.error) return;
    alert(`Thread undeleted`);
    location.reload();
}


// MESSAGES:
window.send_edit = async function (id) {
    const message = document.getElementById(`message-${id}`);
    const content = message.querySelector("#content").value;

    const res = await request(`/api/messages/${id}/`, "PATCH", { content });
    if (res.error) return;
    alert(`Message updated`);
    message.querySelector(".content").innerHTML = converter.makeHtml(res.content);
}
window.edit_message = async function (id) {
    const content = document.getElementById(`message-${id}`).querySelector(".content");

    content.innerHTML = `
    <textarea rows="4" cols="40" id="content">${content.rawText}</textarea>
    <button onclick="send_edit(${id});" class="btn-primary">Edit!</button>`;

}
window.undelete_message = async function (id) {
    const response = await request(`/api/messages/${id}/undelete`);
    if (response.deleted) return;
    const message = document.getElementById("message-" + id);

    message.querySelector("#deleted").remove();
    message.querySelector(".dots-menu").innerHTML = `
    <a onclick="delete_message('${id}');">DELETE</a>
    <a onclick="edit_message('${id}');">EDIT</a>`
}

window.delete_message = async function (id) {
    const response = await request(`/api/messages/${id}/`, "DELETE");
    if (!response.deleted) return
    const message = document.getElementById(`message-${id}`);
    alert("Message deleted");

    message.querySelector(".dots-menu").innerHTML = `<a onclick="undelete_message('${id}');">UNDELETE</a>`;

    let dots = message.querySelector(".dots");
    dots.innerHTML = "<i class='bx bx-trash bx-sm' id='deleted' style='color: var(--important)'></i>" + dots.innerHTML;

}

window.react = async function (id, type) {
    const res = await request(`/api/messages/${id}/react/${type}`)
    const message = document.getElementById(`message-${id}`);
    for (const react in res.react)
        message.querySelector("#" + react).innerHTML = res.react[react].length;
}
