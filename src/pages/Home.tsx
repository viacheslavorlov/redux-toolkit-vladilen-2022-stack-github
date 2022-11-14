import React, {useEffect, useState} from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github.api";
import {useDebounce} from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
    const [search, setSearch] = useState('initState');
    const debounce = useDebounce(search);
    const [dropdown, setDropdown] = useState(false);
    const {data, isError, isLoading} = useSearchUsersQuery(debounce, {
        skip: debounce.length < 3,
        refetchOnFocus: true
    });

    const [fetchRepos, {isLoading: isReposLoading, data: repos}] = useLazyGetUserReposQuery();

    const clickHandler = (username: string) => {
        fetchRepos(username);
        setDropdown(false)
    }

    useEffect(() => {
        setDropdown(debounce.length > 3 && data?.length! > 0)
    }, [debounce, data]);

    return (
        <>
            <h1 className="w-full text-center text-2xl text-black ">HOME</h1>
            <div className="flex justify-center pt-10 mx-auto h-screen w-screen">

                {isError && <p className="text-center text-red-600">Something went wrong...</p>}
                <div className="relative w-[560px]">
                    <input
                        type="text"
                        className="border py-2 px-4 w-full h-[42ps] mb-2"
                        placeholder="Search for GitHub username..."
                        onChange={e => setSearch(e.target.value)}/>
                    {dropdown && <ul
						className="overflow-y-scroll list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-mb bg-white">
                        {isLoading && <p className="text-center text-red-600">Loading...</p>}
                        {data?.map(user => {
                            return (
                                <li className="py-2 px-4 hover:bg-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                                    key={user.id}
                                    onClick={() => clickHandler(user.login)}>
                                    {user.login}
                                </li>
                            )
                        })}
					</ul>}
                    {isReposLoading && <p className="text-center">Repos are Loading...</p>}
                    <div className="container">
                        {repos?.map((repo) => <RepoCard repo={repo} key={repo.id}/>)}
                    </div>
                </div>


            </div>
        </>

    );
};

export default HomePage;
