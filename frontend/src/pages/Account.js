import React from 'react';
import BlogBoxUser from '../components/BlogBoxUser';
import useAuthContext from '../hooks/useAuthContext';

export default function Account() {
    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [edit, setEdit] = React.useState([false, false]);
    const { user } = useAuthContext();
    console.log(user)

    React.useEffect(() => {
        // Get the user info
        const getInfo = async () => {
            try {
                console.log("here")
                const response = await fetch('/user/info', {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
                console.log("here2")
                const json = await response.json();
                console.log(json)

                setFormData(json);
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

    return (
        <div className="account--container">
            <div className="profile--container">

                <h3 className="acount-settings--title">Profile Settings</h3>
                <span className="material-symbols-outlined profile-icon">account_circle</span>

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
                        <label htmlFor="firstName" className="label-account">First Name:</label>
                        {edit[0] ? 
                            <input type="text" placeholder="First Name" name="firstName" className="account-input" value={formData.firstName} onChange={handleChange} />
                            : 
                            <p className="account--field">Clara</p>
                        }
                        
                    </div>

                    <div className="subsection-account">
                        <label htmlFor="lastName" className="label-account">Last Name:</label>
                        {edit[0] ? 
                            <input type="text" placeholder="Last Name" name="lastName" className="account-input" value={formData.lastName} onChange={handleChange} />
                            : 
                            <p className="account--field">Zammar</p>
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
                            <p className="account--field">Clara</p>
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
                <BlogBoxUser />
            </div>
        </div>
    )
}