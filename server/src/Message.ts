interface MessageObj {
  [key: string]: string;
}

export const MESSAGE: MessageObj = {
  PASSWORD_REQUIRED: 'Password is required',
  DONT_HAVE_PERMISSION_TO_ACCESS: 'You do not have the necessary permissions to access this resource.',
  USER_EXISTS: 'User with such email already exists',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  LOGIN_SUCCESSFUL: 'Login successful',
  USER_CREATED_SUCCESSFULLY: 'User created successfully',
  UNAUTHORIZED_ACCESS: 'Unauthorized access to user profile',
  USER_CREATED: 'Created',
  USER_READ: 'Read',
  USER_UPDATED: 'Updated',
  USER_DELETED: 'Deleted',
  USER_LOGGED_IN: 'Logged in',
  USER_IMAGE_UPDATED: 'Image updated',
};
