import { 
    authEmail,
    generateToken,
    isFacebookAuthenticated,
    isFacebookAuthenticatedCallback,
    isGoogleAuthenticated,
    isGoogleAuthenticatedCallback,
    isTwitterAuthenticated,
    isTwitterAuthenticatedCallback,
    isInstagramAuthenticated,
    isInstagramAuthenticatedCallback,
    isGithubAuthenticated,
    isGithubAuthenticatedCallback,
    isLinkedinAuthenticated,
    isLinkedinAuthenticatedCallback
} from '../../auth';
import { ERROR, OK } from '../../consts';
import User from '../../models/User';
import passport from "koa-passport";
export default (router) => {
    router.post('/auth/email', authEmail(), generateToken());
    router.post('/auth/register', register, generateToken());
    router.get('/auth/facebook', isFacebookAuthenticated());
    router.get('/auth/facebook/callback', isFacebookAuthenticatedCallback());
    router.get('/auth/google', isGoogleAuthenticated());
    router.get('/auth/google/callback', isGoogleAuthenticatedCallback());
    router.get('/auth/twitter', isTwitterAuthenticated());
    router.get('/auth/twitter/callback', isTwitterAuthenticatedCallback(), async(ctx, next)=>{console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd", ctx.request.query.state)});
    router.get('/auth/instagram', isInstagramAuthenticated());
    router.get('/auth/instagram/callback', isInstagramAuthenticatedCallback());
    router.get('/auth/github', isGithubAuthenticated());
    router.get('/auth/github/callback', isGithubAuthenticatedCallback());
    router.get('/auth/linkedin', isLinkedinAuthenticated());
    router.get('/auth/linkedin/callback', isLinkedinAuthenticatedCallback());
};

async function register(ctx, next) {
    console.log("register");
    const { name, email, password } = ctx.request.body;

    // TODO - improve validation
    if (name && email && password) {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                name,
                email
            });

            // TODO handle password

            await user.save();

            ctx.passport = {
                user: user._id,
            };

            await next();

        } else {
            ctx.status = 400;
            ctx.body = { status: 'error', message: 'E-mail already registered' };
        }
    } else {
        ctx.status = 400;
        ctx.body = { status: 'error', message: 'Invalid email or password' };
    }
}
