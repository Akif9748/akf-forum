const { User, Message, Thread } = require("../../classes");
const db = require("quick.db");


const { Router } = require("express")

const app = Router();


class ApiResponse {
    constructor(status, result) {
        this.status = status;
        this.result = result;
    }
}

const { request, response } = require("express");

/**
 * For intellisense
 * @param {request} req 
 * @param {response} res 
 */


app.get("/:action/:id", (req, res) => {

    const error = (status, error) =>
        res.status(status).json(new ApiResponse(status, { error }))


    /**
     * AUTH TYPE:
    
     headers: 
        {
            username: "Username for client",
            password: "Password of selected username for client"
        }

    */

    const { username = null, password = null } = req.headers;

    if (!username || !password)
        return error(401, "Headers are missing")

    const user = db.get("secret." + username);

    if (!user)
        return error(401, "We have not got any user has got this name")

    if (user.key !== password)
        return error(401, 'Incorrect Password!')



    /**
      * REQUEST TYPE:
      * GET /api/action/id 
      * 
      * @example message action:
      * GET /api/message/0
      *  
      */
    const { action } = req.params;

    if (action === "message") {

        const { id = null } = req.params;
        if (!id) return error(400, "Missing id in query")
        const message = new Message().getId(id);

        if (!message || message.deleted) return error(404, "We have not got any message declared as this id.");

        res.status(200).json(new ApiResponse(200, message));
    } else if (action === "user") {
        const { id = null } = req.params;
        if (!id) return error(400, "Missing id in query")
        const member = new User().getId(id);
        if (!member || member.deleted) return error(404, "We have not got any user declared as this id.");

        res.status(200).json(new ApiResponse(200, member));
    }
    else
        return error(400, "Missing/undefined param in action section: " + action);
});



module.exports = app;