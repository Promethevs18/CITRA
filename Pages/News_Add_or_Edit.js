import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref as ref_storage, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { toast } from 'react-toastify';
import { getDatabase, ref as ref_database, update, get } from 'firebase/database';
import { useNavigate, useParams } from 'react-router-dom';

const initialState = {
  headLine: "",
  shortDesc:"",
  full_details:"",
  date:""
}

const Add_or_Edit = ({ user }) => {

  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();
  const db = getDatabase();
  var datePub = new Date();
  const { id } = useParams();

  const {
    headLine,
    shortDesc,
    full_details,
     } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref_storage(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log ("Upload is " + progress + " % done");
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

  //THIS IS TO GET THE RESORT DETAILS
  const getNewsDetails = async () => {
    console.log(id);
    const docRef = ref_database(db, "News Feed/" + id, id);
    const snapshot = await get(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.val() })
    }
  }

  useEffect(() => {
    id && getNewsDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (headLine && full_details  && shortDesc) {
      try {
        await update(ref_database(db, "News Feed/"+headLine), {
          ...form,
          classification: "News",
          date: datePub.toLocaleString('default', { month: 'long' }) +" " + datePub.getDate() + ", " + datePub.getFullYear()
        })
      }
      catch (error) {
        console.log(error)
        toast.error("Data upload failed. Try again later");
      }
    }
    navigate("/");
  };


  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">
            Create News Element
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form className="row blog-form" onSubmit={handleSubmit}>
                <div className="col-12 py-3">
                  <input type="text"
                    className="form-control input-text-box"
                    placeholder="News Headline"
                    name="headLine"
                    value={headLine}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 py-3">
                  <input type="text"
                    className="form-control input-text-box"
                    placeholder="Enter a short news description here"
                    name="shortDesc"
                    value={shortDesc}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 py-3">
                  <textarea
                    className="form-control description-box"
                    placeholder="Complete news details"
                    value={full_details}
                    name="full_details"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])} />
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