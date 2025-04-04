const express = require('express');
const router = express.Router();
const profileController = require('./controller');

router.get('/profiles', profileController.getAllProfiles);
router.get('/profiles/:id', profileController.getProfileById);
router.post('/profiles', profileController.createProfile);
router.put('/profiles/:id', profileController.updateProfile);
router.delete('/profiles/:id', profileController.deleteProfile);
router.post('/profiles/:id/experience', profileController.addExperience);
router.delete('/profiles/:id/experience/:exp', profileController.deleteExperience);
router.post('/profiles/:id/skills', profileController.addSkill);
router.delete('/profiles/:id/skills/:skill', profileController.deleteSkill);
router.put('/profiles/:id/information', profileController.updateInformation);

module.exports = router;
