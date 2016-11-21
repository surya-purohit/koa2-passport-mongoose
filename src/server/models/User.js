import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        index: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: false,
        index: true,
    },
    username: {
        type: String,
        index: true,
    },
    password: {
        type: String,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        displayName: String
    },
    github: {
        id: String,
        token: String,
        username: String,
        name: String
    },
    linkedin: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    instagram: {
        id: String,
        token: String,
        username: String,
        name: String
    }
});

// methods ======================
// generating a hash

UserSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', UserSchema);
