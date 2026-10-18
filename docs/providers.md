# RageTV — Sağlayıcı ve Entegrasyon Dokümantasyonu (`docs/providers.md`)

> **Durum:** M0 Araştırma ve Doğrulama Çıktısı  
> **Amaç:** Yasal uyumluluk, resmi embed kuralları, API kotaları, limitler ve resmi kanal kayıtlarının belgelenmesi.

---

## 1. Yasal Çerçeve ve Embed Politikaları

RageTV, **yalnızca resmi platformların üçüncü taraf web sitelerine izin verdiği gömülü (embed) oynatıcılarını** kullanır.

### Temel Kurallar
1. **Video barındırma (hosting) YOK:** Sunucularımızda hiçbir video dosyası veya ses akışı tutulmaz.
2. **Restream / Proxy YOK:** Akış doğrudan son kullanıcının tarayıcısı ile kaynak platform (Twitch/YouTube) arasında gerçekleşir.
3. **Scraping YOK:** HLTV veya benzeri telifli/korumalı sitelerden scraping yapılmaz. Yalnızca resmi geliştirici API'ları (Twitch Helix, YouTube Data API, PandaScore) kullanılır.
4. **Oynatıcı Değiştirilemez:** İframe veya oynatıcı üzerine logo/banner bindirilemez, kontroller gizlenemez veya tahrif edilemez.
5. **Kill Switch:** Herhangi bir hak sahibi talepte bulunduğunda ilgili kanal veya turnuva `shared/registry/killswitch.ts` üzerinden anında yayından kaldırılabilir.

---

## 2. Sağlayıcı Karşılaştırma ve Doğrulama Tablosu

| Sağlayıcı | Amaç | Kimlik Doğrulama | Kota / Limit | Yasal Not & Uyum |
|---|---|---|---|---|
| **Twitch Helix API & Embed** | Canlı yayın durumu, VOD, canlı oynatıcı | Client Credentials (Sunucu tarafı) | 800 req / dk (Helix) | `parent` parametresi zorunludur. Boyut min. 400x300 px olmalıdır. |
| **YouTube Data API v3 & Embed** | VOD listeleri, resmi turnuva canlı yayınları | API Key (Sunucu tarafı) | 10.000 birim / gün (Ücretsiz) | `playlistItems` (1 birim) kullanılır, maliyetli `search` (100 birim) **kullanılmaz**. |
| **PandaScore REST API** | Turnuva fikstürü, yaklaşan maçlar, sonuçlar | Bearer Token (Sunucu tarafı) | ~1000 istek/saat (Free Tier) | CS2 uçları `/csgo/` önekine sahiptir. Yalnızca ticari olmayan kullanım. |
| **Kick (Faz 2)** | Gelecek canlı yayın entegrasyonu | OAuth 2.1 (Resmi API) | İnceleniyor | Gayriresmî uçlar (`api/v2`) kesinlikle **kullanılmaz**. |

---

## 3. Desteklenen 5 Oyun ve Doğrulanmış Resmi Kanallar (v1 Registry)

Aşağıdaki kanallar ve turnuva organizatörleri Faz 0 kapsamında resmi kaynaklardan doğrulanmıştır:

### 1. CS2 (Counter-Strike 2)
- **Twitch Resmi Kanallar:**
  - `eslcs` (ESL Pro League, IEM)
  - `blastpremier` (BLAST Premier)
  - `pgl` (PGL Major)
- **YouTube:** ESL CS / BLAST Premier resmi turnuva kanalları
- **VOD Kaynağı:** BLAST / ESL turnuva playlistleri

### 2. Valorant
- **Twitch Resmi Kanallar:**
  - `valorant` (VCT Official)
  - `valorant_emea` (VCT EMEA)
  - `valorant_americas` (VCT Americas)
  - `valorant_pacific` (VCT Pacific)
- **YouTube:** Valorant Champions Tour YouTube kanalı

### 3. PUBG: Battlegrounds
- **Twitch Resmi Kanallar:**
  - `pubg_battlegrounds` (PUBG Global Series)
- **YouTube:** PUBG Esports Official
- **VOD:** PUBG Continental Series / Global Championship resmi özetleri ve maçları

### 4. League of Legends (LoL)
- **Twitch Resmi Kanallar:**
  - `riotgames` (MSI, Worlds)
  - `lec` (League of Legends EMEA Championship)
  - `lck` (LCK Global)
- **YouTube:** LoL Esports Resmi Kanalı

### 5. Dota 2
- **Twitch Resmi Kanallar:**
  - `pgl_dota2` (PGL Wallachia)
  - `esl_dota2` (DreamLeague, ESL One)
  - `dota2ti` (The International)
- **YouTube:** PGL / ESL Dota 2 turnuva kanalları

---

## 4. Önbellek ve Altyapı Stratejisi (Sıfır Maliyet)

Sağlayıcı limitlerini aşmamak ve kullanıcıya anlık veri sunmak için:
- `/api/live` → `s-maxage=30, stale-while-revalidate=60`
- `/api/vod` → `s-maxage=600, stale-while-revalidate=3600`
- `/api/fixtures` → `s-maxage=120, stale-while-revalidate=600`
- İstemci tarafı (TanStack Query): Sekme arka plandayken sorgulama durur, üstel geri çekilme (exponential backoff) devrededir.
