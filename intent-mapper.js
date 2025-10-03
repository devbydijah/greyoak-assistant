function parseNairaAmount(text) {
  const match = text.replace(/,/g, "").match(/₦?(\d+)/);
  return match ? parseInt(match[1]) : null;
}

module.exports = function intentMapper(message) {
  if (/draft proposal/i.test(message)) {
    const [, planRaw, , location] =
      message.match(/(Protection|Income)[^\d]*₦?([\d,]+)[^\w]*([\w\s,]+)/i) ||
      [];
    const amount = parseNairaAmount(message);
    return {
      intent: "proposal",
      actionRoute: "/proposals",
      match: [planRaw, amount, location?.trim()],
      status: "ready-to-dispatch",
    };
  }

  return {
    intent: "unknown",
    actionRoute: null,
    status: "unrecognized",
  };
};
