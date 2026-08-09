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
    name: 'جهاز Beyond Polus للتبييض',
    description:
      'جهاز تبييض احترافي داخل العيادة يستخدم إضاءة متقدمة لتفعيل جل التبييض بأمان ونتائج أوضح خلال الجلسة.',
    image: '/assets/devices/beyond-whitening.jpg',
    imageAlt: 'جهاز Beyond Polus لتبييض الأسنان داخل عيادة بيوتي كورنر',
  },
  {
    id: 'dental-unit-integrated',
    name: 'غرفة علاج متكاملة',
    description:
      'غرفة علاجية مجهزة بكرسي أسنان وإضاءة طبية وخزائن معقّمة لتنفيذ الفحص والعلاج في بيئة منظمة.',
    image: '/assets/devices/dental-unit-integrated.jpg',
    imageAlt: 'غرفة علاج أسنان متكاملة مع كرسي وخزائن طبية',
  },
  {
    id: 'dental-unit-blue',
    name: 'كرسي علاج أسنان متطور',
    description:
      'كرسي علاج مريح بوحدة أدوات وإضاءة قابلة للتوجيه ونظام شفط لدعم التشخيص والإجراءات اليومية.',
    image: '/assets/devices/dental-unit-blue.jpg',
    imageAlt: 'كرسي علاج أسنان أزرق مع وحدة الأدوات والإضاءة الطبية',
  },
  {
    id: 'dental-unit-led',
    name: 'وحدة علاج متنقلة بإضاءة LED',
    description:
      'وحدة أدوات متنقلة مع إضاءة LED عالية الوضوح لجلسات التنظيف والعلاج مع مرونة في ترتيب غرفة العيادة.',
    image: '/assets/devices/dental-unit-led.jpg',
    imageAlt: 'وحدة علاج أسنان متنقلة مع إضاءة LED وكرسي أزرق',
  },
  {
    id: 'woodpecker-ptb',
    name: 'جهاز قص وعلاج اللثة Woodpecker PT-B',
    description:
      'جهاز Woodpecker PT-B بالموجات فوق الصوتية والتلميع الهوائي لإزالة الجير والترسبات وعلاج اللثة بدقة داخل العيادة.',
    image: '/assets/devices/woodpecker-ptb.png',
    imageAlt: 'جهاز Woodpecker PT-B لقص وعلاج اللثة داخل عيادة بيوتي كورنر',
  },
  {
    id: 'dental-examination-unit',
    name: 'وحدة فحص وعلاج يومية',
    description:
      'وحدة فحص حديثة بكرسي مريح وإضاءة طبية وذراع أدوات متعددة للاستخدام في الفحص والعلاج اليومي.',
    image: '/assets/devices/dental-examination-unit.jpg',
    imageAlt: 'وحدة فحص وعلاج أسنان بلون تركوازي داخل العيادة',
  },
] as const;
