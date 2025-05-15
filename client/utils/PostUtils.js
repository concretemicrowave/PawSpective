const getTimeUntilExpiration = (expirationDate) => {
  if (expirationDate === "1435-01-01")
    return { text: "No Expiry Date", color: "safe" };

  const now = new Date();
  const expiry = new Date(expirationDate);
  const diffInMs = expiry - now;

  if (diffInMs <= 0) return { text: "Expired", color: "attention" };

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 2)
    return { text: `${diffInDays} day(s)`, color: "attention" };
  if (diffInDays < 7) return { text: `${diffInDays} day(s)`, color: "warning" };
  if (diffInDays < 30)
    return {
      text: `${Math.floor(diffInDays / 7)} week(s)`,
      color: "safe",
    };
  if (diffInDays < 365)
    return {
      text: `${Math.floor(diffInDays / 30)} month(s)`,
      color: "safe",
    };

  return {
    text: `${Math.floor(diffInDays / 365)} year(s)`,
    color: "safe",
  };
};

export { getTimeUntilExpiration };
