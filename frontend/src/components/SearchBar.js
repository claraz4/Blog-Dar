import React from 'react';
import categories from '../data/categories';
import { LatestBlogsContext } from '../context/LatestBlogsContext';
import { LoadingContext } from '../context/LoadingContext';
import axios from "axios";

export default function SearchBar() {
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [isArrowCliked, setIsArrowClicked] = React.useState(false);
    const [categoriesOptions, setCategoriesOptions] = React.useState([]);
    const { dispatch:blogsDispatch } = React.useContext(LatestBlogsContext);
    const { dispatch } = React.useContext(LoadingContext);

    // Change the blogs array
    const fetchLatest = async () => {
        try {
            const response = await axios.get('/blogs/filtered', {
                params: {
                  category: category,
                  title: search
                }
              });

            blogsDispatch({ type: 'SET_BLOGS', blogs: response.data });
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        fetchLatest();
    }, [category, search])

    // Create the categories options
    React.useEffect(() => {
        setCategoriesOptions(categories.map((category, id) => <option key={id} value={category}>{category}</option>))
    }, []);

    // Handle the search
    function handleSearch(event) {
        setSearch(event.target.value);
    }

    // Handle the category
    function handleCategory(event) {
        setCategory(event.target.value);
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
                <select className="category-filtering" onClick={handleSelect} onChange={handleCategory}>
                    <option value="">All Categories</option>
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