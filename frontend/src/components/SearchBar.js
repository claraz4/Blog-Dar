import React from 'react';
import categories from '../data/categories';

export default function SearchBar() {
    const [search, setSearch] = React.useState("");
    const [isArrowCliked, setIsArrowClicked] = React.useState(false);
    const [categoriesOptions, setCategoriesOptions] = React.useState([]);

    // Create the categories options
    React.useEffect(() => {
        setCategoriesOptions(categories.map((category, id) => <option key={id} value={category}>{category}</option>))
    }, []);

    // Handle the search
    function handleSearch(event) {
        setSearch(event.target.value);
    }

    // To switch between the down and up arrow
    function handleSelect() {
        setIsArrowClicked(prev => !prev);
    }

    return (
        <div className="search-bar--container">
            <div className="search--container">
                <span className="material-symbols-outlined green-color">search</span>
                <input 
                    type="text" 
                    value={search} 
                    onChange={handleSearch} 
                    placeholder="Search Blogs"
                    className="search-bar" 
                />
            </div>

            <div className="category-filter--container">
                <select className="category-filtering" onClick={handleSelect}>
                    <option>All Categories</option>
                    {categoriesOptions}
                </select>
                {!isArrowCliked ?
                    <span class="material-symbols-outlined green-color select-arrow">keyboard_arrow_down</span>
                    :
                    <span class="material-symbols-outlined green-color select-arrow fast-fadein">keyboard_arrow_up</span>
                }
            </div>
        </div>
    )
}