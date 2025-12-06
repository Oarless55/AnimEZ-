// ===== SUPABASE ENTEGRASYONU =====
// Varsayılan anime detay veritabanı (Fallback için)
const animeDetails = {
    1: {
        title: "SPY×FAMILY",
        originalTitle: "スパイファミリー",
        year: 2022,
        genres: "Comedy / Action / Slice of Life",
        rating: 8.7,
        duration: "24 dakika",
        episodes: 12,
        date: "9/4/2022",
        studio: "Wit Studio & CloverWorks",
        description: "Batı ve Doğu arasında soğuk savaş devam ederken, usta casus Twilight kod adlı ajan Loid Forger, barışı tehdit eden bir komploya karşı Operasyon Strix görevini üstlenir.",
        tags: ["Comedy", "Action", "Spy", "Family", "Shounen", "Supernatural"],
        poster: "https://picsum.photos/seed/spy-family-poster/300/420",
        background: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=1080&fit=crop",
        seasons: [{
            season: 1,
            episodes: [
                { number: 1, title: "Operasyon Strix", description: "Twilight, barışı korumak için sahte bir aile kurmak zorundadır.", date: "9/4/2022", thumbnail: "https://picsum.photos/seed/spy-ep1/400/225" },
                { number: 2, title: "Eşini Bul", description: "Loid'un görevini tamamlamak için bir eş bulması gerekir.", date: "16/4/2022", thumbnail: "https://picsum.photos/seed/spy-ep2/400/225" },
                { number: 3, title: "Hedef Okul", description: "Anya'nın Eden Akademisi'ne kabul edilmesi için mülakat sınavından geçmesi gerekir.", date: "23/4/2022", thumbnail: "https://picsum.photos/seed/spy-ep3/400/225" }
            ]
        }]
    }
};

const defaultAnimeDetail = {
    genres: "Action / Adventure / Fantasy",
    rating: 8.0,
    duration: "24 dakika",
    episodes: 24,
    date: "1/1/2023",
    studio: "Animation Studio",
    description: "Bu anime hakkında detaylı bilgi hazırlanıyor.",
    tags: ["Action", "Adventure", "Fantasy", "Anime"],
    seasons: [{
        season: 1,
        episodes: [
            { number: 1, title: "Yeni Başlangıç", description: "Hikayenin başlangıcı.", date: "1/1/2023", thumbnail: "https://picsum.photos/seed/default-ep1/400/225" }
        ]
    }]
};

const animeTitleMap = {
    1: "SPY×FAMILY", 2: "Demon Slayer", 3: "Jujutsu Kaisen", 4: "My Hero Academia",
    5: "One Piece", 6: "Attack on Titan", 7: "Chainsaw Man", 8: "Bleach",
    9: "Tokyo Revengers", 10: "Naruto Shippuden", 11: "Dragon Ball Super",
    12: "Black Clover", 13: "Re:Zero", 14: "Overlord", 15: "Sword Art Online",
    16: "The Eminence in Shadow", 17: "Mushoku Tensei", 18: "That Time I Got Reincarnated as a Slime",
    19: "Konosuba", 20: "No Game No Life", 21: "Log Horizon", 22: "The Rising of the Shield Hero",
    23: "Your Name", 24: "Kaguya-sama: Love Is War", 25: "Horimiya", 26: "Toradora! ",
    27: "My Dress-Up Darling", 28: "Fruits Basket", 29: "Clannad", 30: "Rent-a-Girlfriend",
    31: "Tokyo Ghoul", 32: "Another", 33: "Parasyte", 34: "Higurashi When They Cry",
    35: "Corpse Party", 36: "Elfen Lied", 37: "Death Note", 38: "Fullmetal Alchemist",
    39: "Hunter x Hunter", 40: "Fairy Tail", 41: "Steins;Gate", 42: "Code Geass",
    43: "Mob Psycho 100", 44: "Vinland Saga", 45: "Blue Lock", 46: "Boruto", 47: "Frieren"
};

function getAnimeIdFromURL() {
    const params = new URLSearchParams(window. location.search);
    return params.get('id');
}

document.addEventListener('DOMContentLoaded', async function() {
    const animeId = getAnimeIdFromURL();
    
    if (! animeId) {
        console.error('❌ Anime ID bulunamadı! ');
        alert('Anime ID bulunamadı! ');
        window.location.href = 'index.html';
        return;
    }

    console.log('📡 Anime detayı yükleniyor - ID:', animeId);
    await loadAnimeDetails(animeId);
    initializeEventListeners();
});

async function loadAnimeDetails(animeId) {
    let anime = null;
    let useSupabase = true;

    try {
        console.log('📡 Supabase\'den anime bilgisi çekiliyor...');
        anime = await AnimeAPI.getAnimeById(animeId);
        
        if (anime) {
            console.log('✅ Supabase\'den anime yüklendi:', anime.title);
            anime = convertSupabaseToLocalFormat(anime);
        } else {
            throw new Error('Supabase\'de anime bulunamadı');
        }
    } catch (error) {
        console.warn('⚠️ Supabase bağlantısı başarısız, yerel veriye geçiliyor:', error);
        useSupabase = false;
        
        anime = animeDetails[animeId];
        
        if (!anime) {
            const animeTitle = animeTitleMap[animeId] || "Anime";
            anime = {
                ... defaultAnimeDetail,
                title: animeTitle,
                originalTitle: animeTitle,
                year: 2023,
                poster: `https://picsum.photos/seed/anime${animeId}/300/420`,
                background: `https://picsum.photos/seed/bg${animeId}/1920/1080`
            };
            console.log('⚠️ Varsayılan şablon kullanılıyor:', animeTitle);
        } else {
            console.log('✅ Yerel veritabanından anime yüklendi:', anime. title);
        }
    }
    
    displayAnimeDetails(anime, useSupabase);
}

function convertSupabaseToLocalFormat(supabaseAnime) {
    const anime = {
        title: supabaseAnime.title,
        originalTitle: supabaseAnime.original_title || supabaseAnime.title,
        year: supabaseAnime.year,
        genres: supabaseAnime.genres,
        rating: supabaseAnime.rating,
        duration: supabaseAnime.duration,
        episodes: supabaseAnime.total_episodes,
        date: supabaseAnime.release_date,
        studio: supabaseAnime.studio,
        description: supabaseAnime.description,
        poster: supabaseAnime.poster_url,
        background: supabaseAnime.background_url || supabaseAnime.poster_url,
        tags: [],
        seasons: []
    };

    if (supabaseAnime.anime_tags && supabaseAnime.anime_tags.length > 0) {
        anime.tags = supabaseAnime.anime_tags. map(at => at.tags.name);
    }

    if (supabaseAnime.seasons && supabaseAnime.seasons. length > 0) {
        anime.seasons = supabaseAnime.seasons.map(season => ({
            season: season. season_number,
            episodes: season. episodes.map(ep => ({
                id: ep.id,
                number: ep.episode_number,
                title: ep.title,
                description: ep.description,
                date: ep.release_date,
                thumbnail: ep.thumbnail_url
            }))
        }));
    }

    return anime;
}

function displayAnimeDetails(anime, isFromSupabase = false) {
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) pageTitle.textContent = `${anime.title} - AnimEZ`;
    
    const heroBackground = document.getElementById('heroBackground');
    if (heroBackground && anime.background) {
        heroBackground.style.backgroundImage = `url('${anime.background}')`;
    }
    
    const animePoster = document.getElementById('animePoster');
    if (animePoster) {
        animePoster.src = anime.poster || 'https://via.placeholder.com/300x420';
        animePoster.alt = anime. title;
        animePoster.onerror = function() {
            this.src = 'https://via.placeholder.com/300x420? text=No+Image';
        };
    }
    
    const animeTitle = document.getElementById('animeTitle');
    if (animeTitle) {
        animeTitle.textContent = `${anime.title}${anime.year ? ` (${anime.year})` : ''}`;
    }
    
    const animeGenres = document.getElementById('animeGenres');
    if (animeGenres) animeGenres.textContent = anime.genres || 'N/A';
    
    const animeRating = document.getElementById('animeRating');
    if (animeRating) animeRating.textContent = anime.rating || 'N/A';
    
    const animeDuration = document.getElementById('animeDuration');
    if (animeDuration) animeDuration.textContent = anime.duration || '24 dakika';
    
    const animeEpisodes = document.getElementById('animeEpisodes');
    if (animeEpisodes) animeEpisodes.textContent = `${anime.episodes || '? '} bölüm`;
    
    const animeDate = document.getElementById('animeDate');
    if (animeDate) animeDate.textContent = anime.date || 'N/A';
    
    const animeDescription = document.getElementById('animeDescription');
    if (animeDescription) {
        let description = anime.description || 'Açıklama henüz eklenmemiş. ';
        if (anime.studio) description += `\n\nStüdyo: ${anime.studio}`;
        animeDescription.textContent = description;
    }
    
    if (anime.tags && anime.tags.length > 0) {
        loadTags(anime.tags);
    } else {
        loadTags(['Anime']);
    }
    
    if (anime.seasons && anime.seasons.length > 0) {
        loadEpisodes(anime.seasons[0], isFromSupabase);
    } else {
        const episodesList = document.getElementById('episodesList');
        if (episodesList) {
            episodesList.innerHTML = '<p style="color: #999; padding: 20px;">Henüz bölüm eklenmemiş.</p>';
        }
    }
    
    console.log('✅ Anime detayı ekrana yerleştirildi:', anime.title);
}

function loadTags(tags) {
    const tagsContainer = document.getElementById('animeTags');
    if (! tagsContainer) return;
    
    tagsContainer.innerHTML = '';
    
    const tagsToShow = tags.slice(0, 6);
    tagsToShow.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
}

function loadEpisodes(season, isFromSupabase) {
    const episodesList = document.getElementById('episodesList');
    if (! episodesList) return;
    
    episodesList.innerHTML = '';
    
    if (! season. episodes || season.episodes.length === 0) {
        episodesList.innerHTML = '<p style="color: #999; padding: 20px;">Henüz bölüm eklenmemiş.</p>';
        return;
    }
    
    season. episodes.forEach(episode => {
        const episodeItem = createEpisodeItem(episode, season. season, isFromSupabase);
        episodesList.appendChild(episodeItem);
    });
}

function createEpisodeItem(episode, seasonNumber, isFromSupabase) {
    const item = document.createElement('div');
    item.className = 'episode-item';
    
    if (isFromSupabase && episode.id) {
        item.dataset.episodeId = episode.id;
    } else {
        item.dataset.episodeNumber = episode.number;
    }
    
    item.innerHTML = `
        <div class="episode-thumbnail">
            <img src="${episode.thumbnail || 'https://via.placeholder.com/400x225'}" 
                 alt="${episode.title}"
                 onerror="this.src='https://via.placeholder.com/400x225?text=Episode+${episode.number}'">
            <div class="episode-number-badge">S ${String(seasonNumber).padStart(2, '0')} B ${String(episode.number).padStart(2, '0')}</div>
        </div>
        <div class="episode-info">
            <div class="episode-title-row">
                <h3 class="episode-title">${episode. title}</h3>
                <div>
                    <span class="episode-number">${episode.number}.  Bölüm</span>
                    <span class="episode-date">${episode. date || ''}</span>
                </div>
            </div>
            <p class="episode-description">${episode.description || ''}</p>
        </div>
    `;
    
    item.addEventListener('click', () => {
        playEpisode(episode, seasonNumber, isFromSupabase);
    });
    
    return item;
}

function initializeEventListeners() {
    const playTrailer = document.getElementById('playTrailer');
    if (playTrailer) {
        playTrailer.addEventListener('click', () => {
            alert('🎬 Fragman oynatılıyor.. .');
        });
    }
    
    const watchNowBtn = document.getElementById('watchNowBtn');
    if (watchNowBtn) {
        watchNowBtn.addEventListener('click', () => {
            const firstEpisode = document.querySelector('. episode-item');
            if (firstEpisode) firstEpisode.click();
        });
    }
    
    const showMoreTags = document.getElementById('showMoreTags');
    if (showMoreTags) {
        showMoreTags.addEventListener('click', () => {
            alert('📌 Tüm etiketler gösterilecek...');
        });
    }
    
    const seasonSelect = document.getElementById('seasonSelect');
    if (seasonSelect) {
        seasonSelect.addEventListener('change', (e) => {
            console.log('🔄 Sezon değiştirildi:', e.target.value);
        });
    }
    
    // ✅ FAVORİ VE BOOKMARK BUTONLARI
    const favoriteBtn = document.querySelector('.favorite-btn');
    const bookmarkBtn = document.querySelector('. bookmark-btn');
    
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const svg = this.querySelector('svg');
            if (this. classList.contains('active')) {
                svg.setAttribute('fill', 'currentColor');
                console. log('❤️ Favorilere eklendi');
            } else {
                svg.setAttribute('fill', 'none');
                console.log('💔 Favorilerden çıkarıldı');
            }
        });
    }
    
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', function() {
            this. classList.toggle('active');
            const svg = this.querySelector('svg');
            if (this.classList.contains('active')) {
                svg.setAttribute('fill', 'currentColor');
                console.log('🔖 İzleme listesine eklendi');
            } else {
                svg.setAttribute('fill', 'none');
                console.log('📑 İzleme listesinden çıkarıldı');
            }
        });
    }
}

// ✅ BÖLÜM OYNAT
function playEpisode(episode, season, isFromSupabase) {
    const animeId = getAnimeIdFromURL();
    console.log(`▶️ Oynatılıyor: S${season}E${episode. number} - ${episode.title}`);
    
    if (isFromSupabase && episode.id) {
        window.location.href = `episode-watch.html?anime=${animeId}&episode=${episode.id}`;
    } else {
        window.location.href = `episode-watch.html?anime=${animeId}&episode=${episode. number}&season=${season}`;
    }
}

// ✅ EPISODE CARD TIKLAMA (Opsiyonel - farklı card yapısı varsa)
document.addEventListener('click', function(e) {
    if (e. target.closest('.episode-card')) {
        const episodeCard = e.target.closest('.episode-card');
        const episodeNumber = episodeCard.dataset.episode;
        const animeId = new URLSearchParams(window.location.search).get('id');
        
        if (animeId && episodeNumber) {
            window.location.href = `episode-watch.html?anime=${animeId}&episode=${episodeNumber}`;
        }
    }
});

}

