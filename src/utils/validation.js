import axios from "axios";

export async function checkReferralToken(token) {
  try {
    const response = await axios.get(
      `https://api.blackfoxmetaverse.io/referral/check?token=${token}`
    );

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}
