import request from "./request.js";

/**
 * Message Sender
 */
document.getElementById("send")?.addEventListener("submit", async e => {

    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    request("/api/messages", "POST", { threadID: data.get("threadID"), content: data.get("content") })
        .then(res => {
            if (res) location.href = `/messages/${res.id}`;
        });
});

/**
 * OTHER FUNCTIONS
 */
window.thread = async function (id, un= "") {
    await request(`/api/threads/${id}/${un}delete`);
    alert(`Thread ${un}deleted`);
    location.reload();
}
window.undelete_message = async function (id) {
    const response = await request(`/api/messages/${id}/undelete`);
    if (response.deleted) return;
    document.getElementById("deleted-" + id).remove();
    document.getElementById("dot-" + id).innerHTML = `
    <a onclick="delete_message('${id}');">DELETE</a>
    <a onclick="edit_message('${id}');">EDIT</a>
    `


}
window.delete_message = async function (id) {
    const response = await request(`/api/messages/${id}/delete`);
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
