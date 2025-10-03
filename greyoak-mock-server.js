// Grey-Oak Assistant Full Mock API Server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// POST /approvals
app.post('/approvals', (req, res) => {
  const { issue, vendorId, etaWindow, capNaira } = req.body;
  return res.json({
    approvalId: 'mock-approval-001',
    summary: `${issue} via ${vendorId} @ ${etaWindow}`,
    capDisplay: `₦${capNaira.toLocaleString()}`,
    status: 'approved',
    timestampWAT: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' WAT'
  });
});

// POST /proposals
app.post('/proposals', (req, res) => {
  const { plan, propertyName, location } = req.body;
  const price = plan === 'Protection' ? 100000 : 120000;
  return res.json({
    proposalId: 'mock-proposal-001',
    outcome: `${plan} plan for ${propertyName}, ${location}`,
    priceNaira: price,
    priceDisplay: `₦${price.toLocaleString()}`,
    bodyMarkdown: `**Plan:** ${plan}\n**Property:** ${propertyName}, ${location}`,
    eta: 'Send in 30–60 min',
    risks: [],
    timestampWAT: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' WAT',
    signUrl: 'https://mock.sign.url/proposal-001'
  });
});

// POST /reports/owner
app.post('/reports/owner', (req, res) => {
  const { propertyId, month } = req.body;
  return res.json({
    reportId: 'mock-report-001',
    healthScore: '87% (↑3% MoM)',
    bodyMarkdown: `**Monthly Report** for ${propertyId} (${month})`,
    invoiceAmountDisplay: '₦100,000',
    timestampWAT: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' WAT'
  });
});

// POST /inspections/packs
app.post('/inspections/packs', (req, res) => {
  return res.json({
    packId: 'mock-pack-001',
    checklist: ['Check roof', 'Test plumbing', 'Inspect gates'],
    uploadFolderUrl: 'https://mock.upload.url/inspections',
    timestampWAT: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' WAT'
  });
});

// POST /workorders
app.post('/workorders', (req, res) => {
  return res.json({
    workOrderId: 'mock-wo-001',
    vendorName: 'Vendor B',
    status: 'dispatched',
    timestampWAT: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' WAT'
  });
});

// POST /calendar/blocks
app.post('/calendar/blocks', (req, res) => {
  const { startWAT, endWAT } = req.body;
  return res.json({
    eventId: 'mock-event-001',
    startWAT,
    endWAT
  });
});

// POST /crm/leads
app.post('/crm/leads', (req, res) => {
  return res.json({ leadId: 'mock-lead-001' });
});

// POST /crm/stages
app.post('/crm/stages', (req, res) => {
  const { leadId, stage } = req.body;
  return res.json({ leadId, stage });
});

// POST /files/upload-url
app.post('/files/upload-url', (req, res) => {
  return res.json({
    url: 'https://mock.upload.url/file.jpg',
    expiresInSeconds: 3600
  });
});

// GET /vendors
app.get('/vendors', (req, res) => {
  const service = req.query.service || 'general';
  return res.json({
    vendors: [
      { vendorId: 'vendor-a', name: 'Vendor A', sla: '2h response' },
      { vendorId: 'vendor-b', name: 'Vendor B', sla: '4h response' }
    ]
  });
});

// Catch-all stub
app.all('*', (req, res) => {
  res.json({
    echo: req.body || {},
    note: 'Stubbed mock response',
    timestampWAT: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' WAT'
  });
});

app.listen(PORT, () => console.log(`✅ Full mock server running on http://localhost:${PORT}`));
