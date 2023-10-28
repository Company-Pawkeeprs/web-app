export enum DogBreed {
    ViraLata = 'Vira-Lata',
    LabradorRetriever = 'Labrador Retriever',
    GoldenRetriever = 'Golden Retriever',
    PastorAlemao = 'Pastor Alemão',
    BulldogFrances = 'Buldogue Francês',
    Poodle = 'Poodle',
    ShihTzu = 'Shih Tzu',
    YorkshireTerrier = 'Yorkshire Terrier',
    LhasaApso = 'Lhasa Apso',
    Rottweiler = 'Rottweiler',
    Beagle = 'Beagle',
    Dachshund = 'Dachshund',
    BorderCollie = 'Border Collie',
    BichonFrise = 'Bichon Frisé',
    Pitbull = 'Pitbull',
    Boxer = 'Boxer',
    Pug = 'Pug',
    CockerSpaniel = 'Cocker Spaniel',
    Chihuahua = 'Chihuahua',
    Maltes = 'Maltês',
    // ...
}

export enum CatBreed {
    ViraLata = 'Vira-Lata',
    Persa = 'Persa',
    Siames = 'Siamês',
    MaineCoon = 'Maine Coon',
    Ragdoll = 'Ragdoll',
    Sphynx = 'Sphynx',
    Angora = 'Angorá',
    Bengal = 'Bengal',
    Siberiano = 'Siberiano',
    Burmes = 'Burmês',
    Exotico = 'Exótico',
    DevonRex = 'Devon Rex',
    Himalaia = 'Himalaia',
    NorueguesDaFloresta = 'Norueguês da Floresta',
    Ocicat = 'Ocicat',
    // ...
}

export enum HorseBreed {
    MangalargaMarchador = 'Mangalarga Marchador',
    Crioulo = 'Crioulo',
    Campolina = 'Campolina',
    QuartoDeMilha = 'Quarto de Milha',
    BrasileiroDeHipismo = 'Brasileiro de Hipismo',
    Outros = 'Outros'
    // ...
}

export enum FishBreed {
    Betta = 'Betta',
    NeonCardinal = 'Neon Cardinal',
    AcaraDisco = 'Acará Disco',
    Kinguio = 'Kinguio',
    Molly = 'Molly',
    Outros = 'Outros'
    // ...
}

export enum ReptileBreed {
    Iguana = 'Iguana',
    Jabuti = 'Jabuti',
    Gecko = 'Gecko',
    Teiu = 'Teiú',
    Jiboia = 'Jiboia',
    Outros = 'Outros'
    // ...
}

export enum BirdBreed {
    CanarioBelga = 'Canário Belga',
    PeriquitoAustraliano = 'Periquito Australiano',
    Calopsita = 'Calopsita',
    Agapornis = 'Agapornis',
    Cacatua = 'Cacatua',
    Papagaio = 'Papagaio',
    Outros = 'Outros',
    // ...
}

export enum RabbitBreed {
    AngoraIngles = "Angorá Inglês",
    AngoraFrances = "Angorá Francês",
    AngoraGigante = "Angorá Gigante",
    Argente = "Argente",
    BelgianHare = "Belgian Hare",
    Californiano = "Californiano",
    CabeçaDeLeão = "Cabeça de Leão",
    CastorRex = "Castor Rex",
    Chinchila = "Chinchila",
    CoelhoHolandes = "Coelho Holandês",
    CoelhoLebreBelga = "Coelho Lebre Belga",
    CoelhoLebreEuropeu = "Coelho Lebre Europeu",
    FlemishGiant = "Flemish Giant",
    Hotot = "Hotot",
    LopIngles = "Lop Inglês",
    LopFrances = "Lop Francês",
    LopHolland = "Lop Holland",
    MiniLop = "Mini Lop",
    MiniRex = "Mini Rex",
    NetherlandDwarf = "Netherland Dwarf",
    NovaZelandia = "Nova Zelândia",
    Polish = "Polish",
    Silver = "Silver",
    SilverFox = "Silver Fox",
    Outros = 'Não Informado',
}

export type Breed = DogBreed | CatBreed | HorseBreed | FishBreed | ReptileBreed | BirdBreed | RabbitBreed;