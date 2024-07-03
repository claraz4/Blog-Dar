import React from 'react';
import BlogBoxUser from '../components/BlogBoxUser';
import useAuthContext from '../hooks/useAuthContext';
import axios from "axios";
import { LoadingContext } from "../context/LoadingContext";
import { Alert } from "react-bootstrap";

export default function Account() {
    const [formData, setFormData] = React.useState(null);
    const [edit, setEdit] = React.useState([false, false]);
    const { user } = useAuthContext();
    const [selectedFile, setSelectedFile] = React.useState("");
    const fileInputRef = React.useRef(null);
    const [imageSrc, setImageSrc] = React.useState('');
    const [password, setPassword] = React.useState("");
    const [fetched, setFetched] = React.useState(false);
    const [blogsElement, setBlogsElement] = React.useState([]);
    const { dispatch } = React.useContext(LoadingContext);

    // On image click
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // Convert the file to a base64 file
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
                setFormData({ ...json, confirmPassword: "" });
            } catch (error) {
                console.log(error);
            }
        }
        
        if (user) getInfo();
    }, [user])
    
    // Handle form change
    function handleChange(event) {
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
        if (fetched && formData.password === "") {
            setPassword(formData.password);
            setFormData(prev => {
                return {
                    ...prev,
                    password: ""
                }
            })
        }
        
        if (!fetched && formData) {
            dispatch({ type: 'STOP_LOAD' });
            setFetched(true);
        };
    }, [formData])

    // Create the rendering element for the blogs published by the user
    React.useEffect(() => {
        if (fetched) {
            setBlogsElement(formData.userBlogs.map((blog) => {
                return (
                    <BlogBoxUser 
                        blog={blog}
                    />
                )
            }))
        }
    }, [fetched]);

    // function handleImage(event) {
    //     const file = event.target.files[0];
    //     setSelectedFile(file);
    //     console.log(file)

    //     // const reader = new FileReader();
    //     // reader.onloadend = () => {
    //     //     const base64String = reader.result.split(',')[1]; 
    //     //     uploadImage(base64String);
    //     // };
    //     // reader.readAsDataURL(file);
    // }

    const uploadImage = async () => {
        try {
            const response = await axios.post('/user/uploadPic', 
                {
                    file: selectedFile
                },
                {
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    return (
        fetched && <div className="account--container">
            <div className="profile--container">

                <h3 className="acount-settings--title">Profile Settings</h3>

                {imageSrc !== "" ?
                    <div style={{ backgroundImage: `url(${imageSrc})` }} className="profile-img"></div>
                    // <img src={imageSrc} width="192px" height="192px" style={{ "border-radius": "50%" }}></img>
                    :
                    <span className="material-symbols-outlined profile-icon" onClick={handleImageClick}>account_circle</span>
                }
                <form>
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
                                <button className="green-button save-settings">Save</button>
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
                                <button className="green-button save-settings">Save</button>
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
                        <input type="password" placeholder="Confirm" name="confirmPass" className="account-input" value={formData.confirmPassword} onChange={handleChange} />
                    </div>}
                </div>
            </div>

            <div className="profile-blogs--container">
                <h3 className="acount-settings--title">Blogs Published</h3>
                {blogsElement.length === 0 ? <p className="no-blogs-p">You haven't published any blog yet.</p> : blogsElement}
            </div>
        </div>
    )
}