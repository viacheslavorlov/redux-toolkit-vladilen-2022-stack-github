import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const gitHubFavorites = 'github-favorites'

interface GithubState {
    favorites: string[]
}

const initialState: GithubState = {
    favorites: JSON.parse(localStorage.getItem(gitHubFavorites) ?? '[]')
};

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<string>) {
            state.favorites.push(action.payload)
            localStorage.setItem(gitHubFavorites, JSON.stringify(state.favorites))
        },
        removeFavourite(state, action: PayloadAction<string>) {
            state.favorites = state.favorites.filter(el => el !== action.payload)
            localStorage.setItem(gitHubFavorites, JSON.stringify(state.favorites))
        },
    }
});

export const gitHubReducer = githubSlice.reducer;
export const {addFavourite, removeFavourite} = githubSlice.actions