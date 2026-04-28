# -*- coding: utf-8 -*-
import json, os
DIR = os.path.dirname(os.path.abspath(__file__))

T = {
    'Restore': {'fr': 'Restaurer', 'es': 'Restaurar', 'de': 'Wiederherstellen', 'it': 'Ripristina', 'pt': 'Restaurar', 'nl': 'Herstellen', 'ca': 'Restaurar', 'ro': 'Restaurați', 'bg': 'Възстанови', 'el': 'Επαναφορά', 'ar': 'استعادة', 'he': 'שחזור', 'id': 'Pulihkan', 'ja': '復元'},
    'Restore completed': {'fr': 'Restauration terminée', 'es': 'Restauración completada', 'de': 'Wiederherstellung abgeschlossen', 'it': 'Ripristino completato', 'pt': 'Restauração concluída', 'nl': 'Herstel voltooid', 'ca': 'Restauració completada', 'ro': 'Restaurare finalizată', 'bg': 'Възстановяването завършено', 'el': 'Η επαναφορά ολοκληρώθηκε', 'ar': 'اكتمال الاستعادة', 'he': 'השחזור הושלם', 'id': 'Pemulihan selesai', 'ja': '復元完了'},
    'Restore this revision?': {'fr': 'Restaurer cette révision ?', 'es': '¿Restaurar esta revisión?', 'de': 'Diese Revision wiederherstellen?', 'it': 'Ripristinare questa revisione?', 'pt': 'Restaurar esta revisão?', 'nl': 'Deze revisie herstellen?', 'ca': 'Restaurar aquesta revisió?', 'ro': 'Restaurați această revizuire?', 'bg': 'Да се възстанови тази ревизия?', 'el': 'Επαναφορά αυτής της αναθεώρησης;', 'ar': 'استعادة هذه المراجعة؟', 'he': 'לשחזר גרסה זו?', 'id': 'Pulihkan revisi ini?', 'ja': 'このリビジョンを復元しますか？'},
    'Restore this version': {'fr': 'Restaurer cette version', 'es': 'Restaurar esta versión', 'de': 'Diese Version wiederherstellen', 'it': 'Ripristina questa versione', 'pt': 'Restaurar esta versão', 'nl': 'Deze versie herstellen', 'ca': 'Restaurar aquesta versió', 'ro': 'Restaurați această versiune', 'bg': 'Възстанови тази версия', 'el': 'Επαναφορά αυτής της έκδοσης', 'ar': 'استعادة هذا الإصدار', 'he': 'שחזור גרסה זו', 'id': 'Pulihkan versi ini', 'ja': 'このバージョンを復元'},
    'Restricted access entrance': {'fr': "Entrée à accès restreint", 'es': 'Entrada de acceso restringido', 'de': 'Eingang mit eingeschränktem Zugang', 'it': 'Ingresso ad accesso limitato', 'pt': 'Entrada de acesso restrito', 'nl': 'Ingang met beperkte toegang', 'ca': 'Entrada d\'accés restringit', 'ro': 'Intrare cu acces restricționat', 'bg': 'Вход с ограничен достъп', 'el': 'Είσοδος περιορισμένης πρόσβασης', 'ar': 'مدخل وصول مقيد', 'he': 'כניסה עם גישה מוגבלת', 'id': 'Pintu masuk akses terbatas', 'ja': 'アクセス制限付き入口'},
    'Results per page:': {'fr': 'Résultats par page :', 'es': 'Resultados por página:', 'de': 'Ergebnisse pro Seite:', 'it': 'Risultati per pagina:', 'pt': 'Resultados por página:', 'nl': 'Resultaten per pagina:', 'ca': 'Resultats per pàgina:', 'ro': 'Rezultate pe pagină:', 'bg': 'Резултати на страница:', 'el': 'Αποτελέσματα ανά σελίδα:', 'ar': 'النتائج لكل صفحة:', 'he': 'תוצאות לכל עמוד:', 'id': 'Hasil per halaman:', 'ja': 'ページあたりの結果：'},
    'Retry': {'fr': 'Réessayer', 'es': 'Reintentar', 'de': 'Wiederholen', 'it': 'Riprova', 'pt': 'Tentar novamente', 'nl': 'Opnieuw proberen', 'ca': 'Tornar a intentar', 'ro': 'Reîncercați', 'bg': 'Опитайте отново', 'el': 'Επαναλάβετε', 'ar': 'إعادة المحاولة', 'he': 'נסה שוב', 'id': 'Coba lagi', 'ja': '再試行'},
    'Review': {'fr': 'Révision', 'es': 'Revisión', 'de': 'Überprüfung', 'it': 'Revisione', 'pt': 'Revisão', 'nl': 'Beoordeling', 'ca': 'Revisió', 'ro': 'Recenzie', 'bg': 'Преглед', 'el': 'Ανασκόπηση', 'ar': 'مراجعة', 'he': 'ביקורת', 'id': 'Ulasan', 'ja': 'レビュー'},
    'Review date': {'fr': 'Date de révision', 'es': 'Fecha de revisión', 'de': 'Überprüfungsdatum', 'it': 'Data di revisione', 'pt': 'Data de revisão', 'nl': 'Beoordelingsdatum', 'ca': 'Data de revisió', 'ro': 'Data recenziei', 'bg': 'Дата на преглед', 'el': 'Ημερομηνία αναθεώρησης', 'ar': 'تاريخ المراجعة', 'he': 'תאריך ביקורת', 'id': 'Tanggal ulasan', 'ja': 'レビュー日'},
    'Reviewer': {'fr': 'Réviseur', 'es': 'Revisor', 'de': 'Prüfer', 'it': 'Revisore', 'pt': 'Revisor', 'nl': 'Beoordelaar', 'ca': 'Revisor', 'ro': 'Recenzent', 'bg': 'Рецензент', 'el': 'Αξιολογητής', 'ar': 'مراجع', 'he': 'מבקר', 'id': 'Pengulas', 'ja': 'レビュアー'},
    'Rigging': {'fr': 'Équipement', 'es': 'Equipamiento', 'de': 'Ausrüstung', 'it': 'Attrezzatura', 'pt': 'Equipamento', 'nl': 'Uitrusting', 'ca': 'Equipament', 'ro': 'Echipament', 'bg': 'Оборудване', 'el': 'Εξοπλισμός', 'ar': 'تجهيزات', 'he': 'ציוד', 'id': 'Perlengkapan', 'ja': 'リギング'},
    'Riggings': {'fr': 'Équipements', 'es': 'Equipamientos', 'de': 'Ausrüstungen', 'it': 'Attrezzature', 'pt': 'Equipamentos', 'nl': 'Uitrustingen', 'ca': 'Equipaments', 'ro': 'Echipamente', 'bg': 'Оборудвания', 'el': 'Εξοπλισμοί', 'ar': 'تجهيزات متعددة', 'he': 'ציודים', 'id': 'Perlengkapan-perlengkapan', 'ja': 'リギング類'},
    'Row': {'fr': 'Ligne', 'es': 'Fila', 'de': 'Zeile', 'it': 'Riga', 'pt': 'Linha', 'nl': 'Rij', 'ca': 'Fila', 'ro': 'Rând', 'bg': 'Ред', 'el': 'Γραμμή', 'ar': 'صف', 'he': 'שורה', 'id': 'Baris', 'ja': '行'},
    'Row:': {'fr': 'Ligne :', 'es': 'Fila:', 'de': 'Zeile:', 'it': 'Riga:', 'pt': 'Linha:', 'nl': 'Rij:', 'ca': 'Fila:', 'ro': 'Rând:', 'bg': 'Ред:', 'el': 'Γραμμή:', 'ar': 'صف:', 'he': 'שורה:', 'id': 'Baris:', 'ja': '行：'},
    'Rows:': {'fr': 'Lignes :', 'es': 'Filas:', 'de': 'Zeilen:', 'it': 'Righe:', 'pt': 'Linhas:', 'nl': "Rijen:", 'ca': 'Files:', 'ro': 'Rânduri:', 'bg': 'Редове:', 'el': 'Γραμμές:', 'ar': 'صفوف:', 'he': 'שורות:', 'id': 'Baris-baris:', 'ja': '行：'},
    'Satisfactory': {'fr': 'Satisfaisant', 'es': 'Satisfactorio', 'de': 'Befriedigend', 'it': 'Soddisfacente', 'pt': 'Satisfatório', 'nl': 'Bevredigend', 'ca': 'Satisfactori', 'ro': 'Satisfăcător', 'bg': 'Задоволително', 'el': 'Ικανοποιητικό', 'ar': 'مُرضٍ', 'he': 'משביע רצון', 'id': 'Memuaskan', 'ja': '満足'},
    'Search among Grottocenter users...': {'fr': 'Rechercher parmi les utilisateurs de Grottocenter...', 'es': 'Buscar entre los usuarios de Grottocenter...', 'de': 'Unter Grottocenter-Benutzern suchen...', 'it': 'Cerca tra gli utenti di Grottocenter...', 'pt': 'Pesquisar entre os utilizadores do Grottocenter...', 'nl': 'Zoeken onder Grottocenter-gebruikers...', 'ca': 'Cercar entre els usuaris de Grottocenter...', 'ro': 'Căutați printre utilizatorii Grottocenter...', 'bg': 'Търсене сред потребителите на Grottocenter...', 'el': 'Αναζήτηση μεταξύ χρηστών του Grottocenter...', 'ar': 'البحث بين مستخدمي Grottocenter...', 'he': 'חיפוש בין משתמשי Grottocenter...', 'id': 'Cari di antara pengguna Grottocenter...', 'ja': 'Grottocenterユーザーを検索...'},
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
