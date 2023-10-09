import React, { useState, useEffect } from 'react'
import { getDatabase, onValue, ref, remove } from 'firebase/database'
import BlogSection from '../Components/BlogSection';
import Spinner from '../Components/Spinner';
import { toast } from 'react-toastify';
import Store from '../Components/Store';
import News from '../Components/News';
import { useNavigate } from 'react-router-dom';

const Home = ({ setActive, user }) => {

  const [loading, setLoading] = useState(true);

  const [exploreLand, setExploreLand] = useState([]);
  const [exploreWater, setExploreWater] = useState([]);
  const [leisureHotel, setLeisureHotel] = useState([]);
  const [leisureResort, setLeisureResort] = useState([]);
  const [leisureFoodHubs, setLeisureFoodHubs] = useState([]);
  const [store, setStore] = useState([]);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  const db = getDatabase();

  //FOR NEWS
  useEffect(() => {
    let newsList = [];
    const newsRef = onValue(ref(db, "News Feed/"),
      (snapshot) => {
        snapshot.forEach(element => {
          newsList.push({ id: element.key, ...element.val() })
        });
        setNews(newsList);
        setActive("Home");
      }, (error) => {
        toast.error(error)

      }
    );
    return () => {
      newsRef();
    }
  }, [db, setActive]);

  //For Land Masses
  useEffect(() => {
    let landList = [];
    const unsubLand = onValue(ref(db, "Explore/Land Masses"),
      (snapshot) => {
        snapshot.forEach(element => {
          landList.push({ id: element.key, ...element.val() })
        });
        setExploreLand(landList);
        setLoading(false);
        setActive("Home");
      }, (error) => {
        toast.error(error)
      }
    );
    return () => {
      unsubLand();
    }
  }, [db, setActive]);

  //For Water Masses
  useEffect(() => {
    let waterList = [];
    const unsubWater = onValue(ref(db, "Explore/Water Masses"),
      (snapshot) => {
        snapshot.forEach(element => {
          waterList.push({ id: element.key, ...element.val() })
        });
        setExploreWater(waterList);
      }, (error) => {
        toast.error(error)
      }
    );
    return () => {
      unsubWater();
    }
  }, [db]);

  //For Leisure/Hotels
  useEffect(() => {
    let hotelList = [];
    const unsubHotel = onValue(ref(db, "Leisure/Hotel"),
      (snapshot) => {
        snapshot.forEach(element => {
          hotelList.push({ id: element.key, ...element.val() })
        });
        setLeisureHotel(hotelList);
      }, (error) => {
        toast.error(error)
      }
    );
    return () => {
      unsubHotel();
    }
  }, [db]);

  //THIS IS THE LEISURE RESORT
  useEffect(() => {
    let resortList = [];
    const unsubResort = onValue(ref(db, "Leisure/Resort"),
      (snapshot) => {
        snapshot.forEach(element => {
          resortList.push({ id: element.key, ...element.val() })
        });
        setLeisureResort(resortList);
      }, (error) => {
        toast.error(error)
      }
    );
    return () => {
      unsubResort();
    }
  }, [db]);


  //THIS IS THE LEISURE FOOD HUBS
  useEffect(() => {
    let foodList = [];
    const unsubFood = onValue(ref(db, "Leisure/Food Hubs"),
      (snapshot) => {
        snapshot.forEach(element => {
          foodList.push({ id: element.key, ...element.val() })
        });
        setLeisureFoodHubs(foodList);
      }, (error) => {
        toast.error(error)
      }
    );
    return () => {
      unsubFood();
    }
  }, [db]);


  //THIS IS FOR THE STORE PANEL
  useEffect(() => {
    let storeList = [];
    const unSubStore = onValue(ref(db, "Store"),
      (snapshot) => {
        snapshot.forEach(element => {
          storeList.push({ id: element.key, ...element.val() })
        });
        setStore(storeList);
        setLoading(false);
        setActive("Home");
      }, (error) => {
        toast.error(error)
      }
    );
    return () => {
      unSubStore();
    }
  }, [db, setActive]);

  // For loading na appearance
  if (loading) {
    return <Spinner />;
  }


  //Delete a Land Mass Location
  const handleDeleteLandMass = async (id) => {
    if (window.confirm("Are you sure you want to delete that location?")) {
      try {
        setLoading(true);
        await remove(ref(db, "Explore/Land Masses/" + id, id));
        toast.success("Data has been deleted");
        setLoading(false);
      }
      catch (err) {
        toast.error(err);
      }
    }
    window.location.reload();
  }
  //DELETE A WATER MASS LOCATION
  const handleDeleteWaterMass = async (id) => {
    if (window.confirm("Are you sure you want to delete that location?")) {
      try {
        setLoading(true);
        await remove(ref(db, "Explore/Water Masses/" + id, id));
        toast.success("Data has been deleted");
        setLoading(false);
      }
      catch (err) {
        toast.error(err);
      }
    }
    window.location.reload();
  }

  //DELETE A HOTEL LOCATION
  const handleDeleteHotel = async (id) => {
    if (window.confirm("Are you sure you want to delete that location?")) {
      try {
        setLoading(true);
        await remove(ref(db, "Leisure/Hotel/" + id, id));
        toast.success("Data has been deleted");
        setLoading(false);
      }
      catch (err) {
        toast.error(err);
      }
    }
    window.location.reload();
  }
  //DELETE A RESORT LOCATION
  const handleDeleteResort = async (id) => {
    if (window.confirm("Are you sure you want to delete that location?")) {
      try {
        setLoading(true);
        await remove(ref(db, "Leisure/Resort/" + id, id));
        toast.success("Data has been deleted");
        setLoading(false);
      }
      catch (err) {
        toast.error(err);
      }
    }
    window.location.reload();
  }
  //DELETE A FOOD HUB LOCATION
  const handleDeleteFood = async (id) => {
    if (window.confirm("Are you sure you want to delete that location?")) {
      try {
        setLoading(true);
        await remove(ref(db, "Leisure/Food Hubs/" + id, id));
        toast.success("Data has been deleted");
        setLoading(false);
      }
      catch (err) {
        toast.error(err);
      }
    }
    window.location.reload();
  }

  //KAPAG MAGDEDELETE NG NEWS
  const handleNewsDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete that location?")) {
      try {
        setLoading(true);
        await remove(ref(db, "News Feed/" + id, id));
        toast.success("Data has been deleted");
        setLoading(false);
        navigate("/");

      }
      catch (err) {
        toast.error(err);
      }
    }
    window.location.reload();
  }

  //KAPAG MAGDEDELETE NG STORE
  const handleStoreDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete that location?")) {
      try {
        setLoading(true);
        await remove(ref(db, "Store/" + id, id));
        toast.success("Data has been deleted");
        setLoading(false);
        navigate("/")

      }
      catch (err) {
        toast.error(err);
      }
    }
    window.location.reload();
  }


  return (
    <div className="container-fluid pb-4 pt-4 padding bg-gradient-cool">
      <div className="container padding ">
        <div className="row mx-0">
          <News
            news={news}
            user={user}
            handleNewsDelete={handleNewsDelete}
          />
          <div className="col-md-9">
            <BlogSection
              exploreLand={exploreLand}
              user={user}
              handleDeleteLand={handleDeleteLandMass}


              exploreWater={exploreWater}
              handleDeleteWater={handleDeleteWaterMass}

              leisureHotel={leisureHotel}
              handleDeleteHotel={handleDeleteHotel}

              leisureResort={leisureResort}
              handleDeleteResort={handleDeleteResort}

              leisureFoodHubs={leisureFoodHubs}
              handleDeleteFood={handleDeleteFood}
            />
          </div>
          <div className="col-md-3">
            <Store misc={store}
              user={user}
              handleStoreDelete={handleStoreDelete} />
          </div>
        </div>

      </div>

    </div>
  )
}

export default Home