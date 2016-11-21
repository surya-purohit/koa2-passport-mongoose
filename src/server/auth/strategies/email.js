import User from '../../models/User';
import { Strategy as CustomStrategy } from 'passport-custom';

export default new CustomStrategy(async(ctx, done) => {
    console.log('Email Strategy: ', ctx.body);
    try {
        /** Test whether is a login using email and password */
        if (ctx.body.email && ctx.body.password) {
            const user = await User.findOne({ email: ctx.body.email.toLowerCase() });

            if (!user) { done(null, false); }
            const password = ctx.body.password;
            console.log(user.validPassword(password))
            if (!user.validPassword(password))
                return done(null, false);
            
            // TODO - check password
            done(null, user);

        } else {
            done(null, false);
        }
    } catch (error) {
        done(error);
    }
});
