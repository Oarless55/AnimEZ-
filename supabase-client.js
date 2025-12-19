// ⚠️ BU BİLGİLERİ KENDİ SUPABASE BİLGİLERİNİZLE DEĞİŞTİRİN
// Project Settings → API'den alın
const SUPABASE_URL = "https://keeundopxvrmnapbjlmo.supabase.co"; // BURAYA KENDİ URL'NİZİ YAPIŞTIRIN
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlZXVuZG9weHZybW5hcGJqbG1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MTc2ODMsImV4cCI6MjA4MDQ5MzY4M30.EWDJW7lCwIcrJKmoFZYMQC6EJ9fsXqG1onUhcEjMOEg'; // BURAYA KENDİ KEY'İNİZİ YAPIŞTIRIN

// Supabase client'ı başlat
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabaseClient = supabaseClient;

// API Helper Functions
const AnimeAPI = {
    // Tüm animeleri getir
    async getAllAnimes() {
        const { data, error } = await supabaseClient
            .from('animes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching animes:', error);
            return [];
        }
        return data;
    },

    // Tek bir anime getir (detaylı - sezonlar ve bölümlerle)
    async getAnimeById(animeId) {
        const { data: anime, error: animeError } = await supabaseClient
            .from('animes')
            .select(`
    *,
    anime_tags(
        tags(name)
    )
        `)
            .eq('id', animeId)
            .single();

        if (animeError) {
            console.error('Error fetching anime:', animeError);
            return null;
        }

        // Sezonları ve bölümleri getir
        const { data: seasons, error: seasonsError } = await supabaseClient
            .from('seasons')
            .select(`
    *,
    episodes(
        id,
        episode_number,
        title,
        description,
        thumbnail_url,
        release_date
    )
        `)
            .eq('anime_id', animeId)
            .order('season_number', { ascending: true });

        if (!seasonsError && seasons) {
            // Her sezondaki bölümleri sırala
            seasons.forEach(season => {
                if (season.episodes) {
                    season.episodes.sort((a, b) => a.episode_number - b.episode_number);
                }
            });
            anime.seasons = seasons;
        }

        return anime;
    },

    // Bölüm video kaynaklarını getir
    async getEpisodeVideoSources(episodeId) {
        const { data, error } = await supabaseClient
            .from('video_sources')
            .select(`
    *,
    fansubs(
        id,
        name,
        credits,
        discord_link,
        icon_emoji,
        rating
    )
        `)
            .eq('episode_id', episodeId);

        if (error) {
            console.error('Error fetching video sources:', error);
            return [];
        }

        return data;
    },

    // Anime ara
    async searchAnimes(query) {
        const { data, error } = await supabaseClient
            .from('animes')
            .select('*')
            .or(`title.ilike.%${query}%, original_title.ilike.%${query}%`)
            .limit(10);

        if (error) {
            console.error('Error searching animes:', error);
            return [];
        }
        return data;
    },

    // Belirli bir bölümü ID ile getir
    async getEpisodeById(episodeId) {
        const { data, error } = await supabaseClient
            .from('episodes')
            .select(`
    *,
    seasons(
        id,
        season_number,
        anime_id,
        animes(
            id,
            title,
            poster_url
        )
    )
        `)
            .eq('id', episodeId)
            .single();

        if (error) {
            console.error('Error fetching episode:', error);
            return null;
        }
        return data;
    },

    // Bir sezondaki tüm bölümleri getir
    async getEpisodesBySeasonId(seasonId) {
        const { data, error } = await supabaseClient
            .from('episodes')
            .select('*')
            .eq('season_id', seasonId)
            .order('episode_number', { ascending: true });

        if (error) {
            console.error('Error fetching episodes:', error);
            return [];
        }
        return data; // Otomatik sıralı
    },

    // Bölümün video kaynaklarını getir (Fansub ile birlikte)
    async getVideoSourcesByEpisodeId(episodeId) {
        // fansubs tablosu ile ilişkiyi explicit olarak belirtiyoruz: fansub_id
        const { data, error } = await supabaseClient
            .from('video_sources')
            .select('*, fansubs:fansub_id(id, name, slug, rating)')
            .eq('episode_id', episodeId)
            .order('id', { ascending: true });

        if (error) {
            console.error('Error fetching video sources:', error);
            return [];
        }
        return data;
    }
};


console.log('✅ Supabase Client başarıyla yüklendi!');
