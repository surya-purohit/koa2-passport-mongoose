import User                from '../../models/User';
import { isAuthenticated } from '../../auth';

export default (router) => {
  router
    /** Get user data from server using token */
    .get('/user/me', isAuthenticated(), async ctx => {
      console.log("hieli");
      const user = await User.findById(ctx.passport.user);
      if (user) { ctx.body = user; }
    })
    .get('/auth/logout', async ctx => {
        console.log(ctx.isAuthenticated(), ctx.passport.user, ctx.state.user)
        ctx.request.logout();
        console.log(ctx.isAuthenticated());
        ctx.body = "logged out";
    })
};
