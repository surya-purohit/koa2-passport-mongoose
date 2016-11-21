import passport from 'koa-passport';
import compose from 'koa-compose';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { auth as config, facebook as FacebookConfig, twitter as TwitterConfig } from './config';
import * as provider from './provider';
import roles from '../../../data/roles.json'
/** Strategies */
import jwtStrategy from './strategies/jwt';
import emailStrategy from './strategies/email';
import facebookStrategy from './strategies/facebook';
import googleStrategy from './strategies/google';
import twitterStrategy from './strategies/twitter';
import githubStrategy from './strategies/github';
import instagramStrategy from './strategies/instagram';
import base64url from 'base64url';
import linkedinStrategy    from './strategies/linkedin';
import _ from 'underscore';

passport.use('jwt', jwtStrategy);
passport.use('email', emailStrategy);
passport.use('facebook', facebookStrategy);
passport.use('google', googleStrategy);
passport.use('twitter', twitterStrategy);
passport.use('github', githubStrategy);
passport.use('instagram', instagramStrategy);
passport.use('linkedin', linkedinStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    (async() => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    })();
});

export default function auth() {
    return compose([
        passport.initialize(),
    ]);
}

export function isAuthenticated() {
    return passport.authenticate('jwt');
}

export function authEmail() {
    return passport.authenticate('email');
}

/** After autentication using one of the strategies, generate a JWT token */
export function generateToken() {
    return async ctx => {
        const { user } = ctx.passport;
        if (user === false) {
            ctx.status = 401;
        } else {
            const _token = jwt.sign({ id: user }, config.secret);
            const token = `JWT ${_token}`;

            const currentUser = await User.findOne({ _id: user });

            ctx.status = 200;
            ctx.body = {
                token,
                user: currentUser,
            };
        }
    };
}

/** Web Facebook Authentication */
export function isFacebookAuthenticated() {
    return async(ctx, next) => {
        await passport.authenticate('facebook', {
            state: base64url(JSON.stringify({
                successRedirect: ctx.request.query.success_redirect,
                failureRedirect: ctx.request.query.failure_redirect
            }))
        })(ctx, next);
    }
}

export function isFacebookAuthenticatedCallback() {
    return async(ctx, next) => {
        var callbackOpts = await JSON.parse(base64url.decode(ctx.request.query.state));
        await passport.authenticate('facebook', function(user, info) {
            if (user) {
                ctx.redirect(callbackOpts.successRedirect);
            } else {
                ctx.redirect(callbackOpts.failureRedirect);
            }
        })(ctx, next);
    }
}

/** Web Twitter Authentication */
export function isTwitterAuthenticated() {
    return async(ctx, next) => {
        await passport.authenticate('twitter',{
            callbackURL: `${ctx.path}/callback?success_redirect=${ctx.request.query.success_redirect}&failure_redirect=${ctx.request.query.failure_redirect}`
        })(ctx, next);
    }
}

export function isTwitterAuthenticatedCallback() {
    return async(ctx, next) => {
        var callbackOpts = ctx.request.query;
        await passport.authenticate('twitter', function(user, info) {
            if (user) {
                ctx.redirect(callbackOpts.success_redirect);
            } else {
                ctx.redirect(callbackOpts.failure_redirect);
            }
        })(ctx, next);
    }
}

/** Web Instagram Authentication */
export function isInstagramAuthenticated() {
    return async(ctx, next) => {
        await passport.authenticate('instagram', {
            state: base64url(JSON.stringify({
                successRedirect: ctx.request.query.success_redirect,
                failureRedirect: ctx.request.query.failure_redirect
            }))
        })(ctx, next);
    }
}

export function isInstagramAuthenticatedCallback() {
    return async(ctx, next) => {
        var callbackOpts = await JSON.parse(base64url.decode(ctx.request.query.state));
        await passport.authenticate('instagram', function(user, info) {
            if (user) {
                ctx.redirect(callbackOpts.successRedirect);
            } else {
                ctx.redirect(callbackOpts.failureRedirect);
            }
        })(ctx, next);
    }
}

/** Web Github Authentication */
export function isGithubAuthenticated() {
    return async(ctx, next) => {
        await passport.authenticate('github', {
            state: base64url(JSON.stringify({
                successRedirect: ctx.request.query.success_redirect,
                failureRedirect: ctx.request.query.failure_redirect
            }))
        })(ctx, next);
    }
}

export function isGithubAuthenticatedCallback() {
    return async(ctx, next) => {
        var callbackOpts = await JSON.parse(base64url.decode(ctx.request.query.state));
        await passport.authenticate('github', function(user, info) {
            if (user) {
                ctx.redirect(callbackOpts.successRedirect);
            } else {
                ctx.redirect(callbackOpts.failureRedirect);
            }
        })(ctx, next);
    }
}

/** TODO: Web Linkedin Authentication */
export function isLinkedinAuthenticated() {
    return async(ctx, next) => {
        await passport.authenticate('linkedin',{
            callbackURL: `${ctx.path}/callback?success_redirect=${ctx.request.query.success_redirect}&failure_redirect=${ctx.request.query.failure_redirect}`
        })(ctx, next);
    }
}

export function isLinkedinAuthenticatedCallback() {
    return async(ctx, next) => {
        var callbackOpts = ctx.request.query;
        await passport.authenticate('linkedin', function(user, info) {
            if (user) {
                ctx.redirect(callbackOpts.success_redirect);
            } else {
                ctx.redirect(callbackOpts.failure_redirect);
            }
        })(ctx, next);
    }
}

/** Web Google Authentication */
export function isGoogleAuthenticated() {
    return async(ctx, next) => {
        await passport.authenticate('google', {
            scope: ['profile', 'email'],
            state: base64url(JSON.stringify({
                successRedirect: ctx.request.query.success_redirect,
                failureRedirect: ctx.request.query.failure_redirect
            }))
        })(ctx, next);
    }
}

export function isGoogleAuthenticatedCallback(ctx, next) {
    return async(ctx, next) => {
        var callbackOpts = await JSON.parse(base64url.decode(ctx.request.query.state));
        await passport.authenticate('google', function(user, info) {
            if (user) {
                ctx.redirect(callbackOpts.successRedirect);
            } else {
                ctx.redirect(callbackOpts.failureRedirect);
            }
        })(ctx, next);
    }
}

export function findOrCreate(query, newFields, done) {
    try {
        User.findOne(query, (err, user) => {
            if (err) {
                return done(err);
            }
            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
            if (!user) {
                const newUser = {};
                for (const item in newFields) {
                    newUser[item] = newFields[item];
                }
                user = new User(newUser);
                user.save(err => {
                    if (err) {
                        console.log(err);
                        return done(err, user, {'message': 'Error while saving the user.'});
                    } else {
                        return done(err, user, {'message': 'User successfully saved.'});
                    }
                });
            } else {
                //found user. Return
                return done(err, user, {'message': 'User found.'});
            }
        });
    } catch (err) {
        throw new Error("Error in findOrCreate function.");
        return done(err);
    }
}

// Checking if the user role is having the action or not.
// USAGE: checkRole("super-admin", "delete_user");
// This will check the delete_user action in super-admin role in roles json
export function checkRole(role, action) {
    if(action.constructor == String) {
        const roleWithActions = _.findWhere(roles, {"name": role});
        if(roleWithActions) {
            const roleActions = roleWithActions["actions"]
            if(roleActions.includes(action)) {
               return true; 
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}