// ===== SUPABASE ENTEGRASYONU =====
// Backend API URL (eski Flask backend'iniz varsa)
const API_URL = 'http://localhost:5000';

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 AnimEZ yükleniyor...');
    
    // Hero slider'ı başlat
    initializeSlider();
    
    // Supabase'den animeleri yükle
    await loadAnimesFromSupabase();
    
    // Arama fonksiyonunu başlat
    initializeSearch();
    
    console.log('✅ Tüm sistemler yüklendi!');
});

// Ana Anime Verisi (Varsayılan - Supabase bağlanamazsa kullanılacak)
let allAnimeData = [
    // Continue Watching + Aksiyon
    { id: 1, title: "SPY×FAMILY", genre: "Spy / Komedi", episode: 12, image: "https://picsum.photos/seed/spy-family/300/420", category: ["continue", "action"] },
    { id: 2, title: "Demon Slayer", genre: "Action / Supernatural", episode: 26, image: "https://picsum.photos/seed/demon-slayer/300/420", category: ["continue", "action", "new"] },
    { id: 3, title: "Jujutsu Kaisen", genre: "Action / Dark Fantasy", episode: 24, image: "https://picsum.photos/seed/jujutsu/300/420", category: ["continue", "action", "new"] },
    { id: 4, title: "My Hero Academia", genre: "Action / Superhero", episode: 138, image: "https://picsum.photos/seed/mha/300/420", category: ["continue", "action"] },
    { id: 5, title: "One Piece", genre: "Adventure / Comedy", episode: 1090, image: "https://picsum.photos/seed/onepiece/300/420", category: ["continue", "action", "new"] },
    { id: 6, title: "Attack on Titan", genre: "Action / Dark Fantasy", episode: 87, image: "https://picsum.photos/seed/aot/300/420", category: ["continue", "action"] },
    { id: 7, title: "Chainsaw Man", genre: "Action / Horror", episode: 12, image: "https://picsum.photos/seed/chainsaw/300/420", category: ["continue", "action", "horror"] },
    { id: 8, title: "Bleach", genre: "Action / Supernatural", episode: 366, image: "https://picsum.photos/seed/bleach/300/420", category: ["continue", "action"] },
    { id: 9, title: "Tokyo Revengers", genre: "Action / Drama", episode: 24, image: "https://picsum.photos/seed/tokyo-rev/300/420", category: ["continue", "action", "new"] },
    { id: 10, title: "Naruto Shippuden", genre: "Action / Adventure", episode: 500, image: "https://picsum.photos/seed/naruto/300/420", category: ["continue", "action"] },
    { id: 11, title: "Dragon Ball Super", genre: "Action / Adventure", episode: 131, image: "https://picsum.photos/seed/dbsuper/300/420", category: ["action"] },
    { id: 12, title: "Black Clover", genre: "Action / Fantasy", episode: 170, image: "https://picsum.photos/seed/blackclover/300/420", category: ["action", "new"] },
    { id: 13, title: "Re:Zero", genre: "Fantasy / Thriller / Isekai", episode: 50, image: "https://picsum.photos/seed/rezero/300/420", category: ["isekai", "new"] },
    { id: 14, title: "Overlord", genre: "Action / Fantasy / Isekai", episode: 52, image: "https://picsum.photos/seed/overlord/300/420", category: ["isekai"] },
    { id: 15, title: "Sword Art Online", genre: "Action / Fantasy / Isekai", episode: 96, image: "https://picsum.photos/seed/sao/300/420", category: ["isekai", "romance"] },
    { id: 16, title: "The Eminence in Shadow", genre: "Action / Comedy / Isekai", episode: 20, image: "https://picsum.photos/seed/eminence/300/420", category: ["isekai", "new"] },
    { id: 17, title: "Mushoku Tensei", genre: "Fantasy / Drama / Isekai", episode: 23, image: "https://picsum.photos/seed/mushoku/300/420", category: ["isekai", "new"] },
    { id: 18, title: "That Time I Got Reincarnated as a Slime", genre: "Fantasy / Isekai", episode: 48, image: "https://picsum.photos/seed/slime/300/420", category: ["isekai"] },
    { id: 19, title: "Konosuba", genre: "Comedy / Fantasy / Isekai", episode: 20, image: "https://picsum.photos/seed/konosuba/300/420", category: ["isekai"] },
    { id: 20, title: "No Game No Life", genre: "Fantasy / Isekai", episode: 12, image: "https://picsum.photos/seed/ngnl/300/420", category: ["isekai"] },
    { id: 21, title: "Log Horizon", genre: "Adventure / Isekai", episode: 62, image: "https://picsum.photos/seed/loghorizon/300/420", category: ["isekai"] },
    { id: 22, title: "The Rising of the Shield Hero", genre: "Action / Isekai", episode: 38, image: "https://picsum.photos/seed/shield/300/420", category: ["isekai", "new"] },
    { id: 23, title: "Your Name", genre: "Romance / Drama", episode: 1, image: "https://picsum.photos/seed/yourname/300/420", category: ["romance"] },
    { id: 24, title: "Kaguya-sama: Love Is War", genre: "Romance / Comedy", episode: 36, image: "https://picsum.photos/seed/kaguya/300/420", category: ["romance", "new"] },
    { id: 25, title: "Horimiya", genre: "Romance / Slice of Life", episode: 13, image: "https://picsum.photos/seed/horimiya/300/420", category: ["romance"] },
    { id: 26, title: "Toradora!", genre: "Romance / Comedy", episode: 25, image: "https://picsum.photos/seed/toradora/300/420", category: ["romance"] },
    { id: 27, title: "My Dress-Up Darling", genre: "Romance / Slice of Life", episode: 12, image: "https://picsum.photos/seed/bisque/300/420", category: ["romance", "new"] },
    { id: 28, title: "Fruits Basket", genre: "Romance / Drama", episode: 63, image: "https://picsum.photos/seed/fruitsbasket/300/420", category: ["romance"] },
    { id: 29, title: "Clannad", genre: "Romance / Drama", episode: 47, image: "https://picsum.photos/seed/clannad/300/420", category: ["romance"] },
    { id: 30, title: "Rent-a-Girlfriend", genre: "Romance / Comedy", episode: 24, image: "https://picsum.photos/seed/kanojo/300/420", category: ["romance", "new"] },
    { id: 31, title: "Tokyo Ghoul", genre: "Action / Horror", episode: 48, image: "https://picsum.photos/seed/tokyoghoul/300/420", category: ["horror", "action"] },
    { id: 32, title: "Another", genre: "Horror / Mystery", episode: 12, image: "https://picsum.photos/seed/another/300/420", category: ["horror"] },
    { id: 33, title: "Parasyte", genre: "Horror / Sci-Fi", episode: 24, image: "https://picsum.photos/seed/parasyte/300/420", category: ["horror", "new"] },
    { id: 34, title: "Higurashi When They Cry", genre: "Horror / Mystery", episode: 50, image: "https://picsum.photos/seed/higurashi/300/420", category: ["horror"] },
    { id: 35, title: "Corpse Party", genre: "Horror / Supernatural", episode: 4, image: "https://picsum.photos/seed/corpseparty/300/420", category: ["horror"] },
    { id: 36, title: "Elfen Lied", genre: "Horror / Drama", episode: 13, image: "https://picsum.photos/seed/elfenlied/300/420", category: ["horror"] },
    { id: 37, title: "Death Note", genre: "Mystery / Psychological", episode: 37, image: "https://picsum.photos/seed/deathnote/300/420", category: ["continue", "new"] },
    { id: 38, title: "Fullmetal Alchemist", genre: "Action / Fantasy", episode: 64, image: "https://picsum.photos/seed/fma/300/420", category: ["continue", "action"] },
    { id: 39, title: "Hunter x Hunter", genre: "Action / Adventure", episode: 148, image: "https://picsum.photos/seed/hxh/300/420", category: ["continue", "action"] },
    { id: 40, title: "Fairy Tail", genre: "Action / Fantasy", episode: 328, image: "https://picsum.photos/seed/fairytail/300/420", category: ["continue"] },
    { id: 41, title: "Steins;Gate", genre: "Sci-Fi / Thriller", episode: 24, image: "https://picsum.photos/seed/steinsgate/300/420", category: ["continue"] },
    { id: 42, title: "Code Geass", genre: "Action / Drama", episode: 50, image: "https://picsum.photos/seed/codegeass/300/420", category: ["continue"] },
    { id: 43, title: "Mob Psycho 100", genre: "Action / Comedy", episode: 25, image: "https://picsum.photos/seed/mobpsycho/300/420", category: ["continue", "new"] },
    { id: 44, title: "Vinland Saga", genre: "Action / Drama", episode: 24, image: "https://picsum.photos/seed/vinland/300/420", category: ["continue", "action", "new"] },
    { id: 45, title: "Blue Lock", genre: "Sports / Drama", episode: 24, image: "https://picsum.photos/seed/bluelock/300/420", category: ["continue", "new"] },
    { id: 46, title: "Boruto", genre: "Action / Adventure", episode: 293, image: "https://picsum.photos/seed/boruto/300/420", category: ["continue", "action"] },
    { id: 47, title: "Frieren", genre: "Adventure / Fantasy", episode: 28, image: "https://picsum.photos/seed/frieren/300/420", category: ["continue", "new"] }
];

// Hero Slider Verileri
const heroSlides = [
    {
        title: "Fate/Hollow Ataraxia REMASTERED PC ve Switch için Çıkış Tarihi Açıklandı! ",
        description: "Daha önce bu yıl içinde çıkacağı doğrulanan Fate/hollow ataraxia REMASTERED için nihai çıkış tarihi belli oldu. Güncellenmiş sürümü, yüksek çözünürlü.. .",
        category: "Haberler",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=1080&fit=crop"
    },
    {
        title: "2025 Kış Sezonu Yeni Anime Duyuruları! ",
        description: "Bu sezon en çok beklenen anime serilerinin çıkış tarihleri belli oldu. Demon Slayer, Jujutsu Kaisen ve daha fazlası sizi bekliyor.. .",
        category: "Duyuru",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1920&h=1080&fit=crop"
    },
    {
        title: "En Popüler 10 Anime - Aralık 2025",
        description: "Bu ayın en çok izlenen ve tartışılan anime serileri!  Siz de bu heyecana katılın ve favorilerinizi keşfedin.. .",
        category: "Trendler",
        image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=1920&h=1080&fit=crop"
    }
];

// ===== SUPABASE'DEN ANİMELERİ YÜKLE =====
async function loadAnimesFromSupabase() {
    try {
        console.log('📡 Supabase\'den animeler yükleniyor...');
        
        const animes = await AnimeAPI.getAllAnimes();
        
        if (animes && animes.length > 0) {
            // Supabase verilerini mevcut formata dönüştür
            const supabaseAnimes = animes. map(anime => ({
                id: anime.id,
                title: anime.title,
                genre: anime.genres || 'Unknown',
                episode: anime.total_episodes || 0,
                image: anime.poster_url || 'https://via.placeholder.com/300x420',
                category: categorizeAnime(anime) // Otomatik kategori ata
            }));
            
            // Mevcut verileri Supabase verileriyle değiştir
            allAnimeData = supabaseAnimes;
            
            console.log(`✅ Supabase'den ${animes.length} anime yüklendi!`);
        } else {
            console.warn('⚠️ Supabase\'de anime bulunamadı, varsayılan veriler kullanılıyor');
        }
    } catch (error) {
        console.error('❌ Supabase bağlantı hatası:', error);
        console.log('💡 Varsayılan veriler kullanılıyor');
    }
    
    // Carousel'ları başlat (Supabase verileri veya varsayılan verilerle)
    initializeCarousels();
}

// Anime'yi otomatik kategorilere ata
function categorizeAnime(anime) {
    const categories = ['continue']; // Varsayılan kategori
    const genres = anime.genres ?  anime.genres.toLowerCase() : '';
    
    // Genre'lere göre kategori ekle
    if (genres.includes('action') || genres.includes('aksiyon')) categories.push('action');
    if (genres.includes('isekai')) categories.push('isekai');
    if (genres.includes('romance') || genres.includes('romantik')) categories.push('romance');
    if (genres.includes('horror') || genres.includes('korku')) categories.push('horror');
    
    // Yeni animeler (2023 ve sonrası)
    if (anime.year && anime.year >= 2023) categories.push('new');
    
    return categories;
}

// Carousel'ları başlat
function initializeCarousels() {
    // Kategorilere göre anime'leri filtrele
    const continueAnime = getAnimeByCategory('continue');
    const newEpisodesAnime = getAnimeByCategory('new');
    const actionAnime = getAnimeByCategory('action');
    const isekaiAnime = getAnimeByCategory('isekai');
    const romanceAnime = getAnimeByCategory('romance');
    const horrorAnime = getAnimeByCategory('horror');
    
    console.log('📊 Kategoriler:');
    console.log('Continue:', continueAnime.length);
    console.log('Yeni Bölümler:', newEpisodesAnime.length);
    console. log('Aksiyon:', actionAnime.length);
    console.log('Isekai:', isekaiAnime.length);
    console. log('Romance:', romanceAnime.length);
    console.log('Korku:', horrorAnime.length);
    
    // Carousel'ları başlat
    new AnimeCarousel('continueGrid', 'continuePrevBtn', 'continueNextBtn', 'continuePageInfo', continueAnime);
    new AnimeCarousel('newEpisodesGrid', 'newEpisodesPrevBtn', 'newEpisodesNextBtn', 'newEpisodesPageInfo', newEpisodesAnime);
    new AnimeCarousel('actionGrid', 'actionPrevBtn', 'actionNextBtn', 'actionPageInfo', actionAnime);
    new AnimeCarousel('isekaiGrid', 'isekaiPrevBtn', 'isekaiNextBtn', 'isekaiPageInfo', isekaiAnime);
    new AnimeCarousel('romanceGrid', 'romancePrevBtn', 'romanceNextBtn', 'romancePageInfo', romanceAnime);
    new AnimeCarousel('horrorGrid', 'horrorPrevBtn', 'horrorNextBtn', 'horrorPageInfo', horrorAnime);
    
    console.log('✅ Tüm carousel\'lar yüklendi!');
}

// Kategorilere göre anime filtrele
function getAnimeByCategory(category) {
    return allAnimeData.filter(anime => anime.category. includes(category));
}

// ===== CAROUSEL SINIFI (AYNI KALIYOR) =====
class AnimeCarousel {
    constructor(gridId, prevBtnId, nextBtnId, pageInfoId, animeList) {
        this.gridId = gridId;
        this. prevBtnId = prevBtnId;
        this.nextBtnId = nextBtnId;
        this.pageInfoId = pageInfoId;
        this. animeList = animeList;
        this.currentIndex = 0;
        this.itemsPerView = 5;
        
        this.init();
    }
    
    init() {
        this.calculateItemsPerView();
        this. render();
        this.initializeButtons();
        
        // Resize event
        let resizeTimeout;
        window. addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.calculateItemsPerView();
                this.currentIndex = 0;
                this.updatePosition();
            }, 250);
        });
    }
    
    calculateItemsPerView() {
        const width = window.innerWidth;
        if (width >= 1200) {
            this.itemsPerView = 5;
        } else if (width >= 1024) {
            this.itemsPerView = 4;
        } else if (width >= 768) {
            this.itemsPerView = 3;
        } else if (width >= 480) {
            this.itemsPerView = 2;
        } else {
            this.itemsPerView = 1;
        }
    }
    
    render() {
        const grid = document.getElementById(this.gridId);
        if (!grid) return;
        
        grid.innerHTML = '';
        
        this.animeList.forEach((anime, index) => {
            const card = this.createCard(anime, index);
            grid.appendChild(card);
        });
        
        this.updatePaginationInfo();
    }
    
    createCard(anime, index) {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.style.animationDelay = `${(index % this.itemsPerView) * 0.05}s`;
        
        card.innerHTML = `
            <div class="card-image">
                <img src="${anime.image}" alt="${anime.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x420? text=No+Image'">
                <div class="play-overlay">
                    <div class="play-button">▶</div>
                </div>
                <span class="episode-badge">Bölüm ${anime.episode}</span>
            </div>
            <div class="card-content">
                <h4 class="anime-title">${anime.title}</h4>
                <p class="anime-meta">${anime.genre}</p>
            </div>
        `;
        
        card.addEventListener('click', () => {
            window.location.href = `anime-detail.html?id=${anime. id}`;
        });
        
        return card;
    }
    
    initializeButtons() {
        const prevBtn = document.getElementById(this.prevBtnId);
        const nextBtn = document.getElementById(this.nextBtnId);
        
        if (! prevBtn || !nextBtn) return;
        
        prevBtn. addEventListener('click', (e) => {
            e. preventDefault();
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.updatePosition();
            }
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const maxIndex = Math.max(0, this.animeList.length - this.itemsPerView);
            if (this.currentIndex < maxIndex) {
                this.currentIndex++;
                this.updatePosition();
            }
        });
        
        // Klavye desteği
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
        });
    }
    
    updatePosition() {
        const grid = document.getElementById(this. gridId);
        const cards = grid.querySelectorAll('. anime-card');
        
        if (cards.length === 0) return;
        
        const cardWidth = cards[0].offsetWidth;
        const gap = 20;
        const offset = this.currentIndex * (cardWidth + gap);
        
        grid.style.transform = `translateX(-${offset}px)`;
        
        this.updateButtons();
        this.updatePaginationInfo();
    }
    
    updateButtons() {
        const prevBtn = document.getElementById(this.prevBtnId);
        const nextBtn = document.getElementById(this. nextBtnId);
        const maxIndex = Math.max(0, this.animeList.length - this.itemsPerView);
        
        if (this.currentIndex === 0) {
            prevBtn.disabled = true;
            prevBtn.style.opacity = '0.3';
        } else {
            prevBtn.disabled = false;
            prevBtn.style.opacity = '1';
        }
        
        if (this.currentIndex >= maxIndex) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.3';
        } else {
            nextBtn.disabled = false;
            nextBtn.style. opacity = '1';
        }
    }
    
    updatePaginationInfo() {
        const pageInfo = document.getElementById(this.pageInfoId);
        if (!pageInfo) return;
        
        const start = this.currentIndex + 1;
        const end = Math.min(this.currentIndex + this.itemsPerView, this.animeList.length);
        const total = this.animeList.length;
        
        pageInfo. innerHTML = `${start} - ${end} of ${total}`;
    }
}

// ===== HERO SLIDER (AYNI KALIYOR) =====
let currentSlide = 0;

function initializeSlider() {
    const dots = document.querySelectorAll('.dot');
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide();
        });
    });
    
    setInterval(() => {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        updateSlide();
    }, 5000);
}

function updateSlide() {
    const dots = document.querySelectorAll('. dot');
    const heroImage = document.querySelector('.hero-image');
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const categoryBadge = document.querySelector('.category-badge');
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    if (heroSlides[currentSlide]) {
        heroImage.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.textContent = heroSlides[currentSlide].title;
            heroDescription.textContent = heroSlides[currentSlide].description;
            categoryBadge.textContent = heroSlides[currentSlide].category;
            heroImage.src = heroSlides[currentSlide].image;
            heroImage.style.opacity = '1';
        }, 300);
    }
}

// ===== ARAMA (GÜNCELLENDİ - Supabase araması eklenmiş) =====
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchInput || !searchBtn) return;
    
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

async function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase(). trim();
    
    if (! searchTerm) return;
    
    console.log('🔍 Arama:', searchTerm);
    
    try {
        // Önce Supabase'de ara
        const supabaseResults = await AnimeAPI.searchAnimes(searchTerm);
        
        if (supabaseResults && supabaseResults.length > 0) {
            console.log(`📊 Supabase'de ${supabaseResults.length} sonuç bulundu`);
            window.location.href = `anime-detail.html?id=${supabaseResults[0].id}`;
            return;
        }
    } catch (error) {
        console.warn('⚠️ Supabase araması başarısız, yerel aramaya geçiliyor');
    }
    
    // Supabase'de bulunamazsa yerel veride ara
    const results = allAnimeData.filter(anime => 
        anime.title.toLowerCase().includes(searchTerm) ||
        anime.genre.toLowerCase().includes(searchTerm)
    );
    
    console.log(`📊 ${results.length} sonuç bulundu`);
    
    if (results.length > 0) {
        window. location.href = `anime-detail.html?id=${results[0].id}`;
    } else {
        alert('Sonuç bulunamadı!');
    }
}

// ===== HEADER SCROLL EFEKTİ (AYNI KALIYOR) =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header. style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

console.log('✨ AnimEZ yüklendi!  Toplam', allAnimeData.length, 'anime mevcut.');
