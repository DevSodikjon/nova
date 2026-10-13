export function authErrorMessage(error: unknown): string {
  const code = (error as { code?: string })?.code;

  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email or password incorrect";
    case "auth/email-already-in-use":
      return "This email is already exist";
    case "auth/weak-password":
      return "Password should be less then 6 characters";
    case "auth/too-many-requests":
      return "too many attampt, try later";
    default:
      return "Error. Try again";
  }
}