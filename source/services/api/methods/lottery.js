import { postRequest } from "..";

export const createLottery = async (body) => {
  try {
    const res = await postRequest("/createlottery", body);
    console.log(res?.data);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
