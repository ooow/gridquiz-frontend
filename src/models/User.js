export default class User {
    constructor(id, name, email = "null", phone = "null") {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}