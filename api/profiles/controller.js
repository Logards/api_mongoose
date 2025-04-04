const Profile = require('./model');

exports.getAllProfiles = async (req, res) => {
    try {
        const { skills, localisation } = req.query;
        let filter = {};

        if (skills) {
            filter.skills = { $in: skills.split(',') };
        }
        if (localisation) {
            filter['information.localisation'] = localisation;
        }

        const profiles = await Profile.find(filter);
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({message: 'Profil non trouvé'});
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({message: 'Erreur serveur', error});
    }
};

exports.createProfile = async (req, res) => {
    const {name, email} = req.body;
    try {
        const profile = new Profile({name, email});
        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({message: 'Erreur lors de la création du profil', error});
    }
};

exports.updateProfile = async (req, res) => {
    const {name, email} = req.body;
    try {
        const profile = await Profile.findByIdAndUpdate(
            req.params.id,
            {name, email},
            {new: true, runValidators: true}
        );
        if (!profile) {
            return res.status(404).json({message: 'Profil non trouvé'});
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({message: 'Erreur lors de la mise à jour du profil', error});
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) {
            return res.status(404).json({message: 'Profil non trouvé'});
        }
        res.status(200).json({message: 'Profil supprimé', profile});
    } catch (error) {
        res.status(500).json({message: 'Erreur serveur', error});
    }
};

exports.addExperience = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({message: 'Profil non trouvé'});
        }
        profile.experience.push(req.body);
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({message: 'Erreur lors de l\'ajout de l\'expérience', error});
    }
};

exports.deleteExperience = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({message: 'Profil non trouvé'});
        }
        profile.experience = profile.experience.filter(
            (exp) => exp._id.toString() !== req.params.exp
        );
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({message: 'Erreur serveur', error});
    }
};

exports.addSkill = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({message: 'Profil non trouvé'});
        }
        profile.skills.push(req.body.skill);
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({message: 'Erreur lors de l\'ajout de la compétence', error});
    }
};

exports.deleteSkill = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({message: 'Profil non trouvé'});
        }
        profile.skills = profile.skills.filter(
            (skill) => skill !== req.params.skill
        );
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({message: 'Erreur serveur', error});
    }
};

exports.updateInformation = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({message: 'Profil non trouvé'});
        }
        profile.information = req.body;
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({message: 'Erreur lors de la mise à jour des informations', error});
    }
};
