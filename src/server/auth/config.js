export const localClient = {
    name: 'local',
    id: 'local',
    secret: 'local',
};

export const facebook = {
    clientID: 'your_facebook_clientID',
    clientSecret: 'your_facebook_clientSecret',
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['displayName', 'email']
};

export const twitter = {
    consumerKey: 'your_twitter_consumerKey',
    consumerSecret: 'your_twitter_consumerSecret',
}

export const github = {
    clientID: 'your_gihub_clientID',
    clientSecret: 'your_github_clientSecret',
    callbackURL: "/api/auth/github/callback"
}

export const google = {
    clientID: 'your_google_clientID',
    clientSecret: 'your_google_clientSecret',
    callbackURL: '/api/auth/google/callback'
}

export const instagram = {
    clientID: 'your_instagram_clientID',
    clientSecret: 'your_instagram_clientSecret',
    callbackURL: '/api/auth/instagram/callback'
}

export const linkedin = {
    consumerKey: 'your_linkedin_consumerKey',
    consumerSecret: 'your_linkedin_consumerSecret',
    callbackURL: '/api/auth/linkedin/callback',
    profileFields: ['id', 'first-name', 'last-name', 'email-address']
}

// TODO - add a real secret key
export const auth = {
    secret: 'my-secret-code',
};
