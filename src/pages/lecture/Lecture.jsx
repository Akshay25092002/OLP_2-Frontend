import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import "./lecture.css";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  if (
    user &&
    user.role !== "admin" &&
    !user.subscription.includes(params.id) &&
    user.role !== "Instructor"
  ) {
    return navigate("/");
  }

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      toast.success("submitted" - data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setvideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        toast.success("Deleted Successfully", data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progress, setProgress] = useState([]);

  async function fetchProgress() {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      setCompleted(data.courseProgressPercentage);
      setCompletedLec(data.completedLectures);
      setLectLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      console.log(error);
    }
  }

  const addProgress = async (id) => {
    try {
      const { data } = await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(data.message);
      fetchProgress();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, []);

  return (
    <>
      {" "}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="progress">
            Lecture Completed - {completedLec} out of {lectLength} <br />
            <progress value={completed} max={100}></progress> {completed}%
          </div>
          <div className="lecture-page">
            <div className="left">
              {lecture.video ? (
                <>
                  <video
                    src={`${server}/${lecture.video}`}
                    width={"100%"}
                    controls
                    controlsList="nodownload noremoteplayback"
                    disablePictureInPicture
                    disableRemotePlayback
                    autoPlay
                    onEnded={() => addProgress(lecture)}
                  ></video>
                  <h1>{lecture.title}</h1>
                  <h3>{lecture.description}</h3>
                </>
              ) : (
                <h2>Please Select a Lecture</h2>
              )}
            </div>
            <div className="right">
              {user &&
                (user.role === "admin" || user.role === "Instructor") && (
                  <button className="common-btn" onClick={() => setShow(!show)}>
                    {show ? "Close" : "Add Lecture +"}
                  </button>
                )}

              {show && (
                <div className="lecture-form">
                  <h2>Add lecture</h2>
                  <form onSubmit={submitHandler}>
                    <label htmlFor="text">Title: </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />

                    <label htmlFor="text">Description: </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />

                    <input
                      type="file"
                      onChange={changeVideoHandler}
                      placeholder="choose video"
                      required
                    />

                    {videoPrev && (
                      <video
                        src={videoPrev}
                        alt=""
                        width={300}
                        controls
                      ></video>
                    )}

                    <button
                      disabled={btnLoading}
                      type="submit"
                      className="common-btn"
                    >
                      {btnLoading ? "Please Wait..." : "Add"}
                    </button>
                  </form>
                </div>
              )}
              {lectures && lectures.length > 0 ? (
                lectures.map((e, i) => (
                  <>
                    <div
                      onClick={() => fetchLecture(e._id)}
                      key={i}
                      className={`lecture-number ${
                        lecture._id === e._id && "active"
                      }`}
                    >
                      {i + 1}. {e.title}{" "}
                      {progress[0] &&
                        progress[0].completedLectures.includes(e._id) && (
                          <span
                            style={{
                              background: "red",
                              padding: "2px",
                              borderRadius: "6px",
                              color: "greenyellow",
                            }}
                          >
                            <TiTick />
                          </span>
                        )}
                    </div>
                    {user &&
                      (user.role === "admin" || user.role === "Instructor") && (
                        <button
                          className="common-btn my-2"
                          style={{ background: "red" }}
                          onClick={() => deleteHandler(e._id)}
                        >
                          Delete {e.title}
                        </button>
                      )}
                  </>
                ))
              ) : (
                <p> No Lectures video yet!</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Lecture;
