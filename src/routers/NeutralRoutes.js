import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../components/About'
import MapView from '../components/maps/MapView'
import NotFound from '../components/ui/NotFound'

export default function NeutralRoutes() {
  return (
    <Routes>
        <Route path="/map" element={ <MapView /> }/>
        <Route path="/about" element={ <About /> } />
        <Route path="*" element= { <NotFound />}/>
    </Routes>
  )
}
