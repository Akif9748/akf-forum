document.getElementById("send").addEventListener("submit", async e => {

    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    fetch("/api/messages", {
        method: 'POST',
        body: JSON.stringify({ threadID: data.get("threadID"), content: data.get("content") }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(res => {
            if (res.result.error) return alert(res.result.error);

            form.reset();
            const message = res.result;
            document.getElementById("messages").innerHTML += `<br>
<div id="message-${message.id}" style="border: 2px solid #444444; padding: 10px;">

<h3 style="float:right;">${new Date(message.time).toLocaleString()}</h3>

<h2>
<img class="yuvarlak" src=${message.author.avatar} alt=${message.author.name}>
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

        }).catch(err => {
            alert(err);
        });
});