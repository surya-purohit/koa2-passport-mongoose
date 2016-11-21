import User from '../../models/User';
import { Strategy as LinkedinStrategy } from 'passport-linkedin';
import { linkedin as LinkedinConfig } from '../config'
import { findOrCreate } from '../'
export default new LinkedinStrategy(LinkedinConfig,
    function(token, tokenSecret, profile, done) {
        // retrieve user ...
        console.log(profile);
        process.nextTick(() => {
            //check user table for anyone with a linkedin ID of profile.id
            const newUser = {};
            newUser.linkedin = profile;
            newUser.linkedin.name = profile.displayName;
            newUser.linkedin.token = token;
            newUser.linkedin.email = profile.emails[0].value
            findOrCreate({
                'linkedin.id': profile.id
            }, newUser, done);
        });
    })
