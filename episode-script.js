// Current state
let currentFansub = null;
let currentSource = null;
let currentEpisodeId = null;
let currentEpisodeData = null;
let videoSources = {};
let allEpisodes = [];

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get('anime');
const episodeId = urlParams.get('episode');

// Initialize
document.addEventListener('DOMContentLoaded', async function() {
    if (!episodeId) {
        alert('❌ Bölüm ID bulunamadı!');
        window.history.back();
        return;
    }
    
    currentEpisodeId = episodeId;
    console.log('📡 Bölüm yükleniyor - Episode ID:', episodeId);
    
    await loadEpisodeData();
    await loadVideoSourcesFromDatabase();
    await loadAnimeEpisodes();
    
    initializeFansubSelection();
    initializeSourceSelection();
    initializeNavigation();
    initializeSidebar();
});

// Bölüm bilgilerini yükle
async function loadEpisodeData() {
    currentEpisodeData = await AnimeAPI.getEpisodeById(episodeId);
    
    if (currentEpisodeData) {
        console.log('✅ Bölüm bilgisi yüklendi:', currentEpisodeData);
        updatePageTitle();
    }
}

// Sayfa başlığını güncelle
function updatePageTitle() {
    if (currentEpisodeData && currentEpisodeData.seasons && currentEpisodeData.seasons.animes) {
        const anime = currentEpisodeData.seasons.animes;
        const episodeNum = currentEpisodeData.episode_number;
        document.title = `${anime.title} - Bölüm ${episodeNum} - AnimEZ`;
    }
}

// Supabase'den video kaynaklarını yükle
async function loadVideoSourcesFromDatabase() {
    console.log('📡 Video kaynakları yükleniyor...');
    
    const sources = await AnimeAPI.getEpisodeVideoSources(episodeId);
    
    if (! sources || sources.length === 0) {
        console.warn('⚠️ Bu bölüm için video kaynağı bulunamadı');
        showNoVideoMessage();
        return;
    }
    
    // Veriyi fansub bazlı organize et
    videoSources = {};
    sources.forEach(source => {
        const fansubKey = source.fansubs. name. toLowerCase(). replace(/\s+/g, ''). replace(/[^a-z0-9]/g, '');
        
        if (!videoSources[fansubKey]) {
            videoSources[fansubKey] = {
                id: source.fansubs.id,
                name: source.fansubs.name,
                credits: source.fansubs.credits,
                rating: source.fansubs.rating,
                discord_link: source.fansubs.discord_link,
                sources: {}
            };
        }
        
        videoSources[fansubKey].sources[source.source_name] = source. video_url;
    });
    
    console.log('✅ Video kaynakları yüklendi:', videoSources);
    
    // UI'ı güncelle
    renderFansubCards();
    renderSourceCards();
    
    // İlk fansub'ı otomatik seç
    const firstFansubKey = Object.keys(videoSources)[0];
    if (firstFansubKey) {
        selectFansub(firstFansubKey);
        
        // İlk kaynağı otomatik seç
        const firstSource = Object.keys(videoSources[firstFansubKey]. sources)[0];
        if (firstSource) {
            selectSource(firstSource);
        }
    }
}

// Video yoksa mesaj göster
function showNoVideoMessage() {
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer) {
        videoPlayer.parentElement.innerHTML = `
            <div style="width: 100%; aspect-ratio: 16/9; background: #1a1a1a; display: flex; align-items: center; justify-content: center; color: #666;">
                <div style="text-align: center;">
                    <h2 style="color: #999;">📹 Video kaynağı bulunamadı</h2>
                    <p>Bu bölüm için henüz video eklenmemiş.</p>
                </div>
            </div>
        `;
    }
}

// Fansub kartlarını render et
function renderFansubCards() {
    const fansubGrid = document.querySelector('.fansub-grid');
    if (!fansubGrid) return;
    
    fansubGrid.innerHTML = '';
    
    Object.entries(videoSources).forEach(([key, fansub]) => {
        const card = document.createElement('div');
        card.className = 'fansub-card';
        card.dataset.fansub = key;
        
        card.innerHTML = `
            <div class="fansub-card-icon">${fansub.icon_emoji || '🔰'}</div>
            <div class="fansub-card-info">
                <h4>${fansub.name}</h4>
                <div class="fansub-rating">
                    <span class="star">⭐</span>
                    <span class="score">${fansub.rating || '8.0'}</span>
                    <span class="max">/10</span>
                </div>
            </div>
        `;
        
        fansubGrid.appendChild(card);
    });
}

// Kaynak kartlarını render et
function renderSourceCards() {
    const sourcesGrid = document.querySelector('.sources-grid');
    if (!sourcesGrid) return;
    
    sourcesGrid.innerHTML = '';
    
    // Tüm mevcut kaynak tiplerini topla
    const allSources = new Set();
    Object.values(videoSources).forEach(fansub => {
        Object.keys(fansub.sources).forEach(source => allSources.add(source));
    });
    
    allSources.forEach(sourceName => {
        const card = document.createElement('div');
        card.className = 'source-card';
        card.dataset. source = sourceName;
        
        const displayName = sourceName.charAt(0).toUpperCase() + sourceName.slice(1);
        
        card.innerHTML = `
            <div class="source-play-icon">▶</div>
            <span>${displayName}</span>
        `;
        
        sourcesGrid.appendChild(card);
    });
}

// Anime bölümlerini yükle (sağ sidebar için)
async function loadAnimeEpisodes() {
    if (!animeId) return;
    
    const anime = await AnimeAPI.getAnimeById(animeId);
    if (!anime || !anime.seasons || anime.seasons.length === 0) return;
    
    const episodes = anime.seasons[0].episodes;
    allEpisodes = episodes;
    
    renderEpisodesList(episodes, anime);
}

// Bölüm listesini render et
function renderEpisodesList(episodes, anime) {
    const episodesList = document.getElementById('episodesList');
    if (! episodesList) return;
    
    episodesList.innerHTML = '';
    
    // Anime bilgilerini güncelle
    const animeTitle = document.getElementById('animeTitle');
    if (animeTitle) animeTitle.textContent = anime. title;
    
    const animeThumb = document.getElementById('animeThumb');
    if (animeThumb) animeThumb.src = anime.poster_url;
    
    const episodeInfo = document.getElementById('episodeInfo');
    if (episodeInfo && currentEpisodeData) {
        episodeInfo.textContent = `${anime.title} ${currentEpisodeData.episode_number}.  Bölüm`;
    }
    
    episodes.forEach(episode => {
        const episodeItem = document.createElement('div');
        episodeItem.className = 'episode-item' + (episode.id == episodeId ? ' active' : '');
        episodeItem.dataset.episodeId = episode.id;
        
        episodeItem.innerHTML = `
            <div class="episode-thumbnail">
                <img src="${episode. thumbnail_url || 'https://via.placeholder.com/120x68'}" 
                     alt="${episode.title}"
                     onerror="this.src='https://via.placeholder.com/120x68?text=Ep+${episode.episode_number}'">
            </div>
            <div class="episode-info-text">
                <span class="episode-number">${episode.episode_number}. Bölüm</span>
                <h4 class="episode-title">${episode.title}</h4>
            </div>
        `;
        
        episodeItem.addEventListener('click', () => {
            window.location.href = `episode-watch.html?anime=${animeId}&episode=${episode.id}`;
        });
        
        episodesList.appendChild(episodeItem);
    });
}

// Fansub seçimi
function selectFansub(fansubKey) {
    currentFansub = fansubKey;
    const fansub = videoSources[fansubKey];
    
    if (! fansub) return;
    
    // UI güncelle
    document.querySelectorAll('.fansub-card').forEach(c => c.classList.remove('active'));
    const card = document.querySelector(`[data-fansub="${fansubKey}"]`);
    if (card) card.classList.add('active');
    
    // Fansub bilgilerini güncelle
    const currentFansubName = document.getElementById('currentFansubName');
    if (currentFansubName) currentFansubName.textContent = fansub.name;
    
    const selectedFansubTitle = document.getElementById('selectedFansubTitle');
    if (selectedFansubTitle) selectedFansubTitle.textContent = fansub.name;
    
    const fansubCredits = document.getElementById('fansubCredits');
    if (fansubCredits) fansubCredits.textContent = fansub. credits || '';
    
    // Video yükle
    if (currentSource && fansub.sources[currentSource]) {
        loadVideo(fansubKey, currentSource);
    }
}

// Kaynak seçimi
function selectSource(sourceKey) {
    currentSource = sourceKey;
    
    document.querySelectorAll('.source-card').forEach(c => c. classList.remove('active'));
    const card = document.querySelector(`[data-source="${sourceKey}"]`);
    if (card) card.classList.add('active');
    
    if (currentFansub) {
        loadVideo(currentFansub, sourceKey);
    }
}

// Video yükle
function loadVideo(fansubKey, sourceKey) {
    const fansub = videoSources[fansubKey];
    if (fansub && fansub. sources[sourceKey]) {
        const videoPlayer = document.getElementById('videoPlayer');
        if (videoPlayer) {
            videoPlayer.src = fansub.sources[sourceKey];
            console.log('▶️ Video yüklendi:', fansub.name, '-', sourceKey);
        }
    }
}

// Event listener'ları başlat
function initializeFansubSelection() {
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.fansub-card');
        if (card) {
            selectFansub(card.dataset. fansub);
        }
    });
}

function initializeSourceSelection() {
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.source-card');
        if (card) {
            selectSource(card. dataset.source);
        }
    });
}

function initializeNavigation() {
    const prevBtn = document.getElementById('prevEpisode');
    const nextBtn = document.getElementById('nextEpisode');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const currentIndex = allEpisodes.findIndex(ep => ep.id == episodeId);
            if (currentIndex > 0) {
                const prevEpisode = allEpisodes[currentIndex - 1];
                window.location.href = `episode-watch. html?anime=${animeId}&episode=${prevEpisode.id}`;
            } else {
                alert('Bu ilk bölüm! ');
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const currentIndex = allEpisodes.findIndex(ep => ep.id == episodeId);
            if (currentIndex < allEpisodes.length - 1) {
                const nextEpisode = allEpisodes[currentIndex + 1];
                window.location.href = `episode-watch.html?anime=${animeId}&episode=${nextEpisode.id}`;
            } else {
                alert('Bu son bölüm!');
            }
        });
    }
}

function initializeSidebar() {
    const sidebar = document.querySelector('.episodes-sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    const closeBtn = document.getElementById('closeSidebar');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (sidebar) sidebar.classList.toggle('collapsed');
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (sidebar) sidebar.classList.add('collapsed');
        });
    }
}