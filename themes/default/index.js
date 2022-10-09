const path = require('path');
module.exports = {
    name: "default",
    colors: ["black", "white"],
    languages: ["en"],
    getFilePath(page) {
        return path.resolve(__dirname, page)  ;// path of the file for ejs rendering
    },
    /**
     * Renderer function for theme
     * @param {String} file a page of forum 
     * @param {{ user: Object }} data informations about page 
     * @param {{ color: String, forum_name:String, description:String }} options Extra options
     * @param {Object} render request object
     */
    render(file, data, options, req) {
       // const { color, language, forum_name, description } = options; // General informations, meta, forum name, user language and color
       // const { user } = data; // specific informations about page, user (req.user || null), and more

        return req.render(this.getFilePath(file), { ...options, ...data });
    }
}