const extractToken = (token: string | null): string | null => {
  try {
    const tokenParts = token?.split(".");
    if (!tokenParts) {
      return null;
    }
    const encodedPayload = tokenParts[1];
    const decodedPayload = atob(encodedPayload);
    const userObject = JSON.parse(decodedPayload).user;

    return userObject;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default extractToken;
