from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
import sqlite3
import json

app = Flask(__name__)
CORS(app)

DATABASE = 'animez.db'
SEICODE_API = 'https://next-api.seicode.net'

# Database kurulumu
def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    c.execute('''CREATE TABLE IF NOT EXISTS animes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        seicode_id TEXT UNIQUE,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        image_url TEXT,
        rating REAL,
        status TEXT,
        year INTEGER,
        genres TEXT,
        episode_count INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS episodes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        anime_id INTEGER,
        episode_number INTEGER,
        title TEXT,
        video_url TEXT,
        thumbnail_url TEXT,
        duration TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (anime_id) REFERENCES animes(id)
    )''')
    
    conn.commit()
    conn.close()

init_db()

# 🎯 ADMIN PANEL ROUTE (YENİ!)
@app.route('/admin')
@app.route('/admin.html')
def admin_panel():
    return send_file('admin.html')

# 🏠 ANA SAYFA ROUTE (YENİ!)
@app.route('/')
def index():
    return send_file('index.html')

# 🎯 Anime listesini çek (Seicode API)
@app.route('/api/admin/seicode/list', methods=['GET'])
def get_seicode_list():
    try:
        page = request.args.get('page', 1, type=int)
        limit = request.args.get('limit', 20, type=int)
        
        response = requests.get(f'{SEICODE_API}/anime', params={
            'page': page,
            'limit': limit
        }, timeout=10)
        
        if response.status_code == 200:
            return jsonify({
                'success': True,
                'data': response.json()
            })
        else:
            return jsonify({'success': False, 'error': 'API hatası'}), 400
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# 📥 Tek anime içe aktar
@app.route('/api/admin/import/anime', methods=['POST'])
def import_anime():
    try:
        data = request.json
        slug = data.get('slug')
        
        if not slug:
            return jsonify({'success': False, 'error': 'Slug gerekli'}), 400
        
        # Seicode'dan anime detaylarını çek
        response = requests.get(f'{SEICODE_API}/anime/{slug}', timeout=15)
        
        if response.status_code != 200:
            return jsonify({'success': False, 'error': 'Anime bulunamadı'}), 404
        
        anime_data = response.json()
        
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()
        
        try:
            # Anime ekle
            genres_str = ','.join(anime_data.get('genres', []))
            episode_count = len(anime_data.get('episodes', []))
            
            c.execute('''INSERT OR REPLACE INTO animes 
                (seicode_id, title, slug, description, image_url, rating, status, year, genres, episode_count)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                (
                    str(anime_data.get('id', '')),
                    anime_data.get('title', 'Unknown'),
                    anime_data.get('slug', slug),
                    anime_data.get('description', ''),
                    anime_data.get('image', ''),
                    anime_data.get('rating', 0),
                    anime_data.get('status', 'Unknown'),
                    anime_data.get('year', 2024),
                    genres_str,
                    episode_count
                ))
            
            anime_id = c.lastrowid
            
            # Bölümleri ekle
            episodes_added = 0
            if 'episodes' in anime_data and isinstance(anime_data['episodes'], list):
                for ep in anime_data['episodes']:
                    c.execute('''INSERT OR REPLACE INTO episodes 
                        (anime_id, episode_number, title, video_url, thumbnail_url, duration)
                        VALUES (?, ?, ?, ?, ?, ?)''',
                        (
                            anime_id,
                            ep.get('episode_number', 0),
                            ep.get('title', f'Episode {ep.get("episode_number", 0)}'),
                            ep.get('video_url', ''),
                            ep.get('thumbnail', ''),
                            ep.get('duration', '')
                        ))
                    episodes_added += 1
            
            conn.commit()
            
            return jsonify({
                'success': True,
                'anime_title': anime_data.get('title'),
                'episodes_added': episodes_added,
                'message': f'{anime_data.get("title")} başarıyla eklendi!'
            })
            
        except Exception as e:
            return jsonify({'success': False, 'error': f'Database hatası: {str(e)}'}), 400
        finally:
            conn.close()
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# 📦 Toplu anime içe aktar
@app.route('/api/admin/import/bulk', methods=['POST'])
def import_bulk():
    try:
        data = request.json
        page = data.get('page', 1)
        limit = data.get('limit', 10)
        
        response = requests.get(f'{SEICODE_API}/anime', params={
            'page': page,
            'limit': limit
        }, timeout=15)
        
        if response.status_code != 200:
            return jsonify({'success': False, 'error': 'API hatası'}), 400
        
        anime_list = response.json()
        successful = 0
        failed = 0
        results = []
        
        # Her anime için içe aktarma yap
        anime_data_list = anime_list.get('data', []) if isinstance(anime_list, dict) else anime_list
        
        for anime in anime_data_list:
            slug = anime.get('slug')
            if not slug:
                continue
                
            try:
                detail_response = requests.get(f'{SEICODE_API}/anime/{slug}', timeout=10)
                
                if detail_response.status_code == 200:
                    anime_data = detail_response.json()
                    
                    conn = sqlite3.connect(DATABASE)
                    c = conn.cursor()
                    
                    genres_str = ','.join(anime_data.get('genres', []))
                    episode_count = len(anime_data.get('episodes', []))
                    
                    c.execute('''INSERT OR IGNORE INTO animes 
                        (seicode_id, title, slug, description, image_url, rating, status, year, genres, episode_count)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                        (
                            str(anime_data.get('id', '')),
                            anime_data.get('title', 'Unknown'),
                            slug,
                            anime_data.get('description', ''),
                            anime_data.get('image', ''),
                            anime_data.get('rating', 0),
                            anime_data.get('status', 'Unknown'),
                            anime_data.get('year', 2024),
                            genres_str,
                            episode_count
                        ))
                    
                    anime_id = c.lastrowid
                    
                    if 'episodes' in anime_data:
                        for ep in anime_data['episodes']:
                            c.execute('''INSERT OR IGNORE INTO episodes 
                                (anime_id, episode_number, title, video_url, thumbnail_url, duration)
                                VALUES (?, ?, ?, ?, ?, ?)''',
                                (
                                    anime_id,
                                    ep.get('episode_number', 0),
                                    ep.get('title', ''),
                                    ep.get('video_url', ''),
                                    ep.get('thumbnail', ''),
                                    ep.get('duration', '')
                                ))
                    
                    conn.commit()
                    conn.close()
                    
                    successful += 1
                    results.append({'title': anime_data.get('title'), 'status': 'success'})
                else:
                    failed += 1
                    results.append({'title': slug, 'status': 'failed'})
                    
            except Exception as e:
                failed += 1
                results.append({'title': slug, 'status': 'error', 'error': str(e)})
        
        return jsonify({
            'success': True,
            'successful': successful,
            'failed': failed,
            'results': results
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# 📊 İstatistikler
@app.route('/api/admin/stats', methods=['GET'])
def get_stats():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    c.execute('SELECT COUNT(*) FROM animes')
    total_animes = c.fetchone()[0]
    
    c.execute('SELECT COUNT(*) FROM episodes')
    total_episodes = c.fetchone()[0]
    
    conn.close()
    
    return jsonify({
        'total_animes': total_animes,
        'total_episodes': total_episodes
    })

# 📋 Veritabanındaki animeleri listele (Mevcut siteniz için API)
@app.route('/api/animes', methods=['GET'])
def get_animes():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    c.execute('SELECT * FROM animes ORDER BY created_at DESC')
    animes = c.fetchall()
    
    conn.close()
    
    anime_list = []
    for anime in animes:
        anime_list.append({
            'id': anime[0],
            'title': anime[2],
            'slug': anime[3],
            'description': anime[4],
            'image': anime[5],
            'rating': anime[6],
            'status': anime[7],
            'year': anime[8],
            'genre': anime[9],
            'episode': anime[10]
        })
    
    return jsonify(anime_list)

# 🎬 Anime detayları
@app.route('/api/anime/<slug>', methods=['GET'])
def get_anime_detail(slug):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    c.execute('SELECT * FROM animes WHERE slug = ?', (slug,))
    anime = c.fetchone()
    
    if not anime:
        conn.close()
        return jsonify({'error': 'Anime bulunamadı'}), 404
    
    anime_id = anime[0]
    c.execute('SELECT * FROM episodes WHERE anime_id = ? ORDER BY episode_number', (anime_id,))
    episodes = c.fetchall()
    
    conn.close()
    
    return jsonify({
        'id': anime[0],
        'title': anime[2],
        'slug': anime[3],
        'description': anime[4],
        'image': anime[5],
        'rating': anime[6],
        'status': anime[7],
        'year': anime[8],
        'genres': anime[9].split(',') if anime[9] else [],
        'episodes': [{
            'episode_number': ep[2],
            'title': ep[3],
            'video_url': ep[4],
            'thumbnail': ep[5],
            'duration': ep[6]
        } for ep in episodes]
    })

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(
        debug=True,
        host='0.0.0.0',
        port=port,
        threaded=True
    )
  




