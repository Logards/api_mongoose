const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    experience: [
        {
            titre: {type: String, required: true},
            entreprise: {type: String, required: true},
            dates: {type: String, required: true},
            description: {type: String, required: true},
        },
    ],
    skills: [String],
    information: {
        bio: String,
        localisation: String,
        siteWeb: String,
    },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
