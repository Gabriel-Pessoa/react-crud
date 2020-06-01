import React from 'react'
import { Link } from 'react-router-dom'

const links = {
    home: {
        href: '/',
        icon: 'home',
        label: 'Ínicio'
    },
    users: {
        href: '/users',
        icon: 'users',
        label: 'Usuários'
    }
}

export default () =>
    <nav className="menu">
        <Link to={links.home.href}>
            <i className={`fa fa-${links.home.icon}`}></i> {links.home.label}
        </Link>
        <Link to={links.users.href}>
            <i className={`fa fa-${links.users.icon}`}></i> {links.users.label}
        </Link>
    </nav>
