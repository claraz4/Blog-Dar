import React from 'react';

export default function Account() {
    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    function handleChange(event) {
        setFormData((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <div className="account--container">
            <div className="profile--container">
                {/* <span class="material-symbols-outlined profile-icon">account_circle</span> */}

                <h3>Profile Settings</h3>

                <div>
                    <div>
                        <label>Name</label>
                    </div>
                    
                    <input type="text" placeholder="First Name" name="firstName" className="margin-bottom-15" value={formData.firstName} onChange={handleChange} />
                    <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>

                <div className="form--subcontainer">
                    <label>Password</label>
                    <input type="text" placeholder="Password" name="password" className="margin-bottom-15" value={formData.password} onChange={handleChange} />
                    <input type="text" placeholder="Confirm Password" name="password" value={formData.password} onChange={handleChange} />
                </div>
            </div>

            <div className="profile-blogs--container">

            </div>
        </div>
    )
}