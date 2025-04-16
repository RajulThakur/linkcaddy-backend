export const getFavicon = async (url: string): Promise<string> => {
  try {
    const urlObject = new URL(url);
    const domain = urlObject.hostname;

    // Try multiple favicon sources in order of preference
    const faviconSources = [
      // 1. Google Favicon Service
      `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,

      // 2. Direct favicon.ico path
      `${urlObject.protocol}//${domain}/favicon.ico`,

      // 3. DuckDuckGo Favicon Service
      `https://icons.duckduckgo.com/ip3/${domain}.ico`,

      // 4. Default fallback icon
      'https://www.google.com/s2/favicons?domain=default',
    ];

    // Try each source until we get a valid response
    for (const source of faviconSources) {
      try {
        const response = await fetch(source);
        if (response.ok) {
          return source;
        }
      } catch (error) {
        continue;
      }
    }

    // If all attempts fail, return the default favicon
    return faviconSources[3];
  } catch (error) {
    // Return default favicon if URL parsing fails
    return 'https://www.google.com/s2/favicons?domain=default';
  }
};
