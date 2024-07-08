interface ErrorObject {
  [key: string]: string;
}

export const errorMessage: ErrorObject = {
  PASSWORD_REQUIRED: 'Password is required',
  DONT_HAVE_PERMISSION_TO_ACCESS: 'You do not have the necessary permissions to access this resource.'
}