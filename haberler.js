// Haberler verisi
const newsData = [
    {
        id: 1,
        title: "Demon Slayer 4. Sezon Kasım 2025'te Geliyor!",
        excerpt: "Ufotable stüdyosu, Demon Slayer'ın 4. sezonunun kasım ayında yayınlanacağını duyurdu. Sonsuz Kale Savaşı arc'ı ekranlara gelecek.",
        category: "Duyuru",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&h=450&fit=crop",
        author: "Anime Team",
        date: "4 Kasım 2025",
        views: "12.5K",
        featured: true
    },
    {
        id: 2,
        title: "Jujutsu Kaisen Sezon 3 İçin İlk Fragman Yayınlandı",
        excerpt: "MAPPA, Jujutsu Kaisen'in 3. sezonu için ilk resmi fragmanı yayınladı. Culling Game arc'ı 2025 yılında başlıyor.",
        category: "Duyuru",
        image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&h=450&fit=crop",
        author: "Manga News",
        date: "3 Kasım 2025",
        views: "15.2K"
    },
    {
        id: 3,
        title: "Chainsaw Man Part 2 Animasyon Onayı Aldı",
        excerpt: "Chainsaw Man'in ikinci kısmı MAPPA tarafından animasyon uyarlaması alacak. Reze Arc ile devam edecek seri 2026'da yayınlanacak.",
        category: "Yeni Çıkanlar",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=450&fit=crop",
        author: "Anime Insider",
        date: "2 Kasım 2025",
        views: "18.7K"
    },
    {
        id: 4,
        title: "Attack on Titan Final Movie Duyuruldu",
        excerpt: "MAPPA, Attack on Titan'ın final bölümlerini sinemaya uyarlayacağını duyurdu. Film 2025 sonunda gösterime girecek.",
        category: "Duyuru",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop",
        author: "Cinema Daily",
        date: "1 Kasım 2025",
        views: "25.3K"
    },
    {
        id: 5,
        title: "One Piece Bölüm 1100 Özel Animasyon ile Geliyor",
        excerpt: "Toei Animation, One Piece'in 1100. bölümü için özel animasyon ve kalite artışı planlıyor.",
        category: "Yeni Çıkanlar",
        image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&h=450&fit=crop",
        author: "Toei News",
        date: "31 Ekim 2025",
        views: "9.8K"
    },
    {
        id: 6,
        title: "Spy x Family Film Gösterim Tarihi Açıklandı",
        excerpt: "Spy x Family Code: White filmi Aralık 2025'te Türkiye sinemalarında gösterime girecek.",
        category: "Etkinlik",
        image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&h=450&fit=crop",
        author: "Film Haberleri",
        date: "30 Ekim 2025",
        views: "11.4K"
    },
    {
        id: 7,
        title: "My Hero Academia 7. Sezon Başlıyor",
        excerpt: "Bones stüdyosu tarafından üretilen My Hero Academia'nın 7. sezonu Final War arc'ı ile geri dönüyor.",
        category: "Yeni Çıkanlar",
        image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=450&fit=crop",
        author: "Shounen Jump",
        date: "29 Ekim 2025",
        views: "13.6K"
    },
    {
        id: 8,
        title: "Frieren İkinci Sezon Onayı Geldi",
        excerpt: "Frieren: Beyond Journey's End animesinin ikinci sezonu resmi olarak onaylandı. 2026'da yayınlanması planlanıyor.",
        category: "Duyuru",
        image: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=800&h=450&fit=crop",
        author: "Anime News",
        date: "28 Ekim 2025",
        views: "16.9K"
    }
];

// Trend konular
const trendingTopics = [
    { rank: 1, title: "Demon Slayer Sezon 4", count: "45.2K konuşma" },
    { rank: 2, title: "Chainsaw Man Part 2", count: "38.7K konuşma" },
    { rank: 3, title: "Jujutsu Kaisen Movie", count: "32.1K konuşma" },
    { rank: 4, title: "Attack on Titan Film", count: "29.5K konuşma" },
    { rank: 5, title: "Spy x Family Code White", count: "24.8K konuşma" },
    { rank: 6, title: "One Piece 1100", count: "21.3K konuşma" },
    { rank: 7, title: "Frieren Season 2", count: "19.7K konuşma" },
    { rank: 8, title: "Bleach TYBW Part 3", count: "17.2K konuşma" }
];

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    console.log('📰 Haberler sayfası yükleniyor...');
    
    loadFeaturedNews();
    loadLatestNews();
    loadTrendingTopics();
    initializeNewsTabs();
});

// Öne çıkan haberi yükle
function loadFeaturedNews() {
    const featuredContainer = document.getElementById('featuredNews');
    if (!featuredContainer) return;
    
    const featured = newsData.find(news => news.featured);
    if (!featured) return;
    
    featuredContainer.innerHTML = `
        <img src="${featured.image}" alt="${featured.title}" class="featured-news-image">
        <div class="featured-news-overlay">
            <div class="featured-news-category">${featured.category}</div>
            <h2 class="featured-news-title">${featured.title}</h2>
            <p class="featured-news-excerpt">${featured.excerpt}</p>
            <div class="featured-news-meta">
                <span>👤 ${featured.author}</span>
                <span>📅 ${featured.date}</span>
                <span>👁️ ${featured.views} görüntülenme</span>
            </div>
        </div>
    `;
    
    featuredContainer.addEventListener('click', () => {
        showNewsDetail(featured);
    });
}

// Son haberleri yükle
function loadLatestNews(category = 'all') {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;
    
    newsGrid.innerHTML = '';
    
    const filteredNews = category === 'all' 
        ? newsData.filter(news => !news.featured)
        : newsData.filter(news => !news.featured && news.category.toLowerCase() === getCategoryName(category));
    
    filteredNews.forEach(news => {
        const card = createNewsCard(news);
        newsGrid.appendChild(card);
    });
    
    console.log(`✅ ${filteredNews.length} haber yüklendi`);
}

// Kategori adını al
function getCategoryName(key) {
    const categories = {
        'announcements': 'duyuru',
        'releases': 'yeni çıkanlar',
        'reviews': 'inceleme',
        'events': 'etkinlik'
    };
    return categories[key] || key;
}

// Haber kartı oluştur
function createNewsCard(news) {
    const card = document.createElement('div');
    card.className = 'news-card';
    
    card.innerHTML = `
        <div class="news-card-image">
            <img src="${news.image}" alt="${news.title}">
            <div class="news-card-badge">${news.category}</div>
        </div>
        <div class="news-card-content">
            <h3 class="news-card-title">${news.title}</h3>
            <p class="news-card-excerpt">${news.excerpt}</p>
            <div class="news-card-meta">
                <div class="news-card-author">
                    <span>👤</span>
                    <span>${news.author}</span>
                </div>
                <div class="news-card-date">${news.date}</div>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        showNewsDetail(news);
    });
    
    return card;
}

// Trend konuları yükle
function loadTrendingTopics() {
    const container = document.getElementById('trendingTopics');
    if (!container) return;
    
    container.innerHTML = '';
    
    trendingTopics.forEach(topic => {
        const topicCard = document.createElement('div');
        topicCard.className = 'trending-topic';
        
        topicCard.innerHTML = `
            <div class="trending-number">${topic.rank}</div>
            <h4 class="trending-title">${topic.title}</h4>
            <p class="trending-count">${topic.count}</p>
        `;
        
        topicCard.addEventListener('click', () => {
            console.log('🔥 Trend konu tıklandı:', topic.title);
            alert(`"${topic.title}" ile ilgili haberler gösteriliyor...`);
        });
        
        container.appendChild(topicCard);
    });
}

// Haber tablarını başlat
function initializeNewsTabs() {
    const tabs = document.querySelectorAll('.news-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            loadLatestNews(category);
        });
    });
}

// Haber detayını göster
function showNewsDetail(news) {
    console.log('📰 Haber açılıyor:', news.title);
    alert(`📰 ${news.title}\n\n${news.excerpt}\n\nDetaylı haber sayfası yakında eklenecek!`);
}

console.log('✨ Haberler sayfası hazır!');