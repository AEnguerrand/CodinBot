import path from "path";
import FileSync from "lowdb/adapters/FileSync";
import low from "lowdb";

export const DB_LOCATION = path.join(__dirname, "..", "..", "save.json");
export const DB_ADAPTER = new FileSync(DB_LOCATION);
export const DB = low(DB_ADAPTER);
export default DB;

DB.defaults({users: {}}).write();

export function loadUserData(user) {
    return DB.get("users."+ user.id).value() || {
        id: user.id, 
        messages: 0, 
        achievements: [], 
        lang: "fr"
    };
}

export function saveUserData(user, data) {
    DB.set("users."+ user.id, data).write();
}
