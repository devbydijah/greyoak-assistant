const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const {
  handleProposal,
  handleInspectionPack,
  handleApprovalRequest,
  handleWorkOrder,
  handleListVendors,
  handleUploadUrl,
} = require("./greyoak-middleware-router");

// Root route for sanity check
app.get("/", (req, res) => {
  res.send("🚀 Intent router live on http://localhost:10000");
});

// === POST /proposals ===
app.post("/proposals", async (req, res) => {
  try {
    const result = await handleProposal(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Proposal error:", error);
    res.status(500).json({ error: "Failed to create proposal" });
  }
});

// === POST /inspections/packs ===
app.post("/inspections/packs", async (req, res) => {
  try {
    const result = await handleInspectionPack(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Inspection error:", error);
    res.status(500).json({ error: "Failed to create inspection pack" });
  }
});

// === POST /approvals ===
app.post("/approvals", async (req, res) => {
  try {
    const result = await handleApprovalRequest(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).json({ error: "Failed to request approval" });
  }
});

// === POST /workorders ===
app.post("/workorders", async (req, res) => {
  try {
    const result = await handleWorkOrder(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Work order error:", error);
    res.status(500).json({ error: "Failed to create work order" });
  }
});

// === GET /vendors ===
app.get("/vendors", async (req, res) => {
  try {
    const service = req.query.service;
    const result = await handleListVendors(service);
    res.json(result);
  } catch (error) {
    console.error("Vendor error:", error);
    res.status(500).json({ error: "Failed to list vendors" });
  }
});

// === POST /files/upload-url ===
app.post("/files/upload-url", async (req, res) => {
  try {
    const result = await handleUploadUrl(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Upload URL error:", error);
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Intent router live on http://localhost:${port}`);
});
