import GoTrue from 'gotrue-js';

export const auth = new GoTrue({
  APIUrl: "https://quorum.netlify.com/.netlify/identity",
  audience: "",
  setCookie: false //  TODO: Experiment with cookies
});

/**
 * Sample response from auth server
 * {
  id: 'example-id',
  aud: '',
  role: '',
  email: 'example@example.com',
  confirmation_sent_at: '2018-04-27T22:36:59.636416916Z',
  app_metadata: { provider: 'email' },
  user_metadata: null,
  created_at: '2018-04-27T22:36:59.632133283Z',
  updated_at: '2018-04-27T22:37:00.061039863Z'
}
 */
/**
 * Register a user with an email and password
 * @param email
 * @param password
 * @param data
 * @returns {Promise<void>}
 */
export function register(email, password, data) {
  if(!data) data = {};
  return auth.signup(email, password, data);
}


/**
 * Will verify a user when they use the token which was sent to their email
 * @param token
 * @returns {Promise<User>}
 */
export function confirm(token) {
  return auth.confirm(token);
}

/**
 * User type response from auth server
 * {
  "response": {
    "api": {
      "apiURL": "https://example.netlify.com/.netlify/identity",
      "_sameOrigin": true,
      "defaultHeaders": {}
    },
    "url": "https://example.netlify.com/.netlify/identity",
    "token": {
      "access_token": "example-jwt-token",
      "token_type": "bearer",
      "expires_in": 3600,
      "refresh_token": "example-refresh_token",
      "expires_at": 1526062471000
    },
    "id": "example-id",
    "aud": "",
    "role": "",
    "email": "example@netlify.com",
    "confirmed_at": "2018-05-04T23:57:17Z",
    "app_metadata": {
      "provider": "email"
    },
    "user_metadata": {},
    "created_at": "2018-05-04T23:57:17Z",
    "updated_at": "2018-05-04T23:57:17Z"
  }
}
 */
/**
 * Login a user with their credentials
 * @param email
 * @param password
 * @returns {Promise<User>}
 */
export function login(email, password) {
  return auth.login(email, password, true);
}

/**
 * Initiate password recovery process
 * @param email
 * @returns {Promise<void>}
 */
export function requestPasswordRecovery(email) {
  return auth.requestPasswordRecovery(email);
}

/**
 * Allow a user to login once, allowing them to change their password
 * @param recoveryToken
 * @returns {Promise<User>}
 */
export function recoverAccount(recoveryToken) {
  return auth.recover(recoveryToken);
}

/**
 * Returns User Auth details
 * @returns {User | null}
 */
export function getCurrentUser() {
  return auth.currentUser();
}

// TODO: Add custom methods for resetting password

/**
 * Returns the JWT of the logged in user
 * @returns {Promise<string>}
 */
export function getJwt() {
  return auth.currentUser().jwt();
}

export function logout(user) {
  console.log("auth current user: ", auth.currentUser());
  return auth.currentUser().logout();
}

export function updateUserMetaData(data) {
  if(!data) throw new Error("Cannot have no metadata!");
  let user = auth.currentUser();
  // We loop over all object properties and remove any bad ones. The api will only update the given properties.
  for (const prop in data) {
    if(data.hasOwnProperty(prop)){
      if(data.prop == null || data.prop === undefined || data.prop === "" || isNaN(data.prop)){
        delete data.prop;
      }
    }
  }
  return user.update(data);
}
