for (const modal of document.querySelectorAll("[modal]"))
    modal.onclick = () => {
        document.querySelector(modal.getAttribute("modal")).classList.toggle('active')};