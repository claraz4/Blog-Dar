import React from "react";
import BlogBoxUser from "../components/BlogBoxUser";
import useAuthContext from "../hooks/useAuthContext";
import axios from "axios";
import { LoadingContext } from "../context/LoadingContext";
import { Alert } from "react-bootstrap";
import { UserBlogsContext } from '../context/UserBlogsContext';
import { encode } from 'base64-arraybuffer';

export default function Account({ setDisplayFooter }) {
    // get the needed contexts
    const { user } = useAuthContext(); 
    const { dispatch } = React.useContext(LoadingContext);
    const { userBlogs, dispatch:userBlogsDispatch } = React.useContext(UserBlogsContext);

    // states used
    const [formData, setFormData] = React.useState(null);
    const [edit, setEdit] = React.useState([false, false]);
    const [fetched, setFetched] = React.useState(false);
    const [error, setError] = React.useState("");
    const [isUpdated, setIsUpdated] = React.useState(false);

    // elements to render
    const [blogsElement, setBlogsElement] = React.useState([]);
    
    // used for uploading the profile
    const fileInputRef = React.useRef(null);
    const profileRef = React.useRef(null);
    const [imageSrc, setImageSrc] = React.useState("");

    // Hide the footer from this page
    React.useEffect(() => {
        setDisplayFooter(false);
    }, []);
    
    // On image click
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // Convert the file to a base64 string
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageSrc(reader.result);
        };
        }
    };

    let url;
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
                setFormData({ 
                    ...json,
                    password: "",
                    confirmPassword: ""
                });
                dispatch({ type: 'STOP_LOAD' })
            } catch (error) {
                console.log(error);
            }
        }
        
        if (user) {
            getInfo();
        };
    }, [user]);

    React.useEffect(() => {
        if (formData && formData.profilePic) displayProfile(formData.profilePic);
    }, [formData])

    console.log(formData)
    // Display the profile pic if there is one
    const [imageUrl, setImageUrl] = React.useState("");
    function displayProfile(profile) {
        // let base64String = encode(profile.image.data);
        // console.log(base64String)

        // // the previous library will give me the following: dataimage/typebase64...
        // const startIdx = base64String.indexOf("/") + 1;
        // const endIdx = base64String.indexOf("base64");
        // const type = base64String.substring(startIdx, endIdx);

        // base64String = base64String.substring(endIdx + "base64".length);
        let base64String = btoa(String.fromCharCode.apply(null, profile.image.data));
        // const base64String = Buffer.from(profile.image.data).toString("base64");
        console.log("String: " + base64String)
        setImageUrl(`data:image/${"hi"};base64,${base64String}`);
    }
    
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
            setBlogsElement(userBlogs.map((blog, idx) => {
                return (
                    <BlogBoxUser 
                        blog={blog}
                        key={idx}
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
                {
                    base64: imageSrc
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`
                    }
                }
            );

            // approve the update
            setIsUpdated(true);
            setTimeout(() => setIsUpdated(false), 2000);
        } catch (error) {
            console.log(error);
        }
    }

    // Update the user info
    const updateInfo = async (event) => {
        let toSend = {};
        let isError = false;

        if (event.target.name === "password") {
            // Check the passwords
            if (formData.password !== formData.confirmPassword) {
                setError("The passwords don't match!");
                isError = true;
            };

            if (formData.password === "" && formData.confirmPassword === "") {
                setError("Invalid password");
                isError = true;
            };

            toSend = {
                password: formData.password
            }
        } else {
            toSend = {
                first_name: formData.first_name,
                last_name: formData.last_name
            }
        }

        if (!isError) {
            try {
                await axios.patch('/user/updateInfo', toSend, {
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
    }

    return (
        fetched && <div className="account--container">
            <div className="profile--container" ref={profileRef}>
                <img src={imageUrl}></img>

                {isUpdated && <Alert key="success" variant="success">
                    Profile updated successfully!
                </Alert>}
                <h3 className="acount-settings--title">Profile Settings</h3>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "20px" }}>
                    <input
                    accept="image/*"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    />
                    {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt="Profile Preview"
                        className="profile-img"
                        onClick={handleImageClick}
                    />
                    ) : formData?.profilePicture ? (
                    <img
                        src={formData.profilePicture}
                        alt="Profile Picture"
                        className="profile-img"
                        onClick={handleImageClick}
                    />
                    ) : (
                    <span
                        className="material-symbols-outlined profile-icon"
                        onClick={handleImageClick}
                    >
                        account_circle
                    </span>
                    )}
                    {imageSrc && <button className="green-button save-settings" onClick={uploadImage}>Save</button>}
                </div>

                <div className="account-settings-section">
                    <div className="section-subtitle--container">
                        <h4 className="section-subtitle">Name</h4>
                        {edit[0] ? 
                            <div>
                                <button className="green-button save-settings" onClick={updateInfo} name="name">Save</button>
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
              <label htmlFor="last_name" className="label-account">
                Last Name:
              </label>
              {edit[0] ? (
                <input
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  className="account-input"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              ) : (
                <p className="account--field">{formData.last_name}</p>
              )}
            </div>
          </div>

                <div className="account-settings-section">
                    <div className="section-subtitle--container">
                        <h4 className="section-subtitle">Password</h4>
                        {edit[1] ? 
                            <div>
                                <button className="green-button save-settings" onClick={updateInfo} name="password">Save</button>
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
          <h3 className="account-settings--title">Blogs Published</h3>
          {blogsElement.length === 0 ? (
            <p className="no-blogs-p">You haven't published any blogs yet!</p>
          ) : (
            blogsElement
          )}
        </div>
      </div>
    )
}
