import User from '../../models/User';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { facebook as FacebookConfig } from '../config'
import { findOrCreate } from '../'
export default new FacebookStrategy(FacebookConfig,
    async(token, tokenSecret, profile, done)=> {
        // retrieve user ...
        console.log("useruserusreusrer");
        process.nextTick(() => {
            //check user table for anyone with a facebook ID of profile.id
            const newUser = {};
            newUser.facebook = profile._json;
            newUser.facebook.token = token;
            findOrCreate({
                'facebook.id': profile.id
            }, newUser, done);
        });
    })
