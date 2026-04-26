# -*- coding: utf-8 -*-
"""Part 4: BBS codes, addresstypes, more UI."""
import json, os

LANG_DIR = os.path.dirname(os.path.abspath(__file__))

T = {
    # === BBS classification 1.x (Geospeleology) ===
    '1.11': {
        'it': 'MORFOLOGIA E MORFOGENESI CARSICA: esocarso di rocce carbonatiche (calcari, dolomiti, crete, marmi), geochimica',
        'pt': 'MORFOLOGIA E MORFOGÊNESE CÁRSTICA: exocarste de rochas carbonáticas (calcários, dolomites, giz, mármores), geoquímica',
        'de': 'KARST-MORPHOLOGIE UND -MORPHOGENESE: Exokarst karbonatischer Gesteine (Kalksteine, Dolomite, Kreide, Marmor), Geochemie',
        'nl': 'KARSTMORFOLOGIE EN -MORFOGENESE: exokarst van carbonaatgesteenten (kalksteen, dolomiet, krijt, marmer), geochemie',
        'ca': 'MORFOLOGIA I MORFOGÈNESI CÀRSTICA: exocarst de roques carbonatades (calcàries, dolomies, creta, marbres), geoquímica',
        'ro': 'MORFOLOGIE ȘI MORFOGENEZĂ CARSTICĂ: exocarst al rocilor carbonatice (calcare, dolomite, cretă, marmure), geochimie',
        'bg': 'КАРСТОВА МОРФОЛОГИЯ И МОРФОГЕНЕЗА: екзокарст на карбонатни скали (варовици, доломити, тебешир, мрамор), геохимия',
        'el': 'ΚΑΡΣΤΙΚΗ ΜΟΡΦΟΛΟΓΙΑ ΚΑΙ ΜΟΡΦΟΓΕΝΕΣΗ: εξοκαρστ καρβονατικών πετρωμάτων, γεωχημεία',
        'ar': 'مورفولوجيا الكارست ومورفوجينيزه: الكارست الخارجي للصخور الكربونية، الجيوكيمياء',
        'he': 'מורפולוגיה ומורפוגנזה קרסטית: אקסוקרסט של סלעים קרבונטיים, גאוכימיה',
        'id': 'MORFOLOGI DAN MORFOGENESIS KARST: eksokarst batuan karbonat, geokimia',
        'ja': 'カルスト形態と形成：炭酸塩岩の外カルスト、地球化学',
    },
    '1.12': {
        'it': 'IDROLOGIA: chimica e fisica delle acque, sorgenti e inghiottitoi, acque sotterranee carsiche, tracciamenti, idrogeologia',
        'pt': 'HIDROLOGIA: química e física das águas, nascentes e sumidouros, águas subterrâneas cársticas, traçamentos, hidrogeologia',
        'de': 'HYDROLOGIE: Wasser-Chemie und -Physik, Quellen und Schwinden, Karstgrundwasser, Tracerversuche, Hydrogeologie',
        'nl': 'HYDROLOGIE: water-chemie en -fysica, bronnen en verzinkingen, karstgrondwater, tracerproeven, hydrogeologie',
        'ca': 'HIDROLOGIA: química i física de les aigües, fonts i engolidors, aigües subterrànies càrstiques, traçaments, hidrogeologia',
        'ro': 'HIDROLOGIE: chimia și fizica apelor, izvoare și pierderi, ape subterane carstice, trasaje, hidrogeologie',
        'bg': 'ХИДРОЛОГИЯ: химия и физика на водите, извори и загубища, карстови подземни води, трасировки, хидрогеология',
        'el': 'ΥΔΡΟΛΟΓΙΑ: χημεία και φυσική νερών, πηγές και βαράθρα, καρστικά υπόγεια ύδατα, υδρογεωλογία',
        'ar': 'الهيدرولوجيا: كيمياء وفيزياء المياه، ينابيع وبوالع، المياه الجوفية الكارستية، هيدروجيولوجيا',
        'he': 'הידרולוגיה: כימיה ופיזיקה של מים, מעיינות ובולענים, מים תת-קרקעיים קרסטיים, הידרוגאולוגיה',
        'id': 'HIDROLOGI: kimia dan fisika air, mata air dan swallet, air tanah karst, penelusuran, hidrogeologi',
        'ja': '水文学：水の化学・物理、湧水と落水穴、カルスト地下水、追跡調査、水文地質学',
    },
    '1.13': {
        'it': 'GEOLOGIA E PEDOLOGIA: petrografia, tettonica, bauxite, glaciazioni',
        'pt': 'GEOLOGIA E PEDOLOGIA: petrografia, tectónica, bauxite, glaciações',
        'de': 'GEOLOGIE UND PEDOLOGIE: Petrographie, Tektonik, Bauxit, Vergletscherungen',
        'nl': 'GEOLOGIE EN PEDOLOGIE: petrografie, tektoniek, bauxiet, vergletscheringen',
        'ca': 'GEOLOGIA I PEDOLOGIA: petrografia, tectònica, bauxita, glaciacions',
        'ro': 'GEOLOGIE ȘI PEDOLOGIE: petrografie, tectonică, bauxită, glaciațiuni',
        'bg': 'ГЕОЛОГИЯ И ПЕДОЛОГИЯ: петрография, тектоника, боксит, заледявания',
        'el': 'ΓΕΩΛΟΓΙΑ ΚΑΙ ΕΔΑΦΟΛΟΓΙΑ: πετρογραφία, τεκτονική, βωξίτης, παγετώνες',
        'ar': 'الجيولوجيا وعلم التربة: الصخارة، البنية التكتونية، البوكسيت، التجليد',
        'he': 'גאולוגיה ופדולוגיה: פטרוגרפיה, טקטוניקה, בוקסיט, קרחונים',
        'id': 'GEOLOGI DAN PEDOLOGI: petrografi, tektonik, bauksit, glasiasi',
        'ja': '地質学と土壌学：岩石学、構造地質学、ボーキサイト、氷河作用',
    },
    '1.14': {
        'it': 'CLIMATOLOGIA E BIOLOGIA DELLE ZONE CARSICHE',
        'pt': 'CLIMATOLOGIA E BIOLOGIA DAS ZONAS CÁRSTICAS',
        'de': 'KLIMATOLOGIE UND BIOLOGIE DER KARSTGEBIETE',
        'nl': 'KLIMATOLOGIE EN BIOLOGIE VAN KARSTGEBIEDEN',
        'ca': 'CLIMATOLOGIA I BIOLOGIA DE LES ZONES CÀRSTIQUES',
        'ro': 'CLIMATOLOGIE ȘI BIOLOGIE A ZONELOR CARSTICE',
        'bg': 'КЛИМАТОЛОГИЯ И БИОЛОГИЯ НА КАРСТОВИТЕ ЗОНИ',
        'el': 'ΚΛΙΜΑΤΟΛΟΓΙΑ ΚΑΙ ΒΙΟΛΟΓΙΑ ΚΑΡΣΤΙΚΩΝ ΠΕΡΙΟΧΩΝ',
        'ar': 'الكليماتولوجيا وعلم الأحياء لمناطق الكارست',
        'he': 'קלימטולוגיה וביולוגיה של אזורים קרסטיים',
        'id': 'KLIMATOLOGI DAN BIOLOGI DAERAH KARST',
        'ja': 'カルスト地域の気候学と生物学',
    },
    '1.15': {
        'it': 'CARSO FOSSILE: paleocarso, riempimenti carsici, paleogeografia',
        'pt': 'CARSO FÓSSIL: paleocarso, preenchimentos cársticos, paleogeografia',
        'de': 'FOSSILER KARST: Paläokarst, karstische Füllungen, Paläogeographie',
        'nl': 'FOSSIELE KARST: paleokarst, karstopvullingen, paleogeografie',
        'ca': 'CARST FÒSSIL: paleocarst, rebliments càrstics, paleogeografia',
        'ro': 'CARST FOSIL: paleocarst, umpluturi carstice, paleogeografie',
        'bg': 'ФОСИЛЕН КАРСТ: палеокарст, карстови запълвания, палеогеография',
        'el': 'ΑΠΟΛΙΘΩΜΕΝΟ ΚΑΡΣΤ: παλαιοκαρστ, καρστικές πληρώσεις, παλαιογεωγραφία',
        'ar': 'الكارست الأحفوري: الكارست القديم، تعبئات كارستية، جغرافيا قديمة',
        'he': 'קרסט מאובן: פלאוקרסט, מילויים קרסטיים, פלאוגאוגרפיה',
        'id': 'KARST FOSIL: paleokarst, pengisian karst, paleogeografi',
        'ja': '化石カルスト：古カルスト、カルスト充填、古地理学',
    },
    '1.16': {'it': 'CARSO IDROTERMALE', 'pt': 'CARSO HIDROTERMAL', 'de': 'HYDROTHERMALER KARST', 'nl': 'HYDROTHERMISCH KARST', 'ca': 'CARST HIDROTERMAL', 'ro': 'CARST HIDROTERMAL', 'bg': 'ХИДРОТЕРМАЛЕН КАРСТ', 'el': 'ΥΔΡΟΘΕΡΜΙΚΟ ΚΑΡΣΤ', 'ar': 'الكارست الحراري المائي', 'he': 'קרסט הידרותרמי', 'id': 'KARST HIDROTERMAL', 'ja': '熱水カルスト'},
    '1.21': {
        'it': 'MORFOLOGIA E SPELEOGENESI IN ROCCE CARBONATICHE: grotte, inghiottitoi, corrosione ed erosione, forme di scavo piccole e grandi, sifoni',
        'pt': 'MORFOLOGIA E ESPELEOGÊNESE EM ROCHAS CARBONÁTICAS: grutas, algares, corrosão e erosão, formas de escavação, sifões',
        'de': 'MORPHOLOGIE UND SPELÄOGENESE IN KARBONATGESTEINEN: Höhlen, Schächte, Korrosion und Erosion, kleine und große Hohlformen, Siphons',
        'nl': 'MORFOLOGIE EN SPELEOGENESE IN CARBONAATGESTEENTEN: grotten, schachten, corrosie en erosie, holvormen, sifons',
        'ca': 'MORFOLOGIA I ESPELEOGÈNESI EN ROCA CARBONATADA: coves, avencs, corrosió i erosió, formes buides, sifons',
        'ro': 'MORFOLOGIE ȘI SPELOGENEZĂ ÎN ROCI CARBONATICE: peșteri, avene, coroziune și eroziune, forme de excavare, sifoane',
        'bg': 'МОРФОЛОГИЯ И СПЕЛЕОГЕНЕЗА В КАРБОНАТНИ СКАЛИ: пещери, пропасти, корозия и ерозия, кухини, сифони',
        'el': 'ΜΟΡΦΟΛΟΓΙΑ ΚΑΙ ΣΠΗΛΑΙΟΓΕΝΕΣΗ ΣΕ ΑΝΘΡΑΚΙΚΑ ΠΕΤΡΩΜΑΤΑ: σπήλαια, πηγάδια, διάβρωση, σιφόνια',
        'ar': 'مورفولوجيا وتكوين الكهوف في الصخور الكربونية: كهوف، حفر، تآكل وانجراف، سيفونات',
        'he': 'מורפולוגיה וספלאוגנזה בסלעים קרבונטיים: מערות, ברות, קורוזיה ובלייה, סיפונים',
        'id': 'MORFOLOGI DAN SPELEOGENESIS DI BATUAN KARBONAT: gua, lubang, korosi dan erosi, bentuk rongga, sifon',
        'ja': '炭酸塩岩における形態と洞窟形成：洞窟、縦穴、浸食、空洞形態、サイフォン',
    },
    '1.22': {'it': 'PARA-, PSEUDO- E IPOCARSO', 'pt': 'PARA-, PSEUDO- E HIPOCARSO', 'de': 'PARA-, PSEUDO- UND HYPOKARST', 'nl': 'PARA-, PSEUDO- EN HYPOKARST', 'ca': 'PARA-, PSEUDO- I HIPOCARST', 'ro': 'PARA-, PSEUDO- ȘI HIPOCARST', 'bg': 'ПАРА-, ПСЕВДО- И ХИПОКАРСТ', 'el': 'ΠΑΡΑ-, ΨΕΥΔΟ- ΚΑΙ ΥΠΟΚΑΡΣΤ', 'ar': 'البارا والسودو والهيبوكارست', 'he': 'פארא-, פסאודו- והיפוקרסט', 'id': 'PARA-, PSEUDO- DAN HIPOKARST', 'ja': 'パラ・擬似・地下カルスト'},
    '1.23': {
        'it': 'DEPOSITI E RIEMPIMENTI SOTTERRANEI: chimica e mineralogia, morfologia delle concrezioni, argilla e sedimenti alluvionali, crolli',
        'pt': 'DEPÓSITOS E PREENCHIMENTOS SUBTERRÂNEOS: química e mineralogia, morfologia da concrecionação, argila e sedimentos aluviais, desmoronamentos',
        'de': 'UNTERIRDISCHE ABLAGERUNGEN UND FÜLLUNGEN: Chemie und Mineralogie, Sinterformen, Ton und Alluvialablagerungen, Einstürze',
        'nl': 'ONDERGRONDSE AFZETTINGEN EN OPVULLINGEN: chemie en mineralogie, sintermorfologie, klei en alluviale sedimenten, instortingen',
        'ca': 'DIPÒSITS I REBLIMENTS SUBTERRANIS: química i mineralogia, morfologia del concrecionament, argila i sediments al·luvials, esllavissades',
        'ro': 'DEPOZITE ȘI UMPLUTURI SUBTERANE: chimie și mineralogie, morfologia depunerilor, argilă și sedimente aluviale, prăbușiri',
        'bg': 'ПОДЗЕМНИ ОТЛАГАНИЯ И ЗАПЪЛВАНИЯ: химия и минералогия, морфология на спелеотемите, глина и алувиални седименти, срутвания',
        'el': 'ΥΠΟΓΕΙΑ ΑΠΟΘΕΜΑΤΑ ΚΑΙ ΠΛΗΡΩΣΕΙΣ: χημεία και ορυκτολογία, μορφολογία σπηλαιωμάτων, πηλός και αλλουβιακά ιζήματα',
        'ar': 'الترسبات والحشوات تحت الأرض: الكيمياء والمعدنية، مورفولوجيا التكوينات، الطين والرواسب الغرينية، الانهيارات',
        'he': 'משקעים ומילויים תת-קרקעיים: כימיה ומינרלוגיה, מורפולוגיה של תסנינים, חימר ורסיבי שטף, קריסות',
        'id': 'ENDAPAN DAN PENGISIAN BAWAH TANAH: kimia dan mineralogi, morfologi sinter, tanah liat dan sedimen aluvial, runtuhan',
        'ja': '地下堆積物と充填物：化学・鉱物学、鍾乳石形態、粘土・沖積堆積物、崩落',
    },
    '1.24': {
        'it': 'CLIMATOLOGIA SOTTERRANEA: temperatura, igrometria, venti, aria-CO2, acque di scorrimento e condensazione, ghiaccio',
        'pt': 'CLIMATOLOGIA SUBTERRÂNEA: temperatura, higrometria, ventos, CO2 do ar, águas de escorrimento e condensação, gelo',
        'de': 'UNTERIRDISCHE KLIMATOLOGIE: Temperatur, Hygrometrie, Winde, CO2 der Luft, Riesel- und Kondensationswässer, Eis',
        'nl': 'ONDERGRONDSE KLIMATOLOGIE: temperatuur, hygrometrie, wind, lucht-CO2, drip- en condensatiewater, ijs',
        'ca': 'CLIMATOLOGIA SUBTERRÀNIA: temperatura, higrometria, vents, CO2 de l\'aire, aigües de degoteig i condensació, gel',
        'ro': 'CLIMATOLOGIE SUBTERANĂ: temperatură, higrometrie, vânturi, CO2 din aer, ape de scurgere și condensare, gheață',
        'bg': 'ПОДЗЕМНА КЛИМАТОЛОГИЯ: температура, хигрометрия, ветрове, въздушен CO2, капещи и кондензационни води, лед',
        'el': 'ΥΠΟΓΕΙΑ ΚΛΙΜΑΤΟΛΟΓΙΑ: θερμοκρασία, υγρομετρία, άνεμοι, CO2 αέρα, νερά σταλαγματιάς και συμπύκνωσης, πάγος',
        'ar': 'الكليماتولوجيا تحت الأرض: درجة الحرارة، القياس الرطوبي، الرياح، CO2 الهواء، مياه التقطر والتكثف، جليد',
        'he': 'קלימטולוגיה תת-קרקעית: טמפרטורה, הידרומטריה, רוחות, CO2 באוויר, מי טפטוף ועיבוי, קרח',
        'id': 'KLIMATOLOGI BAWAH TANAH: suhu, higrometri, angin, CO2 udara, air tetesan dan kondensasi, es',
        'ja': '地下気象学：温度、湿度、風、CO2濃度、滴下・凝縮水、氷',
    },
    '1.25': {
        'it': 'GEOFISICA: radioattività, sismologia, geotermia, vulcanismo',
        'pt': 'GEOFÍSICA: radioatividade, sismologia, geotermismo, vulcanismo',
        'de': 'GEOPHYSIK: Radioaktivität, Seismologie, Geothermie, Vulkanismus',
        'nl': 'GEOFYSICA: radioactiviteit, seismologie, geothermie, vulkanisme',
        'ca': 'GEOFÍSICA: radioactivitat, sismologia, geotermisme, vulcanisme',
        'ro': 'GEOFIZICĂ: radioactivitate, seismologie, geotermalism, vulcanism',
        'bg': 'ГЕОФИЗИКА: радиоактивност, сеизмология, геотермализъм, вулканизъм',
        'el': 'ΓΕΩΦΥΣΙΚΗ: ραδιενέργεια, σεισμολογία, γεωθερμικότητα, ηφαιστειολογία',
        'ar': 'الجيوفيزياء: النشاط الإشعاعي، علم الزلازل، الطاقة الحرارية الجوفية، النشاط البركاني',
        'he': 'גאופיסיקה: רדיואקטיביות, סיסמולוגיה, גאותרמיה, וולקניזם',
        'id': 'GEOFISIKA: radioaktivitas, seismologi, geotermalisme, vulkanisme',
        'ja': '地球物理学：放射能、地震学、地熱、火山活動',
    },
    '1.26': {
        'it': 'CRONOLOGIA DEI RIEMPIMENTI SOTTERRANEI: stratigrafia, datazioni, palinologia, paleoambiente',
        'pt': 'CRONOLOGIA DOS PREENCHIMENTOS SUBTERRÂNEOS: estratigrafia, datações, palinologia, paleoambiente',
        'de': 'CHRONOLOGIE UNTERIRDISCHER FÜLLUNGEN: Stratigraphie, Datierungen, Palynologie, Paläoumwelt',
        'nl': 'CHRONOLOGIE VAN ONDERGRONDSE OPVULLINGEN: stratigrafie, dateringen, palynologie, paleomilieu',
        'ca': 'CRONOLOGIA DELS REBLIMENTS SUBTERRANIS: estratigrafia, datacions, palinologia, paleoambient',
        'ro': 'CRONOLOGIA UMPLUTURILIR SUBTERANE: stratigrafie, datări, palinologie, paleomediu',
        'bg': 'ХРОНОЛОГИЯ НА ПОДЗЕМНИТЕ ЗАПЪЛВАНИЯ: стратиграфия, датировки, палинология, палеосреда',
        'el': 'ΧΡΟΝΟΛΟΓΙΑ ΥΠΟΓΕΙΩΝ ΠΛΗΡΩΣΕΩΝ: στρωματογραφία, χρονολογήσεις, παλυνολογία, παλαιοπεριβάλλον',
        'ar': 'كرونولوجيا الحشوات تحت الأرض: الطبقية، التأريخ، علم الطلع، البيئة القديمة',
        'he': 'כרונולוגיה של מילויים תת-קרקעיים: סטרטיגרפיה, תיארוך, פלינולוגיה, פלאאובד',
        'id': 'KRONOLOGI PENGISIAN BAWAH TANAH: stratigrafi, penanggalan, palinologi, paleolingkungan',
        'ja': '地下充填物の年代学：地層学、年代測定、花粉学、古環境',
    },
    '1.3': {'it': 'CARSI SPECIALI: conglomerati, magnesite, travertino, tufo, calcarenite, coralli, creta, flysch calcareo', 'pt': 'CARSOS ESPECIAIS: conglomerados, magnesite, travertino, tufo, calcarenito, corais, creta, flysch calcário', 'de': 'SPEZIELLE KARSTE: Konglomerate, Magnesit, Travertin, Tuff, Kalkarenit, Korallen, Kreide, Kalkflysch', 'nl': 'SPECIALE KARSTEN: conglomeraten, magnesiet, travertijn, tufsteen, calcareniet, koralen, krijt, kalkflysch', 'ca': 'CARSTS ESPECIALS: conglomerats, magnesita, travertí, tuf, calcarenita, coralls, creta, flysch calcari', 'ro': 'CARSTE SPECIALE: conglomerate, magnezit, travertin, tuf, calcarenit, corali, cretă, flysch calcaros', 'bg': 'СПЕЦИАЛНИ КАРСТИ: конгломерати, магнезит, травертин, туф, калкаренит, корали, кредна скала, флиш', 'el': 'ΕΙΔΙΚΑ ΚΑΡΣΤ: κογχλωμάτα, μαγνησίτης, τραβερτίνης, τόφος, ασβεστιτικός ψαμμίτης, κοράλλια, κιμωλία, φλύσχης', 'ar': 'أنواع خاصة من الكارست: الكتل الصخرية، المغنيسيت، التراورتين، التف، الكالكارينيت، الشعاب المرجانية', 'he': 'קרסט מיוחד: קונגלומרטים, מגנזיט, טרוורטין, טוף, קלקרניט, אלמוגים, גיר, פליש', 'id': 'KARST KHUSUS: konglomerat, magnesit, travertin, tuf, kalkarenit, karang, kapur, flysch kapur', 'ja': '特殊カルスト：礫岩、マグネサイト、石灰華、凝灰岩、石灰砂岩、珊瑚、白亜、石灰岩フリッシュ'},
    '1.4': {'it': 'PARACARSO IN EVAPORITI: gesso', 'pt': 'PARACARSO EM EVAPORITOS: gesso', 'de': 'PARAKARST IN EVAPORITEN: Gips', 'nl': 'PARAKARST IN EVAPORIETEN: gips', 'ca': 'PARACARST EN EVAPORITES: guix', 'ro': 'PARACARST ÎN EVAPORITE: ghips', 'bg': 'ПАРАКАРСТ В ЕВАПОРИТИ: гипс', 'el': 'ΠΑΡΑΚΑΡΣΤ ΣΕ ΕΒΑΠΟΡΊΤΕΣ: γύψος', 'ar': 'البارا-كارست في الصخور التبخرية: الجبس', 'he': 'פארא-קרסט באבנות גבס', 'id': 'PARAKARST DALAM EVAPORIT: gipsum', 'ja': '蒸発岩のパラカルスト：石膏'},
    '1.5': {'it': 'PARACARSO IN ROCCE SILICEE: quarzite, arenarie, flysch, loess, marne', 'pt': 'PARACARSO EM ROCHAS SILICIOSAS: quartzito, arenitos, flysch, loess, margas', 'de': 'PARAKARST IN KIESELGESTEINEN: Quarzit, Sandsteine, Flysch, Löss, Mergel', 'nl': 'PARAKARST IN KIEZELGESTEENTEN: kwarts, zandsteen, flysch, löss, mergel', 'ca': 'PARACARST EN ROQUES SILÍCIES: quarzita, gresos, flysch, loess, margues', 'ro': 'PARACARST ÎN ROCI SILICIOASE: cuarțit, gresii, flysch, loess, marne', 'bg': 'ПАРАКАРСТ В СИЛИКАТНИ СКАЛИ: кварцит, пясъчници, флиш, льос, мергели', 'el': 'ΠΑΡΑΚΑΡΣΤ ΣΕ ΠΥΡΙΤΙΚΑ ΠΕΤΡΩΜΑΤΑ: χαλαζίτης, ψαμμίτες, φλύσχης, λόσς, μάργες', 'ar': 'البارا-كارست في الصخور السيليكية: الكوارتزيت، الرمليات، الفليش، اللوس، المارل', 'he': 'פארא-קרסט בסלעים סיליציים: קוורציט, אבני חול, פליש, לס, מרל', 'id': 'PARAKARST DALAM BATUAN SILIKA: kuarsit, batu pasir, flysch, loess, marna', 'ja': '珪質岩のパラカルスト：珪岩、砂岩、フリッシュ、レス、泥灰岩'},
    '1.6': {'it': 'PSEUDOCARSO: graniti, gneiss, grotte-frana', 'pt': 'PSEUDOCARSO: granitos, gnaisses, grutas-talus', 'de': 'PSEUDOKARST: Granite, Gneise, Talushöhlen', 'nl': 'PSEUDOKARST: graniet, gneis, talusholen', 'ca': 'PSEUDOCARST: granits, gneis, coves-enderroc', 'ro': 'PSEUDOCARST: granite, gnaisuri, peșteri-taluz', 'bg': 'ПСЕВДОКАРСТ: гранити, гнайси, сипейни пещери', 'el': 'ΨΕΥΔΟΚΑΡΣΤ: γρανίτες, γνεύσιοι, σπήλαια ταλούς', 'ar': 'الكارست الزائف: الغرانيت، النيس، كهوف التلوس', 'he': 'פסאודוקרסט: גרניט, גניס, מערות טאלוס', 'id': 'PSEUDOKARST: granit, gneis, gua-talus', 'ja': '擬似カルスト：花崗岩、片麻岩、崩積洞窟'},
    '1.7': {'it': 'IPOCARSO NEL GHIACCIO, PERMAFROST E TERMOCARSO', 'pt': 'HIPOCARSO NO GELO, PERMAFROST E TERMOCARSO', 'de': 'EISUNTERKARST, PERMAFROST UND THERMOKARST', 'nl': 'HYPOKARST IN IJS, PERMAFROST EN THERMOKARST', 'ca': 'HIPOCARST AL GEL, PERMAFROST I TERMOCARST', 'ro': 'HIPOCARST ÎN GHEAȚĂ, PERMAFROST ȘI TERMOCARST', 'bg': 'ХИПОКАРСТ В ЛЕД, ВЕЧНА ЗАМРАЗЕНОСТ И ТЕРМОКАРСТ', 'el': 'ΥΠΟΚΑΡΣΤ ΣΕ ΠΑΓΟ, ΠΑΓΩΤΟΣ ΚΑΙ ΘΕΡΜΟΚΑΡΣΤ', 'ar': 'الهيبوكارست في الجليد، الصقيع الدائم وكارست الحرارة', 'he': 'היפוקרסט בקרח, פרמפרוסט ותרמוקרסט', 'id': 'HIPOKARST ES, PERMAFROST DAN TERMOKARST', 'ja': '氷・永久凍土・熱カルスト'},
    '1.8': {'it': 'IPO- E PSEUDOCARSO IN ROCCE VULCANICHE: lave', 'pt': 'HIPO- E PSEUDOCARSO EM ROCHAS VULCÂNICAS: lavas', 'de': 'HYPO- UND PSEUDOKARST IN VULKANGESTEINEN: Laven', 'nl': 'HYPO- EN PSEUDOKARST IN VULKANISCH GESTEENTE: lava', 'ca': 'HIPO- I PSEUDOCARST EN ROCA VOLCÀNICA: laves', 'ro': 'HIPO- ȘI PSEUDOCARST ÎN ROCI VULCANICE: lave', 'bg': 'ХИПО- И ПСЕВДОКАРСТ ВЪВ ВУЛКАНСКИ СКАЛИ: лави', 'el': 'ΥΠΟ- ΚΑΙ ΨΕΥΔΟΚΑΡΣΤ ΣΕ ΗΦΑΙΣΤΕΙΑΚΑ ΠΕΤΡΩΜΑΤΑ: λάβα', 'ar': 'الهيبو والسودو-كارست في الصخور البركانية: الحمم', 'he': 'היפו- ופסאודוקרסט בסלעים וולקניים: לבה', 'id': 'HIPO- DAN PSEUDOKARST DI BATUAN VULKANIK: lava', 'ja': '火山岩の地下・擬似カルスト：溶岩'},
    # === BBS 3.x (Biospeleology) ===
    '3.11': {'it': 'CROSTACEI', 'pt': 'CRUSTÁCEOS', 'de': 'KREBSTIERE', 'nl': 'SCHAALDIEREN', 'ca': 'CRUSTACIS', 'ro': 'CRUSTACEE', 'bg': 'РАКООБРАЗНИ', 'el': 'ΚΑΡΚΙΝΟΕΙΔΗ', 'ar': 'القشريات', 'he': 'סרטנאים', 'id': 'KRUSTASEA', 'ja': '甲殻類'},
    '3.12': {'it': 'ESAPODI', 'pt': 'HEXÁPODOS', 'de': 'HEXAPODA', 'nl': 'HEXAPODA', 'ca': 'HEXÀPODES', 'ro': 'HEXAPODE', 'bg': 'ХЕКСАПОДА', 'el': 'ΕΞΑΠΟΔΑ', 'ar': 'سداسيات الأرجل', 'he': 'הקסאפודה', 'id': 'HEKSAPODA', 'ja': '六脚類'},
    '3.13': {'it': 'ARACNIDI, PALPIGRADA, PSEUDOSCORPIONI, MIRIAPODI, ONICOFORI', 'pt': 'ARACNÍDEOS, PALPIGRADA, PSEUDOSCORPIÕES, MIRIÁPODES, ONICÓFOROS', 'de': 'SPINNENTIERE, PALPIGRADA, PSEUDOSKORPIONE, TAUSENDFÜSSLER, ONYCHOPHORA', 'nl': 'SPINACHTIGEN, PALPIGRADA, PSEUDOSCHORPIOENEN, DUIZENDPOTEN, ONYCHOPHORA', 'ca': 'ARÀCNIDS, PALPÍGRADES, PSEUDOESCORPINS, MIRIÀPODES, ONICÒFORS', 'ro': 'ARAHNIDE, PALPIGRADA, PSEUDOSCORPIONI, MIRIAPODE, ONYCHOPHORA', 'bg': 'ПАЯКООБРАЗНИ, ПАЛПИГРАДА, ПСЕВДОСКОРПИОНИ, МНОГОКРАКИ, ОНИХОВОРА', 'el': 'ΑΡΑΧΝΙΔΕΑ, ΠΑΛΠΙΓΚΡΕΪΝΤΑ, ΨΕΥΔΟΣΚΟΡΠΙΟΙ, ΜΥΡΙΑΠΟΔΑ, ΟΝΥΧΟΦΟΡΑ', 'ar': 'العنكبوتيات، البالبيجرادا، العقارب الكاذبة، كثيرات الأرجل، أونيكوفورا', 'he': 'עכביש-בעלי-חיים, פלפיגרדה, עקרב-כוזב, רגלים רבות, אוניקופורה', 'id': 'ARAKHNIDA, PALPIGRADA, PSEUDOSCORPIONES, MYRIAPODA, ONYCHOPHORA', 'ja': 'クモ類・ソリフガ・擬似サソリ・多足類・有爪動物'},
    '3.14': {'it': 'MOLLUSCHI, VERMI E ALTRI INVERTEBRATI', 'pt': 'MOLUSCOS, VERMES E OUTROS INVERTEBRADOS', 'de': 'WEICHTIERE, WÜRMER UND ANDERE WIRBELLOSE', 'nl': 'WEEKDIEREN, WORMEN EN ANDERE ONGEWERVELDEN', 'ca': 'MOL·LUSCS, CUCS I ALTRES INVERTEBRATS', 'ro': 'MOLUȘTE, VIERMI ȘI ALTE NEVERTEBRATE', 'bg': 'МЕКОТЕЛИ, ЧЕРВЕИ И ДРУГИ БЕЗГРЪБНАЧНИ', 'el': 'ΜΑΛΑΚΙΑ, ΣΚΩΛΗΚΕΣ, ΑΛΛΑ ΑΣΠΟΝΔΥΛΑ', 'ar': 'الرخويات والديدان وسائر اللافقاريات', 'he': 'רכיכות, תולעים ואחרים חסרי חוליות', 'id': 'MOLUSKA, CACING, DAN INVERTEBRATA LAINNYA', 'ja': '軟体動物・蠕虫・その他無脊椎動物'},
    '3.15': {'it': 'VERTEBRATI', 'pt': 'VERTEBRADOS', 'de': 'WIRBELTIERE', 'nl': 'GEWERVELDEN', 'ca': 'VERTEBRATS', 'ro': 'VERTEBRATE', 'bg': 'ГРЪБНАЧНИ', 'el': 'ΣΠΟΝΔΥΛΩΤΑ', 'ar': 'الفقاريات', 'he': 'חוליות', 'id': 'VERTEBRATA', 'ja': '脊椎動物'},
    '3.16': {'it': 'MICROBIOLOGIA SUOLO-ARIA-ACQUA', 'pt': 'MICROBIOLOGIA SOLO-AR-ÁGUA', 'de': 'MIKROBIOLOGIE BODEN-LUFT-WASSER', 'nl': 'MICROBIOLOGIE BODEM-LUCHT-WATER', 'ca': 'MICROBIOLOGIA SÒL-AIRE-AIGUA', 'ro': 'MICROBIOLOGIE SOL-AER-APĂ', 'bg': 'МИКРОБИОЛОГИЯ ПОЧВА-ВЪЗДУХ-ВОДА', 'el': 'ΜΙΚΡΟΒΙΟΛΟΓΙΑ ΕΔΑΦΟΥΣ-ΑΕΡΑ-ΝΕΡΟΥ', 'ar': 'الأحياء الدقيقة للتربة والهواء والماء', 'he': 'מיקרוביולוגיה של קרקע-אוויר-מים', 'id': 'MIKROBIOLOGI TANAH-UDARA-AIR', 'ja': '土壌・空気・水の微生物学'},
    '3.17': {'it': 'FLORA IPOGEA, FUNGHI, ALGHE', 'pt': 'FLORA HIPOGEIA, FUNGOS, ALGAS', 'de': 'HYPOGÄISCHE FLORA, PILZE, ALGEN', 'nl': 'HYPOGAÏSCHE FLORA, SCHIMMELS, ALGEN', 'ca': 'FLORA HIPOGEA, FONGS, ALGUES', 'ro': 'FLORĂ HIPOGEE, CIUPERCI, ALGE', 'bg': 'ХИПОГЕЙНА ФЛОРА, ГЪБИ, ВОДОРАСЛИ', 'el': 'ΥΠΟΓΕΙΑ ΧΛΩΡΙΔΑ, ΜΥΚΗΤΕΣ, ΦΥΚΗ', 'ar': 'النباتات تحت الأرض والفطريات والطحالب', 'he': 'צמחיית תת-קרקע, פטריות, אצות', 'id': 'FLORA HIPOGEA, JAMUR, ALGA', 'ja': '地下植物相・菌類・藻類'},
    '3.2': {'it': 'BIOLOGIA GENERALE', 'pt': 'BIOLOGIA GERAL', 'de': 'ALLGEMEINE BIOLOGIE', 'nl': 'ALGEMENE BIOLOGIE', 'ca': 'BIOLOGIA GENERAL', 'ro': 'BIOLOGIE GENERALĂ', 'bg': 'ОБЩА БИОЛОГИЯ', 'el': 'ΓΕΝΙΚΗ ΒΙΟΛΟΓΙΑ', 'ar': 'علم الأحياء العام', 'he': 'ביולוגיה כללית', 'id': 'BIOLOGI UMUM', 'ja': '一般生物学'},
    # === BBS 4.x (Anthropospeleology) ===
    '4.1': {'it': 'ARCHEOLOGIA; CULTURE PREISTORICHE E STORICHE', 'pt': 'ARQUEOLOGIA; CULTURAS PRÉ-HISTÓRICAS E HISTÓRICAS', 'de': 'ARCHÄOLOGIE; PRÄHISTORISCHE UND HISTORISCHE KULTUREN', 'nl': 'ARCHEOLOGIE; PREHISTORISCHE EN HISTORISCHE CULTUREN', 'ca': 'ARQUEOLOGIA; CULTURES PREHISTÒRIQUES I HISTÒRIQUES', 'ro': 'ARHEOLOGIE; CULTURI PREISTORICE ȘI ISTORICE', 'bg': 'АРХЕОЛОГИЯ; ПРАИСТОРИЧЕСКИ И ИСТОРИЧЕСКИ КУЛТУРИ', 'el': 'ΑΡΧΑΙΟΛΟΓΙΑ; ΠΡΟΪΣΤΟΡΙΚΟΙ ΚΑΙ ΙΣΤΟΡΙΚΟΙ ΠΟΛΙΤΙΣΜΟΙ', 'ar': 'الآثار؛ الثقافات ما قبل التاريخية والتاريخية', 'he': 'ארכאולוגיה; תרבויות פרהיסטוריות והיסטוריות', 'id': 'ARKEOLOGI; BUDAYA PRASEJARAH DAN SEJARAH', 'ja': '考古学・先史文化・歴史文化'},
    '4.2': {'it': 'STORIA DELLA SPELEOLOGIA', 'pt': 'HISTÓRIA DA ESPELEOLOGIA', 'de': 'GESCHICHTE DER HÖHLENKUNDE', 'nl': 'GESCHIEDENIS VAN DE SPELEOLOGIE', 'ca': 'HISTÒRIA DE L\'ESPELEOLOGIA', 'ro': 'ISTORIA SPELEOLOGIEI', 'bg': 'ИСТОРИЯ НА СПЕЛЕОЛОГИЯТА', 'el': 'ΙΣΤΟΡΙΑ ΤΗΣ ΣΠΗΛΑΙΟΛΟΓΙΑΣ', 'ar': 'تاريخ علم الكهوف', 'he': 'היסטוריה של הספלאולוגיה', 'id': 'SEJARAH SPELEOLOGI', 'ja': '洞窟学の歴史'},
    '4.4': {'it': 'VARIA: Arte, fumetti ecc.', 'pt': 'VARIA: Arte, banda desenhada etc.', 'de': 'VARIA: Bildende Kunst, Comics usw.', 'nl': 'VARIA: Schone kunsten, strips enz.', 'ca': 'VARIA: Arts, còmics etc.', 'ro': 'VARIA: Arte plastice, benzi desenate etc.', 'bg': 'VARIA: Изящни изкуства, комикси и др.', 'el': 'VARIA: Καλές τέχνες, κόμικς κτλ.', 'ar': 'متنوعات: فنون جميلة، كوميكس إلخ', 'he': 'שונות: אומנות יפה, קומיקס וכדומה', 'id': 'VARIA: Seni rupa, komik dll.', 'ja': 'その他：美術、漫画など'},
    # BBS 4.10-4.15
    '4.10': {'it': 'ARCHEOLOGIA, CULTURE PREISTORICHE E STORICHE: GENERALITÀ senza connessioni regionali', 'pt': 'ARQUEOLOGIA, CULTURAS PRÉ-HISTÓRICAS E HISTÓRICAS: GENERALIDADES sem ligações regionais', 'de': 'ARCHÄOLOGIE, PRÄHIST. UND HIST. KULTUREN: ALLGEMEINES ohne regionale Bezüge', 'nl': 'ARCHEOLOGIE, PREHISTORISCHE EN HISTORISCHE CULTUREN: ALGEMEENHEDEN zonder regionale verbanden', 'ca': 'ARQUEOLOGIA, CULTURES PREHISTÒRIQUES I HISTÒRIQUES: GENERALITATS sense connexions regionals', 'ro': 'ARHEOLOGIE, CULTURI PREISTORICE ȘI ISTORICE: GENERALITĂȚI fără conexiuni regionale', 'bg': 'АРХЕОЛОГИЯ, ПРАИСТОРИЧЕСКИ И ИСТОРИЧЕСКИ КУЛТУРИ: ОБОБЩЕНИЯ без регионални връзки', 'el': 'ΑΡΧΑΙΟΛΟΓΙΑ, ΠΡΟΪΣΤ. ΚΑΙ ΙΣΤΟΡΙΚΟΙ ΠΟΛΙΤΙΣΜΟΙ: ΓΕΝΙΚΟΤΗΤΕΣ χωρίς περιφερειακές συνδέσεις', 'ar': 'الآثار والثقافات: عموميات دون روابط إقليمية', 'he': 'ארכאולוגיה: כלליות ללא קשרים אזוריים', 'id': 'ARKEOLOGI: UMUM tanpa hubungan regional', 'ja': '考古学・文化：地域的繋がりのない一般事項'},
    '4.11': {'it': 'ARCHEOLOGIA, CULTURE PREISTORICHE E STORICHE: EUROPA', 'pt': 'ARQUEOLOGIA, CULTURAS PRÉ-HISTÓRICAS E HISTÓRICAS: EUROPA', 'de': 'ARCHÄOLOGIE, PRÄHIST. UND HIST. KULTUREN: EUROPA', 'nl': 'ARCHEOLOGIE, PRÄHIST. EN HIST. CULTUREN: EUROPA', 'ca': 'ARQUEOLOGIA, CULTURES PREHISTÒRIQUES I HISTÒRIQUES: EUROPA', 'ro': 'ARHEOLOGIE, CULTURI PREISTORICE ȘI ISTORICE: EUROPA', 'bg': 'АРХЕОЛОГИЯ, ПРАИСТОРИЧЕСКИ И ИСТОРИЧЕСКИ КУЛТУРИ: ЕВРОПА', 'el': 'ΑΡΧΑΙΟΛΟΓΙΑ, ΠΡΟΪΣΤ. ΚΑΙ ΙΣΤΟΡΙΚΟΙ ΠΟΛΙΤΙΣΜΟΙ: ΕΥΡΩΠΗ', 'ar': 'الآثار والثقافات: أوروبا', 'he': 'ארכאולוגיה: אירופה', 'id': 'ARKEOLOGI: EROPA', 'ja': '考古学・文化：ヨーロッパ'},
    '4.12': {'it': 'ARCHEOLOGIA, CULTURE PREISTORICHE E STORICHE: AMERICHE', 'pt': 'ARQUEOLOGIA, CULTURAS PRÉ-HISTÓRICAS E HISTÓRICAS: AMÉRICAS', 'de': 'ARCHÄOLOGIE, PRÄHIST. UND HIST. KULTUREN: AMERICA', 'nl': 'ARCHEOLOGIE, PRÄHIST. EN HIST. CULTUREN: AMERICA', 'ca': 'ARQUEOLOGIA, CULTURES PREHISTÒRIQUES I HISTÒRIQUES: AMÈRIQUES', 'ro': 'ARHEOLOGIE, CULTURI PREISTORICE ȘI ISTORICE: AMERICA', 'bg': 'АРХЕОЛОГИЯ: АМЕРИКА', 'el': 'ΑΡΧΑΙΟΛΟΓΙΑ: ΑΜΕΡΙΚΗ', 'ar': 'الآثار والثقافات: الأمريكتان', 'he': 'ארכאולוגיה: אמריקה', 'id': 'ARKEOLOGI: AMERICA', 'ja': '考古学・文化：アメリカ'},
    '4.13': {'it': 'ARCHEOLOGIA, CULTURE PREISTORICHE E STORICHE: ASIA', 'pt': 'ARQUEOLOGIA, CULTURAS PRÉ-HISTÓRICAS E HISTÓRICAS: ÁSIA', 'de': 'ARCHÄOLOGIE, PRÄHIST. UND HIST. KULTUREN: ASIEN', 'nl': 'ARCHEOLOGIE, PRÄHIST. EN HIST. CULTUREN: AZIË', 'ca': 'ARQUEOLOGIA: ÀSIA', 'ro': 'ARHEOLOGIE: ASIA', 'bg': 'АРХЕОЛОГИЯ: АЗИЯ', 'el': 'ΑΡΧΑΙΟΛΟΓΙΑ: ΑΣΙΑ', 'ar': 'الآثار والثقافات: آسيا', 'he': 'ארכאולוגיה: אסיה', 'id': 'ARKEOLOGI: ASIA', 'ja': '考古学・文化：アジア'},
    '4.14': {'it': 'ARCHEOLOGIA, CULTURE PREISTORICHE E STORICHE: AFRICA', 'pt': 'ARQUEOLOGIA, CULTURAS PRÉ-HISTÓRICAS E HISTÓRICAS: ÁFRICA', 'de': 'ARCHÄOLOGIE, PRÄHIST. UND HIST. KULTUREN: AFRIKA', 'nl': 'ARCHEOLOGIE, PRÄHIST. EN HIST. CULTUREN: AFRIKA', 'ca': 'ARQUEOLOGIA: ÀFRICA', 'ro': 'ARHEOLOGIE: AFRICA', 'bg': 'АРХЕОЛОГИЯ: АФРИКА', 'el': 'ΑΡΧΑΙΟΛΟΓΙΑ: ΑΦΡΙΚΗ', 'ar': 'الآثار والثقافات: أفريقيا', 'he': 'ארכאולוגיה: אפריקה', 'id': 'ARKEOLOGI: AFRICA', 'ja': '考古学・文化：アフリカ'},
    '4.15': {'it': 'ARCHEOLOGIA, CULTURE PREISTORICHE E STORICHE: AUSTRALASIA, OCEANIA', 'pt': 'ARQUEOLOGIA, CULTURAS PRÉ-HISTÓRICAS E HISTÓRICAS: AUSTRALÁSIA, OCEANIA', 'de': 'ARCHÄOLOGIE, PRÄHIST. UND HIST. KULTUREN: AUSTRALASIEN, OZEANIEN', 'nl': 'ARCHEOLOGIE, PRÄHIST. EN HIST. CULTUREN: AUSTRALAZIË, OCEANIË', 'ca': 'ARQUEOLOGIA: AUSTRALÀSIA, OCEANIA', 'ro': 'ARHEOLOGIE: AUSTRALASIA, OCEANIA', 'bg': 'АРХЕОЛОГИЯ: АВСТРАЛАЗИЯ, ОКЕАНИЯ', 'el': 'ΑΡΧΑΙΟΛΟΓΙΑ: ΑΥΣΤΡΑΛΑΣΙΑ, ΩΚΕΑΝΙΑ', 'ar': 'الآثار والثقافات: أستراليا وأوقيانوسيا', 'he': 'ארכאולוגיה: אוסטרלסיה ואוקיאניה', 'id': 'ARKEOLOGI: AUSTRALASIA, OCEANIA', 'ja': '考古学・文化：オーストラレーシア・オセアニア'},
    # BBS 5.x Paleontospeleology
    '5.1': {'it': 'FAUNE E FLORE FOSSILI E SUBFOSSILI (QUATERNARIO)', 'pt': 'FAUNAS E FLORAS FÓSSEIS E SUBFÓSSEIS (QUATERNÁRIO)', 'de': 'FOSSILE UND SUBFOSSILE FAUNEN UND FLOREN (QUARTÄR)', 'nl': 'FOSSIELE EN SUBFOSSIELE FAUNA EN FLORA (KWARTAIR)', 'ca': 'FAUNES I FLORAS FÒSSILS I SUBFÒSSILS (QUATERNARI)', 'ro': 'FAUNE ȘI FLORE FOSILE ȘI SUBFOSILE (CUATERNAR)', 'bg': 'ФОСИЛНИ И СУБФОСИЛНИ ФАУНИ И ФЛОРИ (КВАТЕРНЕР)', 'el': 'ΑΠΟΛΙΘΩΜΑΤΑ ΚΑΙ ΥΠΟΑΠΟΛΙΘΩΜΑΤΑ ΧΛΩΡΙΔΕΣ ΚΑΙ ΠΑΝΙΔΕΣ (ΤΕΤΑΡΤΟΓΕΝΕΣ)', 'ar': 'حيوانات ونباتات أحفورية وشبه أحفورية (العصر الرابع)', 'he': 'פאונות ופלורות מאובנות ותת-מאובנות (קוורטרנר)', 'id': 'FAUNA DAN FLORA FOSIL DAN SUBFOSIL (KUARTENER)', 'ja': '化石・亜化石の動植物相（第四紀）'},
    '5.10': {'it': 'FAUNE E FLORE FOSSILI E SUBFOSSILI (QUATERNARIO): GENERALITÀ', 'pt': 'FAUNE E FLORE FOSSILI E SUBFOSSILI (QUATERNARIO): GENERALIDADES', 'de': 'FOSSILE UND SUBFOSSILE FAUNEN UND FLOREN (QUARTÄR): ALLGEMEINES', 'nl': 'FOSSIELE EN SUBFOSSIELE FAUNA EN FLORA (KWARTAIR): ALGEMEENHEDEN', 'ca': 'FAUNES I FLORAS FÒSSILS I SUBFÒSSILS: GENERALITATS', 'ro': 'FAUNE ȘI FLORE FOSILE (CUATERNAR): GENERALITĂȚI', 'bg': 'ФОСИЛНИ ФАУНИ И ФЛОРИ: ОБОБЩЕНИЯ', 'el': 'ΑΠΟΛΙΘΩΜΑΤΑ: ΓΕΝΙΚΟΤΗΤΕΣ', 'ar': 'الأحافير والشبه-أحافير: عموميات', 'he': 'מאובנות: כלליות', 'id': 'FOSIL: UMUM', 'ja': '化石：一般事項'},
    '5.11': {'it': 'FAUNE E FLORE FOSSILI E SUBFOSSILI: EUROPA', 'pt': 'FAUNE E FLORE FOSSILI E SUBFOSSILI: EUROPA', 'de': 'FOSSILE UND SUBFOSSILE FAUNEN UND FLOREN: EUROPA', 'nl': 'FOSSIELE EN SUBFOSSIELE FAUNA EN FLORA: EUROPA', 'ca': 'FAUNES I FLORAS FÒSSILS: EUROPA', 'ro': 'FAUNE ȘI FLORE FOSILE: EUROPA', 'bg': 'ФОСИЛНИ ФАУНИ И ФЛОРИ: ЕВРОПА', 'el': 'ΑΠΟΛΙΘΩΜΑΤΑ: ΕΥΡΩΠΗ', 'ar': 'الأحافير: أوروبا', 'he': 'מאובנות: אירופה', 'id': 'FOSIL: EROPA', 'ja': '化石：ヨーロッパ'},
    '5.12': {'it': 'FAUNE E FLORE FOSSILI E SUBFOSSILI: AMERICHE', 'pt': 'FAUNE E FLORE FOSSILI E SUBFOSSILI: AMÉRICAS', 'de': 'FOSSILE UND SUBFOSSILE FAUNEN UND FLOREN: AMERICA', 'nl': 'FOSSIELE EN SUBFOSSIELE FAUNA EN FLORA: AMERICA', 'ca': 'FAUNES I FLORAS FÒSSILS: AMÈRIQUES', 'ro': 'FAUNE ȘI FLORE FOSILE: AMERICA', 'bg': 'ФОСИЛНИ ФАУНИ И ФЛОРИ: АМЕРИКА', 'el': 'ΑΠΟΛΙΘΩΜΑΤΑ: ΑΜΕΡΙΚΗ', 'ar': 'الأحافير: الأمريكتان', 'he': 'מאובנות: אמריקה', 'id': 'FOSIL: AMERICA', 'ja': '化石：アメリカ'},
    '5.13': {'it': 'FAUNE E FLORE FOSSILI E SUBFOSSILI: ASIA', 'pt': 'FAUNE E FLORE FOSSILI E SUBFOSSILI: ÁSIA', 'de': 'FOSSILE UND SUBFOSSILE FAUNEN UND FLOREN: ASIEN', 'nl': 'FOSSIELE EN SUBFOSSIELE FAUNA EN FLORA: AZIË', 'ca': 'FAUNES I FLORAS FÒSSILS: ÀSIA', 'ro': 'FAUNE ȘI FLORE FOSILE: ASIA', 'bg': 'ФОСИЛНИ ФАУНИ И ФЛОРИ: АЗИЯ', 'el': 'ΑΠΟΛΙΘΩΜΑΤΑ: ΑΣΙΑ', 'ar': 'الأحافير: آسيا', 'he': 'מאובנות: אסיה', 'id': 'FOSIL: ASIA', 'ja': '化石：アジア'},
    '5.14': {'it': 'FAUNE E FLORE FOSSILI E SUBFOSSILI: AFRICA', 'pt': 'FAUNE E FLORE FOSSILI E SUBFOSSILI: ÁFRICA', 'de': 'FOSSILE UND SUBFOSSILE FAUNEN UND FLOREN: AFRIKA', 'nl': 'FOSSIELE EN SUBFOSSIELE FAUNA EN FLORA: AFRIKA', 'ca': 'FAUNES I FLORAS FÒSSILS: ÀFRICA', 'ro': 'FAUNE ȘI FLORE FOSILE: AFRICA', 'bg': 'ФОСИЛНИ ФАУНИ И ФЛОРИ: АФРИКА', 'el': 'ΑΠΟΛΙΘΩΜΑΤΑ: ΑΦΡΙΚΗ', 'ar': 'الأحافير: أفريقيا', 'he': 'מאובנות: אפריקה', 'id': 'FOSIL: AFRICA', 'ja': '化石：アフリカ'},
    '5.15': {'it': 'FAUNE E FLORE FOSSILI E SUBFOSSILI: AUSTRALASIA, OCEANIA', 'pt': 'FAUNE E FLORE FOSSILI E SUBFOSSILI: AUSTRALÁSIA, OCEANIA', 'de': 'FOSSILE UND SUBFOSSILE FAUNEN UND FLOREN: AUSTRALASIEN, OZEANIEN', 'nl': 'FOSSIELE EN SUBFOSSIELE FAUNA EN FLORA: AUSTRALAZIË, OCEANIË', 'ca': 'FAUNES I FLORAS FÒSSILS: AUSTRALÀSIA, OCEANIA', 'ro': 'FAUNE ȘI FLORE FOSILE: AUSTRALASIA, OCEANIA', 'bg': 'ФОСИЛНИ ФАУНИ И ФЛОРИ: АВСТРАЛАЗИЯ, ОКЕАНИЯ', 'el': 'ΑΠΟΛΙΘΩΜΑΤΑ: ΑΥΣΤΡΑΛΑΣΙΑ, ΩΚΕΑΝΙΑ', 'ar': 'الأحافير: أستراليا وأوقيانوسيا', 'he': 'מאובנות: אוסטרלסיה ואוקיאניה', 'id': 'FOSIL: AUSTRALASIA, OCEANIA', 'ja': '化石：オーストラレーシア・オセアニア'},
    '5.2': {'it': 'FAUNE E FLORE FOSSILI E SUBFOSSILI: VARIA', 'pt': 'FAUNE E FLORE FOSSILI E SUBFOSSILI: VARIA', 'de': 'FOSSILE UND SUBFOSSILE FAUNEN UND FLOREN: VARIA', 'nl': 'FOSSIELE EN SUBFOSSIELE FAUNA EN FLORA: VARIA', 'ca': 'FAUNES I FLORAS FÒSSILS: VARIA', 'ro': 'FAUNE ȘI FLORE FOSILE: VARIA', 'bg': 'ФОСИЛНИ ФАУНИ И ФЛОРИ: РАЗНИ', 'el': 'ΑΠΟΛΙΘΩΜΑΤΑ: ΔΙΑΦΟΡΑ', 'ar': 'الأحافير: متنوعات', 'he': 'מאובנות: שונות', 'id': 'FOSIL: VARIA', 'ja': '化石：その他'},
    # === addresstype ===
    'addresstype.amenity': {'fr': 'Équipement', 'it': 'Servizio', 'pt': 'Equipamento', 'de': 'Einrichtung', 'nl': 'Voorziening', 'ca': 'Equipament', 'ro': 'Facilitate', 'bg': 'Удобство', 'el': 'Παροχή', 'ar': 'مرفق', 'he': 'שירות', 'id': 'Fasilitas', 'ja': '施設'},
    'addresstype.building': {'fr': 'Bâtiment', 'it': 'Edificio', 'pt': 'Edifício', 'de': 'Gebäude', 'nl': 'Gebouw', 'ca': 'Edifici', 'ro': 'Clădire', 'bg': 'Сграда', 'el': 'Κτίριο', 'ar': 'مبنى', 'he': 'בניין', 'id': 'Gedung', 'ja': '建物'},
    'addresstype.city': {'fr': 'Ville', 'it': 'Città', 'pt': 'Cidade', 'de': 'Stadt', 'nl': 'Stad', 'ca': 'Ciutat', 'ro': 'Oraș', 'bg': 'Град', 'el': 'Πόλη', 'ar': 'مدينة', 'he': 'עיר', 'id': 'Kota', 'ja': '市'},
    'addresstype.country': {'fr': 'Pays', 'it': 'Paese', 'pt': 'País', 'de': 'Land', 'nl': 'Land', 'ca': 'País', 'ro': 'Țară', 'bg': 'Страна', 'el': 'Χώρα', 'ar': 'الدولة', 'he': 'מדינה', 'id': 'Negara', 'ja': '国'},
    'addresstype.county': {'fr': 'Comté', 'it': 'Contea', 'pt': 'Condado', 'de': 'Landkreis', 'nl': 'Provincie', 'ca': 'Comtat', 'ro': 'Județ', 'bg': 'Окръг', 'el': 'Κομητεία', 'ar': 'مقاطعة', 'he': 'מחוז', 'id': 'Kabupaten', 'ja': '郡'},
    'addresstype.hamlet': {'fr': 'Hameau', 'it': 'Borgo', 'pt': 'Aldeia', 'de': 'Weiler', 'nl': 'Gehucht', 'ca': 'Llogaret', 'ro': 'Cătun', 'bg': 'Махала', 'el': 'Χαμλέτ', 'ar': 'قرية صغيرة', 'he': 'כפר קטן', 'id': 'Dusun', 'ja': '集落'},
    'addresstype.highway': {'fr': 'Route', 'it': 'Strada', 'pt': 'Estrada', 'de': 'Straße', 'nl': 'Weg', 'ca': 'Carretera', 'ro': 'Drum', 'bg': 'Път', 'el': 'Δρόμος', 'ar': 'طريق', 'he': 'כביש', 'id': 'Jalan', 'ja': '道路'},
    'addresstype.house': {'fr': 'Maison', 'it': 'Casa', 'pt': 'Casa', 'de': 'Haus', 'nl': 'Huis', 'ca': 'Casa', 'ro': 'Casă', 'bg': 'Къща', 'el': 'Σπίτι', 'ar': 'منزل', 'he': 'בית', 'id': 'Rumah', 'ja': '家'},
    'addresstype.leisure': {'fr': 'Loisir', 'it': 'Svago', 'pt': 'Lazer', 'de': 'Freizeit', 'nl': 'Recreatie', 'ca': 'Lleure', 'ro': 'Agrement', 'bg': 'Отдих', 'el': 'Αναψυχή', 'ar': 'ترفيه', 'he': 'פנאי', 'id': 'Rekreasi', 'ja': 'レジャー'},
    'addresstype.municipality': {'fr': 'Commune', 'it': 'Comune', 'pt': 'Município', 'de': 'Gemeinde', 'nl': 'Gemeente', 'ca': 'Municipi', 'ro': 'Municipalitate', 'bg': 'Община', 'el': 'Δήμος', 'ar': 'بلدية', 'he': 'עירייה', 'id': 'Kotamadya', 'ja': '市町村'},
    'addresstype.neighbourhood': {'fr': 'Quartier', 'it': 'Quartiere', 'pt': 'Bairro', 'de': 'Viertel', 'nl': 'Buurt', 'ca': 'Barri', 'ro': 'Cartier', 'bg': 'Квартал', 'el': 'Γειτονιά', 'ar': 'حي', 'he': 'שכונה', 'id': 'Lingkungan', 'ja': '地区'},
    'addresstype.quarter': {'fr': 'Quartier', 'it': 'Quartiere', 'pt': 'Bairro', 'de': 'Quartier', 'nl': 'Kwartier', 'ca': 'Barri', 'ro': 'Sector', 'bg': 'Квартал', 'el': 'Τέταρτο', 'ar': 'ربع', 'he': 'רובע', 'id': 'Kwartal', 'ja': '地区'},
    'addresstype.region': {'fr': 'Région', 'it': 'Regione', 'pt': 'Região', 'de': 'Region', 'nl': 'Regio', 'ca': 'Regió', 'ro': 'Regiune', 'bg': 'Регион', 'el': 'Περιφέρεια', 'ar': 'منطقة', 'he': 'אזור', 'id': 'Wilayah', 'ja': '地域'},
    'addresstype.state': {'fr': 'État', 'it': 'Stato', 'pt': 'Estado', 'de': 'Staat', 'nl': 'Staat', 'ca': 'Estat', 'ro': 'Stat', 'bg': 'Щат', 'el': 'Κράτος', 'ar': 'ولاية', 'he': 'מדינה', 'id': 'Negara bagian', 'ja': '州'},
    'addresstype.suburb': {'fr': 'Banlieue', 'it': 'Sobborgo', 'pt': 'Subúrbio', 'de': 'Vorort', 'nl': 'Buitenwijk', 'ca': 'Suburbi', 'ro': 'Suburbie', 'bg': 'Предградие', 'el': 'Προάστιο', 'ar': 'ضاحية', 'he': 'פרבר', 'id': 'Pinggiran kota', 'ja': '郊外'},
    # === lowercase UI keys ===
    'a comment': {'fr': 'un commentaire', 'it': 'un commento', 'pt': 'um comentário', 'de': 'einen Kommentar', 'nl': 'een opmerking', 'ca': 'un comentari', 'ro': 'un comentariu', 'bg': 'коментар', 'el': 'ένα σχόλιο', 'ar': 'تعليق', 'he': 'תגובה', 'id': 'komentar', 'ja': 'コメント'},
    'a description': {'fr': 'une description', 'it': 'una descrizione', 'pt': 'uma descrição', 'de': 'eine Beschreibung', 'nl': 'een beschrijving', 'ca': 'una descripció', 'ro': 'o descriere', 'bg': 'описание', 'el': 'μια περιγραφή', 'ar': 'وصف', 'he': 'תיאור', 'id': 'deskripsi', 'ja': '説明'},
    'a history': {'fr': 'un historique', 'it': 'una storia', 'pt': 'um histórico', 'de': 'einen Verlauf', 'nl': 'een geschiedenis', 'ca': 'un historial', 'ro': 'un istoric', 'bg': 'история', 'el': 'ένα ιστορικό', 'ar': 'سجل', 'he': 'היסטוריה', 'id': 'riwayat', 'ja': '履歴'},
    'a location': {'fr': 'une localisation', 'it': 'una posizione', 'pt': 'uma localização', 'de': 'einen Standort', 'nl': 'een locatie', 'ca': 'una localització', 'ro': 'o locație', 'bg': 'местоположение', 'el': 'μια τοποθεσία', 'ar': 'موقع', 'he': 'מיקום', 'id': 'lokasi', 'ja': '場所'},
    'a rigging': {'fr': 'un équipement', 'it': 'un attrezzaggio', 'pt': 'um equipamento', 'de': 'eine Seilausrüstung', 'nl': 'een uitrusting', 'ca': 'un equipament', 'ro': 'un echipament', 'bg': 'оборудване', 'el': 'εξοπλισμό', 'ar': 'تجهيز', 'he': 'ציוד', 'id': 'rigging', 'ja': 'ロープ設置'},
    'abstract': {'fr': 'résumé', 'it': 'riassunto', 'pt': 'resumo', 'de': 'Zusammenfassung', 'nl': 'samenvatting', 'ca': 'resum', 'ro': 'rezumat', 'bg': 'резюме', 'el': 'περίληψη', 'ar': 'ملخص', 'he': 'תקציר', 'id': 'abstrak', 'ja': '要約'},
    'document(s)': {'fr': 'document(s)', 'it': 'documento/i', 'pt': 'documento(s)', 'de': 'Dokument(e)', 'nl': 'document(en)', 'ca': 'document(s)', 'ro': 'document(e)', 'bg': 'документ(и)', 'el': 'έγγραφο/-α', 'ar': 'وثيقة/وثائق', 'he': 'מסמך/ים', 'id': 'dokumen', 'ja': '文書'},
    'massif(s)': {'fr': 'massif(s)', 'it': 'massiccio/i', 'pt': 'maciço(s)', 'de': 'Massiv/e', 'nl': 'massief/massieven', 'ca': 'massís/massissos', 'ro': 'masiv/masive', 'bg': 'масив(и)', 'el': 'μαζική περιοχή/-ές', 'ar': 'كتلة/كتل جبلية', 'he': 'מסיב/ים', 'id': 'massif', 'ja': 'マシフ'},
    'massifs': {'fr': 'massifs', 'it': 'massicci', 'pt': 'maciços', 'de': 'Massive', 'nl': 'massieven', 'ca': 'massissos', 'ro': 'masive', 'bg': 'масиви', 'el': 'μαζικές περιοχές', 'ar': 'كتل جبلية', 'he': 'מסיבים', 'id': 'massif', 'ja': 'マシフ群'},
    'observation': {'fr': 'observation', 'it': 'osservazione', 'pt': 'observação', 'de': 'Beobachtung', 'nl': 'observatie', 'ca': 'observació', 'ro': 'observație', 'bg': 'наблюдение', 'el': 'παρατήρηση', 'ar': 'ملاحظة', 'he': 'תצפית', 'id': 'observasi', 'ja': '観察'},
    'observations': {'fr': 'observations', 'it': 'osservazioni', 'pt': 'observações', 'de': 'Beobachtungen', 'nl': 'observaties', 'ca': 'observacions', 'ro': 'observații', 'bg': 'наблюдения', 'el': 'παρατηρήσεις', 'ar': 'ملاحظات', 'he': 'תצפיות', 'id': 'observasi', 'ja': '観察一覧'},
    'obstacles': {'fr': 'obstacles', 'it': 'ostacoli', 'pt': 'obstáculos', 'de': 'Hindernisse', 'nl': 'obstakels', 'ca': 'obstacles', 'ro': 'obstacole', 'bg': 'препятствия', 'el': 'εμπόδια', 'ar': 'عقبات', 'he': 'מכשולים', 'id': 'rintangan', 'ja': '障害物'},
    'publication': {'fr': 'publication', 'it': 'pubblicazione', 'pt': 'publicação', 'de': 'Veröffentlichung', 'nl': 'publicatie', 'ca': 'publicació', 'ro': 'publicație', 'bg': 'публикация', 'el': 'δημοσίευση', 'ar': 'نشر', 'he': 'פרסום', 'id': 'publikasi', 'ja': '出版物'},
}


def load_json(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)


def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2, sort_keys=True)
        f.write('\n')


def apply():
    en = load_json(os.path.join(LANG_DIR, 'en.json'))
    total = 0
    langs = ['fr', 'es', 'it', 'pt', 'de', 'nl', 'ca', 'ro', 'bg', 'el', 'ar', 'he', 'id', 'ja']
    for lang in langs:
        path = os.path.join(LANG_DIR, f'{lang}.json')
        data = load_json(path)
        count = 0
        for key, translations in T.items():
            if lang in translations:
                if data.get(key, '') == '' or data.get(key, '') == en.get(key, ''):
                    data[key] = translations[lang]
                    count += 1
        save_json(path, data)
        total += count
        if count:
            print(f'{lang}: +{count}')
    print(f'Total: {total}')


if __name__ == '__main__':
    apply()
