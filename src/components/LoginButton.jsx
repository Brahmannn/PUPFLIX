import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

function LoginButton() {
  const { user, login, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return (
      <button className="google-btn" onClick={login}>
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
        />
        Continue with Google
      </button>
    );
  }

  return (
    <div className="profile-menu" ref={menuRef}>
      <div
        className="profile-trigger"
        onClick={() => setOpen(!open)}
      >
        <img
          src={
            user.photoURL ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.displayName
            )}`
          }
          alt={user.displayName}
          className="profile-pic"
        />

        <span className="profile-name">
          {user.displayName.split(" ")[0]}
        </span>
      </div>

      {open && (
        <div className="profile-dropdown">

          <div className="profile-header">
            <img
              src={
                user.photoURL ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.displayName
                )}`
              }
              alt={user.displayName}
              className="profile-large"
            />

            <div>
              <h3>{user.displayName}</h3>
              <p>{user.email}</p>
            </div>
          </div>

          <hr />

          <button>❤️ My List</button>
          <button>👤 Profile</button>
          <button>⚙️ Settings</button>

          <hr />

          <button
            className="logout-btn"
            onClick={logout}
          >
            🚪 Logout
          </button>

        </div>
      )}
    </div>
  );
}

export default LoginButton;