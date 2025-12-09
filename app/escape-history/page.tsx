import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EscapeHistoryPage() {
  const results = await prisma.escapeResult.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        textAlign: "center",
        padding: "0px 20px"
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "10px",
          fontWeight: "bold"
        }}
      >
        Escape History
      </h1>

      <p style={{ fontSize: "1.2rem", marginBottom: "38px" }}>
        Server-side dynamic page powered by Prisma & Lambda
      </p>

      {results.length === 0 ? (
        <p style={{ fontSize: "1.1rem" }}>No escape attempts recorded yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            fontSize: "1rem"
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Time Left</th>
              <th style={thStyle}>Items</th>
              <th style={thStyle}>Result</th>
              <th style={thStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id}>
                <td style={tdStyle}>{r.id}</td>
                <td style={tdStyle}>{r.timeRemaining}</td>
                <td style={tdStyle}>{r.itemsCollected.join(", ")}</td>
                <td style={tdStyle}>{r.notes}</td>
                <td style={tdStyle}>
                  {new Date(r.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  borderBottom: "2px solid currentColor",
  padding: "10px",
  textAlign: "left" as const,
};

const tdStyle = {
  borderBottom: "1px solid currentColor",
  padding: "10px",
  textAlign: "left" as const,
};
