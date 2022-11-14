import React from 'react';
import {useAppSelector} from "../hooks/rerux";

const FavoritesPage = () => {
    const {favorites} = useAppSelector(state => state.github)

    if (favorites.length === 0) return <p className="text-center">No items</p>

    return (
        <ul className="list-none">
            {favorites?.map(item => {
                return (
                    <li key={item} className="mt-2 text-lg underline border border-2 rounded">
                        <a href={item} target="_blank" rel="noreferrer">{item}</a>
                    </li>
                )
            })}
        </ul>
    );
};

export default FavoritesPage;
