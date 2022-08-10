export default async function request(link, method = "POST", body={}) {
    try {
        const res = await fetch(link, {
            method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())

        if (res.result.error) return alert(res.result.error);

        return res;

    } catch (err) {
        alert(err);
    }

}