const en = {
  signIn: {
    signIn: "Sign in",
    forgotPassword: "Glömt lösenordet?",
  },
};

export default en;

/**
 * English is "master", use this type in other language file to let
 * typescript linter/compiler throw errors if anything is missing
 */
export type AppLang = typeof en;
