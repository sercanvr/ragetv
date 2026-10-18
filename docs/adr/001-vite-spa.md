# ADR 001: Vite SPA Tercihi

## Durum
Kabul Edildi

## Bağlam
RageTV, istemci tarafında zengin etkileşim (oyun seçimi, iframe yönetimi, canlı durum göstergeleri, yerel ayarlar) barındıran bir platformdur. Ağır bir SSR (Next.js) sunucu maliyeti ve karmaşıklığı yaratmadan, hızlı istemci deneyimi sunmak hedeflenmiştir.

## Karar
Uygulamanın çekirdeği **Vite + React SPA** olarak geliştirilecektir. Canlı API sorguları ve güvenlik token'ları için Vercel Functions üzerinde koşan hafif bir BFF katmanı kullanılacaktır.

## Sonuçlar
- **Artılar:** Sıfır sunucu kiralama maliyeti, anlık sayfa yükleme hızı, statik CDN dağıtımı.
- **Eksiler:** İleride maç bazlı dinamik OpenGraph/SEO paylaşım kartları gerekirse edge SSR veya pre-rendering değerlendirilecektir.
