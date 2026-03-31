
/**
 * Converts a database ISO date string into a relative human-readable string.
 * Matches the design: "Just now", "5m ago", "2h ago", or "Mar 26"
 */
export const formatTimeAgo = (dateString) => {
  if (!dateString) return '';

  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  // If the date is in the future or less than 1 minute old
  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  // If it's older than a week, show the actual date (e.g., Mar 26)
  return past.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export default formatTimeAgo ;