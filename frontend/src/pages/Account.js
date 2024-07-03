import React from 'react';
import BlogBoxUser from '../components/BlogBoxUser';
import useAuthContext from '../hooks/useAuthContext';
import axios from "axios";
import { LoadingContext } from "../context/LoadingContext";
import { Alert } from "react-bootstrap";
import { UserBlogsContext } from '../context/UserBlogsContext';

export default function Account({ setDisplayFooter }) {
    const [formData, setFormData] = React.useState(null);
    const [edit, setEdit] = React.useState([false, false]);
    const { user } = useAuthContext();
    const fileInputRef = React.useRef(null);
    const profileRef = React.useRef(null);
    const [imageSrc, setImageSrc] = React.useState("");
    const [fetched, setFetched] = React.useState(false);
    const [blogsElement, setBlogsElement] = React.useState([]);
    const { dispatch } = React.useContext(LoadingContext);
    const { userBlogs, dispatch:userBlogsDispatch } = React.useContext(UserBlogsContext);
    const [error, setError] = React.useState("");
    const [isUpdated, setIsUpdated] = React.useState(false);

    setDisplayFooter(false);
    
    const [FORM, SETFORM] = React.useState(null);
    // On image click
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // Convert the file to a base64 file
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                console.log(e.target)
                setImageSrc(e.target.result);
                SETFORM({ 'file': e.target.result })
            };
        }
    };

    React.useEffect(() => {
        if (FORM){
            uploadImage();
        }
    }, [FORM])

    // Get the user info
    React.useEffect(() => {
        const getInfo = async () => {
            try {
                dispatch({ type: 'LOAD' });
                const response = await fetch('/user/info', {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
                const json = await response.json();
                setFormData({ ...json });
                setFormData(prev => {
                    return {
                        ...prev,
                        password: "",
                        confirmPassword: ""
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
        
        if (user) {
            getInfo()
        };
    }, [user])
    
    // Handle form change
    function handleChange(event) {
        setError("");
        setFormData((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }
    
    // Handle edit click
    function handleEdit(section) {
        setEdit((prev) => prev.map((s, idx) => {
            if (idx === section) return !s;
            
            return s;
        }))
    }
    
    // Store the password and clear it from the form
    React.useEffect(() => {
        if (!fetched && formData) {
            dispatch({ type: 'STOP_LOAD' });
            setFetched(true);
        };
    }, [formData, fetched])

    // Create the rendering element for the blogs published by the user
    React.useEffect(() => {
        if (fetched) {
            setBlogsElement(userBlogs.map((blog) => {
                return (
                    <BlogBoxUser 
                        blog={blog}
                    />
                )
            }))
        }
    }, [fetched, userBlogs]);

    React.useEffect(() => {
        if (formData) {
            userBlogsDispatch({ type: 'SET_BLOGS', blogs: formData.userBlogs});
        }
    }, [formData]);

    // Upload the image to the database
    const uploadImage = async () => {
        try {
            await axios.post('/user/uploadPic',
                FORM,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${user.token}`
                    }
                }
            );

            setIsUpdated(true);
            
            setTimeout(() => setIsUpdated(false), 2000);
        } catch (error) {
            console.log(error);
        }
    }

    // Update the user info
    const updateInfo = async () => {
        // Check that the passwords are equal
        if (formData.password !== formData.confirmPassword) setError("The passwords don't match!")

        try {
            await axios.patch('/user/updateInfo', formData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })

            setIsUpdated(true);
            profileRef.current.scrollTop = 0;
            setTimeout(() => setIsUpdated(false), 2000);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        fetched && <div className="account--container">
            <div className="profile--container" ref={profileRef}>

                {isUpdated && <Alert key="success" variant="success">
                    Blog added successfully!
                </Alert>}
                <h3 className="acount-settings--title">Profile Settings</h3>

                {imageSrc !== "" ?
                    <div className="profile-pic--container">
                        <div style={{ backgroundImage: `url(${imageSrc})` }} className="profile-img" onClick={handleImageClick}></div>
                        <button className="green-button save-settings">Save</button>
                    </div>
                    :
                    <span className="material-symbols-outlined profile-icon" onClick={handleImageClick}>account_circle</span>
                }
                <form enctype="multipart/form-data" name="image">
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </form>
                <div className="account-settings-section">
                    <div className="section-subtitle--container">
                        <h4 className="section-subtitle">Name</h4>
                        {edit[0] ? 
                            <div>
                                <button className="green-button save-settings" onClick={updateInfo}>Save</button>
                                <button className="green-button cancel-settings" onClick={() => handleEdit(0)}>Cancel</button>
                            </div>
                            : 
                            <span className="material-symbols-outlined edit-icon" onClick={() => handleEdit(0)}>edit</span>
                        }
                    </div>
                    
                    <div className="subsection-account">
                        <label htmlFor="first_name" className="label-account">First Name:</label>
                        {edit[0] ? 
                            <input type="text" placeholder="First Name" name="first_name" className="account-input" value={formData.first_name} onChange={handleChange} />
                            : 
                            <p className="account--field">{formData.first_name}</p>
                        }
                        
                    </div>

                    <div className="subsection-account">
                        <label htmlFor="last_name" className="label-account">Last Name:</label>
                        {edit[0] ? 
                            <input type="text" placeholder="Last Name" name="last_name" className="account-input" value={formData.last_name} onChange={handleChange} />
                            : 
                            <p className="account--field">{formData.last_name}</p>
                        }
                        
                    </div>
                </div>

                <div className="account-settings-section">
                    <div className="section-subtitle--container">
                        <h4 className="section-subtitle">Password</h4>
                        {edit[1] ? 
                            <div>
                                <button className="green-button save-settings" onClick={updateInfo}>Save</button>
                                <button className="green-button cancel-settings" onClick={() => handleEdit(1)}>Cancel</button>
                            </div>
                            : 
                            <span className="material-symbols-outlined edit-icon" onClick={() => handleEdit(1)}>edit</span>
                        }
                    </div>
                    
                    <div className="subsection-account">
                        <label htmlFor="password" className="label-account">Password:</label>
                        {edit[1] ? 
                            <input type="password" placeholder="Password" name="password" className="account-input" value={formData.password} onChange={handleChange} />
                            : 
                            <p className="account--field">***********</p>
                        }
                        
                    </div>

                    {edit[1] && <div className="subsection-account">
                        <label htmlFor="confirmPass" className="label-account">Confirm Password:</label>
                        <input type="password" placeholder="Confirm" name="confirmPassword" className="account-input" value={formData.confirmPassword} onChange={handleChange} />
                    </div>}

                    {edit[1] && error !== "" && <p className="account-error">{error}</p>}
                </div>
            </div>

            <div className="profile-blogs--container">
                <h3 className="acount-settings--title">Blogs Published</h3>
                {blogsElement.length === 0 ? <p className="no-blogs-p">You haven't published any blog yet.</p> : blogsElement}
            </div>
        </div>
    )
}