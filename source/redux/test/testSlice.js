import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { getUserList } from "../../services/api/methods/getUsers";

// for api request we use asyn methods
export const fetchTestUser = createAsyncThunk("get/fetchTestUser", async () => {
  try {
    const response = await getUserList();
    const data = response.data;
    return data;
  } catch (err) {
    throw err.message == "Network Error" ? err?.message : err?.response?.data;
  }
});
// end

const testSlice = createSlice({
  name: "test",
  initialState: {
    testData: null,
    loading: false,
    error: "",
  },
  reducers: {
    resetTestData: (state, action) => {
      state.testData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestUser.fulfilled, (state, action) => {
        state.testData = action.payload;
        state.loading = false;
      })
      .addCase(fetchTestUser.rejected, (state, action) => {
        state.loading = false;
        console.log("error", action);
      });
  },
});

export const { resetTestData } = testSlice.actions;
export default testSlice.reducer;
