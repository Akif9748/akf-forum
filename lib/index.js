module.exports = {

    URLRegex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
    clearContent: (content) => {
        if (!content) return "";
        return content.replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;").replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;").replaceAll("'", "&#39;")
        .replaceAll("\n", "<br>");
    }
}