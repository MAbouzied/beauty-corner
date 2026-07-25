import type { Specialty } from './doctors';

export const serviceCategories = ['كل الخدمات', 'الأسنان', 'الجلدية', 'الليزر'] as const;

export type ServiceCategory = (typeof serviceCategories)[number];

export interface ServiceDetailSection {
  title: string;
  paragraphs?: readonly string[];
  listIntro?: string;
  listItems?: readonly string[];
}

export interface ClinicService {
  id: string;
  title: string;
  description: string;
  category: Exclude<ServiceCategory, 'كل الخدمات'>;
  icon: string;
  heroImage: string;
  heroImageAlt: string;
  doctorSpecialty: Exclude<Specialty, 'كل الأطباء'>;
  sections: readonly ServiceDetailSection[];
}

export const clinicServices: readonly ClinicService[] = [
  {
    id: 'dentistry',
    title: 'طب وتجميل الأسنان',
    description: 'خطط علاجية شاملة للحفاظ على صحة أسنانك وابتسامتك.',
    category: 'الأسنان',
    icon: '/assets/service-dentistry.svg',
    heroImage: '/assets/service-detail-dentistry.jpg',
    heroImageAlt: 'غرفة علاج أسنان حديثة داخل عيادة بيوتي كورنر',
    doctorSpecialty: 'طب وتجميل الأسنان',
    sections: [
      {
        title: 'طب أسنان الأطفال',
        paragraphs: [
          'في بيوتي كورنر نوفر تجربة مريحة أثناء علاج الأسنان داخل بيئة هادئة وبرعاية متكاملة. نحرص على بناء الثقة مع المرضى عبر التثقيف الصحي والوضوح في الخطة العلاجية قبل البدء.',
        ],
      },
      {
        title: 'علاجات الأسنان والتجميل',
        paragraphs: [
          'نغطي احتياجاتك من الفحص والتنظيف إلى التبييض والتقويم والتجميل، مع تقييم طبي يحدد الأولويات ويحافظ على صحة الفم واللثة على المدى الطويل.',
        ],
      },
      {
        title: 'ما الذي يميز زيارة الأسنان لدينا؟',
        listIntro: 'نركز على راحة المريض ووضوح الخطوات من أول استشارة حتى المتابعة:',
        listItems: [
          'تقييم شامل للفم والأسنان قبل اقتراح أي إجراء.',
          'شرح واضح للخطة والخيارات المتاحة بما يناسب حالتك.',
          'متابعة بعد الجلسة للاطمئنان على النتائج والتعافي.',
        ],
      },
    ],
  },
  {
    id: 'dermatology',
    title: 'الجلدية والتجميل',
    description: 'تشخيص وعلاج مشكلات البشرة بإجراءات طبية دقيقة.',
    category: 'الجلدية',
    icon: '/assets/service-dermatology.svg',
    heroImage: '/assets/landing-blog-skin.jpg',
    heroImageAlt: 'مساحة هادئة للعناية بالبشرة داخل عيادة بيوتي كورنر',
    doctorSpecialty: 'الأمراض الجلدية والتجميل',
    sections: [
      {
        title: 'تقييم البشرة أولاً',
        paragraphs: [
          'نبدأ بفحص نوع البشرة وتحديد سبب المشكلة قبل اختيار العلاج. سواء كانت حب الشباب أو التصبغات أو الجفاف، تُبنى الخطة وفق حالتك وليس وفق حلول عامة.',
        ],
      },
      {
        title: 'علاجات تجميلية غير جراحية',
        paragraphs: [
          'نقدم إجراءات تجميلية طبية تهدف إلى توحيد لون البشرة وتحسين مظهرها مع الحفاظ على مظهر طبيعي، تحت إشراف مختصين وببروتوكولات آمنة.',
        ],
      },
      {
        title: 'متى تحتاج إلى استشارة جلدية؟',
        listIntro: 'ننصح بمراجعة الطبيب عند ملاحظة أي من التالي:',
        listItems: [
          'حب الشباب المتكرر أو الندبات الناتجة عنه.',
          'تصبغات أو تفاوت واضح في لون البشرة.',
          'حساسية مزمنة أو تغيّر مفاجئ في ملمس البشرة.',
        ],
      },
    ],
  },
  {
    id: 'laser',
    title: 'خدمات الليزر',
    description: 'جلسات ليزر مخصصة بعد تقييم دقيق لنوع البشرة والشعر.',
    category: 'الليزر',
    icon: '/assets/service-laser.svg',
    heroImage: '/assets/landing-blog-laser.jpg',
    heroImageAlt: 'جهاز ليزر طبي داخل عيادة بيوتي كورنر',
    doctorSpecialty: 'خدمات الليزر',
    sections: [
      {
        title: 'ليزر بمقاييس طبية',
        paragraphs: [
          'جلسات الليزر لدينا تبدأ بتقييم نوع البشرة والشعر لتحديد الجهاز والإعدادات المناسبة. الهدف نتائج آمنة ومستقرة مع أقل قدر من التهيج.',
        ],
      },
      {
        title: 'خطة جلسات واضحة',
        paragraphs: [
          'نحدد عدد الجلسات المتوقع والفواصل الزمنية بينها بناءً على استجابة بشرتك، مع متابعة مستمرة لتعديل الخطة عند الحاجة.',
        ],
      },
      {
        title: 'قبل جلسة الليزر',
        listIntro: 'لنتائج أفضل وأكثر أماناً، التزم بهذه الإرشادات الأساسية:',
        listItems: [
          'تجنّب التعرض المباشر للشمس والترطيب الزائد قبل الجلسة حسب تعليمات الطبيب.',
          'أخبر الفريق بأي أدوية أو إجراءات تجميلية حديثة.',
          'التزم بمواعيد المتابعة لتقييم الاستجابة وضبط الخطة.',
        ],
      },
    ],
  },
];

export function getServiceById(id: string): ClinicService | undefined {
  return clinicServices.find((service) => service.id === id);
}
