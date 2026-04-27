# -*- coding: utf-8 -*-
import json, os
DIR = os.path.dirname(os.path.abspath(__file__))

T = {
    # Lowercase utility keys
    'account of current user': {'fr': 'compte de l\'utilisateur actuel', 'es': 'cuenta del usuario actual', 'de': 'Konto des aktuellen Benutzers', 'it': 'account dell\'utente attuale', 'pt': 'conta do utilizador atual', 'nl': 'account van huidige gebruiker', 'ca': 'compte de l\'usuari actual', 'ro': 'contul utilizatorului curent', 'bg': 'акаунт на текущия потребител', 'el': 'λογαριασμός τρέχοντος χρήστη', 'ar': 'حساب المستخدم الحالي', 'he': 'חשבון המשתמש הנוכחי', 'id': 'akun pengguna saat ini', 'ja': '現在のユーザーのアカウント'},
    'addresstype.region': {'fr': 'Région', 'es': 'Región', 'de': 'Region', 'it': 'Regione', 'pt': 'Região', 'nl': 'Regio', 'ca': 'Regió', 'ro': 'Regiune', 'bg': 'Регион', 'el': 'Περιοχή', 'ar': 'منطقة', 'he': 'אזור', 'id': 'Wilayah', 'ja': '地域'},
    'addresstype.road': {'fr': 'Route', 'es': 'Carretera', 'de': 'Straße', 'it': 'Strada', 'pt': 'Estrada', 'nl': 'Weg', 'ca': 'Carretera', 'ro': 'Drum', 'bg': 'Път', 'el': 'Δρόμος', 'ar': 'طريق', 'he': 'כביש', 'id': 'Jalan', 'ja': '道路'},
    'addresstype.tourism': {'fr': 'Tourisme', 'es': 'Turismo', 'de': 'Tourismus', 'it': 'Turismo', 'pt': 'Turismo', 'nl': 'Toerisme', 'ca': 'Turisme', 'ro': 'Turism', 'bg': 'Туризъм', 'el': 'Τουρισμός', 'ar': 'سياحة', 'he': 'תיירות', 'id': 'Pariwisata', 'ja': '観光'},
    'addresstype.town': {'fr': 'Ville', 'es': 'Ciudad', 'de': 'Stadt', 'it': 'Città', 'pt': 'Cidade', 'nl': 'Stad', 'ca': 'Ciutat', 'ro': 'Oraș', 'bg': 'Град', 'el': 'Πόλη', 'ar': 'مدينة', 'he': 'עיר', 'id': 'Kota', 'ja': '市町村'},
    'anchors': {'fr': 'amarrages', 'es': 'anclajes', 'de': 'Anker', 'it': 'ancoraggi', 'pt': 'ancoragens', 'nl': 'ankers', 'ca': 'ancoratges', 'ro': 'ancore', 'bg': 'закотвяния', 'el': 'αγκύρια', 'ar': 'مراسي', 'he': 'עוגנים', 'id': 'jangkar', 'ja': 'アンカー'},
    'are accessible.': {'fr': 'sont accessibles.', 'es': 'son accesibles.', 'de': 'sind zugänglich.', 'it': 'sono accessibili.', 'pt': 'são acessíveis.', 'nl': 'zijn toegankelijk.', 'ca': 'són accessibles.', 'ro': 'sunt accesibile.', 'bg': 'са достъпни.', 'el': 'είναι προσβάσιμα.', 'ar': 'متاحة.', 'he': 'נגישים.', 'id': 'dapat diakses.', 'ja': 'アクセス可能。'},
    'are available.': {'fr': 'sont disponibles.', 'es': 'están disponibles.', 'de': 'sind verfügbar.', 'it': 'sono disponibili.', 'pt': 'estão disponíveis.', 'nl': 'zijn beschikbaar.', 'ca': 'estan disponibles.', 'ro': 'sunt disponibile.', 'bg': 'са налични.', 'el': 'είναι διαθέσιμα.', 'ar': 'متوفرة.', 'he': 'זמינים.', 'id': 'tersedia.', 'ja': '利用可能。'},
    'are referenced.': {'fr': 'sont référencés.', 'es': 'están referenciados.', 'de': 'sind referenziert.', 'it': 'sono referenziati.', 'pt': 'estão referenciados.', 'nl': 'zijn gerefereerd.', 'ca': 'estan referenciats.', 'ro': 'sunt referențiate.', 'bg': 'са посочени.', 'el': 'είναι αναφερόμενα.', 'ar': 'مُشار إليها.', 'he': 'מוזכרים.', 'id': 'direferensikan.', 'ja': '参照済み。'},
    'are registered on the website.': {'fr': 'sont inscrits sur le site.', 'es': 'están registrados en el sitio web.', 'de': 'sind auf der Website registriert.', 'it': 'sono registrati sul sito.', 'pt': 'estão registados no site.', 'nl': 'zijn geregistreerd op de website.', 'ca': 'estan registrats al lloc web.', 'ro': 'sunt înregistrate pe site.', 'bg': 'са регистрирани на сайта.', 'el': 'είναι εγγεγραμμένα στον ιστότοπο.', 'ar': 'مسجلة على الموقع.', 'he': 'רשומים באתר.', 'id': 'terdaftar di situs web.', 'ja': 'ウェブサイトに登録済み。'},
    'are represented on this website.': {'fr': 'sont représentés sur ce site.', 'es': 'están representados en este sitio web.', 'de': 'sind auf dieser Website vertreten.', 'it': 'sono rappresentati su questo sito.', 'pt': 'estão representados neste site.', 'nl': 'zijn vertegenwoordigd op deze website.', 'ca': 'estan representats en aquest lloc web.', 'ro': 'sunt reprezentate pe acest site.', 'bg': 'са представени на този сайт.', 'el': 'αντιπροσωπεύονται σε αυτόν τον ιστότοπο.', 'ar': 'ممثلة على هذا الموقع.', 'he': 'מיוצגים באתר זה.', 'id': 'diwakili di situs web ini.', 'ja': 'このウェブサイトで表示。'},
    'author.by': {'fr': 'par', 'es': 'por', 'de': 'von', 'it': 'di', 'pt': 'por', 'nl': 'door', 'ca': 'per', 'ro': 'de', 'bg': 'от', 'el': 'από', 'ar': 'بواسطة', 'he': 'מאת', 'id': 'oleh', 'ja': '著者'},
    'author.unknown': {'fr': 'auteur inconnu', 'es': 'autor desconocido', 'de': 'unbekannter Autor', 'it': 'autore sconosciuto', 'pt': 'autor desconhecido', 'nl': 'onbekende auteur', 'ca': 'autor desconegut', 'ro': 'autor necunoscut', 'bg': 'неизвестен автор', 'el': 'άγνωστος συγγραφέας', 'ar': 'مؤلف مجهول', 'he': 'מחבר לא ידוע', 'id': 'penulis tidak dikenal', 'ja': '不明な著者'},
    'average depth': {'fr': 'profondeur moyenne', 'es': 'profundidad media', 'de': 'durchschnittliche Tiefe', 'it': 'profondità media', 'pt': 'profundidade média', 'nl': 'gemiddelde diepte', 'ca': 'profunditat mitjana', 'ro': 'adâncime medie', 'bg': 'средна дълбочина', 'el': 'μέσο βάθος', 'ar': 'متوسط العمق', 'he': 'עומק ממוצע', 'id': 'kedalaman rata-rata', 'ja': '平均深度'},
    'average length': {'fr': 'longueur moyenne', 'es': 'longitud media', 'de': 'durchschnittliche Länge', 'it': 'lunghezza media', 'pt': 'comprimento médio', 'nl': 'gemiddelde lengte', 'ca': 'longitud mitjana', 'ro': 'lungime medie', 'bg': 'средна дължина', 'el': 'μέσο μήκος', 'ar': 'متوسط الطول', 'he': 'אורך ממוצע', 'id': 'panjang rata-rata', 'ja': '平均長さ'},
    'between 2 and 5 years': {'fr': 'entre 2 et 5 ans', 'es': 'entre 2 y 5 años', 'de': 'zwischen 2 und 5 Jahren', 'it': 'tra 2 e 5 anni', 'pt': 'entre 2 e 5 anos', 'nl': 'tussen 2 en 5 jaar', 'ca': 'entre 2 i 5 anys', 'ro': 'între 2 și 5 ani', 'bg': 'между 2 и 5 години', 'el': 'μεταξύ 2 και 5 ετών', 'ar': 'بين 2 و 5 سنوات', 'he': 'בין 2 ל-5 שנים', 'id': 'antara 2 dan 5 tahun', 'ja': '2〜5年前'},
    'between 5 and 10 years': {'fr': 'entre 5 et 10 ans', 'es': 'entre 5 y 10 años', 'de': 'zwischen 5 und 10 Jahren', 'it': 'tra 5 e 10 anni', 'pt': 'entre 5 e 10 anos', 'nl': 'tussen 5 en 10 jaar', 'ca': 'entre 5 i 10 anys', 'ro': 'între 5 și 10 ani', 'bg': 'между 5 и 10 години', 'el': 'μεταξύ 5 και 10 ετών', 'ar': 'بين 5 و 10 سنوات', 'he': 'בין 5 ל-10 שנים', 'id': 'antara 5 dan 10 tahun', 'ja': '5〜10年前'},
    'cave': {'fr': 'cavité', 'es': 'cueva', 'de': 'Höhle', 'it': 'grotta', 'pt': 'caverna', 'nl': 'grot', 'ca': 'cova', 'ro': 'peșteră', 'bg': 'пещера', 'el': 'σπήλαιο', 'ar': 'كهف', 'he': 'מערה', 'id': 'gua', 'ja': '洞窟'},
    'cave(s) (1 or multiple entrances)': {'fr': 'cavité(s) (1 ou plusieurs entrées)', 'es': 'cueva(s) (1 o múltiples entradas)', 'de': 'Höhle(n) (1 oder mehrere Eingänge)', 'it': 'grotta/e (1 o più ingressi)', 'pt': 'caverna(s) (1 ou várias entradas)', 'nl': 'grot(ten) (1 of meerdere ingangen)', 'ca': 'cova/es (1 o múltiples entrades)', 'ro': 'peșteră/i (1 sau mai multe intrări)', 'bg': 'пещера/и (1 или няколко входа)', 'el': 'σπήλαιο/α (1 ή πολλές είσοδοι)', 'ar': 'كهف/كهوف (مدخل أو مداخل متعددة)', 'he': 'מערה/ות (כניסה אחת או יותר)', 'id': 'gua (1 atau beberapa pintu masuk)', 'ja': '洞窟（1つまたは複数の入口）'},
    'cave(s) are diveable': {'fr': 'cavité(s) plongeable(s)', 'es': 'cueva(s) sifón(es)', 'de': 'Höhle(n) sind tauchbar', 'it': 'grotta/e immergibile/i', 'pt': 'caverna(s) mergulhável(eis)', 'nl': 'grot(ten) zijn duikbaar', 'ca': 'cova/es amb immersió', 'ro': 'peșteră/i cu scufundare', 'bg': 'пещера/и за гмуркане', 'el': 'σπήλαιο/α για κατάδυση', 'ar': 'كهف/كهوف قابل للغوص', 'he': 'מערה/ות לצלילה', 'id': 'gua yang bisa diselamI', 'ja': '洞窟（潜水可能）'},
    'cavers': {'fr': 'spéléologues', 'es': 'espeleólogos', 'de': 'Höhlenforscher', 'it': 'speleologi', 'pt': 'espeleólogos', 'nl': 'speleologen', 'ca': 'espeleòlegs', 'ro': 'speologi', 'bg': 'спелеолози', 'el': 'σπηλαιολόγοι', 'ar': 'مستكشفو الكهوف', 'he': 'ספלאולוגים', 'id': 'penjelajah gua', 'ja': '洞窟探検家'},
    'changed': {'fr': 'modifié', 'es': 'cambiado', 'de': 'geändert', 'it': 'modificato', 'pt': 'alterado', 'nl': 'gewijzigd', 'ca': 'canviat', 'ro': 'modificat', 'bg': 'променено', 'el': 'άλλαξε', 'ar': 'تغيّر', 'he': 'שונה', 'id': 'diubah', 'ja': '変更'},
    'clear filter': {'fr': 'effacer le filtre', 'es': 'limpiar filtro', 'de': 'Filter löschen', 'it': 'cancella filtro', 'pt': 'limpar filtro', 'nl': 'filter wissen', 'ca': 'esborrar filtre', 'ro': 'ștergeți filtrul', 'bg': 'изчисти филтъра', 'el': 'εκκαθάριση φίλτρου', 'ar': 'مسح الفلتر', 'he': 'נקה מסנן', 'id': 'hapus filter', 'ja': 'フィルターをクリア'},
    'close': {'fr': 'fermer', 'es': 'cerrar', 'de': 'schließen', 'it': 'chiudi', 'pt': 'fechar', 'nl': 'sluiten', 'ca': 'tancar', 'ro': 'închide', 'bg': 'затвори', 'el': 'κλείσιμο', 'ar': 'إغلاق', 'he': 'סגור', 'id': 'tutup', 'ja': '閉じる'},
}

with open(os.path.join(DIR, 'en.json'), encoding='utf-8') as f:
    en = json.load(f)

total = 0
for lang in ['fr','es','it','pt','de','nl','ca','ro','bg','el','ar','he','id','ja']:
    path = os.path.join(DIR, f'{lang}.json')
    with open(path, encoding='utf-8') as f:
        d = json.load(f)
    n = 0
    for k, langs in T.items():
        if k in en and lang in langs and (k not in d or d[k] == en[k]):
            d[k] = langs[lang]; n += 1
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(dict(sorted(d.items())), f, ensure_ascii=False, indent=2)
    total += n
    print(f'{lang}: +{n}')
print(f'Total: {total}')
