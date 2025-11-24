export async function fetchIOSAppInfo(title: string) {
  const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(title)}&entity=software`);
  const data = await res.json();
  if (!data.results?.length) return null;
  const app = data.results[0];
  return {
    title: app.trackName,
    description: app.description,
    developer: app.sellerName,
    genre: app.primaryGenreName,
    score: app.averageUserRating || "N/A",
    icon: app.artworkUrl512 || app.artworkUrl100 || null, // iOS app icon
    installs: null, // iOS doesn't provide download count
    url: app.trackViewUrl,
    source: "Apple App Store"
  };
}
