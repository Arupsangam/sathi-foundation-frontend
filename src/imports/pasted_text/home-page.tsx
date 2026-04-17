import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.jpeg";
import "../styles/home.css";

// Images
import blood from "../assets/blood.jpg";
import help from "../assets/help.jpg";
import education from "../assets/education.jpg";
import food from "../assets/food.jpg";
import prize from "../assets/prize.jpg";
import sad from "../assets/sad.jpg";

const services = [
  { img: blood, title: "ରକ୍ତ ଦାନ", en: "Blood Donation" },
  { img: education, title: "ଶିକ୍ଷା ସହାୟତା", en: "Education Support" },
  { img: food, title: "ଖାଦ୍ୟ ସେବା", en: "Food Distribution" },
  { img: help, title: "ଜରୁରୀ ସହାୟତା", en: "Emergency Help" },
  { img: prize, title: "ସମ୍ମାନ", en: "Our Recognition" },
  { img: sad, title: "ଅସହାୟଙ୍କ ସାଥୀ", en: "Supporting the Needy" },
];

const Home = ({ showMemberModal, setShowMemberModal }) => {
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Splash screen
  useEffect(() => {
    const timer = setTimeout(() => setLoadingScreen(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Submit form
  const handleMemberSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.target);

      const payload = {
        name: data.get("name"),
        age: Number(data.get("age")),
        address: data.get("address"),
        aadhaar: String(data.get("aadhaar")).replace(/\s/g, ""),
        phone: data.get("phone"),
        email: data.get("email"),
      };

      if (payload.aadhaar.length !== 12) {
        alert("❌ Aadhaar must be 12 digits");
        return;
      }

      if (payload.age < 18) {
        alert("❌ Age must be 18+");
        return;
      }

      const res = await fetch("http://localhost:5001/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Membership Applied Successfully!");
        setShowMemberModal(false);
        e.target.reset();
      } else {
        alert(result.message || "❌ Submission Failed");
      }

    } catch (err) {
      console.log(err);
      alert("❌ Server Error");
    }
  };

  // Splash
  if (loadingScreen) {
    return (
      <div className="splash">
        <div className="splash-box">
          <img src={logo} className="splash-logo" alt="logo" />
          <h2 className="splash-text">ସାଥି ସାହାଯ୍ୟ ସାରାକାଳ</h2>
          <p className="splash-sub">Sathi Sahajya Sarakala</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-box">
          <h1>ସାଥି ସାହାଯ୍ୟ ସାରାକାଳ</h1>
          <h3>Sathi Sahajya Sarakala</h3>

          <p className="hero-text">
            We support communities and help people in need.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/donate")} className="btn-primary">
              Donate Now
            </button>

            <button onClick={() => navigate("/upcoming")} className="btn-outline">
              Upcoming Help
            </button>

            <button
              onClick={() => setShowMemberModal(true)}
              className="btn-member"
            >
              Become a Member
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">📢 Upcoming Help</div>
          <div className="feature-card">🤝 Community Support</div>
          <div className="feature-card">💡 Awareness</div>
        </div>
      </section>

      {/* WORK */}
      <section className="image-cards-section">
        <h2>Our Work</h2>
        <div className="cards-container">
          {services.map((item, i) => (
            <motion.div key={i} className="image-card">
              <img src={item.img} alt={item.en} />
              <h4>{item.title}</h4>
              <p>{item.en}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SLIDER */}
      <section className="slider-section">
        <h2>Our Impact Gallery</h2>

        <div className="slider-container">
          <div
            className="slider-wrapper"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {services.map((item, i) => (
              <div className="slide" key={i}>
                <img src={item.img} alt={item.en} />
                <div className="slide-overlay">
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <h2>Contact Us</h2>

        <div className="contact-box">
          <p>📍 Manikapatana, Aul, Kendrapara, Odisha</p>
          <p>📧 sathifoundationodisha@gmail.com</p>
          <p>📞 7894447829</p>
        </div>
      </section>

      {/* DONATION BAR */}
      <div className="donation-bar">
        ❤️ Help someone today
        <button onClick={() => navigate("/donate")}>Donate Now</button>
      </div>

      {/* MODAL */}
      {showMemberModal && (
        <div className="modal-overlay" onClick={() => setShowMemberModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            <h2>Become a Member</h2>

            <form onSubmit={handleMemberSubmit}>

              <div className="form-group">
                <label>Name *</label>
                <input name="name" required />
              </div>

              <div className="form-group">
                <label>Age *</label>
                <input name="age" type="number" required />
              </div>

              <div className="form-group">
                <label>Address *</label>
                <textarea name="address" rows="3" required />
              </div>

              <div className="form-group">
                <label>Aadhaar *</label>
                <input name="aadhaar" maxLength="12" required />
              </div>

              <div className="form-group">
                <label>Phone *</label>
                <input name="phone" required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" />
              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowMemberModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="btn-submit">
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;