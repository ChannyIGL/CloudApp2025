"use client";

export default function Footer() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "15px",
        backgroundColor: "#f4f4f4",
        borderTop: "1px solid #ccc",
        marginTop: "40px",
        color: "black"
      }}
    >
      <p>
        &copy; Kim Duk Chan - 22586650
      </p>
      <p>Date: {formattedDate}</p>
    </footer>
  );
}
