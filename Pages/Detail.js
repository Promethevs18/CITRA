import React, { useState, useEffect } from 'react'
import {useParams } from 'react-router-dom'
import { getDatabase, ref, get, onValue} from 'firebase/database'
import Store from '../Components/Store'
import { toast } from 'react-toastify'

const Detail = ({ setActive }) => {
  const { id, category, classification } = useParams();
  const [location, setLocation] = useState(null);
  const [misc, setMisc] = useState(null);
  const db = getDatabase();
  const [store, setStore] = useState([])

  //FOR EXPLORE AND LEISURE  LOCATIONS
  useEffect(() => {
    const db = getDatabase();
    const getLocationDetail = async () => {
      const dbRef = ref(db, classification + "/" + category + "/" + id, id);
      get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
          setLocation(snapshot.val())
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    id && getLocationDetail();
  }, [category, classification, id])


  //FOR STORE DETAILS
  useEffect(() => {
    const db = getDatabase();
    const getLocationDetail = async () => {
      const dbStore = ref(db, "Store/" + id, id);
      get(dbStore).then((snapshot) => {
        if (snapshot.exists()) {
          setMisc(snapshot.val())
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    id && getLocationDetail();
  }, [id])

 //FOR NEWS DETAILSS
 useEffect(() => {
  const db = getDatabase();
  const getNewsDetails = async () => {
    const dbStore = ref(db, "News Feed/" + id, id);
    get(dbStore).then((snapshot) => {
      if (snapshot.exists()) {
        setMisc(snapshot.val())
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  id && getNewsDetails();
}, [id])


//FOR STORE SA GILID
useEffect(() => {
  let storeList = [];
  const unSubStore = onValue(ref(db, "Store"),
    (snapshot) => {
      snapshot.forEach(element => {
        storeList.push({ id: element.key, ...element.val() })
      });
      setStore(storeList);
      setActive("Home");
    }, (error) => {
      toast.error(error)
    }
  );
  return () => {
    unSubStore();
  }
}, [db, setActive]);

  return (
    <div className="single">
      {classification === undefined}
      <div
        className="blog-title-box"
        style={{ backgroundImage: category? `url('${location?.imageUrl}'` : `url('${misc?.imageHeadline}'` }}
      >
        <div className="overlay"></div>
        <div className="blog-title">
          <span>{location?.goodFor} {misc?.startPrice} {misc?.shortDesc}</span>
          <h2>{location?.place} {misc?.productName} {misc?.headLine}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
                <p className="date">{location?.classification} {location?.category} {misc?.date} {misc?.classification}</p> &nbsp;
              </span>
              <p className="text-start">{location?.details} {location?.shortDesc} {misc?.shortDesc} {misc?.full_details}</p>
            </div>
            <div className="col-md-3">
              <Store misc={store}>
              </Store>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail