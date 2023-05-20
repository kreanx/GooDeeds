import React, {useEffect, useState} from "react"
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    useLocation,
    Routes,
} from "react-router-dom"
import {Layout, Menu, Button} from "antd"
import Home from "./pages/Home"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import Advertisements from "./pages/Advertisements"
import Favorites from "./pages/Favorites"
const {Header, Content} = Layout

function App() {
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem("isLogged") == "true"
    )
    const username = localStorage.getItem("username")

    const handleLogout = () => {
        localStorage.removeItem("username")
        localStorage.removeItem("password")
        localStorage.setItem("isLogged", "false")
        setLoggedIn(false)
    }

    const location = useLocation()

    useEffect(() => {
        setLoggedIn(localStorage.getItem("isLogged") == "true")
    })

    return (
        <div style={{maxWidth: 1440, margin: "0 auto"}}>
            <Header theme="dark" style={{width: "100%"}}>
                <div className="header-content">
                    <div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={[location.pathname]}
                        >
                            <Menu.Item key="/" exact="true">
                                <NavLink to="/" activeclassname="active">
                                    Главная
                                </NavLink>
                            </Menu.Item>

                            {!loggedIn && (
                                <>
                                    <Menu.Item key="/login">
                                        <NavLink
                                            to="/login"
                                            activeclassname="active"
                                        >
                                            Вход
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="/registration">
                                        <NavLink
                                            to="/registration"
                                            activeclassname="active"
                                        >
                                            Регистрация
                                        </NavLink>
                                    </Menu.Item>
                                </>
                            )}
                            {loggedIn && (
                                <>
                                    <Menu.Item key="/advertisements">
                                        <NavLink
                                            to="/advertisements"
                                            activeclassname="active"
                                        >
                                            Объявления
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="/favorites">
                                        <NavLink
                                            to="/favorites"
                                            activeclassname="active"
                                        >
                                            Мои добрые дела
                                        </NavLink>
                                    </Menu.Item>
                                </>
                            )}
                        </Menu>
                    </div>
                    {loggedIn && (
                        <div style={{marginLeft: "auto"}}>
                            <Menu mode="horizontal">
                                <Menu.Item key="6">
                                    <span>{username}</span>
                                </Menu.Item>
                                <Menu.Item key="7">
                                    <Button
                                        type="link"
                                        onClick={handleLogout}
                                    >
                                        Выйти
                                    </Button>
                                </Menu.Item>
                            </Menu>
                        </div>
                    )}
                </div>
            </Header>
            <Content style={{padding: "50px"}}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/registration"
                        element={
                            <Registration
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Login
                                loggedIn={loggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/advertisements"
                        element={<Advertisements loggedIn={loggedIn} />}
                    />
                    <Route
                        path="/favorites"
                        element={<Favorites loggedIn={loggedIn} />}
                    />
                </Routes>
            </Content>
        </div>
    )
}

export default App
