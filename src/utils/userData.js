import axios from "axios";

export async function getSellerProfile(username) {
  try {
    const response = await axios.get(
      `api.blackfoxmetaverse.io/main/sellerProfile/${username}`
    );

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
}
