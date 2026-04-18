import { useEffect, useState } from "react";
import "../styles/admindashboard.css";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Story form
  const [storyTitle, setStoryTitle] = useState("");
  const [storyDesc, setStoryDesc] = useState("");
  const [storyImage, setStoryImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // FETCH DATA
  const fetchData = async () => {
    try {
      const [reqRes, storyRes] = await Promise.all([
        fetch("http://localhost:5001/api/membership"),
        fetch("http://localhost:5001/api/stories"),
      ]);

      const reqData = await reqRes.json();
      const storyData = await storyRes.json();

      setRequests(Array.isArray(reqData) ? reqData : []);
      setStories(Array.isArray(storyData) ? storyData : []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // UPLOAD STORY
  const handleStoryUpload = async (e) => {
    e.preventDefault();

    if (!storyTitle || !storyDesc || !storyImage) {
      alert("Please fill all fields");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("title", storyTitle);
    formData.append("description", storyDesc);
    formData.append("image", storyImage);

    try {
      const res = await fetch("http://localhost:5001/api/stories", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        alert("Story uploaded successfully");

        setStoryTitle("");
        setStoryDesc("");
        setStoryImage(null);

        fetchData();
      } else {
        alert(result.message || "Upload failed");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setUploading(false);
    }
  };

  // DELETE STORY
  const deleteStory = async (id) => {
    if (!window.confirm("Delete this story?")) return;

    try {
      const res = await fetch(
        `http://localhost:5001/api/stories/${id}`,
        { method: "DELETE" }
      );

      const result = await res.json();

      if (result.success) {
        setStories((prev) => prev.filter((s) => s._id !== id));
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/admin";
  };

  if (loading) {
    return <div className="loading">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="admin-page">

      {/* HEADER */}
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* MEMBERSHIP REQUESTS */}
      <section className="admin-section">
        <h2>Membership Requests ({requests.length})</h2>

        {requests.length === 0 ? (
          <p className="no-data">No requests found</p>
        ) : (
          <div className="request-grid">
            {requests.map((req) => (
              <div key={req._id} className="request-card">
                <h3>{req.name}</h3>

                <p><b>Age:</b> {req.age}</p>
                <p><b>Phone:</b> {req.phone}</p>
                <p><b>Aadhaar:</b> {req.aadhaar}</p>
                <p><b>Address:</b> {req.address}</p>
                <p><b>Email:</b> {req.email || "N/A"}</p>

                <span className="status">
                  {req.status || "Pending"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* STORIES */}
      <section className="admin-section">
        <h2>Stories ({stories.length})</h2>

        <div className="story-grid">
          {stories.length === 0 ? (
            <p className="no-data">No stories found</p>
          ) : (
            stories.map((story) => (
              <div key={story._id} className="story-card-admin">
                <img
                  src={
                    story.image.startsWith("http")
                      ? story.image
                      : `http://localhost:5001${story.image}`
                  }
                  alt={story.title}
                />

                <h3>{story.title}</h3>
                <p>{story.description}</p>

                <button
                  className="delete-btn"
                  onClick={() => deleteStory(story._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* UPLOAD STORY */}
      <section className="admin-section">
        <h2>Upload Story</h2>

        <form onSubmit={handleStoryUpload} className="story-form">

          <input
            type="text"
            placeholder="Title"
            value={storyTitle}
            onChange={(e) => setStoryTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={storyDesc}
            onChange={(e) => setStoryDesc(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setStoryImage(e.target.files[0])}
            required
          />

          <button type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Story"}
          </button>

        </form>
      </section>

    </div>
  );
};

export default AdminDashboard;