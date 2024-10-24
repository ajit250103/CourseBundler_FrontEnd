import { createReducer } from '@reduxjs/toolkit';

export const otherReducer = createReducer({}, (builder) => {
  builder
    // Contact
    .addCase('contactRequest', (state) => {
      state.loading = true;
    })
    .addCase('contactSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('contactFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Course Request
    .addCase('courseRequestRequest', (state) => {
      state.loading = true;
    })
    .addCase('courseRequestSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('courseRequestFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Clear Error and Message
    .addCase('clearError', (state) => {
      state.error = null;
    })
    .addCase('clearMessage', (state) => {
      state.message = null;
    });
});
