import User from '../../models/User';
import { Strategy as GithubStrategy } from 'passport-github';
import { github as GithubConfig } from '../config'
import { findOrCreate } from '../'
export default new GithubStrategy(GithubConfig,
    function(token, tokenSecret, profile, done) {
        // retrieve user ...
        console.log(profile);
        process.nextTick(() => {
            //check user table for anyone with a github ID of profile.id
            const newUser = {};
            newUser.github = profile;
            newUser.github.username = profile.username;
            newUser.github.name = profile.displayName;
            newUser.github.token = token;
            findOrCreate({
                'github.id': profile.id
            }, newUser, done);
        });
    })
