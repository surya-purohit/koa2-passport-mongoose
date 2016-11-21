export const localClient = {
    name: 'local',
    id: 'local',
    secret: 'local',
};

export const facebook = {
    clientID: '214873665615110',
    clientSecret: 'f30ba1c22c6fef150c4b8ffae3cbffe4',
    callbackURL: 'http://127.0.0.1:1337/api/auth/facebook/callback',
    profileFields: ['displayName', 'email']
};

export const twitter = {
    consumerKey: 'MEDRHZjnLDEmezsTQs4z4QmjZ',
    consumerSecret: 'JnV0EgCsj6MwI6Ba4j78kNFvj7yx12Om1UnVXEWZqcW1smKqV5',
}

export const github = {
    clientID: 'a8d9b0d05cbf60ef80b3',
    clientSecret: '63a56f2a0a2653141fb51ff29ad50a02b684ed5d',
    callbackURL: "http://127.0.0.1:1337/api/auth/github/callback"
}

export const google = {
    clientID: '611218109388-0amr375q66h25navqmb64qo7nt52i706.apps.googleusercontent.com',
    clientSecret: 'NcEkaoVBwl1GvQnFYmtp8-16',
    callbackURL: 'http://127.0.0.1:1337/api/auth/google/callback'
}

export const instagram = {
    clientID: 'b1d613e0cf99447f98d6cdae3c2c412e',
    clientSecret: 'd4b84d15464c492191d840303b290b27',
    callbackURL: 'http://127.0.0.1:1337/api/auth/instagram/callback'
}

export const linkedin = {
    consumerKey: '814clxghsbu6z3',
    consumerSecret: 'Wb15uPYDDEdyPZwT',
    callbackURL: 'http://127.0.0.1:1337/api/auth/linkedin/callback',
    profileFields: ['id', 'first-name', 'last-name', 'email-address']
}

// TODO - add a real secret key
export const auth = {
    secret: 'my-secret-code',
};
