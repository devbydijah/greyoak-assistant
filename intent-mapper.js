// intent-mapper.js
module.exports = function mapIntent(message) {
  const normalized = message.toLowerCase();

  // Proposal
  if (normalized.includes("proposal") && normalized.includes("₦100,000")) {
    const match = message.match(/Protection|Income/i);
    const plan = match ? match[0] : "Protection";
    const locationMatch = message.match(/₦[0-9,]+, (.*)/);
    return {
      intent: "proposal",
      actionRoute: "/proposals",
      match: [plan, 100000, locationMatch?.[1]],
      status: "ready-to-dispatch",
    };
  }

  // Approval Request
  if (
    normalized.includes("approval request") &&
    normalized.includes("cap ₦100,000")
  ) {
    const issue = message.match(/approval request — (.*),/i)?.[1];
    const vendor = message.match(/, (Vendor \w),/i)?.[1];
    const eta = message.match(/, (\d{2}:\d{2}–\d{2}:\d{2})/i)?.[1];
    return {
      intent: "approval",
      actionRoute: "/approvals",
      match: [issue, vendor, eta, 100000],
      status: "ready-to-dispatch",
    };
  }

  // Inspection Pack
  if (normalized.includes("inspection pack")) {
    const location = message.match(/— (.*),/i)?.[1];
    const time = message.match(/, (.*)$/)?.[1];
    return {
      intent: "inspection-pack",
      actionRoute: "/inspections/packs",
      match: [location, time],
      status: "ready-to-dispatch",
    };
  }

  // Owner Report
  if (normalized.includes("owner report") && normalized.includes("—")) {
    const match = message.split("—").map((s) => s.trim());
    return {
      intent: "owner-report",
      actionRoute: "/reports/owner",
      match,
      status: "ready-to-dispatch",
    };
  }

  // Work Order
  if (
    normalized.includes("work order for") ||
    normalized.includes("dispatch vendor")
  ) {
    const approvalId = message.match(/for (\w+)/i)?.[1];
    return {
      intent: "workorder",
      actionRoute: "/workorders",
      match: [approvalId],
      status: "ready-to-dispatch",
    };
  }

  // Calendar Block
  if (normalized.includes("block deep work") || normalized.includes("block")) {
    const timeMatch = message.match(
      /block deep work (\d{2}:\d{2})–(\d{2}:\d{2}) — ['"]?(.*)['"]?/i
    );
    if (timeMatch) {
      const [, start, end, title] = timeMatch;
      return {
        intent: "calendar-block",
        actionRoute: "/calendar/blocks",
        match: [start, end, title],
        status: "ready-to-dispatch",
      };
    }
  }

  // CRM Lead
  if (normalized.includes("new lead")) {
    return {
      intent: "crm-lead",
      actionRoute: "/crm/leads",
      match: [],
      status: "ready-to-dispatch",
    };
  }

  // CRM Stage Update
  if (normalized.includes("stage") && normalized.includes("lead")) {
    return {
      intent: "crm-stage",
      actionRoute: "/crm/stages",
      match: [],
      status: "ready-to-dispatch",
    };
  }

  // File Upload
  if (
    normalized.includes("upload folder") ||
    normalized.includes("upload url")
  ) {
    return {
      intent: "file-upload",
      actionRoute: "/files/upload-url",
      match: [],
      status: "ready-to-dispatch",
    };
  }

  // Vendor List
  if (
    normalized.includes("list vendors") ||
    normalized.includes("vendor list")
  ) {
    return {
      intent: "vendor-list",
      actionRoute: "/vendors",
      match: [],
      status: "ready-to-dispatch",
    };
  }

  // Default
  return {
    intent: "unknown",
    actionRoute: null,
    status: "no-match",
  };
};
