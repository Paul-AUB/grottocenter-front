# -*- coding: utf-8 -*-
import json, os
DIR = os.path.dirname(os.path.abspath(__file__))
T = {
    'Lat.': {
        'fr': 'Lat.', 'es': 'Lat.', 'it': 'Lat.', 'pt': 'Lat.',
        'nl': 'Lat.', 'ca': 'Lat.',
        'el': 'Πλ.', 'ar': 'عرض', 'he': 'רוחב', 'id': 'Lat.', 'ja': '緯度',
    },
    'Long.': {
        'fr': 'Long.', 'es': 'Long.', 'it': 'Long.', 'pt': 'Long.',
        'nl': 'Long.', 'ca': 'Long.',
        'el': 'Μήκ.', 'ar': 'طول', 'he': 'אורך', 'id': 'Long.', 'ja': '経度',
    },
    'mail': {
        'fr': 'e-mail', 'it': 'e-mail', 'pt': 'e-mail',
        'de': 'E-Mail', 'nl': 'e-mail',
        'el': 'email', 'ar': 'بريد إلكتروني', 'he': 'דואר אלקטרוני',
        'id': 'email', 'ja': 'メール',
    },
    'Satellite': {
        'pt': 'Satélite', 'nl': 'Satelliet',
        'el': 'Δορυφόρος', 'ar': 'قمر صناعي', 'he': 'לוויין',
        'id': 'Satelit', 'ja': '衛星',
    },
    '{0} hour': {
        'it': '{0} ora', 'pt': '{0} hora', 'nl': '{0} uur',
        'el': '{0} ώρα', 'ar': '{0} ساعة', 'he': '{0} שעה',
        'id': '{0} jam', 'ja': '{0}時間',
    },
    '{0} hours': {
        'it': '{0} ore', 'pt': '{0} horas', 'nl': '{0} uur',
        'el': '{0} ώρες', 'ar': '{0} ساعات', 'he': '{0} שעות',
        'id': '{0} jam', 'ja': '{0}時間',
    },
    'Aesthetic': {
        'it': 'Estetico', 'pt': 'Estético', 'nl': 'Esthetisch',
        'el': 'Αισθητικός', 'ar': 'جمالي', 'he': 'אסתטי',
        'id': 'Estetika', 'ja': '美的',
    },
    'And to get your own API key, send us an email using the {0}': {
        'it': "Per ottenere la propria chiave API, inviaci un'e-mail tramite {0}",
        'pt': 'Para obter a sua chave API, envie-nos um e-mail usando {0}',
        'nl': 'Om uw eigen API-sleutel te verkrijgen, stuur ons een e-mail via {0}',
        'el': 'Για να αποκτήσετε το δικό σας κλειδί API, στείλτε μας email μέσω {0}',
        'ar': 'للحصول على مفتاح API الخاص بك، أرسل لنا بريدًا إلكترونيًا باستخدام {0}',
        'he': 'כדי לקבל את מפתח ה-API שלך, שלח לנו דוא"ל דרך {0}',
        'id': 'Untuk mendapatkan kunci API Anda sendiri, kirimkan email kepada kami menggunakan {0}',
        'ja': 'APIキーを取得するには、{0}を使ってメールを送ってください',
    },
    'as active member': {
        'it': 'come membro attivo', 'pt': 'como membro ativo',
        'nl': 'als actief lid', 'el': 'ως ενεργό μέλος',
        'ar': 'كعضو نشط', 'he': 'כחבר פעיל',
        'id': 'sebagai anggota aktif', 'ja': 'アクティブメンバーとして',
    },
    'author': {
        'it': 'autore', 'pt': 'autor', 'nl': 'auteur',
        'el': 'συγγραφέας', 'ar': 'مؤلف', 'he': 'מחבר',
        'id': 'penulis', 'ja': '著者',
    },
    'Author': {
        'it': 'Autore', 'pt': 'Autor', 'nl': 'Auteur',
        'el': 'Συγγραφέας', 'ar': 'المؤلف', 'he': 'מחבר',
        'id': 'Penulis', 'ja': '著者',
    },
    'authors': {
        'it': 'autori', 'pt': 'autores', 'nl': 'auteurs',
        'el': 'συγγραφείς', 'ar': 'المؤلفون', 'he': 'מחברים',
        'id': 'para penulis', 'ja': '著者たち',
    },
    'cave depth': {
        'it': 'profondità della grotta', 'pt': 'profundidade da gruta',
        'nl': 'grotdiepte', 'el': 'βάθος σπηλαίου',
        'ar': 'عمق الكهف', 'he': 'עומק המערה',
        'id': 'kedalaman gua', 'ja': '洞窟の深さ',
    },
    'Cave depth': {
        'it': 'Profondità della grotta', 'pt': 'Profundidade da gruta',
        'nl': 'Grotdiepte', 'el': 'Βάθος σπηλαίου',
        'ar': 'عمق الكهف', 'he': 'עומק המערה',
        'id': 'Kedalaman gua', 'ja': '洞窟の深さ',
    },
    'cave length': {
        'it': 'lunghezza della grotta', 'pt': 'comprimento da gruta',
        'nl': 'grotlengte', 'el': 'μήκος σπηλαίου',
        'ar': 'طول الكهف', 'he': 'אורך המערה',
        'id': 'panjang gua', 'ja': '洞窟の長さ',
    },
    'Cave length': {
        'it': 'Lunghezza della grotta', 'pt': 'Comprimento da gruta',
        'nl': 'Grotlengte', 'el': 'Μήκος σπηλαίου',
        'ar': 'طول الكهف', 'he': 'אורך המערה',
        'id': 'Panjang gua', 'ja': '洞窟の長さ',
    },
    'Cave properties': {
        'it': 'Proprietà della grotta', 'pt': 'Propriedades da gruta',
        'nl': 'Groteigenschappen', 'el': 'Ιδιότητες σπηλαίου',
        'ar': 'خصائص الكهف', 'he': 'מאפייני המערה',
        'id': 'Properti gua', 'ja': '洞窟の特性',
    },
    'Contact us!': {
        'it': 'Contattaci!', 'pt': 'Entre em contato conosco!',
        'nl': 'Neem contact op!', 'el': 'Επικοινωνήστε μαζί μας!',
        'ar': 'اتصل بنا!', 'he': 'צור קשר!',
        'id': 'Hubungi kami!', 'ja': 'お問い合わせ!',
    },
    'Content': {
        'it': 'Contenuto', 'pt': 'Conteúdo', 'nl': 'Inhoud',
        'el': 'Περιεχόμενο', 'ar': 'المحتوى', 'he': 'תוכן',
        'id': 'Konten', 'ja': 'コンテンツ',
    },
    'Caves related to this group': {
        'it': 'Grotte relative a questo gruppo',
        'pt': 'Grutas relacionadas a este grupo',
        'nl': 'Grotten gerelateerd aan deze groep',
        'el': 'Σπήλαια που σχετίζονται με αυτή την ομάδα',
        'ar': 'الكهوف المتعلقة بهذه المجموعة',
        'he': 'מערות הקשורות לקבוצה זו',
        'id': 'Gua yang terkait dengan kelompok ini',
    },
    'There is no caves related to this group currently': {
        'it': 'Attualmente non ci sono grotte relative a questo gruppo.',
        'pt': 'Atualmente não há grutas relacionadas a este grupo.',
        'nl': 'Er zijn momenteel geen grotten gerelateerd aan deze groep.',
        'el': 'Δεν υπάρχουν σπήλαια που σχετίζονται με αυτή την ομάδα αυτή τη στιγμή.',
        'ar': 'لا توجد حاليًا كهوف تتعلق بهذه المجموعة.',
        'he': 'כרגע אין מערות הקשורות לקבוצה זו.',
        'id': 'Saat ini tidak ada gua yang terkait dengan kelompok ini.',
        'ja': '現在このグループに関連する洞窟はありません。',
    },
    'Datum: ': {
        'es': 'Datum: ', 'it': 'Datum: ', 'pt': 'Datum: ', 'nl': 'Datum: ',
        'el': 'Datum: ', 'ar': 'نظام الإسناد: ', 'he': 'דאטום: ', 'id': 'Datum: ',
    },
    'Inverse flattening: ': {
        'it': 'Schiacciamento inverso: ', 'pt': 'Achatamento inverso: ',
        'bg': 'Обратно сплескване: ', 'el': 'Αντίστροφη πεπλάτυνση: ',
        'ar': 'التسطيح العكسي: ', 'he': 'שיטוח הפוך: ', 'id': 'Pemampatan terbalik: ',
    },
    'Standard parallel 1: ': {
        'it': 'Parallelo standard 1: ', 'pt': 'Paralelo padrão 1: ',
        'bg': 'Стандартен паралел 1: ', 'el': 'Βασικός παράλληλος 1: ',
        'ar': 'الخط المعياري 1: ', 'he': 'קו רוחב סטנדרטי 1: ', 'id': 'Paralel standar 1: ',
    },
    'Standard parallel 2: ': {
        'it': 'Parallelo standard 2: ', 'pt': 'Paralelo padrão 2: ',
        'bg': 'Стандартен паралел 2: ', 'el': 'Βασικός παράλληλος 2: ',
        'ar': 'الخط المعياري 2: ', 'he': 'קו רוחב סטנדרטי 2: ', 'id': 'Paralel standar 2: ',
    },
    'As a group, a club or  federation,  {0} : The project will move on thanks to  organizations such as yours': {
        'fr': 'En tant que groupe, club ou fédération, {0} : Le projet avancera grâce à des organisations telles que la vôtre.',
        'es': 'Como grupo, club o federación, {0}: El proyecto avanzará gracias a organizaciones como la suya.',
        'it': 'Come gruppo, club o federazione, {0}: Il progetto andrà avanti grazie ad organizzazioni come la vostra.',
        'pt': 'Como grupo, clube ou federação, {0}: O projeto avançará graças a organizações como a sua.',
        'de': 'Als Gruppe, Verein oder Verband, {0}: Das Projekt wird dank Organisationen wie Ihrer vorankommen.',
        'nl': 'Als groep, club of federatie, {0}: Het project zal vooruitgaan dankzij organisaties zoals de uwe.',
        'ca': 'Com a grup, club o federació, {0}: El projecte avançarà gràcies a organitzacions com la vostra.',
        'ro': 'Ca grup, club sau federație, {0}: Proiectul va avansa datorită organizațiilor ca a dumneavoastră.',
        'bg': 'Като група, клуб или федерация, {0}: Проектът ще напредне благодарение на организации като вашата.',
        'el': 'Ως ομάδα, σύλλογος ή ομοσπονδία, {0}: Το έργο θα προχωρήσει χάρη σε οργανισμούς όπως ο δικός σας.',
        'ar': 'كمجموعة أو نادٍ أو اتحاد، {0}: سيتقدم المشروع بفضل منظمات مثل منظمتكم.',
        'he': 'כקבוצה, מועדון או פדרציה, {0}: הפרויקט יתקדם בזכות ארגונים כמו שלכם.',
        'id': 'Sebagai kelompok, klub, atau federasi, {0}: Proyek ini akan maju berkat organisasi seperti milik Anda.',
        'ja': 'グループ、クラブ、または連盟として、{0}：プロジェクトはあなたのような組織のおかげで前進します。',
    },
    'Country code': {
        'it': 'Codice paese', 'pt': 'Código do país', 'nl': 'Landcode',
        'el': 'Κωδικός χώρας', 'ar': 'رمز البلد', 'he': 'קוד מדינה',
        'id': 'Kode negara', 'ja': '国コード',
    },
    'Country or region': {
        'it': 'Paese o regione', 'pt': 'País ou região', 'nl': 'Land of regio',
        'el': 'Χώρα ή περιοχή', 'ar': 'البلد أو المنطقة', 'he': 'מדינה או אזור',
        'id': 'Negara atau wilayah', 'ja': '国または地域',
    },
    'county': {
        'it': 'contea', 'pt': 'condado', 'nl': 'provincie',
        'el': 'κομητεία', 'ar': 'مقاطعة', 'he': 'מחוז',
        'id': 'kabupaten', 'ja': '郡',
    },
    'County': {
        'it': 'Contea', 'pt': 'Condado', 'nl': 'Provincie',
        'el': 'Κομητεία', 'ar': 'المقاطعة', 'he': 'מחוז',
        'id': 'Kabupaten', 'ja': '郡',
    },
    'Dashboard': {
        'it': 'Pannello di controllo', 'pt': 'Painel',
        'nl': 'Overzicht', 'el': 'Πίνακας ελέγχου',
        'ar': 'لوحة التحكم', 'he': 'לוח מחוונים',
        'id': 'Dasbor', 'ja': 'ダッシュボード',
    },
    'Data, on Grottocenter,  is placed under free licence, it is accessible to all those who may need  it': {
        'it': 'I dati su Grottocenter sono pubblicati sotto licenza libera e accessibili a tutti coloro che ne hanno bisogno.',
        'pt': 'Os dados no Grottocenter estão publicados sob licença livre e são acessíveis a todos os que precisarem deles.',
        'nl': 'Gegevens op Grottocenter staan onder een vrije licentie en zijn toegankelijk voor iedereen die er behoefte aan heeft.',
        'el': 'Τα δεδομένα στο Grottocenter τελούν υπό ελεύθερη άδεια και είναι προσβάσιμα σε όλους.',
        'ar': 'البيانات في Grottocenter موضوعة تحت رخصة حرة وهي متاحة لجميع من يحتاجها.',
        'he': 'הנתונים ב-Grottocenter מוצבים תחת רישיון חופשי ונגישים לכל מי שזקוק להם.',
        'id': 'Data di Grottocenter ditempatkan di bawah lisensi bebas dan dapat diakses oleh semua yang membutuhkannya.',
        'ja': 'Grottocenter上のデータはフリーライセンスの下に公開されており、必要な人誰でもアクセスできます。',
    },
    'Empty list': {
        'it': 'Lista vuota', 'pt': 'Lista vazia', 'nl': 'Lege lijst',
        'el': 'Κενή λίστα', 'ar': 'قائمة فارغة', 'he': 'רשימה ריקה',
        'id': 'Daftar kosong', 'ja': '空のリスト',
    },
    'entries': {
        'it': 'entrate', 'pt': 'entradas', 'nl': 'ingangen',
        'el': 'είσοδοι', 'ar': 'مداخل', 'he': 'כניסות',
        'id': 'pintu masuk', 'ja': '入口',
    },
    'Entries': {
        'it': 'Entrate', 'pt': 'Entradas', 'nl': 'Ingangen',
        'el': 'Είσοδοι', 'ar': 'المداخل', 'he': 'כניסות',
        'id': 'Pintu masuk', 'ja': '入口',
    },
    'Entries list': {
        'it': 'Elenco delle entrate', 'pt': 'Lista de entradas',
        'nl': 'Lijst van ingangen', 'el': 'Λίστα εισόδων',
        'ar': 'قائمة المداخل', 'he': 'רשימת כניסות',
        'id': 'Daftar pintu masuk', 'ja': '入口リスト',
    },
    'Exports': {
        'it': 'Esportazioni', 'pt': 'Exportações', 'nl': 'Uitvoer',
        'el': 'Εξαγωγές', 'ar': 'التصديرات', 'he': 'ייצוא',
        'id': 'Ekspor', 'ja': 'エクスポート',
    },
    'Here is another way: In order to share with the greatest number, we are  always  {0}': {
        'it': 'Ecco un altro modo: per condividere con il maggior numero possibile, siamo sempre {0}',
        'pt': 'Aqui está outra maneira: para compartilhar com o maior número de pessoas, estamos sempre {0}',
        'nl': 'Hier is een andere manier: om te delen met zoveel mogelijk mensen zijn we altijd {0}',
        'el': 'Να ένας άλλος τρόπος: για να μοιραστείτε με όσο το δυνατόν περισσότερους, είμαστε πάντα {0}',
        'ar': 'إليك طريقة أخرى: من أجل المشاركة مع أكبر عدد ممكن، نحن دائمًا {0}',
        'he': 'הנה דרך אחרת: כדי לשתף עם כמה שיותר אנשים, אנו תמיד {0}',
        'id': 'Berikut cara lain: untuk berbagi dengan sebanyak mungkin orang, kami selalu {0}',
        'ja': '別の方法はこちらです：できるだけ多くの人と共有するために、私たちは常に{0}です',
    },
    'How can we recognize a user as  a caver?': {
        'it': 'Come possiamo riconoscere un utente come speleologo?',
        'pt': 'Como podemos reconhecer um usuário como espeleólogo?',
        'nl': 'Hoe kunnen we een gebruiker herkennen als grottenonderzoeker?',
        'el': 'Πώς μπορούμε να αναγνωρίσουμε έναν χρήστη ως σπηλαιολόγο;',
        'ar': 'كيف يمكننا التعرف على مستخدم باعتباره مستكشف كهوف؟',
        'he': 'כיצד נוכל לזהות משתמש כחוקר מערות?',
        'id': 'Bagaimana kami bisa mengenali pengguna sebagai penjelajah gua?',
        'ja': 'ユーザーを洞窟探検家として認識するにはどうすればよいですか？',
    },
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
