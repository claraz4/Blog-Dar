import React from 'react';
import "../styles/write-blog.css";
import FormParagraph from '../components/FormParagraph';
import RevealOnScroll from '../components/RevealOnScroll';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import Alert from 'react-bootstrap/Alert';

export default function WriteBlog({ setDisplayFooter}) {
    const location = useLocation();
    const prevBlog = location.state ? location.state.blog : null;
    const { user } = useAuthContext();
    
    React.useEffect(() => {
        setDisplayFooter(false);
    }, [])

    const [categories, setCategories] = React.useState([]);
    const [categoriesOptions, setCategoriesOptions] = React.useState([]);
    const [formData, setFormData] = React.useState({
        "title": "",
        "category": ""
    });
    const [content, setContent] = React.useState(["", ""]);
    const [paragraphs, setParagraphs] = React.useState([0]);
    const [paragraphsElement, setParagraphsElement] = React.useState([]);
    const [isUploaded, setIsUploaded] = React.useState(false);

    // Post a blog
    const addBlog = async () => {
        try {
            await axios.post('/blogs/createBlog', {
                ...formData,
                content
            }, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsUploaded(true);

            setFormData({
                "title": "",
                "category": ""
            });
            setContent(["", ""]);
            setParagraphs([0]);

            setTimeout(() => {
                setIsUploaded(false);
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }


    // Update a blog
    const updateBlog = async () => {
        try {
            await axios.patch(`/blogs/updateBlog/${prevBlog._id}`, {
                ...formData,
                content
            }, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsUploaded(true);
        } catch (error) {
            console.log(error);
        }
    }
    
    // Fetch categories
    React.useEffect(() => {
        if (prevBlog) {
            setFormData(() => {
                return { 
                    title: prevBlog.title, 
                    category: prevBlog.category 
                }
            });
            setContent(() => prevBlog.content);
            setParagraphs(() => {
                const arr = [];
                for (let i = 0; i < prevBlog.content.length; i+=2) {
                    arr.push(i);
                }
                return arr;
            })
        }

        // Fetch the categories
        const fetchCategories = async () => {
            try {
                const res = await fetch('/categories/');
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCategories();
    }, []);

    // Create the categories options
    React.useEffect(() => {
        setCategoriesOptions(categories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>))
    }, [categories]);

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

        if (prevBlog) {
            updateBlog();
        } else {
            addBlog();
        }
    }

    return (
        <RevealOnScroll>
            <form className="form--container">
                {isUploaded && <Alert key="success" variant="success">
                    Blog added successfully!
                </Alert>}
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