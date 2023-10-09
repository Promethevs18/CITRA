import React from 'react'
import OwlCarousel from 'react-owl-carousel'
import { Link } from 'react-router-dom'
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import FontAwesome from 'react-fontawesome'

const News = ({ news, user, handleNewsDelete }) => {
    console.log(user)
    const options = {
        loop: false,
        margin: 5,
        nav: true,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 2,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 4,
            },
        },
    };

    return (
        <>
            <div>
                <div className="blog-heading text-start py-2 mb-4">News</div>
            </div>
            <OwlCarousel className="owl-theme align-self-center" {...options}>
                {news?.map((item) => (
                    <div className="item px-2" key={item.id} style={{ cursor: "pointer" }} >
                        <Link to={`detail/${item.classification}/${item.id}`}>
                            <div className="trending-img-position align-self-center">
                                <div className="trending-img-size">
                                    <img src={item.imageHeadline}
                                        alt={item.headLine}
                                        className="trending-img-relative">
                                    </img>
                                </div>
                                <div className="trending-img-absolute"></div>
                                <div className="trending-img-absolute-1">
                                    <span className="text-white">
                                        {item.headLine}
                                    </span>
                                    <div className="trending-meta-info">
                                        {item.shortDesc} - {item.date}
                                    </div>
                                    {/* ETO YUNG DELETE AND EDIT BUTTON FOR EXPLORE LAND */}
                                    <div style={{ float: "right" }}>
                                        {"WsS7pyWZbCXgAh3Wm4SJEhZAX9y2" === user?.uid && (
                                            <FontAwesome
                                                name="trash"
                                                style={{ margin: "15px", cursor: "pointer" }}
                                                size="2x"
                                                onClick={() => handleNewsDelete(item.id)}
                                            />
                                        )}
                                        {user?.uid !== undefined && (
                                            <Link to={`update/News Feed/${item.id}`}>
                                                <FontAwesome
                                                    name="edit"
                                                    style={{ cursor: "pointer" }}
                                                    size="2x"
                                                />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </div>
                ))}
            </OwlCarousel>
        </>
    )
}

export default News