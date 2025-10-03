const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const intentMapper = require("./intent-mapper");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/gpt-message", (req, res) => {
  const { message } = req.body;
  const result = intentMapper(message);
  result.timestampWAT = new Date().toLocaleString("en-NG", {
    timeZone: "Africa/Lagos",
  });
  res.json(result);
});

// Mock endpoints for ActionsGPT to connect to
app.post("/proposals", (req, res) => {
  res.status(201).json({
    proposalId: "abc123",
    outcome: "Proposal created",
    priceNaira: 100000,
    priceDisplay: "₦100,000",
    bodyMarkdown: "Your proposal details go here.",
    eta: "24 hours",
    risks: ["Delayed inspection", "Missing documents"],
    timestampWAT: new Date().toLocaleString("en-NG", {
      timeZone: "Africa/Lagos",
    }),
    signUrl: "https://sign.greyoak.ng/proposal/abc123",
  });
});

app.post("/inspections/packs", (req, res) => {
  res.status(201).json({
    packId: "pack001",
    checklist: ["Exterior", "Interior", "Roof"],
    uploadFolderUrl: "https://uploads.greyoak.ng/packs/pack001",
    timestampWAT: new Date().toLocaleString("en-NG", {
      timeZone: "Africa/Lagos",
    }),
  });
});

app.get("/vendors", (req, res) => {
  res.json({
    vendors: [
      { vendorId: "v1", name: "FixIt Plumbing", sla: "24 hours" },
      { vendorId: "v2", name: "PowerUp Electric", sla: "48 hours" },
    ],
  });
});

app.post("/approvals", (req, res) => {
  res.status(201).json({
    approvalId: "appr567",
    summary: "Approval for plumbing fix",
    capDisplay: "₦75,000",
    status: "pending",
    timestampWAT: new Date().toLocaleString("en-NG", {
      timeZone: "Africa/Lagos",
    }),
  });
});

app.post("/workorders", (req, res) => {
  res.status(201).json({
    workOrderId: "wo789",
    vendorName: "FixIt Plumbing",
    status: "created",
    timestampWAT: new Date().toLocaleString("en-NG", {
      timeZone: "Africa/Lagos",
    }),
  });
});

app.post("/files/upload-url", (req, res) => {
  res.status(201).json({
    url: "https://s3.upload.greyoak.ng/tmp/file123.jpg",
    expiresInSeconds: 3600,
  });
});

app.listen(PORT, () => {
  console.log(`🧠 Intent middleware router on http://localhost:${PORT}`);
});
