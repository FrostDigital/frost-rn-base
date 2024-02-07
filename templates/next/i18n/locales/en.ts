const en = {
  login: {
    signIn: "Sign in",
    forgotPassword: "Forgot password?",
    username: "Username",
    password: "Password",
    hint: "Username is 'demo@frost.se' and password is 'demo123' 🤫",
  },
  welcome: {
    title: "Foo app",
    subtitle: "A base app to rule them all 💥",
    login: "Login",
    signUp: "Sign up",
  },
  home: {
    title: "You are logged in",
    signOut: "Sign out",
  },
  errorBoundary: {
    title: "Oops, something went wrong",
    restart: "Tap to reload the app",
    description:
      "Sorry, the app encountered an unexpected error. Please press the button below to restart the app. This error has been reported to the developers.",
  },
};

export default en;

/**
 * English is "master", use this type in other language file to let
 * typescript linter/compiler throw errors if anything is missing
 */
export type AppLang = typeof en;
