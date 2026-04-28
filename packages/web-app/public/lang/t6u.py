# -*- coding: utf-8 -*-
import json, os
DIR = os.path.dirname(os.path.abspath(__file__))

T = {
    'Publication number (BBS legacy)': {'fr': 'Numéro de publication (héritage BBS)', 'es': 'Número de publicación (legado BBS)', 'de': 'Publikationsnummer (BBS-Legacy)', 'it': 'Numero di pubblicazione (legacy BBS)', 'pt': 'Número de publicação (legado BBS)', 'nl': 'Publicatienummer (BBS legacy)', 'ca': 'Número de publicació (llegat BBS)', 'ro': 'Numărul publicației (moștenire BBS)', 'bg': 'Номер на публикация (BBS наследство)', 'el': 'Αριθμός δημοσίευσης (BBS κληρονομιά)', 'ar': 'رقم النشر (موروث BBS)', 'he': 'מספר פרסום (BBS legacy)', 'id': 'Nomor publikasi (warisan BBS)', 'ja': '出版番号（BBSレガシー）'},
    'Publisher': {'fr': 'Éditeur', 'es': 'Editor', 'de': 'Herausgeber', 'it': 'Editore', 'pt': 'Editor', 'nl': 'Uitgever', 'ca': 'Editor', 'ro': 'Editor', 'bg': 'Издател', 'el': 'Εκδότης', 'ar': 'الناشر', 'he': 'מוציא לאור', 'id': 'Penerbit', 'ja': '出版社'},
    'Query': {'fr': 'Requête', 'es': 'Consulta', 'de': 'Abfrage', 'it': 'Query', 'pt': 'Consulta', 'nl': 'Zoekopdracht', 'ca': 'Consulta', 'ro': 'Interogare', 'bg': 'Заявка', 'el': 'Ερώτημα', 'ar': 'استعلام', 'he': 'שאילתה', 'id': 'Kueri', 'ja': 'クエリ'},
    'Question mark': {'fr': 'Point d\'interrogation', 'es': 'Signo de interrogación', 'de': 'Fragezeichen', 'it': 'Punto interrogativo', 'pt': 'Ponto de interrogação', 'nl': 'Vraagteken', 'ca': 'Signe d\'interrogació', 'ro': 'Semn de întrebare', 'bg': 'Въпросителен знак', 'el': 'Ερωτηματικό', 'ar': 'علامة استفهام', 'he': 'סימן שאלה', 'id': 'Tanda tanya', 'ja': 'クエスチョンマーク'},
    'Read': {'fr': 'Lu', 'es': 'Leído', 'de': 'Gelesen', 'it': 'Letto', 'pt': 'Lido', 'nl': 'Gelezen', 'ca': 'Llegit', 'ro': 'Citit', 'bg': 'Прочетено', 'el': 'Διαβάστηκε', 'ar': 'مقروء', 'he': 'נקרא', 'id': 'Dibaca', 'ja': '既読'},
    'Read date': {'fr': 'Date de lecture', 'es': 'Fecha de lectura', 'de': 'Lesedatum', 'it': 'Data di lettura', 'pt': 'Data de leitura', 'nl': 'Leesdatum', 'ca': 'Data de lectura', 'ro': 'Data citirii', 'bg': 'Дата на четене', 'el': 'Ημερομηνία ανάγνωσης', 'ar': 'تاريخ القراءة', 'he': 'תאריך קריאה', 'id': 'Tanggal dibaca', 'ja': '読んだ日付'},
    'Read?': {'fr': 'Lu ?', 'es': '¿Leído?', 'de': 'Gelesen?', 'it': 'Letto?', 'pt': 'Lido?', 'nl': 'Gelezen?', 'ca': 'Llegit?', 'ro': 'Citit?', 'bg': 'Прочетено?', 'el': 'Διαβάστηκε;', 'ar': 'مقروء؟', 'he': 'נקרא?', 'id': 'Dibaca?', 'ja': '既読？'},
    'Recent changes': {'fr': 'Modifications récentes', 'es': 'Cambios recientes', 'de': 'Letzte Änderungen', 'it': 'Modifiche recenti', 'pt': 'Alterações recentes', 'nl': 'Recente wijzigingen', 'ca': 'Canvis recents', 'ro': 'Modificări recente', 'bg': 'Последни промени', 'el': 'Πρόσφατες αλλαγές', 'ar': 'التغييرات الأخيرة', 'he': 'שינויים אחרונים', 'id': 'Perubahan terbaru', 'ja': '最近の変更'},
    'Refresh the page to browse Grottocenter again.': {'fr': 'Actualisez la page pour naviguer à nouveau sur Grottocenter.', 'es': 'Actualice la página para navegar por Grottocenter de nuevo.', 'de': 'Aktualisieren Sie die Seite, um Grottocenter erneut zu durchsuchen.', 'it': 'Aggiorna la pagina per navigare nuovamente su Grottocenter.', 'pt': 'Atualize a página para navegar novamente no Grottocenter.', 'nl': 'Ververs de pagina om Grottocenter opnieuw te bladeren.', 'ca': 'Actualitzeu la pàgina per navegar per Grottocenter de nou.', 'ro': 'Reîncărcați pagina pentru a naviga din nou pe Grottocenter.', 'bg': 'Обновете страницата, за да разглеждате Grottocenter отново.', 'el': 'Ανανεώστε τη σελίδα για να περιηγηθείτε ξανά στο Grottocenter.', 'ar': 'قم بتحديث الصفحة لتصفح Grottocenter مرة أخرى.', 'he': 'רענן את הדף כדי לגלוש שוב ב-Grottocenter.', 'id': 'Segarkan halaman untuk menjelajahi Grottocenter lagi.', 'ja': 'ページを更新してGrottocenterを再び閲覧してください。'},
    'Region': {'fr': 'Région', 'es': 'Región', 'de': 'Region', 'it': 'Regione', 'pt': 'Região', 'nl': 'Regio', 'ca': 'Regió', 'ro': 'Regiune', 'bg': 'Регион', 'el': 'Περιοχή', 'ar': 'منطقة', 'he': 'אזור', 'id': 'Wilayah', 'ja': '地域'},
    'Regional speleology': {'fr': 'Spéléologie régionale', 'es': 'Espeleología regional', 'de': 'Regionale Speläologie', 'it': 'Speleologia regionale', 'pt': 'Espeleologia regional', 'nl': 'Regionale speleologie', 'ca': 'Espeleologia regional', 'ro': 'Speologie regională', 'bg': 'Регионална спелеология', 'el': 'Περιφερειακή σπηλαιολογία', 'ar': 'الكهف الإقليمي', 'he': 'ספלאולוגיה אזורית', 'id': 'Speleologi regional', 'ja': '地域洞窟学'},
    'Regions': {'fr': 'Régions', 'es': 'Regiones', 'de': 'Regionen', 'it': 'Regioni', 'pt': 'Regiões', 'nl': "Regio's", 'ca': 'Regions', 'ro': 'Regiuni', 'bg': 'Региони', 'el': 'Περιοχές', 'ar': 'مناطق', 'he': 'אזורים', 'id': 'Wilayah', 'ja': '地域'},
    'Related to': {'fr': 'Lié à', 'es': 'Relacionado con', 'de': 'Bezogen auf', 'it': 'Correlato a', 'pt': 'Relacionado com', 'nl': 'Gerelateerd aan', 'ca': 'Relacionat amb', 'ro': 'Legat de', 'bg': 'Свързано с', 'el': 'Σχετικό με', 'ar': 'مرتبط بـ', 'he': 'קשור ל-', 'id': 'Terkait dengan', 'ja': '関連する'},
    'Reload': {'fr': 'Recharger', 'es': 'Recargar', 'de': 'Neu laden', 'it': 'Ricaricare', 'pt': 'Recarregar', 'nl': 'Herladen', 'ca': 'Recarregar', 'ro': 'Reîncărcați', 'bg': 'Презареди', 'el': 'Επαναφόρτωση', 'ar': 'إعادة تحميل', 'he': 'טען מחדש', 'id': 'Muat ulang', 'ja': '再読み込み'},
    'Remove from my explored caves': {'fr': 'Retirer de mes grottes explorées', 'es': 'Eliminar de mis cuevas exploradas', 'de': 'Aus meinen erkundeten Höhlen entfernen', 'it': 'Rimuovi dalle mie grotte esplorate', 'pt': 'Remover das minhas cavernas exploradas', 'nl': 'Verwijder uit mijn verkende grotten', 'ca': 'Treure de les meves coves explorades', 'ro': 'Elimina din peșterile mele explorate', 'bg': 'Премахни от изследваните ми пещери', 'el': 'Αφαίρεση από τα εξερευνημένα σπήλαιά μου', 'ar': 'إزالة من كهوفي المستكشفة', 'he': 'הסר מהמערות שחקרתי', 'id': 'Hapus dari gua yang sudah saya jelajahi', 'ja': '探索済み洞窟から削除'},
    'Remove from organization': {'fr': "Retirer de l'organisation", 'es': 'Eliminar de la organización', 'de': 'Aus der Organisation entfernen', 'it': "Rimuovi dall'organizzazione", 'pt': 'Remover da organização', 'nl': 'Verwijder uit organisatie', 'ca': "Treure de l'organització", 'ro': 'Elimina din organizație', 'bg': 'Премахни от организацията', 'el': 'Αφαίρεση από την οργάνωση', 'ar': 'إزالة من المنظمة', 'he': 'הסר מהארגון', 'id': 'Hapus dari organisasi', 'ja': '組織から削除'},
    'Repeat your password here.': {'fr': 'Répétez votre mot de passe ici.', 'es': 'Repita su contraseña aquí.', 'de': 'Wiederholen Sie hier Ihr Passwort.', 'it': 'Ripeti qui la tua password.', 'pt': 'Repita aqui a sua palavra-passe.', 'nl': 'Herhaal hier uw wachtwoord.', 'ca': 'Repetiu aquí la vostra contrasenya.', 'ro': 'Repetați parola aici.', 'bg': 'Повторете паролата си тук.', 'el': 'Επαναλάβετε τον κωδικό σας εδώ.', 'ar': 'أعد كتابة كلمة المرور هنا.', 'he': 'חזור על הסיסמה שלך כאן.', 'id': 'Ulangi kata sandi Anda di sini.', 'ja': 'ここにパスワードを繰り返し入力してください。'},
    'Report': {'fr': 'Rapport', 'es': 'Informe', 'de': 'Bericht', 'it': 'Rapporto', 'pt': 'Relatório', 'nl': 'Rapport', 'ca': 'Informe', 'ro': 'Raport', 'bg': 'Доклад', 'el': 'Αναφορά', 'ar': 'تقرير', 'he': 'דוח', 'id': 'Laporan', 'ja': 'レポート'},
    'Reset': {'fr': 'Réinitialiser', 'es': 'Restablecer', 'de': 'Zurücksetzen', 'it': 'Reimposta', 'pt': 'Redefinir', 'nl': 'Resetten', 'ca': 'Restablir', 'ro': 'Resetați', 'bg': 'Нулиране', 'el': 'Επαναφορά', 'ar': 'إعادة تعيين', 'he': 'איפוס', 'id': 'Reset', 'ja': 'リセット'},
    'Reset your password': {'fr': 'Réinitialisez votre mot de passe', 'es': 'Restablezca su contraseña', 'de': 'Setzen Sie Ihr Passwort zurück', 'it': 'Reimposta la tua password', 'pt': 'Redefina a sua palavra-passe', 'nl': 'Reset uw wachtwoord', 'ca': 'Restabliu la vostra contrasenya', 'ro': 'Resetați parola', 'bg': 'Нулирайте паролата си', 'el': 'Επαναφέρτε τον κωδικό σας', 'ar': 'أعد تعيين كلمة مرورك', 'he': 'אפס את הסיסמה שלך', 'id': 'Reset kata sandi Anda', 'ja': 'パスワードをリセット'},
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
