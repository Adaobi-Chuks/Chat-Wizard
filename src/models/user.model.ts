import { model, Schema } from "mongoose";
import {SALTROUNDS, DATABASES} from "../configs/constants.config";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await bcrypt.genSalt(SALTROUNDS);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const update: any = this.getUpdate();
    let passwordHash;

    //Only hash the password when the password field is to be updated to avoid rehashing already hashed password
    if (update.$set.password) {
        const salt = await bcrypt.genSalt(SALTROUNDS);
        passwordHash = await bcrypt.hash(update.$set.password, salt);
    }

    //this.Query() is used to get the argument and it's type passed in in the method that triggers this function
    const prevDetails = await this.model.findOne(this.getQuery());
    const {email} = prevDetails;

    //get the email from the body or from the already saved user details
    let _email: string;
    if(update.$set.email) {
        _email = update.$set.email;
    } else {
        _email = email;
    }
    
    update.$set.password = passwordHash;
    update.$set.updatedAt = new Date();

    next();
});
const User = model(DATABASES.USER, userSchema);
export default User;