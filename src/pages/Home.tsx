import React from 'react';
import {useSearchUsersQuery} from "../store/github.api";

const HomePage = () => {
    const {data, isError, isFetching, isLoading} = useSearchUsersQuery('viacheslav');
    return (
        <div>
            Home
        </div>
    );
};

export default HomePage;
