export const specialties = [
  'كل الأطباء',
  'طب وتجميل الأسنان',
  'الأمراض الجلدية والتجميل',
  'خدمات الليزر',
] as const;

export const branches = ['حفر الباطن'] as const;
export const services = ['استشارة', 'جلسة علاج', 'متابعة'] as const;

export type Specialty = (typeof specialties)[number];
export type Branch = (typeof branches)[number];
export type Service = (typeof services)[number];

export interface DoctorProfileSection {
  title: string;
  paragraphs?: readonly string[];
  listItems?: readonly string[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  /** SEO-oriented role used in titles/JSON-LD when distinct from short card title. */
  seoRole: string;
  specialty: Exclude<Specialty, 'كل الأطباء'>;
  branch: Branch;
  services: readonly Service[];
  image: string;
  summary: string;
  experienceYears?: number;
  sections: readonly DoctorProfileSection[];
}

export const doctors: readonly Doctor[] = [
  {
    id: 'dentistry-fatima',
    name: 'د. فاطمة نضال',
    title: 'طبيبة أسنان',
    seoRole: 'طبيبة أسنان في بيوتي كورنر بحفر الباطن',
    specialty: 'طب وتجميل الأسنان',
    branch: 'حفر الباطن',
    services: ['استشارة', 'جلسة علاج', 'متابعة'],
    image: '/assets/doctor-dentistry.png',
    summary: 'طبيبة أسنان تقدّم رعاية شاملة لصحة الفم واللثة، مع خطط علاجية واضحة منذ أول زيارة.',
    experienceYears: 10,
    sections: [
      {
        title: 'نبذة عن الطبيبة',
        paragraphs: [
          'تهتم د. فاطمة نضال بتقديم رعاية أسنان مريحة ودقيقة، مع شرح الخطة العلاجية والبدائل المتاحة قبل البدء بأي إجراء.',
        ],
      },
      {
        title: 'مجالات التركيز',
        listItems: [
          'الفحص والتنظيف والعناية الوقائية',
          'تجميل الأسنان والتبييض',
          'علاج مشكلات الفم واللثة',
        ],
      },
      {
        title: 'أسلوب الرعاية',
        paragraphs: [
          'تركز على راحة المريض والتثقيف الصحي في كل جلسة، مع متابعة بعد العلاج عند الحاجة لضمان أفضل نتيجة.',
        ],
      },
    ],
  },
  {
    id: 'dentistry-wissam',
    name: 'د. وسام مندور',
    title: 'أخصائي جراحة وجه وفكين وزراعة',
    seoRole: 'أخصائي جراحة وجه وفكين وزراعة أسنان في بيوتي كورنر بحفر الباطن',
    specialty: 'طب وتجميل الأسنان',
    branch: 'حفر الباطن',
    services: ['استشارة', 'جلسة علاج', 'متابعة'],
    image: '/assets/doctor-wissam.png',
    summary: 'أخصائي في جراحة الوجه والفكين وزراعة الأسنان، يركز على التقييم الدقيق والخطط الجراحية الآمنة.',
    experienceYears: 14,
    sections: [
      {
        title: 'نبذة عن الطبيب',
        paragraphs: [
          'يختص د. وسام مندور بجراحة الوجه والفكين وزراعة الأسنان، مع تقييم شامل قبل اقتراح أي تدخل جراحي أو زراعي.',
        ],
      },
      {
        title: 'مجالات التركيز',
        listItems: [
          'جراحة الوجه والفكين',
          'زراعة الأسنان',
          'التقييم الجراحي وخطط العلاج المتقدمة',
        ],
      },
      {
        title: 'أسلوب الرعاية',
        paragraphs: [
          'يبدأ كل حالة بتقييم طبي مفصل، ثم يشرح الخيارات والمخاطر المتوقعة بلغة واضحة قبل تحديد الخطة العلاجية.',
        ],
      },
    ],
  },
  {
    id: 'dermatology-hala',
    name: 'د. هالة البدوي',
    title: 'طبيبة الجلدية والتجميل',
    seoRole: 'طبيبة الجلدية والتجميل في بيوتي كورنر بحفر الباطن',
    specialty: 'الأمراض الجلدية والتجميل',
    branch: 'حفر الباطن',
    services: ['استشارة', 'جلسة علاج', 'متابعة'],
    image: '/assets/doctor-hala.jpg',
    summary:
      'طبيبة الجلدية والتجميل تقدّم تقييمًا طبيًا لحالة البشرة وخطط علاجية لليزر والفيلر والبوتوكس والنحت والعناية بالبشرة.',
    sections: [
      {
        title: 'نبذة عن الطبيبة',
        paragraphs: [
          'تهتم د. هالة البدوي بتقييم البشرة أولًا، ثم تشرح الخيارات المناسبة من الجلدية والتجميل قبل بدء أي إجراء.',
        ],
      },
      {
        title: 'مجالات التركيز',
        listItems: [
          'الليزر وعلاج التصبغات والشعر',
          'الفيلر والبوتوكس',
          'النحت والعناية بالبشرة مثل الهيدرافيشل',
        ],
      },
      {
        title: 'أسلوب الرعاية',
        paragraphs: [
          'تركز على نتيجة طبيعية وخطة واضحة بعد التقييم، مع متابعة بعد الجلسة عند الحاجة.',
        ],
      },
    ],
  },
];

export function getDoctorById(id: string): Doctor | undefined {
  return doctors.find((doctor) => doctor.id === id);
}
