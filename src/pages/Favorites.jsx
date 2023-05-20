import React, {useState, useEffect} from "react"
import {Button, Card} from "antd"
import {useNavigate} from "react-router-dom"

function Favorites() {
    const [favoriteAdvertisements, setFavoriteAdvertisements] = useState([])
    const [myAdvertisements, setMyAdvertisements] = useState([])
    const loggedInUser = localStorage.getItem("username")
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem("isLogged") == "true"
    )
    const navigate = useNavigate()

    useEffect(() => {
        setLoggedIn(localStorage.getItem("isLogged") == "true")
    })

    if (!loggedIn) navigate("/")

    useEffect(() => {
        const storedFavoriteAdvertisements =
            JSON.parse(localStorage.getItem("favoriteAdvertisements")) || []
        setFavoriteAdvertisements(storedFavoriteAdvertisements)

        const storedMyAdvertisements =
            JSON.parse(localStorage.getItem("myAdvertisements")) || []
        setMyAdvertisements(storedMyAdvertisements)
    }, [])

    const removeFromFavorites = (ad) => {
        const updatedFavorites = favoriteAdvertisements.filter(
            (favAd) =>
                favAd.title !== ad.title ||
                favAd.username !== ad.username ||
                favAd.favoriteUsername !== ad.favoriteUsername
        )
        setFavoriteAdvertisements(updatedFavorites)
        localStorage.setItem(
            "favoriteAdvertisements",
            JSON.stringify(updatedFavorites)
        )
    }

    return (
        <div
            style={{
                width: "500px",
                margin: "40px auto 0",
                backgroundColor: "#f5f5f5",
                padding: "20px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
            }}
        >
            <h1
                style={{
                    marginBottom: "20px",
                    color: "#1890ff",
                    fontSize: "24px",
                    textAlign: "center",
                }}
            >
                Личный кабинет
            </h1>

            <div style={{marginBottom: "40px"}}>
                <h2
                    style={{
                        marginBottom: "10px",
                        fontSize: "18px",
                        color: "#1890ff",
                    }}
                >
                    Мои объявления:
                </h2>
                {myAdvertisements
                    .filter((ad) => ad.username === loggedInUser)
                    .map((ad, index) => (
                        <Card
                            key={index}
                            title={`Заголовок:  ${ad.title}`}
                            style={{
                                marginBottom: "20px",
                                backgroundColor: "#ffffff",
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                                borderRadius: "5px",
                            }}
                        >
                            <p>Описание: {ad.description}</p>
                        </Card>
                    ))}
            </div>

            <div>
                <h2
                    style={{
                        marginBottom: "10px",
                        fontSize: "18px",
                        color: "#1890ff",
                    }}
                >
                    Избранные объявления:
                </h2>
                {favoriteAdvertisements
                    .filter((ad) => ad.favoriteUsername === loggedInUser)
                    .map((ad, index) => (
                        <Card
                            key={index}
                            title={`Заголовок:  ${ad.title}`}
                            style={{
                                marginBottom: "20px",
                                backgroundColor: "#ffffff",
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                                borderRadius: "5px",
                            }}
                            extra={
                                <Button
                                    onClick={() => removeFromFavorites(ad)}
                                    type="primary"
                                    danger
                                    size="small"
                                >
                                    Удалить из избранного
                                </Button>
                            }
                        >
                            <p>Описание: {ad.description}</p>
                        </Card>
                    ))}
            </div>
        </div>
    )
}

export default Favorites
