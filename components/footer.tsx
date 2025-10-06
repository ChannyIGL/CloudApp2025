export default function Footer() {
  const date = new Date();
  const formattedDate = date.toLocaleDateString();

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "8px",
        background: "var(--background)",
        color: "var(--foreground)",
        borderTop: "1px solid var(--foreground)",
        marginTop: "20px",
        transition: "background 0.5s ease, color 0.5s ease",
      }}
    >
      <p>
        &copy; Kim Duk Chan - 22586650
      </p>
      <p>Date: {formattedDate}</p>
    </footer>
  );
}
