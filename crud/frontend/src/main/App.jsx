import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from './Routes'

import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Footer from '../components/template/Footer'

export default props =>
    /*recomendado usar o HashRoute*/
    <BrowserRouter>
        <div className="app">
            <Logo />
            <Nav />
            <Routes /> {/* carrega o Home e UserCrud através das rotas */}
            <Footer />
        </div>
    </BrowserRouter>