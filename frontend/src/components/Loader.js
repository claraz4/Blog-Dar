import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoadingContext } from '../context/LoadingContext';
import React from 'react';

export default function Loader() {
    const { isLoading } = React.useContext(LoadingContext);
    return (
        isLoading ? <div className="spinner">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div> : <div></div>
    )
}