import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref as ref_storage, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { toast } from 'react-toastify';
import { getDatabase, ref as ref_database, update, get } from 'firebase/database';
import { useNavigate, useParams } from 'react-router-dom';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";



const initialState = {
  productName: "",
  googleMapLink: "",
  shortDesc: "",
  imageHeadline: "",
  startPrice: "",
  phoneNums: []
}

//these ar the basic declarations
const Add_or_Edit = ({ user }) => {

  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();
  const db = getDatabase();
  var date = new Date();
  const { id } = useParams();

  //forms declaration na magrereceive ng data from the html form

  const {
    productName,
    shortDesc,
    startPrice,
    phoneNums
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
    const uploadFile = () => {
      toast.info("File/s Uploading...")
      const storageRef = ref_storage(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + " % done");
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }

      }, (error) => {
        window.alert(error);
      },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase successfully");
            setForm((prev) => ({ ...prev, imageHeadline: downloadUrl }));
          })
        });
    };

    file && uploadFile();
  }, [file])

  console.log("form", form);

  //THIS IS TO GET THE LOCATION DETAILS KAPAG YUNG UPDATE BUTTON ANG PININDOT NI USER (LAND MASSES)
  const getStoreDetails = async () => {
    const docRef = ref_database(db, "Store/" + id, id);
    const snapshot = await get(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.val() })
    }
  }

  //KAPAG KUKUNIN ANG DETAILS, SYA ANG RESPONSIBLE PARA KUNIN ANG UNIQUE ID NUNG LOCATION NA YUN
  useEffect(() => {
    id && getStoreDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //KAPAG MAY PAGBABAGO SA FORM, SYA BAHALA
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

  }
  //ETO YUNG PARA SA PHONE NUMBERS, SYA ANG KUKUHA AT MAGPAPASA SA ARRAY
  const handlePhones = (phoneNums) => {
    setForm({ ...form, phoneNums });
  };

  //KAPAG PIPINDUTIN NA NG USER ANG SUBMIT BUTTON, ISASAVE NYA ANG DATA PAPUNTA SA FIREBASE DATABASE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productName && phoneNums && shortDesc && startPrice) {
      try {
        await update(ref_database(db, "Store/" + productName), {
          ...form,
          classification: "Store",
          date: date.toLocaleString('default', { month: 'long' }) + date.getDate() + ", " + date.getFullYear()
        })
        console.log("username", user.displayName);
      }
      catch (error) {
        console.log(error)
        toast.error("Data upload failed. Try again later");
      }
    }urls.forEach((url) => {
      var imageNum = "image" + (urls.indexOf(url)+1);
     
        update(ref_database(db, "Gallery/Explore/" + productName + "/" + imageNum), {
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
            {id ? "Update Store Element" : "Create Store Element"}
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form className="row blog-form" onSubmit={handleSubmit}>
                <div className="col-12 py-3">
                  <input type="text"
                    className="form-control input-text-box"
                    placeholder="Product Name"
                    name="productName"
                    value={productName}
                    onChange={handleChange}
                    disabled={id ? "Update Store Content" : null}
                  />
                </div>
                <div className="col-12 py-3">
                  <ReactTagInput
                    tags={phoneNums}
                    placeholder="Phone Number/s of product seller"
                    onChange={handlePhones}
                  />
                </div>
                <div className="col-12 py-3">
                  <input type="text"
                    className="form-control input-text-box"
                    placeholder="Enter a short description of the product here"
                    name="shortDesc"
                    value={shortDesc}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 py-3">
                  <input type="text"
                    className="form-control input-text-box"
                    placeholder="Minimum Product Price (number only)"
                    name="startPrice"
                    value={startPrice}
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
                    Submit
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