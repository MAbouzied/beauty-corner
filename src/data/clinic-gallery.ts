export const clinicGalleryDepartments = ['أسنان', 'جلدية'] as const;

export type ClinicGalleryDepartment = (typeof clinicGalleryDepartments)[number];

export interface ClinicGallerySlide {
  id: string;
  src: string;
  department: ClinicGalleryDepartment;
  captionAr: string;
  captionEn: string;
  altAr: string;
  altEn: string;
}

/** Interior photos from the clinic. Add dermatology rooms here when new photos are available. */
export const clinicGallerySlides: readonly ClinicGallerySlide[] = [
  {
    id: 'dental-operatory',
    src: '/assets/landing-clinic-gallery.jpg',
    department: 'أسنان',
    captionAr: 'عيادة الأسنان',
    captionEn: 'Dental clinic',
    altAr: 'غرفة علاج أسنان مضيئة داخل عيادة بيوتي كورنر',
    altEn: 'Bright dental treatment room at Beauty Corner',
  },
  {
    id: 'dental-suite',
    src: '/assets/landing-hero.jpg',
    department: 'أسنان',
    captionAr: 'عيادة الأسنان',
    captionEn: 'Dental clinic',
    altAr: 'غرفة علاج أسنان حديثة داخل عيادة بيوتي كورنر',
    altEn: 'Modern dental treatment room at Beauty Corner',
  },
  {
    id: 'dental-chair',
    src: '/assets/devices/dental-unit-blue.jpg',
    department: 'أسنان',
    captionAr: 'عيادة الأسنان',
    captionEn: 'Dental clinic',
    altAr: 'كرسي علاج أسنان داخل غرفة علاجية في بيوتي كورنر',
    altEn: 'Dental treatment chair inside a Beauty Corner room',
  },
  {
    id: 'dental-led-unit',
    src: '/assets/devices/dental-unit-led.jpg',
    department: 'أسنان',
    captionAr: 'عيادة الأسنان',
    captionEn: 'Dental clinic',
    altAr: 'وحدة علاج أسنان بإضاءة LED داخل العيادة',
    altEn: 'LED dental treatment unit inside the clinic',
  },
  {
    id: 'treatment-room',
    src: '/assets/devices/dental-examination-unit.jpg',
    department: 'أسنان',
    captionAr: 'عيادة الأسنان',
    captionEn: 'Dental clinic',
    altAr: 'غرفة علاج مجهزة داخل عيادة بيوتي كورنر',
    altEn: 'Equipped treatment room at Beauty Corner',
  },
];
