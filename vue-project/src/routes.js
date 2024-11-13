import Home from './pages/home'
import MainPage from './pages/mainPage'
import NotFound from './pages/notFound'

const routes = [
    { path:'/' , component: Home, name: 'Home'} ,
    { path:'/cheatsheet' , component: MainPage, name:'CheatSheet'} ,
    { path:'*' , component: NotFound, name:'notFound'} ,
]

export {routes}
