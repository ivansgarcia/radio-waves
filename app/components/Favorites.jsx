import React, { useEffect, useState } from 'react';

const Favorites = ({ favorites, setCurrentRadio }) => {
    return (
        <div className="p-8">
            <h3 className="m-4 text-2xl">Favorites</h3>
            <ul className="flex flex-col gap-4">
                {favorites?.map((fav, index) => (
                    <li key={index}>
                        <button onClick={() => setCurrentRadio(fav)}>
                            {fav.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;
