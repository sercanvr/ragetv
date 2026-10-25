# ADR 004: Puan Durumu (Standings) Özelliğinin Faz 2'ye Ertelenmesi

## Durum
Kabul Edildi (M5 Değerlendirmesi)

## Bağlam
RageTV v1 kapsamında 5 büyük rekabetçi espor oyunu (CS2, Valorant, PUBG, LoL, Dota 2) desteklenmektedir. Turnuva puan durumları ve lig tabloları (Standings/Brackets):
1. Espor turnuvalarında (örn. Major İsviçre sistemi, GSL grupları, tek elemeli playoff ağaçları) standart bir lig tablosu formatına sahip değildir.
2. PandaScore ücretsiz ("Fixtures") planında lig puan durumu (standings) ve canlı bracket verisi sağlanmamaktadır.
3. Liquipedia veya HLTV üzerinden scraping yapmak mimari ilkemiz (Bölüm 2 D2) gereği kesinlikle yasaktır.

## Karar
M5 (Standings) aşaması, sahte/mock veri üretmeme ve veri dürüstlüğü ilkemiz (Bölüm 15) gereğince v1'de ertelenmiş; bunun yerine M4'te tamamlanan gerçek zamanlı espor fikstürleri, yaklaşan maçlar, geri sayım ve maç skorları öne çıkarılmıştır. İleride resmi turnuva organizatörleri veya genişletilmiş API planı ile Faz 2 kapsamında yeniden ele alınacaktır.

## Sonuçlar
- **Artılar:** Veri dürüstlüğü korunur, sahte veya bayat tablo gösterilmez, yasal scraping riski sıfır kalır.
- **Eksiler:** v1'de turnuva puan tablosu yerine doğrudan maç takvimi ve skorlar yer alır.
