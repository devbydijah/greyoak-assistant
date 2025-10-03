// Regex-based intent mapper for Grey-Oak Assistant
function detectIntent(message) {
  const patterns = [
    {
      intent: 'proposal',
      regex: /(draft|prepare).+proposal.+(Protection|Income).+₦?(\d{1,3}(?:,\d{3})*)(?:,?)(?:\s+)?[,\s]+(.+)/i,
      action: '/proposals'
    },
    {
      intent: 'inspection',
      regex: /(create|generate).+inspection.+(brief)?.+\b(at|on|for)\b.+/i,
      action: '/inspections/packs'
    },
    {
      intent: 'report',
      regex: /(monthly|owner).+report.+\b(for|on)\b.+\d{4}-\d{2}/i,
      action: '/reports/owner'
    },
    {
      intent: 'approval',
      regex: /(approval|request).+cap.+₦?(\d{1,3}(?:,\d{3})*)/i,
      action: '/approvals'
    },
    {
      intent: 'workorder',
      regex: /(dispatch|create).+work.?order.+(approval|vendor)/i,
      action: '/workorders'
    },
    {
      intent: 'calendar',
      regex: /(block|schedule).+(deep work|focus|meeting)/i,
      action: '/calendar/blocks'
    },
    {
      intent: 'crmLead',
      regex: /(new lead|create lead|log lead)/i,
      action: '/crm/leads'
    },
    {
      intent: 'crmStage',
      regex: /(update).+(lead|crm).+(stage|status)/i,
      action: '/crm/stages'
    },
    {
      intent: 'upload',
      regex: /(upload|send).+(photo|file)/i,
      action: '/files/upload-url'
    },
    {
      intent: 'vendors',
      regex: /(list|show|get).+vendors?.*(plumbing|electrical|cleaning|repair)?/i,
      action: '/vendors'
    }
  ];

  for (const p of patterns) {
    const match = message.match(p.regex);
    if (match) {
      return {
        intent: p.intent,
        action: p.action,
        match
      };
    }
  }

  return null;
}

module.exports = { detectIntent };
