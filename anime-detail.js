// Detaylı Anime Veritabanı
const animeDetails = {
    // SPY×FAMILY
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
        description: "Batı ve Doğu arasında soğuk savaş devam ederken, usta casus Twilight kod adlı ajan Loid Forger, barışı tehdit eden bir komploya karşı Operasyon Strix görevini üstlenir. Bu görev için sahte bir aile kurması gerekir. Ancak evlat edindiği kız Anya'nın telepati yeteneği olduğundan ve karısı Yor'un gizli bir suikastçi olduğundan habersizdir. Her biri kendi sırlarını saklarken, bu eşsiz aile günlük hayatın zorluklarıyla ve gizli görevleriyle başa çıkmaya çalışır.",
        tags: ["Comedy", "Action", "Spy", "Family", "Shounen", "Supernatural"],
        poster: "https://picsum.photos/seed/spy-family-poster/300/420",
        background: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=1080&fit=crop",
        seasons: [{
            season: 1,
            episodes: [
                { number: 1, title: "Operasyon Strix", description: "Twilight, barışı korumak için sahte bir aile kurmak zorundadır. Eden Akademisi'ne kabul edilecek bir çocuk bulmalıdır.", date: "9/4/2022", thumbnail: "https://picsum.photos/seed/spy-ep1/400/225" },
                { number: 2, title: "Eşini Bul", description: "Loid'un görevini tamamlamak için bir eş bulması gerekir. Yor Briar ile tanışır ve sahte bir evlilik yaparlar.", date: "16/4/2022", thumbnail: "https://picsum.photos/seed/spy-ep2/400/225" },
                { number: 3, title: "Hedef Okul", description: "Anya'nın Eden Akademisi'ne kabul edilmesi için mülakat sınavından geçmesi gerekir.", date: "23/4/2022", thumbnail: "https://picsum.photos/seed/spy-ep3/400/225" }
            ]
        }]
    },

    // Demon Slayer
    2: {
        title: "Demon Slayer: Kimetsu no Yaiba",
        originalTitle: "鬼滅の刃",
        year: 2019,
        genres: "Action / Dark Fantasy / Supernatural",
        rating: 8.7,
        duration: "24 dakika",
        episodes: 26,
        date: "6/4/2019",
        studio: "ufotable",
        description: "Tanjirou Kamado, kömür satarak geçimini sağlayan sıradan bir gençtir. Ancak bir gün evine döndüğünde ailesinin bir iblis tarafından katledildiğini görür. Hayatta kalan tek kardeşi Nezuko ise bir iblise dönüşmüştür. Tanjirou, kız kardeşini tekrar insana çevirmek ve ailesinin intikamını almak için iblis avcısı olmaya karar verir. Zorlu bir eğitimden geçerek İblis Avcıları Örgütü'ne katılır ve ölümcül iblislerle dolu tehlikeli bir yolculuğa başlar.",
        tags: ["Action", "Dark Fantasy", "Demons", "Shounen", "Supernatural", "Swordplay"],
        poster: "https://picsum.photos/seed/demon-slayer-poster/300/420",
        background: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1920&h=1080&fit=crop",
        seasons: [{
            season: 1,
            episodes: [
                { number: 1, title: "Zalim Davranış", description: "Tanjirou'nun ailesi bir iblis tarafından katledilir ve kardeşi Nezuko iblise dönüşür.", date: "6/4/2019", thumbnail: "https://picsum.photos/seed/demon-ep1/400/225" },
                { number: 2, title: "Eğitmen Sakonji Urokodaki", description: "Tanjirou, iblis avcısı olmak için Sakonji Urokodaki'nin yanında zorlu bir eğitime başlar.", date: "13/4/2019", thumbnail: "https://picsum.photos/seed/demon-ep2/400/225" }
            ]
        }]
    },

    // Jujutsu Kaisen
    3: {
        title: "Jujutsu Kaisen",
        originalTitle: "呪術廻戦",
        year: 2020,
        genres: "Action / Dark Fantasy / Supernatural",
        rating: 8.6,
        duration: "24 dakika",
        episodes: 24,
        date: "3/10/2020",
        studio: "MAPPA",
        description: "Yuji Itadori olağanüstü fiziksel yeteneklere sahip sıradan bir lise öğrencisidir. Okul kulübü arkadaşlarını lanetli bir ruhtan kurtarmak için Ryomen Sukuna'nın parmağını yutar. Sukuna bin yıl önce yaşamış efsanevi ve korkunç bir lanetli ruhtun kralıdır. Yuji'nin bedeni Sukuna'nın konteyneri haline gelir. Tokyo Jujutsu Lisesi'nde büyücülük sanatını öğrenmeye başlar ve dünyayı lanetli ruhlardan korumak için tehlikeli görevlere atılır.",
        tags: ["Action", "Dark Fantasy", "Supernatural", "Shounen", "School"],
        poster: "https://picsum.photos/seed/jujutsu-poster/300/420",
        background: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=1920&h=1080&fit=crop",
        seasons: [{
            season: 1,
            episodes: [
                { number: 1, title: "Ryoumen Sukuna", description: "Yuji Itadori, arkadaşlarını kurtarmak için lanetli bir parmağı yutar ve Sukuna ile bir konteynır olur.", date: "3/10/2020", thumbnail: "https://picsum.photos/seed/jujutsu-ep1/400/225" }
            ]
        }]
    },

    // My Hero Academia
    4: {
        title: "My Hero Academia",
        originalTitle: "僕のヒーローアカデミア",
        year: 2016,
        genres: "Action / Superhero / School",
        rating: 8.4,
        duration: "24 dakika",
        episodes: 138,
        date: "3/4/2016",
        studio: "Bones",
        description: "İnsanlığın yüzde sekseni süper güçlere sahip olduğu bir dünyada, Izuku Midoriya güçsüz doğmuş nadir bireylerden biridir. Ancak en büyük kahramanı All Might gibi olmayı hayal eder. Bir gün All Might ile karşılaşır ve onun gücünü miras alır. UA Lisesi'ne girerek profesyonel bir kahraman olmak için eğitim almaya başlar. Arkadaşlarıyla birlikte zorlu sınavlardan geçer ve kötü niyetli güç sahiplerinden dünyayı korumaya çalışır.",
        tags: ["Action", "Superhero", "School", "Shounen", "Super Power"],
        poster: "https://picsum.photos/seed/mha-poster/300/420",
        background: "https://picsum.photos/seed/mha-bg/1920/1080",
        seasons: [{
            season: 1,
            episodes: [
                { number: 1, title: "Izuku Midoriya: Origin", description: "Quirkless olan Midoriya'nın kahramanlık hayalleri ve All Might ile karşılaşması.", date: "3/4/2016", thumbnail: "https://picsum.photos/seed/mha-ep1/400/225" }
            ]
        }]
    },

    // One Piece
    5: {
        title: "One Piece",
        originalTitle: "ワンピース",
        year: 1999,
        genres: "Adventure / Action / Fantasy",
        rating: 8.9,
        duration: "24 dakika",
        episodes: 1090,
        date: "20/10/1999",
        studio: "Toei Animation",
        description: "Monkey D. Luffy, efsanevi hazine One Piece'i bularak Korsanlar Kralı olmayı hayal eden genç bir korsandır. Akuma Meyvesi yedikten sonra vücudu lastik gibi esnek hale gelir. Mürettebatıyla birlikte Grand Line'da macera dolu bir yolculuğa çıkar. Her biri benzersiz yeteneklere sahip arkadaşlarıyla birlikte güçlü düşmanlara karşı savaşır, gizemli adaları keşfeder ve One Piece'i aramaya devam eder.",
        tags: ["Adventure", "Action", "Fantasy", "Shounen", "Pirates"],
        poster: "https://picsum.photos/seed/onepiece-poster/300/420",
        background: "https://picsum.photos/seed/onepiece-bg/1920/1080",
        seasons: [{
            season: 1,
            episodes: [
                { number: 1, title: "Ben Luffy! Gelecekteki Korsanlar Kralı!", description: "Luffy'nin korsanlık macerasının başlangıcı ve ilk mürettebat üyesiyle tanışması.", date: "20/10/1999", thumbnail: "https://picsum.photos/seed/op-ep1/400/225" }
            ]
        }]
    },

    // Attack on Titan
    6: {
        title: "Attack on Titan",
        originalTitle: "進撃の巨人",
        year: 2013,
        genres: "Action / Dark Fantasy / Drama",
        rating: 9.0,
        duration: "24 dakika",
        episodes: 87,
        date: "7/4/2013",
        studio: "Wit Studio / MAPPA",
        description: "İnsanlık, yüz yıl önce ortaya çıkan devasa Titanlar tarafından neredeyse yok edilmiştir. Hayatta kalanlar devasa surlarla çevrili şehirlerde yaşar. Eren Yeager, annesi bir Titan tarafından yenildikten sonra tüm Titanları yok etmeye yemin eder. Arkadaşları Mikasa ve Armin ile birlikte Keşif Birliği'ne katılır. Ancak Titanların kökeni ve insanlığın gerçek tarihi, beklediklerinden çok daha karanlık sırlar barındırır.",
        tags: ["Action", "Dark Fantasy", "Drama", "Shounen", "Military", "Titans"],
        poster: "https://picsum.photos/seed/aot-poster/300/420",
        background: "https://picsum.photos/seed/aot-bg/1920/1080",
        seasons: [{
            season: 1,
            episodes: [
                { number: 1, title: "2000 Yıl Sonra", description: "Titanların saldırısı ve Eren'in hayatını sonsuza dek değiştiren trajik olay.", date: "7/4/2013", thumbnail: "https://picsum.photos/seed/aot-ep1/400/225" }
            ]
        }]
    },

    // Chainsaw Man
    7: {
        title: "Chainsaw Man",
        originalTitle: "チェンソーマン",
        year: 2022,
        genres: "Action / Horror / Dark Fantasy",
        rating: 8.6,
        duration: "24 dakika",
        episodes: 12,
        date: "12/10/2022",
        studio: "MAPPA",
        description: "Denji, babasının borcunu ödemek için İblis Avcısı olarak çalışan fakir bir gençtir. Pochita adlı testere iblisi ile ortaktır. Yakuza tarafından ihanete uğrayıp öldürüldükten sonra Pochita onun kalbiyle birleşir ve Denji, Testere Adam olarak yeniden hayata döner. Public Safety Devil Hunter örgütüne katılarak iblislere karşı savaşır. Tek hayali normal bir hayat yaşamak ve sevdiği bir kızla birlikte olmaktır.",
        tags: ["Action", "Horror", "Dark Fantasy", "Shounen", "Demons", "Gore"],
        poster: "https://picsum.photos/seed/chainsaw-poster/300/420",
        background: "https://picsum.photos/seed/chainsaw-bg/1920/1080",
        seasons: [{
            season: 1,
            episodes: [
                { number: 1, title: "Köpek ve Testere", description: "Denji'nin Pochita ile tanışması ve Testere Adam'a dönüşümü.", date: "12/10/2022", thumbnail: "https://picsum.photos/seed/csm-ep1/400/225" }
            ]
        }]
    },

    // Re:Zero
    13: {
        title: "Re:Zero - Starting Life in Another World",
        originalTitle: "Re:ゼロから始める異世界生活",
        year: 2016,
        genres: "Fantasy / Thriller / Isekai / Drama",
        rating: 8.2,
        duration: "25 dakika",
        episodes: 50,
        date: "4/4/2016",
        studio: "White Fox",
        description: "Subaru Natsuki market dönüşü aniden kendini fantastik bir dünyada bulur. Hiçbir özel yetenek ya da silahı yoktur. Bir grup saldırganın saldırısına uğradığında Emilia adlı gizemli bir kız onu kurtarır. Ona yardım etmek isterken birlikte öldürülürler. Ancak Subaru gözlerini açtığında kendini tekrar aynı günün başında bulur. 'Return by Death' adını verdiği bu güçle, öldüğünde zamanı geri sarabilir. Emilia ve sevdiklerini korumak için sayısız ölümle yüzleşir.",
        tags: ["Fantasy", "Thriller", "Isekai", "Drama", "Psychological", "Time Loop"],
        poster: "https://picsum.photos/seed/rezero-poster/300/420",
        background: "https://picsum.photos/seed/rezero-bg/1920/1080",
        seasons: [{
            season: 1,
            episodes: [
                { number: 1, title: "Bitmeyen Başlangıç", description: "Subaru'nun fantastik dünyaya gelişi ve ilk ölümü.", date: "4/4/2016", thumbnail: "https://picsum.photos/seed/rezero-ep1/400/225" }
            ]
        }]
    },

    // Sword Art Online
    15: {
        title: "Sword Art Online",
        originalTitle: "ソードアート・オンライン",
        year: 2012,
        genres: "Action / Fantasy / Romance / Isekai",
        rating: 7.6,
        duration: "24 dakika",
        episodes: 96,
        date: "8/7/2012",
        studio: "A-1 Pictures",
        description: "2022 yılında, sanal gerçeklik devrim yaratmıştır. Sword Art Online (SAO) adlı yeni bir VRMMORPG oyunu piyasaya sürülür. 10,000 oyuncu NerveGear cihazlarıyla oyuna giriş yapar ancak çıkış butonunun olmadığını fark ederler. Oyunun yaratıcısı onları oyuna hapseder: oyunu bitirenler serbest kalacak, ancak oyunda ölenler gerçek dünyada da ölecektir. Kirito, oyunu bitirerek herkesin özgürlüğünü kazanmak için mücadele eder.",
        tags: ["Action", "Fantasy", "Romance", "Isekai", "VRMMO", "Game"],
        poster: "https://picsum.photos/seed/sao-poster/300/420",
        background: "https://picsum.photos/seed/sao-bg/1920/1080",
        seasons: [{
            season: 1,
            episodes: [
                { number: 1, title: "Kılıç Sanatının Dünyası", description: "10,000 oyuncu SAO dünyasına hapsedilir ve ölüm oyununun kurallarını öğrenir.", date: "8/7/2012", thumbnail: "https://picsum.photos/seed/sao-ep1/400/225" }
            ]
        }]
    },

    // Tokyo Ghoul
    31: {
        title: "Tokyo Ghoul",
        originalTitle: "東京喰種トーキョーグール",
        year: 2014,
        genres: "Action / Horror / Supernatural / Dark Fantasy",
        rating: 7.8,
        duration: "24 dakika",
        episodes: 48,
        date: "4/7/2014",
        studio: "Studio Pierrot",
        description: "Tokyo'da gizlice yaşayan Ghouller, insan eti yiyen yaratıklardır. Ken Kaneki, sıradan bir üniversite öğrencisidir. Rize ile bir randevuya çıkar ama onun ghoul olduğunu fark etmez. Rize'nin saldırısından kurtulur ancak organları Kaneki'ye nakledilir. Artık yarı insan yarı ghoul olan Kaneki, iki dünya arasında kimlik arayışına girer. İnsan toplumu ile ghoul dünyası arasında zorlu bir dengede yaşamaya çalışır.",
        tags: ["Action", "Horror", "Supernatural", "Dark Fantasy", "Seinen", "Gore"],
        poster: "https://picsum.photos/seed/tokyoghoul-poster/300/420",
        background: "https://picsum.photos/seed/tokyoghoul-bg/1920/1080",
        seasons: [{
            season: 1,
            episodes: [
                { number: 1, title: "Trajedi", description: "Kaneki'nin Rize ile tanışması ve ghoul'a dönüşüm süreci.", date: "4/7/2014", thumbnail: "https://picsum.photos/seed/tg-ep1/400/225" }
            ]
        }]
    },

    // Kaguya-sama
    24: {
        title: "Kaguya-sama: Love Is War",
        originalTitle: "かぐや様は告らせたい〜天才たちの恋愛頭脳戦〜",
        year: 2019,
        genres: "Romance / Comedy / School / Psychological",
        rating: 8.4,
        duration: "24 dakika",
        episodes: 36,
        date: "12/1/2019",
        studio: "A-1 Pictures",
        description: "Shuchiin Akademisi öğrenci konseyi başkanı Miyuki Shirogane ve başkan yardımcısı Kaguya Shinomiya, okulun en parlak iki öğrencisidir. İkisi de birbirlerinden hoşlanır ancak aşırı gururları yüzünden kimse itiraf etmek istemez. İkili de karşı tarafı ilk itirafı yapmaya zorlamak için akıl oyunları oynar. Bu komik aşk savaşında kim kazanacak?",
        tags: ["Romance", "Comedy", "School", "Psychological", "Seinen"],
        poster: "https://picsum.photos/seed/kaguya-poster/300/420",
        background: "https://picsum.photos/seed/kaguya-bg/1920/1080",
        seasons: [{
            season: 1,
            episodes: [
                { number: 1, title: "İtiraf Yarışması / Zenginlerin Kafası / İlk Kez", description: "Shirogane ve Kaguya'nın birbirlerini itiraf ettirme çabaları başlar.", date: "12/1/2019", thumbnail: "https://picsum.photos/seed/kaguya-ep1/400/225" }
            ]
        }]
    }
};

// Varsayılan anime şablonu
const defaultAnimeDetail = {
    genres: "Action / Adventure / Fantasy",
    rating: 8.0,
    duration: "24 dakika",
    episodes: 24,
    date: "1/1/2023",
    studio: "Animation Studio",
    description: "Bu anime hakkında detaylı bilgi hazırlanıyor. Karakterlerin maceraları, sürükleyici hikayesi ve etkileyici animasyonlarıyla dikkat çeken bu yapım, izleyicilere unutulmaz anlar yaşatıyor. Daha fazla bilgi için takipte kalın!",
    tags: ["Action", "Adventure", "Fantasy", "Anime"],
    seasons: [{
        season: 1,
        episodes: [
            { number: 1, title: "Yeni Başlangıç", description: "Hikayenin başlangıcı. Karakterlerle tanışın ve bu muhteşem dünyaya adım atın.", date: "1/1/2023", thumbnail: "https://picsum.photos/seed/default-ep1/400/225" }
        ]
    }]
};

// Anime başlık haritası (ID'den isim eşleştirmesi)
const animeTitleMap = {
    1: "SPY×FAMILY", 2: "Demon Slayer", 3: "Jujutsu Kaisen", 4: "My Hero Academia",
    5: "One Piece", 6: "Attack on Titan", 7: "Chainsaw Man", 8: "Bleach",
    9: "Tokyo Revengers", 10: "Naruto Shippuden", 11: "Dragon Ball Super",
    12: "Black Clover", 13: "Re:Zero", 14: "Overlord", 15: "Sword Art Online",
    16: "The Eminence in Shadow", 17: "Mushoku Tensei", 18: "That Time I Got Reincarnated as a Slime",
    19: "Konosuba", 20: "No Game No Life", 21: "Log Horizon", 22: "The Rising of the Shield Hero",
    23: "Your Name", 24: "Kaguya-sama: Love Is War", 25: "Horimiya", 26: "Toradora!",
    27: "My Dress-Up Darling", 28: "Fruits Basket", 29: "Clannad", 30: "Rent-a-Girlfriend",
    31: "Tokyo Ghoul", 32: "Another", 33: "Parasyte", 34: "Higurashi When They Cry",
    35: "Corpse Party", 36: "Elfen Lied", 37: "Death Note", 38: "Fullmetal Alchemist",
    39: "Hunter x Hunter", 40: "Fairy Tail", 41: "Steins;Gate", 42: "Code Geass",
    43: "Mob Psycho 100", 44: "Vinland Saga", 45: "Blue Lock", 46: "Boruto", 47: "Frieren"
};

// URL'den anime ID'sini al
function getAnimeIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    const animeId = getAnimeIdFromURL();
    
    if (!animeId) {
        console.error('❌ Anime ID bulunamadı!');
        window.location.href = 'index.html';
        return;
    }

    loadAnimeDetails(animeId);
    initializeEventListeners();
});

// Anime detaylarını yükle
function loadAnimeDetails(animeId) {
    console.log('🎬 Anime detayı yükleniyor - ID:', animeId);
    
    let anime = animeDetails[animeId];
    
    // Eğer detay yoksa varsayılan şablon kullan
    if (!anime) {
        const animeTitle = animeTitleMap[animeId] || "Anime";
        anime = {
            ...defaultAnimeDetail,
            title: animeTitle,
            originalTitle: animeTitle,
            year: 2023,
            poster: `https://picsum.photos/seed/anime${animeId}/300/420`,
            background: `https://picsum.photos/seed/bg${animeId}/1920/1080`
        };
        console.log('⚠️ Varsayılan şablon kullanılıyor:', animeTitle);
    }
    
    // Sayfa başlığı
    document.getElementById('pageTitle').textContent = `${anime.title} - AnimEZ`;
    
    // Hero arka plan
    document.getElementById('heroBackground').style.backgroundImage = `url('${anime.background}')`;
    
    // Poster
    document.getElementById('animePoster').src = anime.poster;
    document.getElementById('animePoster').alt = anime.title;
    
    // Bilgiler
    document.getElementById('animeTitle').textContent = `${anime.title} (${anime.year})`;
    document.getElementById('animeGenres').textContent = anime.genres;
    document.getElementById('animeRating').textContent = anime.rating;
    document.getElementById('animeDuration').textContent = anime.duration;
    document.getElementById('animeEpisodes').textContent = `${anime.episodes} bölüm`;
    document.getElementById('animeDate').textContent = anime.date;
    
    // Açıklama
    let description = anime.description;
    if (anime.studio) {
        description += `\n\nStüdyo: ${anime.studio}`;
    }
    document.getElementById('animeDescription').textContent = description;
    
    // Tag'lar
    loadTags(anime.tags);
    
    // Bölümler
    loadEpisodes(anime.seasons[0]);
    
    console.log('✅ Anime detayı yüklendi:', anime.title);
}

// Tag'ları yükle
function loadTags(tags) {
    const tagsContainer = document.getElementById('animeTags');
    tagsContainer.innerHTML = '';
    
    tags.slice(0, 6).forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
}

// Bölümleri yükle
function loadEpisodes(season) {
    const episodesList = document.getElementById('episodesList');
    episodesList.innerHTML = '';
    
    season.episodes.forEach(episode => {
        const episodeItem = createEpisodeItem(episode, season.season);
        episodesList.appendChild(episodeItem);
    });
}

// Bölüm öğesi oluştur
function createEpisodeItem(episode, season) {
    const item = document.createElement('div');
    item.className = 'episode-item';
    
    item.innerHTML = `
        <div class="episode-thumbnail">
            <img src="${episode.thumbnail}" alt="${episode.title}">
            <div class="episode-number-badge">S ${String(season).padStart(2, '0')} B ${String(episode.number).padStart(2, '0')}</div>
        </div>
        <div class="episode-info">
            <div class="episode-title-row">
                <h3 class="episode-title">${episode.title}</h3>
                <div>
                    <span class="episode-number">${episode.number}. Bölüm</span>
                    <span class="episode-date">${episode.date}</span>
                </div>
            </div>
            <p class="episode-description">${episode.description}</p>
        </div>
    `;
    
    item.addEventListener('click', () => {
        playEpisode(episode, season);
    });
    
    return item;
}

// Event listener'ları başlat
function initializeEventListeners() {
    document.getElementById('playTrailer')?.addEventListener('click', () => {
        alert('🎬 Fragman oynatılıyor...');
    });
    
    document.getElementById('watchNowBtn')?.addEventListener('click', () => {
        const firstEpisode = document.querySelector('.episode-item');
        if (firstEpisode) firstEpisode.click();
    });
    
    document.getElementById('showMoreTags')?.addEventListener('click', () => {
        alert('📌 Tüm etiketler gösterilecek...');
    });
    
    document.getElementById('seasonSelect')?.addEventListener('change', (e) => {
        console.log('🔄 Sezon değiştirildi:', e.target.value);
    });
    
    // Favori butonları
    const favoriteBtn = document.querySelector('.favorite-btn');
    const bookmarkBtn = document.querySelector('.bookmark-btn');
    
    favoriteBtn?.addEventListener('click', function() {
        this.classList.toggle('active');
        const svg = this.querySelector('svg');
        if (this.classList.contains('active')) {
            svg.setAttribute('fill', 'currentColor');
            console.log('❤️ Favorilere eklendi');
        } else {
            svg.setAttribute('fill', 'none');
            console.log('💔 Favorilerden çıkarıldı');
        }
    });
    
    bookmarkBtn?.addEventListener('click', function() {
        this.classList.toggle('active');
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

// Bölüm oynat
function playEpisode(episode, season) {
    console.log(`▶️ Oynatılıyor: S${season}E${episode.number} - ${episode.title}`);
    alert(`▶️ ${episode.title}\n\nBölüm oynatılıyor...\n\nGerçek uygulamada video player açılacak.`);

}
