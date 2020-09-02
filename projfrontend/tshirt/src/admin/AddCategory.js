import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { createCategory } from '../admin/helper/adminapicall';


const AddCategory = () => {

    const [name, setName] = useState();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const handleChange = (event) => {
        setError("")
        setName(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setError("")
        createCategory(user._id, token, { name })
            .then(data => {
                console.log(data)
                if (data.error) {
                    setError(true)
                }
                else {
                    setError("");
                    setSuccess(true)
                    setName("")
                }
            }
            )
    }

    const successMessage = () => {
        if (success) {
            return <h4 className="text-success">Category created successfully</h4>
        }
    }

    const errorMessage = () => {
        if (error) {
            return <h4 className="text-warning">Failed to create category</h4>
        }
    }

    const myCategoryForm = () => (
        <form >
            <div className="form-group">
                <p className="lead">Enter category</p>
                <input className="form-control my-3"

                    onChange={handleChange}
                    value={name}
                    placeholder="For ex. summer"
                    required
                />

                <button
                    className="btn btn-outline-info"
                    onClick={onSubmit}
                >
                    Create</button>
            </div>
        </form>
    )

    return (
        <Base
            title="Create a category here"
            description="Add a new category for tshirts"
            className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
}

export default AddCategory;