import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref as ref_storage, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { toast } from 'react-toastify';
import { getDatabase, ref as ref_database, update, get } from 'firebase/database';
import { useNavigate, useParams } from 'react-router-dom';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const initialState = {
  place: "",
  category: " ",
  shortDesc: "",
  googleMapLink: "",
  imageUrl: "",
  phoneNums: [],
  startPrice: "",
  details: ""
}

//these ar the basic declarations
const Add_or_Edit = ({ user, setActive }) => {
  const { id } = useParams();
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();
  const db = getDatabase();
  var date = new Date();

  //forms declaration na magrereceive ng data from the html form
  const {
    place,
    category,
    shortDesc,
    googleMapLink,
    phoneNums,
    startPrice,
    details,
  } = form;

   //ETO FOR MULTIPLE IMAGES
   const [images, setImages] = useState([]);
   const [urls, setUrls] = useState([]);
 
   const handleImageChange = (e) => {
     for (let i = 0; i < e.target.files.length; i++) {
       const newImage = e.target.files[i]; 
       setImages((prevState) => [...prevState, newImage]);
     }
   };
 
   const handleUpload = () => {
     toast.info("File/s Uploading...")
     const promises = [];
     images.map((image) => {
       const storageRef = ref_storage(storage, image.name);
       const uploadTask = uploadBytesResumable(storageRef, image);
       promises.push(uploadTask);
       uploadTask.on(
         "state_changed",
         (snapshot) => {
           const progress = Math.round(
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
           );
           setProgress(progress);
         },
         (error) => {
           console.log(error);
         },
         () => {
           getDownloadURL(uploadTask.snapshot.ref)
             .then((urls) => {
               setUrls((prevState) => [...prevState, urls]);
               toast.info("Image upload to firebase successfully");
             });
         }
       );
       return(image.map)
     });
   };

  //THIS IS FOR UPLOADING THE IMAGE PAPUNTA SA FIREBASE STORAGE AT KUKUNIN ANG IMAGE URL
  useEffect(() => {
    toast.info("File/s Uploading...")
    const uploadFile = () => {
      const storageRef = ref_storage(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        toast.info("Upload is " + progress + " % done");
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            toast.info("Upload is paused");
            break;
          case "finished":
            toast.info("Upload is running");
            break;
          default:
            break;
        }

      }, (error) => {
        window.alert(error);
      },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setForm((prev) => ({ ...prev, imageUrl: downloadUrl }));
            toast.info("Image upload to firebase successfully");
          })
        });
    };

    file && uploadFile();
  }, [file])

  //THIS IS TO GET THE HOTEL DETAILS
  const getHotelDetails = async () => {
    console.log(id);
    const docRef = ref_database(db, "Leisure/Hotel/" + id, id);
    const snapshot = await get(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.val() })
    }
  }

   //THIS IS TO GET THE RESORT DETAILS
   const getResortDetails = async () => {
    console.log(id);
    const docRef = ref_database(db, "Leisure/Resort/" + id, id);
    const snapshot = await get(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.val() })
    }
  }
     //THIS IS TO GET THE RESORT DETAILS
     const getFoodHubsDetails = async () => {
      console.log(id);
      const docRef = ref_database(db, "Leisure/Food Hubs/" + id, id);
      const snapshot = await get(docRef);
      if (snapshot.exists()) {
        setForm({ ...snapshot.val() })
      }
    }

  //KAPAG KUKUNIN ANG DETAILS, SYA ANG RESPONSIBLE PARA KUNIN ANG UNIQUE ID NUNG LOCATION NA YUN
  useEffect(() => {
    id && getHotelDetails() && getResortDetails() && getFoodHubsDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //THIS IS JUST DEVELOPER'S TRACK
  console.log("form", form);

  //KAPAG MAY PAGBABAGO SA FORM, SYA BAHALA
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

  }
  //PAGBABAGO SA CATEGORY BUTTON VALUE, SYA BAHALA
  const handleCategory = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  //ETO YUNG PARA SA PHONE NUMBERS, SYA ANG KUKUHA AT MAGPAPASA SA ARRAY
  const handlePhones = (phoneNums) => {
    setForm({ ...form, phoneNums });
  };
  //KAPAG PIPINDUTIN NA NG USER ANG SUBMIT BUTTON, ISASAVE NYA ANG DATA PAPUNTA SA FIREBASE DATABASE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (place && category && details && googleMapLink) {
      try {
        await update(ref_database(db, "Leisure/" + category + "/" + place), {
          ...form,
          classification: "Leisure",
          date: date.toLocaleString('default', { month: 'long' }) + date.getDate() + ", " + date.getFullYear()
        });
        toast.success("Data has been uploaded in the database");
      }
      catch (error) {
        toast.error(error);
      }
    }
    
    urls.forEach((url) => {
      var imageNum = "image" + (urls.indexOf(url)+1);
     
        update(ref_database(db, "Gallery/Explore/" + category + "/" + place + "/" + imageNum), {
          imagePiece: url
        });
        toast.success("Data has been uploaded in the database");
  
    })
    
    navigate("/");
  };


  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">
            {id ? "Update Leisure Content" : "Create Leisure Content"}
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form className="row blog-form" onSubmit={handleSubmit}>
                <div className="col-12 py-3">
                  <input type="text"
                    className="form-control input-text-box"
                    placeholder="Place Name"
                    name="place"
                    value={place}
                    onChange={handleChange}
                    disabled={id ? "Update Leisure Content" : null}
                  />
                </div>
                <div className="col-12 py-3">
                  <ReactTagInput
                    tags={phoneNums}
                    placeholder="Phone Number of the Owner"
                    onChange={handlePhones}
                  />
                </div>
                <div className="col-12 py-3">
                  <p className="category">
                    Please choose a category
                  </p>
                  <div className="form-check-inline mx-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      value="Hotel"
                      name="radioOption"
                      checked={category === "Hotel"}
                      onChange={handleCategory}
                    />
                    <label htmlFor="radioOption" className="form-check-label">
                      &nbsp;Hotel&nbsp;
                    </label>
                    <input
                      type="radio"
                      className="form-check-input"
                      value="Food Hubs"
                      name="radioOption"
                      checked={category === "Food Hubs"}
                      onChange={handleCategory}
                    />
                    <label htmlFor="radioOption" className="form-check-label">
                      &nbsp;Food Hubs&nbsp;
                    </label>
                    <input
                      type="radio"
                      className="form-check-input"
                      value="Resort"
                      name="radioOption"
                      checked={category === "Resort"}
                      onChange={handleCategory}
                    />
                    <label htmlFor="radioOption" className="form-check-label">
                      &nbsp;Resort&nbsp;
                    </label>
                  </div>
                </div>
                <div className="col-12 py-3">
                  <input type="text"
                    className="form-control input-text-box"
                    placeholder="Write the minimum price of products/services"
                    name="startPrice"
                    value={startPrice}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 py-3">
                  <input type="text"
                    className="form-control input-text-box"
                    placeholder="Write a short description about the place here"
                    name="shortDesc"
                    value={shortDesc}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 py-3">
                  <input type="text"
                    className="form-control input-text-box"
                    placeholder="Place the Google Map Link here"
                    name="googleMapLink"
                    value={googleMapLink}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 py-3">
                  <textarea
                    className="form-control description-box"
                    placeholder="Details"
                    value={details}
                    name="details"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className="mb-3">
                  <p className="category">
                    Upload 2 or more images for gallery
                  </p>
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    onChange={handleImageChange}
                  />
                </div>
                <div className="col-12 py-3 text-center">
                  <button className="btn btn-add" onClick={handleUpload}
                    disabled={progress !== null && progress < 100}>
                    Upload Gallery Images
                  </button>
                </div>
                <div className="col-12 py-3 text-center">
                  <button className="btn btn-add" type="submit"
                    disabled={progress !== null && progress < 100}>
                    {id ? "Update Information" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add_or_Edit