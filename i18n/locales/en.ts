const en = {
  login: {
    signIn: "Sign in",
    forgotPassword: "Forgot password?",
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
};

export default en;

/**
 * English is "master", use this type in other language file to let
 * typescript linter/compiler throw errors if anything is missing
 */
export type AppLang = typeof en;
