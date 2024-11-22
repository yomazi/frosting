import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import scrapeTheFreight from "../../services/web-scraper";

export const fetchPerformances = createAsyncThunk(
  "performances/fetchPerformances",
  async (_, thunkAPI) => {
    try {
      const performanceList = await scrapeTheFreight();

      return performanceList;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch performance data");
    }
  },
);

const performanceSlice = createSlice({
  name: "performances",
  initialState: {
    performances: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearPerformances(state) {
      state.performances = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerformances.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPerformances.fulfilled, (state, action) => {
        state.performances = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPerformances.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { clearPerformances } = performanceSlice.actions;
export default performanceSlice.reducer;
