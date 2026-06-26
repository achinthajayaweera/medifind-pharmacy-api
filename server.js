const http = require("http");

const registrations = [];

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/register-pharmacy") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const { pharmacyName, registrationNo, contactNumber, city, email } = data;
        if (!pharmacyName || !registrationNo || !contactNumber || !city || !email) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "All fields are required" }));
          return;
        }
        const record = {
          id: Date.now(),
          pharmacyName,
          registrationNo,
          contactNumber,
          city,
          email,
          submittedAt: new Date().toISOString(),
          status: "pending"
        };
        registrations.push(record);
        console.log("New pharmacy registration:", record);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, message: "Registration received", id: record.id }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  if (req.method === "GET" && req.url === "/api/registrations") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ total: registrations.length, registrations }));
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "healthy", service: "MediFind Pharmacy Registration API", version: "1.0.0" }));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`MediFind Pharmacy API running on port ${PORT}`));
