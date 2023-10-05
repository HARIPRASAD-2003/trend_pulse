import React, { useState } from 'react';
import './Categories.css';

const Categories = () => {
    const initialSelection = {
        Action: false,
        Adventure: false,
        Animation: false,
        Comedy: false,
        Crime: false,
        Drama: false,
        Fantasy: false,
        Horror: false,
        Mystery: false,
        Romance: false,
        'Sci-Fi': false,
        Thriller: false,
        Western: false,
        Documentary: false,
    };

    const [selectedCategories, setSelectedCategories] = useState(initialSelection);

    const handleCategoryClick = (category) => {
        const updatedSelection = { ...selectedCategories };
        updatedSelection[category] = !selectedCategories[category];
        setSelectedCategories(updatedSelection);
    };

    const handleSave = () => {
        console.log('Saved');
        console.log()
    };

    const categoryList = Object.keys(selectedCategories);

    return (
        <div className="categoryPage">
            <div className="categories-container">
                <h1>Select Your Preferences</h1>
                <div className="categories-list">
                    {categoryList.map((category) => (
                        <div
                            key={category}
                            className={`category-item ${
                                selectedCategories[category] ? 'selected' : ''
                            }`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            <b>{category}</b>
                        </div>
                    ))}
                </div>
                <button className="save-button" onClick={handleSave}>Save Preferences</button>
            </div>
        </div>
    );
};

export default Categories;
