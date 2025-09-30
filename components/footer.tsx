export default function Footer() {
  const date = new Date();
  const formattedDate = date.toLocaleDateString();

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "8px",
        backgroundColor: "#ffffffff",
        borderTop: "1px solid #ccc",
        marginTop: "20px",
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
