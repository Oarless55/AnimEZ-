// Haftalık yayın takvimi verisi
const weeklySchedule = {
    monday: [
        { id: 5, title: "One Piece", episode: 1091, time: "09:30", image: "https://picsum.photos/seed/op-ep1091/400/225" },
        { id: 2, title: "Demon Slayer", episode: 27, time: "23:15", image: "https://picsum.photos/seed/ds-ep27/400/225" }
    ],
    tuesday: [
        { id: 3, title: "Jujutsu Kaisen", episode: 25, time: "17:00", image: "https://picsum.photos/seed/jjk-ep25/400/225" },
        { id: 13, title: "Re:Zero", episode: 51, time: "21:30", image: "https://picsum.photos/seed/rezero-ep51/400/225" }
    ],
    wednesday: [
        { id: 4, title: "My Hero Academia", episode: 139, time: "17:30", image: "https://picsum.photos/seed/mha-ep139/400/225" },
        { id: 7, title: "Chainsaw Man", episode: 13, time: "00:00", image: "https://picsum.photos/seed/csm-ep13/400/225" }
    ],
    thursday: [
        { id: 1, title: "SPY×FAMILY", episode: 13, time: "00:00", image: "https://picsum.photos/seed/spy-ep13/400/225" },
        { id: 44, title: "Vinland Saga", episode: 25, time: "17:55", image: "https://picsum.photos/seed/vinland-ep25/400/225" }
    ],
    friday: [
        { id: 24, title: "Kaguya-sama", episode: 37, time: "19:00", image: "https://picsum.photos/seed/kaguya-ep37/400/225" },
        { id: 45, title: "Blue Lock", episode: 25, time: "21:00", image: "https://picsum.photos/seed/bluelock-ep25/400/225" }
    ],
    saturday: [
        { id: 6, title: "Attack on Titan", episode: 88, time: "00:05", image: "https://picsum.photos/seed/aot-ep88/400/225" },
        { id: 31, title: "Tokyo Ghoul", episode: 49, time: "23:00", image: "https://picsum.photos/seed/tg-ep49/400/225" },
        { id: 47, title: "Frieren", episode: 29, time: "23:00", image: "https://picsum.photos/seed/frieren-ep29/400/225" }
    ],
    sunday: [
        { id: 43, title: "Mob Psycho 100", episode: 26, time: "12:00", image: "https://picsum.photos/seed/mob-ep26/400/225" },
        { id: 15, title: "Sword Art Online", episode: 97, time: "19:30", image: "https://picsum.photos/seed/sao-ep97/400/225" }
    ]
};

const dayNames = {
    monday: "Pazartesi",
    tuesday: "Salı",
    wednesday: "Çarşamba",
    thursday: "Perşembe",
    friday: "Cuma",
    saturday: "Cumartesi",
    sunday: "Pazar"
};

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    console.log('📅 Takvim sayfası yükleniyor...');
    
    initializeCalendar();
    initializeSeasonTabs();
    loadTodaysReleases();
    
    // Hafta navigasyonu
    document.getElementById('prevWeek')?.addEventListener('click', () => {
        console.log('⬅️ Önceki hafta');
        alert('Önceki hafta özelliği yakında eklenecek!');
    });
    
    document.getElementById('nextWeek')?.addEventListener('click', () => {
        console.log('➡️ Sonraki hafta');
        alert('Sonraki hafta özelliği yakında eklenecek!');
    });
});

// Takvimi başlat
function initializeCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;
    
    calendarGrid.innerHTML = '';
    
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Pazar, 1 = Pazartesi, ...
    
    // Haftanın günlerini oluştur
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dates = getDatesForWeek();
    
    days.forEach((day, index) => {
        const dayColumn = createDayColumn(day, dates[index], index === (currentDay === 0 ? 6 : currentDay - 1));
        calendarGrid.appendChild(dayColumn);
    });
    
    console.log('✅ Takvim oluşturuldu');
}

// Haftanın tarihlerini al
function getDatesForWeek() {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        dates.push(date);
    }
    
    return dates;
}

// Gün kolonu oluştur
function createDayColumn(dayKey, date, isToday) {
    const column = document.createElement('div');
    column.className = `day-column ${isToday ? 'today' : ''}`;
    
    const dayNumber = date.getDate();
    const monthName = date.toLocaleDateString('tr-TR', { month: 'short' });
    
    column.innerHTML = `
        <div class="day-header">
            <div class="day-name">${dayNames[dayKey]}</div>
            <div class="day-date">${dayNumber} ${monthName}</div>
            ${isToday ? '<div class="today-badge">BUGÜN</div>' : ''}
        </div>
        <div class="episode-cards" id="${dayKey}Episodes"></div>
    `;
    
    // Bölümleri ekle
    const episodesContainer = column.querySelector(`#${dayKey}Episodes`);
    const episodes = weeklySchedule[dayKey] || [];
    
    if (episodes.length === 0) {
        episodesContainer.innerHTML = '<p style="color: rgba(255,255,255,0.4); text-align: center; font-size: 13px;">Bölüm yok</p>';
    } else {
        episodes.forEach(episode => {
            const card = createEpisodeCard(episode);
            episodesContainer.appendChild(card);
        });
    }
    
    return column;
}

// Bölüm kartı oluştur
function createEpisodeCard(episode) {
    const card = document.createElement('div');
    card.className = 'calendar-episode-card';
    
    card.innerHTML = `
        <div class="episode-card-image">
            <img src="${episode.image}" alt="${episode.title}">
            <div class="episode-time-badge">${episode.time}</div>
        </div>
        <div class="episode-card-title">${episode.title}</div>
        <div class="episode-card-info">Bölüm ${episode.episode}</div>
    `;
    
    card.addEventListener('click', () => {
        window.location.href = `anime-detail.html?id=${episode.id}`;
    });
    
    return card;
}

// Sezon tablarını başlat
function initializeSeasonTabs() {
    const tabs = document.querySelectorAll('.season-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const season = this.dataset.season;
            console.log('📺 Sezon değiştirildi:', season);
            
            // Burada sezon filtreleme yapılabilir
            if (season !== 'current') {
                alert(`${this.textContent} için anime listesi yakında eklenecek!`);
            }
        });
    });
}

// Bugünün yayınlarını yükle
function loadTodaysReleases() {
    const today = new Date();
    const dayKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][today.getDay()];
    const todaysEpisodes = weeklySchedule[dayKey] || [];
    
    const container = document.getElementById('todaysReleases');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (todaysEpisodes.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.6); text-align: center; padding: 40px;">Bugün yayınlanacak bölüm bulunmuyor.</p>';
        return;
    }
    
    todaysEpisodes.forEach(episode => {
        const card = createReleaseCard(episode);
        container.appendChild(card);
    });
    
    console.log(`✅ Bugün ${todaysEpisodes.length} bölüm yayınlanacak`);
}

// Yayın kartı oluştur
function createReleaseCard(episode) {
    const card = document.createElement('div');
    card.className = 'release-card';
    
    card.innerHTML = `
        <div class="release-card-image">
            <img src="${episode.image}" alt="${episode.title}">
            <div class="release-badge">YENİ BÖLÜM</div>
        </div>
        <div class="release-card-content">
            <h3 class="release-card-title">${episode.title}</h3>
            <div class="release-card-episode">Bölüm ${episode.episode}</div>
            <div class="release-card-time">🕐 Yayın Saati: ${episode.time}</div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        window.location.href = `anime-detail.html?id=${episode.id}`;
    });
    
    return card;
}

console.log('✨ Takvim sayfası hazır!');