import './Main.css'
import React from 'react'
import Header from './Header'

export default props => 
    /*no layout o componente, conteúdo e header serão inseridos diretamente em React.fragment*/
    <React.Fragment>
        <Header {...props}/> 
        <main className="content container-fluid">
            <div className="p-3 mt-3">
                {props.children}
            </div>      
        </main>
    </React.Fragment> 
