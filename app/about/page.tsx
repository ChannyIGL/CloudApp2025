export default function AboutPage() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
        padding: "0px 20px"
      }}
    >
      {/*Title*/}
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "0px",
          fontWeight: "bold"
        }}
      >
        About Cloud-Web
      </h1>

      <p style={{ fontSize: "1.2rem", marginBottom: "38px" }}>
        <strong>Kim Duk Chan</strong> - <strong>22586650</strong>
      </p>

      {/*Description*/}
      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: "1.6",
          margin: "0 auto",
          maxWidth: "650px",
          marginBottom: "50px"
        }}
      >
        Cloud-Web is a front-end web application created as part of a Web
        Development assignment. It demonstrates key web technologies such as
        dynamic UI components, dark/light theme toggling, responsive design,
        and interactive features. The project aims to provide a functional,
        user-friendly platform while showcasing modern React and Next.js
        practices.
      </p>

      {/*Video*/}
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "20px",
          fontWeight: "600"
        }}
      >
        Code Explanation Video
      </h2>
      
      {/*empty placeholder until video is finished*/}
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          marginBottom: "40px"
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/Zq5fmkH0T78"
          title="Cloud-Web Demo"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
