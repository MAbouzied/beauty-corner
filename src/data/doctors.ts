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
  specialty: Exclude<Specialty, 'كل الأطباء'>;
  branch: Branch;
  services: readonly Service[];
  image: string;
  summary: string;
  experienceYears: number;
  sections: readonly DoctorProfileSection[];
}

export const doctors: readonly Doctor[] = [
  {
    id: 'dentistry-fatima',
    name: 'د. فاطمة نضال',
    title: 'طبيبة أسنان',
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
];

export function getDoctorById(id: string): Doctor | undefined {
  return doctors.find((doctor) => doctor.id === id);
}
