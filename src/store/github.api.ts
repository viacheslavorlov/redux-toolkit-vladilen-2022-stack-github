import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IServerResponse, IUser} from "../models/models";

export const githubApi = createApi({
    reducerPath: 'github/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com'
    }),
    endpoints: build => ({
        searchUsers: build.query<IServerResponse<IUser>, string>({
            query: (search:string) => ({
                url: 'search/users',
                params: {
                    q: search
                }
            })
        })
    })
});

export const {useSearchUsersQuery} = githubApi;