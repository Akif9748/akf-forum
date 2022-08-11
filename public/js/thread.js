import request from "./request.js";
document.addEventListener("click", async e => {

    if (e.target.id === "delete_thread") {
        const response = await request("/api/threads/"+e.target.value+"/delete");
        if (response.result.deleted) {
            alert("Thread deleted");
            window.location.href = "/threads";
        }

    } else if (e.target.id === "delete_message") {
        const response = await request(`/api/messages/${e.target.value}/delete`);
        if (response.result.deleted) {
            alert("Message deleted");
            location.reload();
        }
    } /*else if (e.target.id === "edit_thread") {
      window.location.href = "/threads/<%= thread.id %>/edit";
    } */



    if (!e.target.id.includes("like")) return;
    const res = await request("/api/messages/" + e.target.value + "/react/" + e.target.id)

    document.getElementById("count" + e.target.value).innerHTML = res.result;

});


document.getElementById("send").addEventListener("submit", async e => {

    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    request("/api/messages", "POST", { threadID: data.get("threadID"), content: data.get("content") })
        .then(res => {
            if (!res) return;
            form.reset();
            const message = res.result;
            document.getElementById("messages").innerHTML += `<br>
<div id="message-${message.id}" style="border: 2px solid #444444; padding: 10px;">

<h3 style="float:right;">${new Date(message.time).toLocaleString()}</h3>

<h2>
<img class="circle" src=${message.author.avatar} alt=${message.author.name}>
<a href="/users/${message.author.id}"> ${message.author.name}</a>:
</h2>

<h2>${message.content}</h2><br>

<form style="display:inline;" action="/message/${message.id}/delete/" method="post">
</a><button type="submit">DELETE</button>
</form>
<div style="float: right;">
<h3 id="count${message.id}" style="display:inline;">0</h3>
<button style="display:inline;" id="like" value="${message.id}">+🔼</button>
<button style="display:inline;" id="dislike" value="${message.id}" >-🔽</button>
</div>

</div>`;
        });
});
