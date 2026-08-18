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
    image: '/assets/landing-hero.jpg',
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
  {
    id: 'curas-qswitched',
    name: 'جهاز CuRAS ليزر Q-Switched Nd:YAG',
    description:
      'ليزر Wontech CuRAS بطولي موجة 1064 و532 نانومتر لعلاج التصبغات والكلف وإزالة الوشم وتجديد البشرة بالليزر تونينغ.',
    image: '/assets/devices/curas-qswitched.jpg',
    imageAlt: 'جهاز CuRAS ليزر Q-Switched داخل عيادة الجلدية في بيوتي كورنر',
  },
  {
    id: 'nuera-tight',
    name: 'جهاز Lumenis NuEra Tight',
    description:
      'جهاز ترددات راديوية غير جراحي لشد الجلد ونحت الجسم وتقليل مظهر السيلوليت عبر تسخين طبقات الجلد وتحفيز الكولاجين.',
    image: '/assets/devices/nuera-tight.jpg',
    imageAlt: 'جهاز Lumenis NuEra Tight لشد الجلد ونحت الجسم داخل العيادة',
  },
  {
    id: 'candela-gentlemax-pro',
    name: 'جهاز Candela GentleMax Pro',
    description:
      'ليزر ثنائي الطول الموجي لإزالة الشعر الدائمة وعلاج التصبغات والآفات الوعائية وتجديد البشرة لمختلف أنواع الجلد.',
    image: '/assets/devices/candela-gentlemax-pro.jpg',
    imageAlt: 'جهاز Candela GentleMax Pro لإزالة الشعر بالليزر داخل العيادة',
  },
  {
    id: 'lumenis-splendor-x',
    name: 'جهاز Lumenis Splendor X',
    description:
      'ليزر Splendor X بتقنية BLEND X يجمع ألكسندرايت 755 نانومتر وNd:YAG 1064 نانومتر لإزالة الشعر وعلاج التصبغات والأوعية الدموية.',
    image: '/assets/devices/lumenis-splendor-x.jpg',
    imageAlt: 'جهاز Lumenis Splendor X لإزالة الشعر بالليزر داخل العيادة',
  },
  {
    id: 'preime-dermafacial',
    name: 'جهاز Préime DermaFacial',
    description:
      'منصة عناية بالبشرة تجمع خمس تقنيات: تنظيف مائي، تقشير، تحفيز عضلي، ترددات راديوية، وألتراساوند لترطيب ونضارة مخصصة.',
    image: '/assets/devices/preime-dermafacial.jpg',
    imageAlt: 'جهاز Préime DermaFacial لتنظيف ونضارة البشرة داخل عيادة الجلدية',
  },
  {
    id: 'aqua-peel-tera',
    name: 'جهاز Aqua Peel Tera',
    description:
      'جهاز هيدروديرمابريشن لتنظيف عميق وتقشير لطيف واستخلاص الشوائب مع حقن سيروم مرطّب لتحسين ملمس البشرة.',
    image: '/assets/devices/aqua-peel-tera.jpg',
    imageAlt: 'جهاز Aqua Peel Tera لتنظيف البشرة داخل عيادة بيوتي كورنر',
  },
  {
    id: 'multi-tera',
    name: 'جهاز Multi Tera',
    description:
      'منصة تجميل متعددة المهام تجمع تقنيات مثل الموجات فوق الصوتية والترددات الراديوية لشد البشرة وتحسين التوهج والمرونة.',
    image: '/assets/devices/aqua-peel-tera.jpg',
    imageAlt: 'جهاز Multi Tera بجانب Aqua Peel Tera داخل غرفة علاج الجلدية',
  },
  {
    id: 'fractional-co2-laser',
    name: 'جهاز Fractional CO2 Laser',
    description:
      'ليزر ثاني أكسيد الكربون الجزئي لتجديد سطح البشرة وعلاج ندبات حب الشباب والخطوط الدقيقة وتحسين ملمس الجلد ولونه.',
    image: '/assets/devices/fractional-co2-laser.jpg',
    imageAlt: 'جهاز Fractional CO2 Laser لتجديد البشرة داخل عيادة الجلدية',
  },
] as const;
