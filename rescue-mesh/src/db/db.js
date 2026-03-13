import Dexie from "dexie";

export const db = new Dexie("RescueDatabase");

//Defining schema : '++id' is auto-incrementing primary key
db.version(1).stores({
    messages: "++id, content, timestamp"
});