import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import { excerpt } from '../utility'

const BlogSection = ({ exploreLand,
    user,
    exploreWater,
    leisureHotel,
    leisureResort,
    leisureFoodHubs,

    handleDeleteLand,
    handleDeleteWater,
    handleDeleteHotel,
    handleDeleteResort,
    handleDeleteFood }) => {
    return (
        <div>
            {/* THIS IS THE LAND MASSES SECTION */}
            <div className="blog-heading text-start py-2 mb-4">Explore Land Masses</div>
            {exploreLand?.map((item) => (
                <div className="row pb-4" key={item.id}>
                    <div className="col-md-5">
                        <div className="hover-blogs-img">
                            <div className="blogs-img">
                                <img src={item.imageUrl} alt={item.place} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="text-start">
                            <h6 className="categoryLand">{item.category}</h6>&nbsp;
                            <span className="title py-2">{item.place}</span>
                            <span className="meta-info">
                                <p className="author">{item.goodFor}</p> &nbsp;
                            </span>
                        </div>
                        <div className="short-description text-start">
                            {excerpt(item.details, 100)}
                        </div>
                        <Link to={`/detail/${item.classification}/${item.category}/${item.id}`}>
                            <button className="btn btn-read">Read More</button>
                        </Link>
                        {/* ETO YUNG DELETE AND EDIT BUTTON FOR EXPLORE LAND */}
                        <div style={{ float: "right" }}>
                            {"WsS7pyWZbCXgAh3Wm4SJEhZAX9y2" === user?.uid && (
                                <FontAwesome
                                    name="trash"
                                    style={{ margin: "15px", cursor: "pointer" }}
                                    size="2x"
                                    onClick={() => handleDeleteLand(item.id)}
                                />
                            )}
                            {user?.uid !== undefined && (
                                <Link to={`update/Explore/Land Masses/${item.id}`}>
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
            ))}
            {/* THIS IS THE WATER MASSES SECTION */}
            <div className="blog-heading text-start py-2 mb-4">Explore Water Masses</div>
            {exploreWater?.map((item) => (
                <div className="row pb-4" key={item.id}>
                    <div className="col-md-5">
                        <div className="hover-blogs-img">
                            <div className="blogs-img">
                                <img src={item.imageUrl} alt={item.place} />
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="text-start">
                            <h6 className="categoryWater">{item.category}</h6>&nbsp;
                            <span className="title py-2">{item.place}</span>
                            <span className="meta-info">
                                <p className="author">{item.goodFor}</p> &nbsp;
                            </span>
                        </div>
                        <div className="short-description text-start">
                            {excerpt(item.details, 100)}
                        </div>
                        <Link to={`/detail/${item.classification}/${item.category}/${item.id}`}>
                            <button className="btn btn-read">Read More</button>
                        </Link>
                        {/* ETO YUNG DELETE AND EDIT BUTTON FOR EXPLORE WATER */}
                        <div style={{ float: "right" }}>
                            {"WsS7pyWZbCXgAh3Wm4SJEhZAX9y2" === user?.uid && (
                                <FontAwesome
                                    name="trash"
                                    style={{ margin: "15px", cursor: "pointer" }}
                                    size="2x"
                                    onClick={() => handleDeleteWater(item.id)}
                                />
                            )}
                            {user?.uid !== undefined && (
                                <Link to={`update/Explore/Water Masses/${item.id}`}>
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
            ))}
            {/* THIS IS THE HOTELS SECTION */}
            <div className="blog-heading text-start py-2 mb-4">Leisure Hotels</div>
            {leisureHotel?.map((item) => (
                <div className="row pb-4" key={item.id}>
                    <div className="col-md-5">
                        <div className="hover-blogs-img">
                            <div className="blogs-img">
                                <img src={item.imageUrl} alt={item.place} />
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="text-start">
                            <h6 className="categoryLeisure">{item.category}</h6>&nbsp;
                            <span className="title py-2">{item.place}</span>
                            <span className="meta-info">
                                <p className="author">{item.goodFor}</p> &nbsp;
                            </span>
                        </div>
                        <div className="short-description text-start">
                            {excerpt(item.shortDesc, 100)}
                        </div>
                        <Link to={`/detail/${item.classification}/${item.category}/${item.id}`}>
                            <button className="btn btn-read">Read More</button>
                        </Link>
                        {/* ETO YUNG DELETE AND EDIT BUTTON FOR LEISURE HOTEL */}
                        <div style={{ float: "right" }}>
                            {"WsS7pyWZbCXgAh3Wm4SJEhZAX9y2" === user?.uid && (
                                <FontAwesome
                                    name="trash"
                                    style={{ margin: "15px", cursor: "pointer" }}
                                    size="2x"
                                    onClick={() => handleDeleteHotel(item.id)}
                                />
                            )}
                            {user?.uid !== undefined && (
                                <Link to={`update/Leisure/Hotel/${item.id}`}>
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
            ))}
            {/* THIS IS THE RESORTS SECTION */}
            <div className="blog-heading text-start py-2 mb-4">Leisure Resorts</div>
            {leisureResort?.map((item) => (
                <div className="row pb-4" key={item.id}>
                    <div className="col-md-5">
                        <div className="hover-blogs-img">
                            <div className="blogs-img">
                                <img src={item.imageUrl} alt={item.place} />
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="text-start">
                            <h6 className="categoryLeisure">{item.category}</h6>&nbsp;
                            <span className="title py-2">{item.place}</span>
                            <span className="meta-info">
                                <p className="author">{item.goodFor}</p> &nbsp;
                            </span>
                        </div>
                        <div className="short-description text-start">
                            {excerpt(item.shortDesc, 100)}
                        </div>
                        <Link to={`/detail/${item.classification}/${item.category}/${item.id}`}>
                            <button className="btn btn-read">Read More</button>
                        </Link>
                        {/* ETO YUNG DELETE AND EDIT BUTTON FOR LEISURE RESORT */}
                        <div style={{ float: "right" }}>
                            {"WsS7pyWZbCXgAh3Wm4SJEhZAX9y2" === user?.uid && (
                                <FontAwesome
                                    name="trash"
                                    style={{ margin: "15px", cursor: "pointer" }}
                                    size="2x"
                                    onClick={() => handleDeleteResort(item.id)}
                                />
                            )}
                            {user?.uid !== undefined && (
                                <Link to={`update/Leisure/Resort/${item.id}`}>
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
            ))}
            {/* THIS IS THE LEISURE FOOD HUBS */}
            <div className="blog-heading text-start py-2 mb-4">Leisure Food Hubs</div>
            {leisureFoodHubs?.map((item) => (
                <div className="row pb-4" key={item.id}>
                    <div className="col-md-5">
                        <div className="hover-blogs-img">
                            <div className="blogs-img">
                                <img src={item.imageUrl} alt={item.place} />
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="text-start">
                            <h6 className="categoryLeisure">{item.category}</h6>&nbsp;
                            <span className="title py-2">{item.place}</span>
                            <span className="meta-info">
                                <p className="author">{item.goodFor}</p> &nbsp;
                            </span>
                        </div>
                        <div className="short-description text-start">
                            {excerpt(item.shortDesc, 100)}
                        </div>
                        <Link to={`/detail/${item.classification}/${item.category}/${item.id}`}>
                            <button className="btn btn-read">Read More</button>
                        </Link>
                        {/* ETO YUNG DELETE AND EDIT BUTTON FOR LEISURE FOOD HUBS */}
                        <div style={{ float: "right" }}>
                            {"WsS7pyWZbCXgAh3Wm4SJEhZAX9y2" === user?.uid && (
                                <FontAwesome
                                    name="trash"
                                    style={{ margin: "15px", cursor: "pointer" }}
                                    size="2x"
                                    onClick={() => handleDeleteFood(item.id)}
                                />
                            )}
                            {user?.uid !== undefined && (
                                <Link to={`update/Leisure/Food Hubs/${item.id}`}>
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
            ))}
            {/* this is the bottom */}
        </div>
    )
}

export default BlogSection