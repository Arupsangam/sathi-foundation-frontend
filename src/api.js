import axios from "axios";

const BASE_URL = "https://sathi-foundation-backend-3.onrender.com/api";

export const registerMember = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/members/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API ERROR:", error.response?.data || error.message);
    throw error.response?.data || { message: "Server Error" };
  }
};