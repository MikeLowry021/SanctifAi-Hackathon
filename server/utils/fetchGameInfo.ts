// RAWG.io API key required → https://rawg.io/apidocs
const RAWG_KEY = process.env.RAWG_API_KEY;

export async function fetchGameInfo(title: string) {
  if (!RAWG_KEY) {
    console.warn("⚠️ RAWG_API_KEY not configured - skipping game metadata fetch");
    return null;
  }

  try {
    // First, search for the game to get the ID
    const searchRes = await fetch(`https://api.rawg.io/api/games?key=${RAWG_KEY}&search=${encodeURIComponent(title)}`);
    
    if (!searchRes.ok) {
      console.error(`RAWG API error: ${searchRes.status} ${searchRes.statusText}`);
      return null;
    }
    
    const searchData = await searchRes.json() as any;
    
    if (!searchData.results?.length) {
      console.log(`No RAWG results found for: ${title}`);
      return null;
    }
    
    const gameId = searchData.results[0].id;
    
    // Fetch detailed game data to get full description
    const detailRes = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${RAWG_KEY}`);
    
    if (!detailRes.ok) {
      console.error(`RAWG detail API error: ${detailRes.status} ${detailRes.statusText}`);
      return null;
    }
    
    const game = await detailRes.json() as any;

    return {
      title: game.name,
      description: game.description_raw || null, // Return null if no description (don't use fallback)
      genre: game.genres?.map((g: any) => g.name).join(", ") || null,
      rating: game.rating || null,
      releaseDate: game.released || null,
      imageUrl: game.background_image || null,
      source: "RAWG"
    };
  } catch (error) {
    console.error("Error fetching RAWG game info:", error);
    return null;
  }
}
