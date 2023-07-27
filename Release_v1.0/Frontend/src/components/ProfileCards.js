import React from "react";
import Card from "./Card";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletSharpIcon from "@mui/icons-material/AccountBalanceWalletSharp";
import ProfileButton from "./ProfileButton";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import IosShareSharpIcon from "@mui/icons-material/IosShareSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { useNavigate } from "react-router-dom";

export default function ProfileCards() {
  const navigate = useNavigate();

  // Function to handle logout and redirect to the login page
  const handleLogout = () => {
    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <div>
      {/* Card for displaying profile information */}
      <Card color="#064495">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {/* Icon for the profile */}
          <AccountCircleIcon fontSize="large" />

          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Username */}
            <span
              style={{
                color: "white",
                fontSize: "13px",
                marginBottom: "1em",
                color: "#d1cfc9",
              }}
            >
              Username
            </span>
            {/* User's name */}
            <span style={{ fontWeight: "600", color: "white", fontSize: "25px" }}>
              John Doe
            </span>
          </div>
        </div>
      </Card>

      {/* Profile buttons */}
      {/* Each ProfileButton component displays an icon and content */}
      <ProfileButton Icon={AccountBalanceWalletSharpIcon} content="Account" />
      <ProfileButton Icon={SettingsSharpIcon} content="Settings" />
      <ProfileButton Icon={IosShareSharpIcon} content="Export Data" />
      {/* Logout button with onClick event */}
      <ProfileButton
        Icon={LogoutSharpIcon}
        content="Logout"
        onClick={handleLogout}
      />
    </div>
  );
}
