import React from 'react';
import "../styles/write-blog.css";
import categories from "../data/categories";
import FormParagraph from '../components/FormParagraph';
import RevealOnScroll from '../components/RevealOnScroll';
import { CategoriesContext } from '../context/CategoriesContext';

export default function WriteBlog() {
    // const { categories, categoriesDispatch } = React.useContext(CategoriesContext);

    const [categoriesOptions, setCategoriesOptions] = React.useState([]);
    const [formData, setFormData] = React.useState({
        "title": "",
        "category": ""
    });
    const [content, setContent] = React.useState(["", ""]);
    const [paragraphs, setParagraphs] = React.useState([0]);
    const [paragraphsElement, setParagraphsElement] = React.useState([]);
    
    // Create the categories options
    React.useEffect(() => {
        setCategoriesOptions(categories.map((category, id) => <option key={id} value={category}>{category}</option>))
    }, []);

    // Handle the change of the form
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // Add a new paragraph and add a place in the content array
    function addParagraph() {
        setParagraphs(prev => {
            const newArr = [...prev];
            newArr.push(newArr[newArr.length - 1] + 2);
            return newArr;
        });

        setContent(arr => {
            const newArr = [...arr];
            newArr.push('');
            newArr.push('');
            return newArr;
        });
    }

    // Remove an added paragraph
    function removeParagraph() {
        setParagraphsElement(() => paragraphs.map((p, idx) => {
            if (idx === paragraphs.length-1) {
                // change the animation to fadeout to prepare for the removal of the paragraph
                return (
                    <FormParagraph
                        key={p} 
                        id={p}
                        content={content}
                        setContent={setContent}
                        removeParagraph={removeParagraph}
                        totalParagraphs={paragraphs[paragraphs.length - 1]}
                        animation="fadeout"
                    />
                )
            }

            return (
                <FormParagraph
                    key={p} 
                    id={p}
                    content={content}
                    setContent={setContent}
                    removeParagraph={removeParagraph}
                    totalParagraphs={paragraphs[paragraphs.length - 1]}
                    animation="fadein"
                />
            )
        }))

        // delete the paragraph when the animation is finished
        setTimeout(() => {
            // Remove the last paragraph
            setParagraphs(prev => prev.filter((p, idx) => idx !== prev.length - 1));

            // Remove the last subtitle and the last body
            setContent(prev => prev.filter((p, idx) => idx !== prev.length && idx + 1 !== prev.length));
        }, 700);
    }

    // Generate the rendering array for paragraphs
    React.useEffect(() => {
        setParagraphsElement(() => paragraphs.map((p) => {
            return (
                <FormParagraph
                    key={p} 
                    id={p}
                    content={content}
                    setContent={setContent}
                    removeParagraph={removeParagraph}
                    totalParagraphs={paragraphs[paragraphs.length - 1]}
                    animation="fadein"
                />
            )
        }))
    }, [paragraphs, content]);

    // Handle the submission of the form
    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <RevealOnScroll>
            <form className="form--container">
                <div className="form--subcontainer">
                    <label htmlFor="title">Blog Title</label>
                    <input type="text" placeholder="Title" name="title" value={formData.title} onChange={handleChange} />
                </div>

                <div className="form--subcontainer">
                    <label htmlFor="category">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange}>
                        <option value="">Categories</option>
                        {categoriesOptions}
                    </select>
                </div>

                <div className="form--subcontainer">
                    <label>Content</label>
                    {paragraphsElement}
                    <button type="button" onClick={addParagraph} className="green-button" id="add-p--button">Add paragraph</button>
                </div>

                <button className='green-button' id="post-blog--button" onClick={handleSubmit}>Post Blog</button>
            </form>
        </RevealOnScroll>
    )
}