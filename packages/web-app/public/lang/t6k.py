# -*- coding: utf-8 -*-
import json, os
DIR = os.path.dirname(os.path.abspath(__file__))

T = {
    'cumulated length': {'fr': 'longueur cumulée', 'es': 'longitud acumulada', 'de': 'kumulierte Länge', 'it': 'lunghezza cumulata', 'pt': 'comprimento acumulado', 'nl': 'gecumuleerde lengte', 'ca': 'longitud acumulada', 'ro': 'lungime cumulată', 'bg': 'кумулативна дължина', 'el': 'αθροιστικό μήκος', 'ar': 'الطول التراكمي', 'he': 'אורך מצטבר', 'id': 'panjang kumulatif', 'ja': '累積長さ'},
    'delete': {'fr': 'supprimer', 'es': 'eliminar', 'de': 'löschen', 'it': 'elimina', 'pt': 'eliminar', 'nl': 'verwijderen', 'ca': 'eliminar', 'ro': 'șterge', 'bg': 'изтрий', 'el': 'διαγραφή', 'ar': 'حذف', 'he': 'מחק', 'id': 'hapus', 'ja': '削除'},
    'deleted': {'fr': 'supprimé', 'es': 'eliminado', 'de': 'gelöscht', 'it': 'eliminato', 'pt': 'eliminado', 'nl': 'verwijderd', 'ca': 'eliminat', 'ro': 'șters', 'bg': 'изтрито', 'el': 'διαγράφηκε', 'ar': 'محذوف', 'he': 'נמחק', 'id': 'dihapus', 'ja': '削除済み'},
    'descriptions.none': {'fr': 'Aucune description', 'es': 'Sin descripción', 'de': 'Keine Beschreibung', 'it': 'Nessuna descrizione', 'pt': 'Sem descrição', 'nl': 'Geen beschrijving', 'ca': 'Cap descripció', 'ro': 'Nicio descriere', 'bg': 'Няма описание', 'el': 'Καμία περιγραφή', 'ar': 'لا يوجد وصف', 'he': 'אין תיאור', 'id': 'Tidak ada deskripsi', 'ja': '説明なし'},
    'detailed view': {'fr': 'vue détaillée', 'es': 'vista detallada', 'de': 'Detailansicht', 'it': 'vista dettagliata', 'pt': 'vista detalhada', 'nl': 'gedetailleerde weergave', 'ca': 'vista detallada', 'ro': 'vizualizare detaliată', 'bg': 'подробен изглед', 'el': 'λεπτομερής προβολή', 'ar': 'عرض مفصل', 'he': 'תצוגה מפורטת', 'id': 'tampilan terperinci', 'ja': '詳細表示'},
    'disabled': {'fr': 'désactivé', 'es': 'desactivado', 'de': 'deaktiviert', 'it': 'disabilitato', 'pt': 'desativado', 'nl': 'uitgeschakeld', 'ca': 'desactivat', 'ro': 'dezactivat', 'bg': 'деактивирано', 'el': 'απενεργοποιημένο', 'ar': 'معطل', 'he': 'מושבת', 'id': 'dinonaktifkan', 'ja': '無効'},
    'diveable_caves': {'fr': 'grottes plongeables', 'es': 'cuevas buceables', 'de': 'tauchbare Höhlen', 'it': 'grotte immergibili', 'pt': 'cavernas mergulháveis', 'nl': 'duikbare grotten', 'ca': 'coves amb immersió', 'ro': 'peșteri cu scufundare', 'bg': 'пещери за гмуркане', 'el': 'σπήλαια για κατάδυση', 'ar': 'كهوف قابلة للغوص', 'he': 'מערות לצלילה', 'id': 'gua yang bisa diselami', 'ja': '潜水可能洞窟'},
    'document': {'fr': 'document', 'es': 'documento', 'de': 'Dokument', 'it': 'documento', 'pt': 'documento', 'nl': 'document', 'ca': 'document', 'ro': 'document', 'bg': 'документ', 'el': 'έγγραφο', 'ar': 'مستند', 'he': 'מסמך', 'id': 'dokumen', 'ja': '文書'},
    'documents are referenced': {'fr': 'documents sont référencés', 'es': 'documentos están referenciados', 'de': 'Dokumente sind referenziert', 'it': 'documenti sono referenziati', 'pt': 'documentos são referenciados', 'nl': 'documenten zijn gerefereerd', 'ca': 'documents estan referenciats', 'ro': 'documente sunt referențiate', 'bg': 'документи са посочени', 'el': 'έγγραφα αναφέρονται', 'ar': 'مستندات مُشار إليها', 'he': 'מסמכים מוזכרים', 'id': 'dokumen direferensikan', 'ja': '文書が参照済み'},
    'download': {'fr': 'télécharger', 'es': 'descargar', 'de': 'herunterladen', 'it': 'scarica', 'pt': 'transferir', 'nl': 'downloaden', 'ca': 'descarregar', 'ro': 'descărcare', 'bg': 'изтегли', 'el': 'λήψη', 'ar': 'تحميل', 'he': 'הורד', 'id': 'unduh', 'ja': 'ダウンロード'},
    'edit': {'fr': 'modifier', 'es': 'editar', 'de': 'bearbeiten', 'it': 'modifica', 'pt': 'editar', 'nl': 'bewerken', 'ca': 'editar', 'ro': 'editare', 'bg': 'редактирай', 'el': 'επεξεργασία', 'ar': 'تعديل', 'he': 'ערוך', 'id': 'edit', 'ja': '編集'},
    'entrance': {'fr': 'entrée', 'es': 'entrada', 'de': 'Eingang', 'it': 'ingresso', 'pt': 'entrada', 'nl': 'ingang', 'ca': 'entrada', 'ro': 'intrare', 'bg': 'вход', 'el': 'είσοδος', 'ar': 'مدخل', 'he': 'כניסה', 'id': 'pintu masuk', 'ja': '入口'},
    'entrance.load.error': {'fr': 'Erreur lors du chargement de l\'entrée', 'es': 'Error al cargar la entrada', 'de': 'Fehler beim Laden des Eingangs', 'it': 'Errore nel caricamento dell\'ingresso', 'pt': 'Erro ao carregar a entrada', 'nl': 'Fout bij laden van ingang', 'ca': 'Error en carregar l\'entrada', 'ro': 'Eroare la încărcarea intrării', 'bg': 'Грешка при зареждане на входа', 'el': 'Σφάλμα φόρτωσης εισόδου', 'ar': 'خطأ في تحميل المدخل', 'he': 'שגיאה בטעינת הכניסה', 'id': 'Kesalahan memuat pintu masuk', 'ja': '入口の読み込みエラー'},
    'heatmap': {'fr': 'carte de chaleur', 'es': 'mapa de calor', 'de': 'Heatmap', 'it': 'mappa di calore', 'pt': 'mapa de calor', 'nl': 'warmtekaart', 'ca': 'mapa de calor', 'ro': 'hartă de căldură', 'bg': 'топлинна карта', 'el': 'χάρτης θερμότητας', 'ar': 'خريطة حرارية', 'he': 'מפת חום', 'id': 'peta panas', 'ja': 'ヒートマップ'},
    'hole': {'fr': 'trou', 'es': 'agujero', 'de': 'Loch', 'it': 'buco', 'pt': 'buraco', 'nl': 'gat', 'ca': 'forat', 'ro': 'gaură', 'bg': 'дупка', 'el': 'τρύπα', 'ar': 'فتحة', 'he': 'חור', 'id': 'lubang', 'ja': '穴'},
    'index < 40': {'fr': 'index < 40', 'es': 'índice < 40', 'de': 'Index < 40', 'it': 'indice < 40', 'pt': 'índice < 40', 'nl': 'index < 40', 'ca': 'índex < 40', 'ro': 'index < 40', 'bg': 'индекс < 40', 'el': 'δείκτης < 40', 'ar': 'المؤشر < 40', 'he': 'מדד < 40', 'id': 'indeks < 40', 'ja': 'インデックス < 40'},
    'index ≥ 70': {'fr': 'index ≥ 70', 'es': 'índice ≥ 70', 'de': 'Index ≥ 70', 'it': 'indice ≥ 70', 'pt': 'índice ≥ 70', 'nl': 'index ≥ 70', 'ca': 'índex ≥ 70', 'ro': 'index ≥ 70', 'bg': 'индекс ≥ 70', 'el': 'δείκτης ≥ 70', 'ar': 'المؤشر ≥ 70', 'he': 'מדד ≥ 70', 'id': 'indeks ≥ 70', 'ja': 'インデックス ≥ 70'},
    '40 ≤ index < 70': {'fr': '40 ≤ index < 70', 'es': '40 ≤ índice < 70', 'de': '40 ≤ Index < 70', 'it': '40 ≤ indice < 70', 'pt': '40 ≤ índice < 70', 'nl': '40 ≤ index < 70', 'ca': '40 ≤ índex < 70', 'ro': '40 ≤ index < 70', 'bg': '40 ≤ индекс < 70', 'el': '40 ≤ δείκτης < 70', 'ar': '40 ≤ المؤشر < 70', 'he': '40 ≤ מדד < 70', 'id': '40 ≤ indeks < 70', 'ja': '40 ≤ インデックス < 70'},
    'is the deepest cave of the': {'fr': 'est la cavité la plus profonde du', 'es': 'es la cueva más profunda del', 'de': 'ist die tiefste Höhle des', 'it': 'è la grotta più profonda del', 'pt': 'é a caverna mais profunda do', 'nl': 'is de diepste grot van de', 'ca': 'és la cova més profunda del', 'ro': 'este cea mai adâncă peșteră din', 'bg': 'е най-дълбоката пещера на', 'el': 'είναι το βαθύτερο σπήλαιο του', 'ar': 'هو أعمق كهف في', 'he': 'היא המערה העמוקה ביותר של', 'id': 'adalah gua terdalam di', 'ja': 'の最深洞窟'},
    'is the longest cave of the': {'fr': 'est la cavité la plus longue du', 'es': 'es la cueva más larga del', 'de': 'ist die längste Höhle des', 'it': 'è la grotta più lunga del', 'pt': 'é a caverna mais longa do', 'nl': 'is de langste grot van de', 'ca': 'és la cova més llarga del', 'ro': 'este cea mai lungă peșteră din', 'bg': 'е най-дългата пещера на', 'el': 'είναι το μακρύτερο σπήλαιο του', 'ar': 'هو أطول كهف في', 'he': 'היא המערה הארוכה ביותר של', 'id': 'adalah gua terpanjang di', 'ja': 'の最長洞窟'},
    'km of caves': {'fr': 'km de grottes', 'es': 'km de cuevas', 'de': 'km Höhlen', 'it': 'km di grotte', 'pt': 'km de cavernas', 'nl': 'km grotten', 'ca': 'km de coves', 'ro': 'km de peșteri', 'bg': 'км пещери', 'el': 'χλμ σπηλαίων', 'ar': 'كم من الكهوف', 'he': 'ק"מ מערות', 'id': 'km gua', 'ja': '洞窟のkm'},
    'less than 2 years': {'fr': 'moins de 2 ans', 'es': 'menos de 2 años', 'de': 'weniger als 2 Jahre', 'it': 'meno di 2 anni', 'pt': 'menos de 2 anos', 'nl': 'minder dan 2 jaar', 'ca': 'menys de 2 anys', 'ro': 'mai puțin de 2 ani', 'bg': 'по-малко от 2 години', 'el': 'λιγότερο από 2 χρόνια', 'ar': 'أقل من سنتين', 'he': 'פחות מ-2 שנים', 'id': 'kurang dari 2 tahun', 'ja': '2年未満'},
    'more than 10 years': {'fr': 'plus de 10 ans', 'es': 'más de 10 años', 'de': 'mehr als 10 Jahre', 'it': 'più di 10 anni', 'pt': 'mais de 10 anos', 'nl': 'meer dan 10 jaar', 'ca': 'més de 10 anys', 'ro': 'mai mult de 10 ani', 'bg': 'повече от 10 години', 'el': 'περισσότερο από 10 χρόνια', 'ar': 'أكثر من 10 سنوات', 'he': 'יותר מ-10 שנים', 'id': 'lebih dari 10 tahun', 'ja': '10年以上'},
    'name': {'fr': 'nom', 'es': 'nombre', 'de': 'Name', 'it': 'nome', 'pt': 'nome', 'nl': 'naam', 'ca': 'nom', 'ro': 'nume', 'bg': 'name', 'el': 'όνομα', 'ar': 'اسم', 'he': 'שם', 'id': 'nama', 'ja': '名前'},
    'network_count': {'fr': 'nombre de réseaux', 'es': 'número de redes', 'de': 'Netzwerkanzahl', 'it': 'numero di reti', 'pt': 'número de redes', 'nl': 'aantal netwerken', 'ca': 'nombre de xarxes', 'ro': 'număr de rețele', 'bg': 'брой мрежи', 'el': 'αριθμός δικτύων', 'ar': 'عدد الشبكات', 'he': 'מספר רשתות', 'id': 'jumlah jaringan', 'ja': 'ネットワーク数'},
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
