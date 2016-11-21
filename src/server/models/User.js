import mongoose from 'mongoose-fill';

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
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
});

export default mongoose.model('User', UserSchema);
