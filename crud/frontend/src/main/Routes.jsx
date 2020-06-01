import React from 'react'
import { Switch, Route, Redirect } from 'react-router' 

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'

export default props => 
    <Switch>
       <Route exact path='/' component={Home} /> {/* rota tem que ser exatamente '/', por conta do '/users'. Carrega componente Home */}
       <Route path='/users' component={UserCrud} /> {/*rota '/user' carrega componente UserCrud*/}
       <Redirect from='*' to='/' /> {/*Para qualquer rota diferente das listas acima, navegue para '/'*/}
    </Switch>