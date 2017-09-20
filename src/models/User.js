export default class User {
    constructor(id = 0, name, email = "null", phone = "null", role = "USER", token = "null") {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.token = token;
    }
}