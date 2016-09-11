
var auth;
    
/**
 * ### Users API Methods
 *
 * **See:** [API Methods](index.js.html#api%20methods)
 */
auth = {

    token: undefined,

    setToken: function setToken(token) {
        this.token = token;
    },

    getToken: function getToken() {
        return this.token;
    }

};

module.exports = auth;
