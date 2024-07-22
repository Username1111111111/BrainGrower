const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(new Date().getTime() / 1000);
    return now > payload.exp;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return true;
  }
};

export default isTokenExpired;
