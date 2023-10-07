import mongoose from "mongoose";
mongoose.set("strictQuery", true);
import {DATABASE_URI, MESSAGES} from "./constants.config";

export default function database() {
    mongoose.connect("mongodb+srv://admin:0Tro4fOEPlowPzX5@cluster0.ffzsabi.mongodb.net/")
        .then(() => {
            console.log(MESSAGES.DATABASE.CONNECTED);
        })
        .catch((err) => {
            console.log(MESSAGES.DATABASE.ERROR, err);
        });
}