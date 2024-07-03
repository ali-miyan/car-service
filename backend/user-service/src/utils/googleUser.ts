import axios from "axios";

export const getUserFromGoogle = async (
  access_token: string,
  token_type: string
): Promise<{ email: string; name: string; id: string }> => {
  const { data: profile } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo`,
    {
      headers: { Authorization: `${token_type} ${access_token}` },
    }
  );

  return profile;
};
