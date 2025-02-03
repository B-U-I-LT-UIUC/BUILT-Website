import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import throttle from 'lodash/throttle';
import '../styles/stickyNavBar.css';

const StickyNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 10);
    }, 50); // Throttle to once every 50ms

    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div style={{ height: isScrolled ? "70px" : "0" }}></div>
      <div className={`navbar-wrapper ${isScrolled ? "fixed-top" : ""}`}>
        <div className="navbar">
          <button
            className="hamburger-menu"
            onClick={toggleMenu}
            ref={menuButtonRef}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>

          <div className={`nav-links ${menuOpen ? "show" : ""}`} ref={navRef}>
            <Link
              to="/Home"
              className="button"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/About"
              className="button"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/Calendar"
              className="button"
              onClick={() => setMenuOpen(false)}
            >
              Calendar
            </Link>
            <Link
              to="/Get-Involved"
              className="button"
              onClick={() => setMenuOpen(false)}
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StickyNavBar;
