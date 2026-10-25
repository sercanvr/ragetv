# ADR 002: Hono ile Hafif BFF (Backend-for-Frontend) Katmanı

## Durum
Kabul Edildi

## Bağlam
Twitch, YouTube ve PandaScore gibi harici sağlayıcıların API anahtarları (Client Secret vb.) tarayıcı tarafında açık şekilde saklanamaz. Ayrıca sağlayıcı isteklerini önbelleğe almak ve oran sınırlamalarına (rate limit) takılmamak için hafif bir sunucu katmanı gereklidir.

## Karar
Taşınabilir, ultra hafif ve Vercel Functions / Edge runtime ile uyumlu **Hono** framework'ü kullanılacaktır. `api/[[...route]].ts` üzerinden tüm `/api/*` istekleri yönlendirilecektir.

## Sonuçlar
- **Artılar:** API anahtarları güvende kalır, CDN yanıt önbelleklemesi (`s-maxage`, `stale-while-revalidate`) uygulanır, sağlayıcı değişiklikleri tek merkezden yönetilir.
- **Eksiler:** Sunucusuz fonksiyon soğuk başlatma (cold start) süresi minimaldir (~100-200ms) ancak CDN önbelleği ile bu etki ortadan kalkar.
