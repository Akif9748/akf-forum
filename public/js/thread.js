import request from "./request.js";

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
window.edit_message = async function (id) {
    const content = prompt("Enter new content!");
    const res = await request(`/api/messages/${id}/`, "PATCH", { content });
    if (res && res.error) return;

    alert(`Message updated`);
    document.getElementById("message-" + id).querySelector(".content").innerHTML = content;

}
window.undelete_message = async function (id) {
    const response = await request(`/api/messages/${id}/undelete`);
    if (response.deleted) return;
    document.getElementById("deleted-" + id).remove();
    document.getElementById("dot-" + id).innerHTML = `
    <a onclick="delete_message('${id}');">DELETE</a>
    <a onclick="edit_message('${id}');">EDIT</a>`
}

window.delete_message = async function (id) {
    const response = await request(`/api/messages/${id}/`, "DELETE");
    if (response.deleted) {
        alert("Message deleted");
        document.getElementById("dots-" + id).innerHTML = `
        <i class='bx bx-trash bx-sm' id="deleted-${id}" style="color: RED;"></i>
        `+ document.getElementById("dots-" + id).innerHTML;
        document.getElementById("dot-" + id).innerHTML = `<a onclick="undelete_message('${id}');">UNDELETE</a>`;
    }
}

window.react = async function (id, type) {
    const res = await request(`/api/messages/${id}/react/${type}`)
    document.getElementById(`like-${id}`).innerHTML = res.react.like.length;
    document.getElementById(`dislike-${id}`).innerHTML = res.react.dislike.length;
}
