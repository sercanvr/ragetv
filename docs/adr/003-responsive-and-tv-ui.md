# ADR 003: Çoklu Cihaz ve Televizyon (10-Foot UI) Responsive Mimarisi

## Durum
Kabul Edildi

## Bağlam
Kullanıcılar RageTV'yi mobil telefon, tablet, dizüstü, masaüstü ve oturma odasında büyük ekranlı akıllı televizyon (Smart TV / TV Browser) üzerinden deneyimleyebilir.

## Karar
Tasarım Tailwind CSS mobil-öncelikli (mobile-first) breakpoint'lerine ek olarak özel bir televizyon breakpoint'i (`tv: min-width: 1920px`) ve 10-foot UI ergonomisini benimser:
1. **Mobile (<640px):** Kompakt üst kaydırılabilir oyun menüsü, dokunma odaklı tam genişlikte oynatıcı alanı.
2. **Tablet (640px - 1023px):** Orta boy sahne, açılır çekmece (drawer) ile maç bilgileri.
3. **Laptop/Desktop (≥1024px):** Sol daraltılabilir sidebar, 16:9 geniş PlayerStage, anlık LIVE rozetleri ve yan panel bilgileri.
4. **Television (tv: ≥1920px & 10-foot UI):** Yüksek kontrastlı görünür odak halkaları (`focus-visible:ring-4`), kumanda/D-pad ile gezinmeye uygun klavye navigasyonu, uzaktan rahat okunabilir ölçeklendirilmiş tipografi token'ları.

## Sonuçlar
- **Artılar:** Her ekranda kusursuz UX, oturma odasında TV üzerinden izleme konforu, WCAG AA erişilebilirlik.
