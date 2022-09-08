var modal_open = document.querySelectorAll("[data-modal-open]");
modal_open.forEach(onclick_load)

function onclick_load(item, index) {
    var block = item.getAttribute("data-modal-open");
    console.log("evet");
    console.log(item)
    document.querySelector(block).classList.toggle("no-active");
    document.querySelector("#user-edit").querySelector(".modal-close").onclick = function() {
        document.querySelector(block).classList.toggle("no-active");
    }

    item.onclick = function() {
        document.querySelector(block).classList.toggle("no-active");
    };



}
