import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginApp from '../components/login/LoginApp';
import Register from '../components/login/Register';
import NoAuthorized from '../components/ui/NoAuthorized';
import NotFound from '../components/ui/NotFound';

export default function PublicRoutes() {
    
    return (
        <Routes> 
            <Route path="/" element={<Navigate to="/login" replace />}/>
            <Route path="/login" element={ <LoginApp /> }/>
            <Route path="/register" element={ <Register /> } />
            <Route path="/noauthorized" element= { <NoAuthorized />}/>
            <Route path="*" element= { <NotFound />}/>
        </Routes>

    )
}
