const baseUrl = "http://localhost:3000/api/escape-results";

async function testPost() {
  console.log("Running POST test...");

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      timeRemaining: 99,
      itemsCollected: ["Test Item"],
      notes: "TEST_RUN"
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("POST test failed");
  }

  console.log("POST test passed:", data);
}

async function testGet() {
  console.log("Running GET test...");

  const res = await fetch(baseUrl);
  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("GET test failed");
  }

  console.log("GET test passed. Total records:", data.length);
}

async function runTests() {
  try {
    await testPost();
    await testGet();
    console.log("ALL API TESTS PASSED");
  } catch (err) {
    console.error(err.message);
  }
}

runTests();
