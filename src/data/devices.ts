export interface ClinicDevice {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const clinicDevices: readonly ClinicDevice[] = [
  {
    id: 'beyond-whitening',
    name: 'جهاز Beyond للتبييض',
    description: 'جهاز تبييض أسنان احترافي بتقنية الإضاءة المتقدمة لنتائج سريعة وآمنة داخل العيادة.',
    image: '/assets/devices/beyond-whitening.jpg',
    imageAlt: 'جهاز Beyond لتبييض الأسنان داخل عيادة بيوتي كورنر',
  },
  {
    id: 'dental-unit-integrated',
    name: 'وحدة علاج أسنان متكاملة',
    description: 'وحدة علاج حديثة بكراسي مريحة وأدوات دقيقة، مع أجهزة مساعدة للتشخيص والعلاج.',
    image: '/assets/devices/dental-unit-integrated.jpg',
    imageAlt: 'وحدة علاج أسنان متكاملة داخل غرفة العلاج',
  },
  {
    id: 'dental-unit-blue',
    name: 'كرسي علاج أسنان متطور',
    description: 'كرسي علاج مجهز بوحدة أدوات وإضاءة طبية ونظام شفط لضمان راحة المريض ودقة الإجراء.',
    image: '/assets/devices/dental-unit-blue.jpg',
    imageAlt: 'كرسي علاج أسنان أزرق مع وحدة الأدوات',
  },
  {
    id: 'dental-unit-led',
    name: 'وحدة علاج بإضاءة LED',
    description: 'وحدة علاج مزوّدة بإضاءة LED عالية الوضوح ولوحة تحكم حديثة لجلسات تنظيف وعلاج دقيقة.',
    image: '/assets/devices/dental-unit-led.jpg',
    imageAlt: 'وحدة علاج أسنان مع إضاءة LED ولوحة تحكم',
  },
  {
    id: 'treatment-room',
    name: 'غرفة علاج مجهزة بالكامل',
    description: 'غرفة علاجية معقمة ومجهزة بوحدة أسنان كاملة وخزائن طبية لتنفيذ مختلف الإجراءات.',
    image: '/assets/devices/treatment-room.jpg',
    imageAlt: 'غرفة علاج أسنان مجهزة بالكامل داخل العيادة',
  },
  {
    id: 'dental-examination-unit',
    name: 'وحدة فحص وعلاج متقدمة',
    description: 'وحدة فحص حديثة بإضاءة قابلة للتوجيه ونظام أدوات متعدد للاستخدام في الفحص والعلاج اليومي.',
    image: '/assets/devices/dental-examination-unit.jpg',
    imageAlt: 'وحدة فحص وعلاج أسنان متقدمة بلون تركوازي',
  },
] as const;
