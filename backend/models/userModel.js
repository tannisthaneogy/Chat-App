const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    pic: {type: String, default: "https://www.google.com/search?q=images&oq=images&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg9MgYIAhBFGD0yBggDEEUYPTIGCAQQLhhA0gEHNzk1ajBqMagCALACAA&sourceid=chrome&ie=UTF-8#vhid=ttLedUfG0D7-XM&vssid=l"}
}, {
    timestamps: true,
});


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;