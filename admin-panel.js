// Tab Switching
function switchTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList. add('active');
}

// ===== SUPABASE BAĞLANTI KONTROLÜ =====
async function checkSupabaseConnection() {
    console.log('🔍 Supabase bağlantısı kontrol ediliyor...');
    
    // 1. Supabase client var mı?
    if (typeof supabase === 'undefined') {
        console.error('❌ Supabase client yüklenmemiş! ');
        alert('HATA: Supabase bağlantısı kurulamadı!\n\nsupabase-client. js dosyasını kontrol edin.');
        return false;
    }
    
    // 2. Test bağlantısı
    try {
        const { data, error } = await supabase
            .from('animes')
            .select('count')
            .limit(1);
        
        if (error) throw error;
        
        console. log('✅ Supabase bağlantısı başarılı!');
        console.log('✅ Admin panel hazır! ');
        return true;
        
    } catch (error) {
        console.error('❌ Veritabanı bağlantı hatası:', error);
        alert(`HATA: Supabase veritabanına bağlanılamadı!\n\n${error.message}`);
        return false;
    }
}

// Sayfa yüklendiğinde kontrol et
window.addEventListener('DOMContentLoaded', async () => {
    await checkSupabaseConnection();
});

// ===== ANIME EKLEME =====
document.getElementById('addAnimeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const resultDiv = document.getElementById('animeResult');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<div class="result-item">⏳ Anime ekleniyor...</div>';
    
    const animeData = {
        title: document. getElementById('animeTitle').value,
        original_title: document.getElementById('animeOriginalTitle').value || null,
        year: parseInt(document.getElementById('animeYear').value),
        rating: parseFloat(document.getElementById('animeRating').value) || null,
        genres: document.getElementById('animeGenres').value,
        studio: document.getElementById('animeStudio').value || null,
        duration: document.getElementById('animeDuration').value || '24 dakika',
        total_episodes: parseInt(document.getElementById('animeTotalEpisodes').value) || null,
        description: document.getElementById('animeDescription').value || null,
        poster_url: document.getElementById('animePoster').value || null,
        background_url: document.getElementById('animeBackground').value || null,
        release_date: new Date(). toLocaleDateString('tr-TR')
    };
    
    try {
        const { data, error } = await supabase
            .from('animes')
            .insert([animeData])
            .select();
        
        if (error) throw error;
        
        resultDiv.innerHTML = `
            <div class="result-item success">✅ Anime başarıyla eklendi!</div>
            <div class="result-item success">📝 Anime ID: ${data[0].id}</div>
            <div class="result-item success">🎬 ${data[0].title}</div>
        `;
        
        // Formu temizle
        document.getElementById('addAnimeForm').reset();
        
        // Sezon ekle önerisi
        if (confirm('Anime eklendi! Şimdi sezon eklemek ister misiniz?')) {
            await addSeasonForAnime(data[0].id);
        }
        
    } catch (error) {
        console.error('Anime ekleme hatası:', error);
        resultDiv.innerHTML = `<div class="result-item error">❌ Hata: ${error.message}</div>`;
    }
});

// Sezon ekleme yardımcı fonksiyonu
async function addSeasonForAnime(animeId) {
    const seasonNumber = parseInt(prompt('Kaç sezon eklemek istersiniz?', '1'));
    
    if (! seasonNumber || seasonNumber < 1) {
        alert('Geçersiz sezon sayısı! ');
        return;
    }
    
    try {
        const seasons = [];
        for (let i = 1; i <= seasonNumber; i++) {
            seasons.push({ anime_id: animeId, season_number: i });
        }
        
        const { data, error } = await supabase
            .from('seasons')
            .insert(seasons)
            . select();
        
        if (error) throw error;
        
        alert(`✅ ${seasonNumber} sezon başarıyla eklendi!\n\nSezon ID'leri:\n${data.map(s => `Sezon ${s.season_number}: ID ${s.id}`).join('\n')}`);
        
    } catch (error) {
        console.error('Sezon ekleme hatası:', error);
        alert(`❌ Sezon ekleme hatası: ${error. message}`);
    }
}

// ===== BÖLÜM EKLEME =====
document.getElementById('addEpisodeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const resultDiv = document.getElementById('episodeResult');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<div class="result-item">⏳ Bölüm ekleniyor...</div>';
    
    const episodeData = {
        season_id: parseInt(document.getElementById('seasonId').value),
        episode_number: parseInt(document.getElementById('episodeNumber').value),
        title: document.getElementById('episodeTitle').value,
        description: document.getElementById('episodeDescription'). value || null,
        thumbnail_url: document.getElementById('episodeThumbnail').value || null,
        release_date: document.getElementById('episodeDate').value || null
    };
    
    console.log('📤 Bölüm verisi gönderiliyor:', episodeData);
    
    try {
        const { data, error } = await supabase
            .from('episodes')
            .insert([episodeData])
            .select();
        
        if (error) {
            console.error('Supabase hatası:', error);
            throw error;
        }
        
        console.log('✅ Bölüm eklendi:', data);
        
        resultDiv.innerHTML = `
            <div class="result-item success">✅ Bölüm başarıyla eklendi! </div>
            <div class="result-item success">📝 Episode ID: ${data[0].id}</div>
            <div class="result-item success">📺 ${data[0].title}</div>
        `;
        
        // Formu temizle
        document. getElementById('addEpisodeForm'). reset();
        
    } catch (error) {
        console.error('Bölüm ekleme hatası:', error);
        resultDiv.innerHTML = `
            <div class="result-item error">❌ Hata: ${error.message}</div>
            <div class="result-item error">💡 İpucu: Season ID'yi kontrol edin</div>
        `;
    }
});

// ===== VİDEO KAYNAĞI EKLEME =====
document.getElementById('addVideoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const resultDiv = document.getElementById('videoResult');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<div class="result-item">⏳ Video kaynakları ekleniyor...</div>';
    
    const episodeId = parseInt(document.getElementById('videoEpisodeId').value);
    const fansubId = parseInt(document.getElementById('videoFansubId').value);
    const linksText = document.getElementById('videoLinks'). value;
    const quality = document.getElementById('videoQuality').value;
    
    const links = linksText.split('\n').filter(l => l.trim());
    
    if (links. length === 0) {
        resultDiv.innerHTML = '<div class="result-item error">❌ En az bir video linki girin!</div>';
        return;
    }
    
    console.log(`📤 ${links.length} video kaynağı ekleniyor...`);
    
    // Kaynak ismi eşleştirme
    const sourceMap = {
        'drive. google.com': 'gdrive',
        'ok.ru': 'okru',
        'dai.ly': 'dailymotion',
        'dailymotion.com': 'dailymotion',
        'short.ink': 'shortink',
        'dsvplay.com': 'dsvplay',
        'hdvid.tv': 'hdvid',
        'luluvid.com': 'luluvid',
        'vidmoly.me': 'vidmoly',
        'voe.sx': 'voe',
        'mp4upload.com': 'mp4upload',
        'youtube.com': 'youtube',
        'youtu.be': 'youtube',
        'vimeo. com': 'vimeo',
        'streamtape.com': 'streamtape',
        'fembed.com': 'fembed',
        'animtube.online': 'animtube'
    };
    
    let successCount = 0;
    let errorCount = 0;
    resultDiv.innerHTML = '';
    
    for (const url of links) {
        let sourceName = 'other';
        
        // Kaynak adını otomatik tespit et
        for (const [domain, name] of Object.entries(sourceMap)) {
            if (url.includes(domain)) {
                sourceName = name;
                break;
            }
        }
        
        const videoData = {
            episode_id: episodeId,
            fansub_id: fansubId,
            source_name: sourceName,
            video_url: url. trim(),
            quality: quality
        };
        
        console.log('📤 Video kaynağı:', videoData);
        
        try {
            const { data, error } = await supabase
                .from('video_sources')
                .insert([videoData])
                .select();
            
            if (error) {
                console.error('Video ekleme hatası:', error);
                throw error;
            }
            
            console.log('✅ Video eklendi:', data);
            resultDiv.innerHTML += `<div class="result-item success">✅ ${sourceName} - Eklendi</div>`;
            successCount++;
            
        } catch (error) {
            console.error(`❌ ${sourceName} hatası:`, error);
            resultDiv.innerHTML += `<div class="result-item error">❌ ${sourceName} - Hata: ${error.message}</div>`;
            errorCount++;
        }
        
        // Kısa bekleme (rate limiting)
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    resultDiv.innerHTML += `<div class="result-item success" style="margin-top:10px; font-weight:bold;">
        📊 Toplam: ${successCount} başarılı, ${errorCount} hata
    </div>`;
    
    if (successCount > 0) {
        document.getElementById('addVideoForm').reset();
    }
});

// ===== FANSUB EKLEME =====
document.getElementById('addFansubForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const resultDiv = document.getElementById('fansubResult');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<div class="result-item">⏳ Fansub ekleniyor... </div>';
    
    const fansubData = {
        name: document.getElementById('fansubName').value,
        credits: document.getElementById('fansubCredits').value || null,
        discord_link: document.getElementById('fansubDiscord').value || null,
        rating: parseFloat(document.getElementById('fansubRating').value) || 8.0
    };
    
    console. log('📤 Fansub verisi:', fansubData);
    
    try {
        const { data, error } = await supabase
            .from('fansubs')
            .insert([fansubData])
            .select();
        
        if (error) {
            console.error('Supabase hatası:', error);
            throw error;
        }
        
        console.log('✅ Fansub eklendi:', data);
        
        resultDiv.innerHTML = `
            <div class="result-item success">✅ Fansub başarıyla eklendi! </div>
            <div class="result-item success">📝 Fansub ID: ${data[0].id}</div>
            <div class="result-item success">🔰 ${data[0].name}</div>
        `;
        
        // Formu temizle
        document.getElementById('addFansubForm').reset();
        
    } catch (error) {
        console.error('Fansub ekleme hatası:', error);
        resultDiv.innerHTML = `
            <div class="result-item error">❌ Hata: ${error.message}</div>
            <div class="result-item error">💡 İpucu: Aynı isimde fansub zaten var olabilir</div>
        `;
    }
});

console.log('✅ Admin Panel JavaScript yüklendi! ');