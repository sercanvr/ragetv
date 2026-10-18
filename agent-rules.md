# Agent Çalışma Kuralları

Bu dosya, IDE üzerinde çalışan agent'ın her görevde uyması gereken sabit kurallardır. Kurallar her prompt'ta tekrar açıklanmayacak, bu dosya referans alınacaktır.


---

## 1. Genel İlkeler

- Her göreve başlamadan önce görev analiz edilmeli, gerekli düşünme adımı tamamlanmalı ve ardından uygulamaya geçilmelidir. Doğrudan koda dalınmamalıdır.
- Kod yazılırken Clean Code, DRY (Don't Repeat Yourself) ve KISS (Keep It Simple, Stupid) prensiplerine uyulmalıdır.
- Projeye zarar verilmemesi için mevcut yapı ve konvansiyonlar dikkatle korunmalı, gereksiz yeniden yazım yapılmamalıdır.
- Görev tam olarak istenen kapsamda yerine getirilmeli, eksik veya kapsam dışı değişiklik yapılmamalıdır.
- `npm run lint` ve `npm run build` komutları agent tarafından çalıştırılmamalıdır. Bu kontroller kullanıcı tarafından manuel yapılacaktır.

---

## 2. Token ve Kaynak Kullanımı Kuralları

- Yanıtlar ve açıklamalar gerekenden fazla uzatılmamalı, gereksiz tekrar ve dolgu cümlelerden kaçınılmalıdır.
- Dosya okuma, tarama ve arama işlemleri gerekli olan minimum kapsamla sınırlı tutulmalıdır.
- **Yasaklı Dizinler:** Agent asla `.env*`, `node_modules`, `dist`, `build`, `.next`, `.git` klasörlerini ve `package-lock.json`, `yarn.lock` dosyalarını okumamalı/taramamalıdır.
- Aynı bilgi tekrar tekrar sorgulanmamalı, bir defa elde edilen bağlam görev boyunca hafızada tutulmalıdır.
- Değişiklikler mümkün olduğunca tek seferde ve verimli şekilde tamamlanmalı, parça parça deneme-yanılma yöntemi tercih edilmemelidir.

---

## 3. Görev Öncesi Kontrol Adımları

Her yeni görevden önce sırasıyla şu adımlar uygulanmalıdır.

1. Uzak depodaki `main` branch'in durumu sadece `git fetch origin main` ile kontrol edilir.
2. Hassas veri (API anahtarları, şifreler, token'lar vb.) kontrolü yapılmalı; hardcoded veri riski taşıyan dosyalar gözden geçirilerek gerekli güvenlik önlemleri hatırlatılmalıdır.
3. Bu kontrol tamamlanmadan yeni bir branch açılmamalıdır.
4. Yeni branch her zaman `origin/main` üzerinden açılır: `git checkout -b <branch-adı> origin/main`

---

## 4. Güvenlik Kuralları (OWASP Top 10 - Zorunlu Kontrol)

- Kod yazılırken şu 3 kritik nokta ek token harcamadan mutlaka kontrol edilmelidir:
    - a) Hardcoded secret / API key var mı?
    - b) `dangerouslySetInnerHTML`, `innerHTML`, `eval()` kullanımı ile XSS riski var mı?
    - c) SQL / NoSQL sorgularında string concatenation ile Injection riski var mı?
- Şüpheli veya riskli bir durum fark edilirse, kod düzeltilir ve görev raporunda `Security Note` başlığı altında kısaca belirtilir.

---

## 5. Responsive Tasarım Kuralları

- Yazılan her kod mobile-first felsefesi ile geliştirilmelidir.
- Sabit piksel değerleri yerine proje standardı olan Tailwind breakpoint'leri referans alınmalıdır:
  `sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px`
- Responsive kontrolü, ek token maliyeti yaratmayacak şekilde kodun genel uyumluluğunun gözden geçirilmesi şeklinde uygulanmalıdır.

---

## 6. Branch Oluşturma Kuralları

- Her görev için benzersiz ve göreve özgü yeni bir branch açılmalıdır.
- Branch adı İngilizce olmalı ve Conventional Commits standardına uygun bir önek taşımalıdır (örnek önekler `feat/`, `fix/`, `refactor/`, `chore/`, `docs/`).
- Branch adı, yapılan işin içeriğini kısa ve anlaşılır şekilde yansıtmalıdır.

---

## 7. Commit ve Dil Kuralları

- Her zaman local commit uygulanmalı; görev tam anlamıyla bitmeden ve kullanıcı `Kontroller tamamlandı, push edilebilir.` demeden kesinlikle push edilmemelidir.
- Commit başlığı ve açıklaması her zaman İngilizce ve Conventional Commits formatına uygun olmalıdır.
- Kod, değişken adları ve commitler %100 İngilizce; PR açıklaması ve raporlar %100 Türkçe ve edilgen dille yazılır.
- Push etmeden önce `git fetch origin main` ile conflict riski kontrol edilmelidir.

---

## 8. Görev Sonrası Raporlama Kuralları

Görev tamamlandığında kullanıcıya Türkçe ve edilgen bir dille, aşağıdaki sırayla ve başlıklarla rapor verilmelidir

### Yapılan Değişiklikler
- Yapılan her değişiklik madde halinde listelenmelidir.
- Değişiklik yapılan sayfa veya bileşenler, mutlaka ilgili URL bağlantısı ile belirtilerek raporlanmalıdır.

### PR Bilgisi
- Kullanıcıdan `Kontroller tamamlandı, push edilebilir.` komutu geldikten sonra PR Bilgisi verilmeli, her konuşma sonunda tekrar tekrar verilmemeli.
- Başlık İngilizce olmalıdır ve `fix: align songs page cards and admin song modal #906` formatındadır.
- Açıklama Türkçe, 🎯 Amaç - 🔨 Yapılanlar - 📝 Notlar - 🧪 Kontroller başlıkları ile maddeler halinde ve edilgen bir dille yazılmalıdır.
- Açıklamanın ilk satırı her zaman şu formatta olmalıdır: `İlgili issue #...`
- Sadece göreve uygun etiket(ler), sabit liste içinden seçilerek belirtilmelidir: `UI/UX`, `Feature`, `Frontend`, `Backend`, `Refactor`, `API`, `Bug`, `Await`, `Documentation`.

---

## 9. Günlük Rapor Kuralı (Google Form)

- Kullanıcı `Günlük rapor hazırla.` komutunu ilettiğinde, o an tamamlanmış olan görev için Google Form'a doğrudan yapıştırılabilecek bir özet hazırlanmalıdır.
- Format: `# Başlık (PR #...)` ile başlayan başlık ve altında Türkçe, edilgen, birkaç cümlelik net özet.

---

## 10. Genel Çalışma Akışı Özeti

1. Görev analiz edilir, düşünülür.
2. `origin/main` fetch edilir ve hassas veri kontrolü yapılır.
3. Göreve uygun, İngilizce ve Conventional Commits standardına uygun yeni bir branch `origin/main` üzerinden açılır.
4. Görev, Clean Code, DRY, KISS ve mobile-first prensiplerine uyularak tek seferde tamamlanır.
5. Yasaklı dizinler taranmaz, uygun sayıda İngilizce local commit atılır.
6. Lint ve build komutları çalıştırılmaz.
7. Görev bitiminde kullanıcıya Yapılan Değişiklikler raporu sunulur, onay sonrası PR Bilgisi verilir.

Bu kurallar her görevde otomatik olarak geçerlidir.