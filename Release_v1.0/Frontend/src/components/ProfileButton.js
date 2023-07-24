import React from "react";
import Card from "./Card";

export default function ProfileButton({ Icon, content, onClick }) {
  return (
    <Card color="white" marginBottom="0.5rem">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <div
            style={{
              borderRadius: "20%",
              padding: "0.5em",
              background: "#d1cfc9",
            }}
          >
            <Icon />
          </div>
          <span
            style={{
              fontWeight: "600",
              fontSize: "18px",
              marginLeft: "1em",
            }}
          >
            {content}
          </span>
        </div>
      </div>
    </Card>
  );
}
