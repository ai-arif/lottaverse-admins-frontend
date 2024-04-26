import { postRequest,getRequest } from "..";

export const createLottery = async (body) => {
  try {
    const res = await postRequest("/createlottery", body);
    console.log(res?.data);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// get /activelotteries
export const getActiveLotteries = async () => {
  try {
    const res = await getRequest("/activelotteries");
    console.log(res?.data);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
