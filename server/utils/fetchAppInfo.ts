import * as gplayModule from "google-play-scraper";

// Handle both default and named exports
const gplay = (gplayModule as any).default || gplayModule;

export async function fetchAppInfo(title: string) {
  try {
    const results = await gplay.search({ term: title, num: 1 });
    if (!results.length) return null;
    const appId = results[0].appId;
    const appDetails = await gplay.app({ appId });

    return {
      title: appDetails.title,
      description: appDetails.description || "No description available.",
      developer: appDetails.developer || "Unknown",
      installs: appDetails.installs || "N/A",
      score: appDetails.score || 0,
      genre: appDetails.genre || "Unknown",
      icon: appDetails.icon,
      url: appDetails.url,
      source: "Google Play Store"
    };
  } catch (err) {
    console.error("App metadata fetch failed:", err);
    return null;
  }
}
