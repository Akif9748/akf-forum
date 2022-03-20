const { User, Message, Thread } = require("../classes");
const db = require("quick.db");


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

module.exports = (req, res) => {

    const error = (status, error) =>
        res.status(status).json(new ApiResponse(403, { error }))


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
        return error(403, "Headers are missing")

    const user = db.get("secret." + username);

    if (!user)
        return error(403, "We have not got any user has got this name")

    if (user.key !== password)
        return error(403, 'Incorrect Password!')



    /**
      * REQUEST TYPE:
      * GET /api/action/id 
      * 
      * @example message action:
      * GET /api/message/0
      *  
      */
    const { action } = req.params;

    switch (action) {
        case "message":
            const { id = null } = req.params;
            if (!id) return error(403, "Missing id in query")
            const message = new Message().getId(id);
           
            if (!message || message.deleted) return error(403, "We have not got any message declared as this id.");

            res.status(200).json(new ApiResponse(200, message));

            break;

        default:
            return error(403, "Missing/undefined param: action");
    }



}

