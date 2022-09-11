console.log(document.getElementById("form"));

document.getElementById("form").addEventListener("submit", async e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const msg = [...data.entries()][0][1];

    document.querySelector(".submit-btn").disabled = true;
    await postData("/api", { msg });
    document.querySelector(".submit-btn").disabled = false;

    alert("Inviato!");

    return false;
});

async function postData(url = "/api", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    });
    return response.json();
}
