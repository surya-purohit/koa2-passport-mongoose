import User from '../../models/User';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { twitter as TwitterConfig } from '../config'
import { findOrCreate } from '../'
export default new TwitterStrategy(TwitterConfig,
    function(token, tokenSecret, profile, done) {
        // retrieve user ...
        process.nextTick(() => {
            //check user table for anyone with a twitter ID of profile.id
            const newUser = {};
            newUser.twitter = profile;
            newUser.twitter.token = token;
            findOrCreate({
                'twitter.id': profile.id
            }, newUser, done);
        });
    })
