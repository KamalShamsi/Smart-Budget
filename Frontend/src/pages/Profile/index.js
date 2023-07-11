import React from "react";
import BottomBar from "../../components/BottomBar";
import ProfileCards from "../../components/ProfileCards";

export default function Profile() {
  return (
    <div>
      <div className="dashboard-header">
        <h3 style={{ margin: 0 }}>Profile</h3>
      </div>
      <hr />
      <ProfileCards />

      <div className="bottomBar">
        <BottomBar />
      </div>
    </div>
  );
}
