export default function getDomain(url: string): string {
  try {
    // Create URL object to parse the input
    const urlObject = new URL(url);

    // Get hostname (e.g., "www.example.com")
    const hostname = urlObject.hostname;

    // Split hostname into parts and get the main domain
    const hostParts = hostname.split('.');

    if (hostParts.length >= 2) {
      // Handle cases like "example.com" or "subdomain.example.com"
      // Return the last two parts (e.g., "example.com")
      return hostParts.slice(-2).join('.');
    }

    return hostname;
  } catch (error) {
    // Return empty string or throw error if URL is invalid
    return '';
  }
}
