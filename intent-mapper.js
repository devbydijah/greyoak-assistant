function detectIntent(message) {
  if (!message) return null;

  const protectionMatch = message.match(
    /Protection\s+₦?(\d{1,3}(,\d{3})*|\d+)[^\w]*(.*)/i
  );
  if (message.toLowerCase().includes("draft proposal") && protectionMatch) {
    const amount = parseInt(protectionMatch[1].replace(/,/g, ""), 10);
    const rest = protectionMatch[3];
    return {
      intent: "proposal",
      action: "/proposals",
      match: ["Draft", "Protection", amount, rest],
    };
  }

  return null;
}

module.exports = { detectIntent };
