import React, {useState} from 'react';
import {IRepo} from "../models/models";
import {useActions} from "../hooks/actions";
import {useAppSelector} from "../hooks/rerux";

const RepoCard = ({repo}: {repo: IRepo}) => {
    const {favorites} = useAppSelector(state => state.github)
    const {addFavourite, removeFavourite} = useActions();
    const [isFav, setIsFav] = useState(favorites.includes(repo.html_url));

    const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        addFavourite(repo.html_url);
        setIsFav(true)
    }
    const removeFromFavorit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        removeFavourite(repo.html_url)
        setIsFav(false )
    }
    return (
        <div className="border py-3 px-5 mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
            <a href={repo.html_url} target="_blank" rel="noreferrer">
            <h2 className="text-lg font-bold">{repo.full_name}</h2>
            <p className="text-sm">
                Forks: <span className="font-bold">{repo.fork}</span>
                Watchers: <span className="font-bold">{repo.watchers}</span>
            </p>
            <p className="text-sm font-thin">{repo?.description}</p>
            </a>
            {!isFav && <button
                className="py-2 px-4 bg-yellow-600 rounded hover:shadow-md transition-all"
                onClick={addToFavorite}>
                Add to favorite
            </button>}

            {isFav && <button
                className="py-2 px-4 bg-red-600 rounded hover:shadow-md transition-all"
                onClick={removeFromFavorit}>
                Remove from favorite
            </button>}
        </div>
    );
};

export default RepoCard;
