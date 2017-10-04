"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        var usuarioSaoIguais = another !== undefined &&
            another.email === this.email &&
            another.password === this.password;
        return usuarioSaoIguais;
    };
    return User;
}());
exports.User = User;
exports.users = {
    'werter@hotmail.com.br': new User('werter@hotmail.com.br', 'werter', 'asdf'),
    'user@hotmail.com': new User('user@hotmail.com', 'usuario', '1234')
};
