import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'

const Store = ({ misc, user, handleStoreDelete }) => {
    return (
        <div>
            <div className="blog-heading text-start pt-2 py-2 mb-4">
                Products of Pangantucan
            </div>
            {misc?.map((item) => (
                <div className="row pb-5" key={item.id} style={{ cursor: "pointer" }}>
                    <Link to={`detail/${item.classification}/${item.id}`}>
                        <img src={item.imageHeadline} alt={item.productName} className="most-popular-img">
                        </img>
                        <div className="pt-2">
                            <div className="align-self-center most-popular-font">{item.productName}</div>
                            <div className="align-self-center most-popular-font-meta">{item.shortDesc}</div>
                        </div>
                    </Link>
                    {/* ETO YUNG DELETE AND EDIT BUTTON FOR EXPLORE LAND */}
                    <div style={{ float: "right" }}>
                        {"WsS7pyWZbCXgAh3Wm4SJEhZAX9y2" === user?.uid && (
                            <FontAwesome
                                name="trash"
                                style={{ margin: "15px", cursor: "pointer" }}
                                size="2x"
                                onClick={() => handleStoreDelete(item.id)}
                            />
                        )}
                        {user?.uid !== undefined && (
                            <Link to={`update/Store/${item.id}`}>
                                <FontAwesome
                                    name="edit"
                                    style={{ cursor: "pointer" }}
                                    size="2x"
                                />
                            </Link>
                        )}
                    </div>
                </div>
            ))}
        </div>

    )
}

export default Store