import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {Typography} from "antd"
import {useSpring, animated} from "react-spring"

const {Title, Text} = Typography

function Home() {
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem("isLogged") === "true"
    )

    const checkLoginStatus = () => {
        const username = localStorage.getItem("username")
        const password = localStorage.getItem("password")
        if (username && password) {
            setLoggedIn(true)
        }
    }

    useEffect(() => {
        checkLoginStatus()
    }, [])

    const titleAnimation = useSpring({
        from: {opacity: 0, transform: "scale(0.8)"},
        to: {opacity: 1, transform: "scale(1)"},
        config: {tension: 200, friction: 20},
        delay: 300,
    })

    const textAnimation = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        config: {tension: 200, friction: 20},
        delay: 500,
    })

    return (
        <div style={{width: "500px", margin: "50px auto 0", textAlign: "center"}}>
            <animated.div style={titleAnimation}>
                <Title
                    level={2}
                    style={{marginBottom: "20px", color: "#1890ff"}}
                >
                    Добро пожаловать!
                </Title>
            </animated.div>
            <animated.div style={textAnimation}>
                {loggedIn ? (
                    <Text>
                        Вы вошли в систему. Перейдите к{" "}
                        <Link to="/favorites">личному кабинету</Link>.
                    </Text>
                ) : (
                    <Text>
                        Пожалуйста, <Link to="/login">войдите</Link> для доступа
                        к личному кабинету.
                    </Text>
                )}
            </animated.div>
        </div>
    )
}

export default Home
