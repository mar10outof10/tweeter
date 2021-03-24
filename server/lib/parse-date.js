const parseDate = date => {
  const millisecondsAgo = Date.now() - date;
  // seconds, minutes, hours, days
  if (millisecondsAgo < 60000) {
    if (Math.floor(millisecondsAgo / 1000) === 1) {
      return `1 second ago`;
    } else {
      return `${Math.floor(millisecondsAgo / 1000)} seconds ago`;
    }
  } else if (millisecondsAgo < 3600000) {
    if (Math.floor(millisecondsAgo / 60000) === 1) {
      return `1 minute ago`;
    } else {
      return `${Math.floor(millisecondsAgo / 60000)} minutes ago`;
    }
  } else if (millisecondsAgo < 86400000) {
    if (Math.floor(millisecondsAgo / 3600000) === 1) {
      return `1 hour ago`;
    } else {
      return `${Math.floor(millisecondsAgo / 3600000)} hours ago`;
    }
  } else {
    if (Math.floor(millisecondsAgo / 86400000) === 1) {
      return `Yesterday`;
    } else {
      return `${Math.floor(millisecondsAgo / 86400000)} days ago`;
    }
  }
}

module.exports = parseDate;