import { formatClinicHours, formatClinicHoursFaq, formatClinicLocation } from '../../data/clinic-facts.ts';

export const uiEn = {
  nav: {
    services: 'Services',
    devices: 'Devices',
    doctors: 'Doctors',
    contact: 'Contact',
    book: 'Book now',
    quickBook: 'Quick book',
    home: 'Home',
  },
  common: {
    viewProfile: 'View profile',
    bookWithDoctor: 'Book with doctor',
    bookAppointment: 'Book appointment',
    whatsapp: 'WhatsApp',
    call: 'Call',
    branch: 'Branch',
    department: 'Department',
    specialty: 'Specialty',
    service: 'Service',
    fullName: 'Full name',
    phone: 'Mobile number',
    chooseDepartment: 'Choose department',
    chooseSpecialty: 'Choose specialty',
    chooseService: 'Choose service',
    consent: 'I agree to the privacy policy and to be contacted to confirm the booking.',
    sendWhatsapp: 'Send via WhatsApp',
    contactWhatsapp: 'Contact via WhatsApp',
    callDirect: 'Call now',
    dentistry: 'Dentistry',
    dermatology: 'Dermatology',
    allServices: 'All services',
    viewService: 'View service details',
    relatedSpecialty: 'View specialty',
    hours: 'Working hours',
    address: 'Address',
    email: 'Email',
    parking: 'Parking available in front of the clinic',
    emptyDoctors: 'No doctors match your filters.',
    importantLinks: 'Important links',
    namePlaceholder: 'Example: Abdullah Mohammed',
    phonePlaceholder: '05XXXXXXXX',
    officialLicenses: 'Official licensing data:',
    commercialRegister: 'Commercial Register (Unified National Number)',
    municipalLicense: 'Municipal activity license (Balady)',
    licensedActivity: 'Licensed activity',
    viewCommercialRegistration: 'View commercial registration certificate',
    saudiBusinessCenter: 'Saudi Business Center',
    followUs: 'Follow us',
  },
  booking: {
    eyebrow: 'Book your visit',
    title: 'Book quickly now',
    subtitle: 'Enter your name and phone number, choose the specialty then the service, and send via WhatsApp.',
    notice: 'Submitting will open WhatsApp with your booking details ready to send to the clinic.',
    statusInvalid: 'Please fill in the required fields before sending.',
    statusOpening: 'Opening WhatsApp to send your booking request...',
    errors: {
      name: 'Please enter your full name (at least 3 characters).',
      phone: 'Please enter a Saudi mobile number as 05XXXXXXXX.',
      department: 'Please choose a specialty.',
      service: 'Please choose a service.',
      consent: 'Consent is required to continue.',
    },
  },
  lead: {
    title: 'Book your appointment now',
    subtitle: 'Hafr Al-Batin branch — Al Muhammadiyah, King Faisal Road',
    statusInvalid: 'Please fill in your name, phone number, specialty, and service.',
    statusOpening: 'Opening WhatsApp...',
    chooseDental: 'Choose a department',
  },
  home: {
    eyebrow: 'Beauty Corner · Hafr Al-Batin',
    heroTitle: 'Complete care for your smile and skin',
    heroText:
      'Dentistry and dermatology services in Al Muhammadiyah, King Faisal Road — modern clinic care with easy WhatsApp booking.',
    servicesTitle: 'Dental and dermatology services',
    servicesText: 'Choose the care you need and book through WhatsApp in minutes.',
    dentalServicesTitle: 'Dental services',
    dermatologyServicesTitle: 'Dermatology services',
    devicesTitle: 'Our equipment',
    devicesText: 'Clinic devices used for whitening, treatment, and precise dental care.',
    devicesEyebrow: 'Our devices',
    devicesSectionTitle: 'Technology inside the clinic',
    devicesSectionText: 'Discover the main devices used at Beauty Corner for more precise and comfortable care.',
    locationTitle: 'Visit us',
    whyTitle: 'A medical experience that feels reassuring',
    trust: ['Specialist doctors', 'Modern devices & technology', 'Privacy & comfort', 'Personalized treatment plans'],
  },
  pages: {
    servicesTitle: 'Dental & Dermatology Services in Hafr Al-Batin | Beauty Corner',
    servicesDescription: 'Browse dentistry and dermatology services at Beauty Corner in Hafr Al-Batin and book your appointment.',
    servicesHeading: 'Dentistry and dermatology services',
    doctorsTitle: 'Dentists & Dermatologists in Hafr Al-Batin | Beauty Corner',
    doctorsDescription: 'Meet the Beauty Corner dental and dermatology team in Hafr Al-Batin and choose the right doctor for your care plan.',
    doctorsHeading: 'Specialist doctors you can trust',
    contactTitle: 'Contact Beauty Corner Clinic in Hafr Al-Batin',
    contactDescription: 'Contact Beauty Corner in Hafr Al-Batin, Al Muhammadiyah, King Faisal Road. Book an appointment or reach us by WhatsApp and phone.',
    bookTitle: 'Book an Appointment at Beauty Corner Hafr Al-Batin',
    bookDescription: 'Book a visit at Beauty Corner in Hafr Al-Batin in minutes — enter your name, phone, specialty, and service.',
    devicesTitle: 'Devices',
    devicesDescription: 'Explore the medical devices and technology used at Beauty Corner in Hafr Al-Batin.',
    devicesHeading: 'Technology inside the clinic',
  },
  location: {
    branch: 'Hafr Al-Batin',
    full: formatClinicLocation('en'),
    hours: formatClinicHours('en'),
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
  },
} as const;

export const departmentsEn = {
  أسنان: 'Dentistry',
  جلدية: 'Dermatology',
  'كل الخدمات': 'All services',
  'قسم النحت و الاذابة': 'Body Contouring & Fat Dissolving',
  'قسم الفيلر': 'Filler',
  'قسم البوتكس': 'Botox',
  'قسم النضارة': 'Skin Brightening',
  'قسم الهيدرافيشل': 'Hydrafacial',
  'قسم اللايت': 'Light Therapy',
  'قسم علاج البشرة و الشعر': 'Skin & Hair Treatment',
  'قسم الليزر': 'Laser',
} as const;

export const specialtiesEn = {
  'كل الأطباء': 'All doctors',
  'طب وتجميل الأسنان': 'Cosmetic & restorative dentistry',
  'الأمراض الجلدية والتجميل': 'Dermatology & aesthetics',
  'خدمات الليزر': 'Laser services',
} as const;

export const categoriesEn = {
  تجميل: 'Cosmetic',
  'علاج وجراحة': 'Treatment & surgery',
  'تركيبات وتشخيص': 'Prosthetics & diagnosis',
  'كل الخدمات': 'All services',
} as const;

export const doctorServicesEn = {
  استشارة: 'Consultation',
  'جلسة علاج': 'Treatment session',
  متابعة: 'Follow-up',
} as const;

export const servicesEn: Record<
  string,
  {
    title: string;
    description: string;
    heroImageAlt: string;
    sections: { title: string; paragraphs?: string[]; listIntro?: string; listItems?: string[] }[];
  }
> = {
  'dental-implants': {
    title: 'Dental implants',
    description: 'Restore missing teeth with safe implants and a natural look.',
    heroImageAlt: 'Modern dental treatment room at Beauty Corner',
    sections: [
      {
        title: 'What are dental implants?',
        paragraphs: [
          'Dental implants are a lasting solution for missing teeth, based on a precise jaw assessment and a custom implant that matches your smile and bite.',
        ],
      },
      {
        title: 'Treatment steps',
        listIntro: 'We guide you clearly from assessment to the final result:',
        listItems: [
          'Exam and imaging to check bone readiness.',
          'Implant placement with a personalized plan.',
          'Final crown placement and healing follow-up.',
        ],
      },
    ],
  },
  'dental-prosthetics': {
    title: 'Dental prosthetics',
    description: 'Crowns, bridges, and restorations that bring back function and appearance.',
    heroImageAlt: 'Dental treatment room at Beauty Corner',
    sections: [
      {
        title: 'Restorations tailored to your case',
        paragraphs: [
          'We provide crowns, bridges, and fixed or removable restorations after a careful assessment of teeth and gums.',
        ],
      },
      {
        title: 'When do you need prosthetics?',
        listItems: [
          'Replacing a missing or severely damaged tooth.',
          'Protecting a tooth after root canal treatment.',
          'Improving smile appearance and chewing function.',
        ],
      },
    ],
  },
  'dental-veneers': {
    title: 'Dental veneers',
    description: 'Thin veneers that improve tooth shape and color with a natural look.',
    heroImageAlt: 'Dental treatment room at Beauty Corner',
    sections: [
      {
        title: 'A balanced smile with custom veneers',
        paragraphs: [
          'Veneers cover the front surface to improve shade, shape, and visible alignment after assessing teeth, gums, and suitability.',
        ],
      },
      {
        title: 'Treatment steps',
        listItems: [
          'Exam to check if teeth are ready for veneers.',
          'Choose a shape and shade that fit your smile.',
          'Place the veneers and review the final result.',
        ],
      },
    ],
  },
  'teeth-whitening': {
    title: 'Teeth whitening',
    description: 'Safe in-clinic whitening to brighten your smile under specialist care.',
    heroImageAlt: 'Beyond Polus teeth whitening device at Beauty Corner',
    sections: [
      {
        title: 'A brighter smile',
        paragraphs: [
          'Whitening sessions start with assessing tooth shade and gum health, then choosing the right method for a natural, safe result.',
        ],
      },
      {
        title: 'Before whitening',
        listItems: [
          'Check teeth and gums readiness.',
          'Choose the suitable whitening shade.',
          'Follow aftercare tips to maintain results.',
        ],
      },
    ],
  },
  'cleaning-polishing': {
    title: 'Cleaning & polishing',
    description: 'Remove tartar and stains while protecting oral and gum health.',
    heroImageAlt: 'Comfortable clinic environment for oral care',
    sections: [
      {
        title: 'Essential preventive care',
        paragraphs: [
          'Professional cleaning and polishing remove tartar and surface stains and help prevent gum inflammation and decay.',
        ],
      },
      {
        title: 'What the session includes',
        listItems: ['Tartar removal', 'Tooth surface polishing', 'Home care tips'],
      },
    ],
  },
  'tooth-extraction': {
    title: 'Extraction (surgical & simple)',
    description: 'Safe extractions with a clear assessment and recovery plan.',
    heroImageAlt: 'Dental treatment room at Beauty Corner',
    sections: [
      {
        title: 'Simple or surgical extraction',
        paragraphs: [
          'We determine the extraction type after exam and imaging, with clear post-care instructions for comfortable healing.',
        ],
      },
      {
        title: 'After extraction',
        listItems: [
          'Clear wound-care instructions.',
          'Follow-up when needed.',
          'Replacement options when suitable.',
        ],
      },
    ],
  },
  'root-canal': {
    title: 'Root canal treatment',
    description: 'Precise root canal care to save the tooth and relieve pain.',
    heroImageAlt: 'Dental treatment room at Beauty Corner',
    sections: [
      {
        title: 'Safe root canal care',
        paragraphs: [
          'Root canal treatment removes inflammation and preserves the tooth, with suitable anesthesia and a restoration plan afterward.',
        ],
      },
      {
        title: 'Signs you may need a root canal',
        listItems: ['Persistent pain or severe sensitivity', 'Swelling or inflammation', 'Deep decay reaching the nerve'],
      },
    ],
  },
  'cosmetic-fillings': {
    title: 'Cosmetic fillings',
    description: 'Tooth-colored fillings that treat decay with a natural look.',
    heroImageAlt: 'Dental care session at the clinic',
    sections: [
      {
        title: 'Natural-looking restoration',
        paragraphs: [
          'Cosmetic fillings treat decay or small fractures while matching tooth color, preserving both function and appearance.',
        ],
      },
      {
        title: 'Benefits',
        listItems: [
          'Shade close to natural teeth.',
          'Conservative restoration that keeps more tooth structure.',
          'Often completed in one visit.',
        ],
      },
    ],
  },
  'gum-contouring': {
    title: 'Gum contouring (surgical & laser)',
    description: 'Reshape the gum line surgically or with laser for a balanced smile.',
    heroImageAlt: 'Woodpecker PT-B gum treatment device at Beauty Corner',
    sections: [
      {
        title: 'A more balanced gum line',
        paragraphs: [
          'Gum contouring improves smile appearance and some gum concerns. Surgical or laser technique is chosen after assessment.',
        ],
      },
      {
        title: 'Before the procedure',
        listItems: [
          'Assess gum health and smile line.',
          'Choose the most suitable technique.',
          'Explain expectations and aftercare.',
        ],
      },
    ],
  },
  'gum-depigmentation': {
    title: 'Laser gum depigmentation',
    description: 'Lighten dark gum pigmentation with medical laser technology.',
    heroImageAlt: 'Gum treatment device at Beauty Corner',
    sections: [
      {
        title: 'A naturally pinker gum look',
        paragraphs: [
          'Laser gum depigmentation targets dark pigmentation to improve smile appearance after assessing the cause and suitability.',
        ],
      },
      {
        title: 'What to expect',
        listItems: [
          'Assessment visit to identify pigmentation cause.',
          'Laser procedure adjusted to gum condition.',
          'Aftercare guidance during recovery.',
        ],
      },
    ],
  },
  'dental-xray-3d': {
    title: '3D dental X-ray',
    description: '3D imaging for more accurate diagnosis and clearer treatment plans.',
    heroImageAlt: 'Dental treatment room at Beauty Corner',
    sections: [
      {
        title: 'Clearer diagnosis with 3D imaging',
        paragraphs: [
          '3D dental X-rays help assess bone, roots, and implant sites more precisely before treatment begins.',
        ],
      },
      {
        title: 'When is 3D imaging requested?',
        listItems: [
          'Before dental implants.',
          'In complex surgery or extraction cases.',
          'When a detailed jaw and tooth assessment is needed.',
        ],
      },
    ],
  },
  laser: {
    title: 'Laser',
    description: 'Medical laser sessions after skin assessment for hair removal or suitable skin concerns.',
    heroImageAlt: 'Equipped treatment room at Beauty Corner clinic',
    sections: [
      {
        title: 'Medical laser after assessment',
        paragraphs: [
          'We examine the skin first to choose the right laser, then explain the expected number of sessions and aftercare.',
        ],
      },
      {
        title: 'What’s included',
        listItems: [
          'Skin-type assessment and laser suitability.',
          'A clear session plan based on the treatment goal.',
          'Before-and-after care guidance to protect results.',
        ],
      },
    ],
  },
  'filler-botox': {
    title: 'Filler & Botox',
    description: 'Medical filler and Botox injections to refine facial features with a natural look.',
    heroImageAlt: 'Equipped treatment room at Beauty Corner clinic',
    sections: [
      {
        title: 'Balanced medical aesthetics',
        paragraphs: [
          'We assess your facial features and goals first, then decide whether filler, Botox, or both is the right option.',
        ],
      },
      {
        title: 'Before the session',
        listItems: [
          'Consultation to clarify the goal and expected result.',
          'Choose suitable areas after medical assessment.',
          'Aftercare steps and follow-up when needed.',
        ],
      },
    ],
  },
  'body-contouring': {
    title: 'Body contouring',
    description: 'Non-surgical contouring and fat-dissolving sessions after a medical assessment.',
    heroImageAlt: 'Equipped treatment room at Beauty Corner clinic',
    sections: [
      {
        title: 'A clear body-contouring plan',
        paragraphs: [
          'We identify focus areas after assessment, then set a session plan with realistic expectations.',
        ],
      },
      {
        title: 'What to expect',
        listItems: [
          'Medical assessment of contouring or fat-dissolving areas.',
          'Explanation of the technique and approximate session count.',
          'Aftercare and follow-up guidance.',
        ],
      },
    ],
  },
  hydrafacial: {
    title: 'HydraFacial skin cleaning',
    description: 'Deep HydraFacial cleansing to clear pores and refresh the skin.',
    heroImageAlt: 'Equipped treatment room at Beauty Corner clinic',
    sections: [
      {
        title: 'Gentle deep cleansing',
        paragraphs: [
          'HydraFacial cleans pores and hydrates the skin after a type assessment, for a fresher look without harsh peeling.',
        ],
      },
      {
        title: 'What the session includes',
        listItems: [
          'Skin-type assessment before cleansing.',
          'Deep cleaning and hydration during the session.',
          'Simple same-day aftercare tips.',
        ],
      },
    ],
  },
};

export const doctorsEn: Record<
  string,
  {
    name: string;
    title: string;
    seoRole: string;
    specialty: string;
    summary: string;
    sections: { title: string; paragraphs?: string[]; listItems?: string[] }[];
  }
> = {
  'dentistry-fatima': {
    name: 'Dr. Fatima Nidal',
    title: 'Dentist',
    seoRole: 'Dentist at Beauty Corner in Hafr Al-Batin',
    specialty: 'Cosmetic & restorative dentistry',
    summary: 'A dentist providing comprehensive oral and gum care, with clear treatment plans from the first visit.',
    sections: [
      {
        title: 'About the doctor',
        paragraphs: [
          'Dr. Fatima Nidal focuses on comfortable, precise dental care, explaining the plan and options before any procedure.',
        ],
      },
      {
        title: 'Focus areas',
        listItems: ['Exam, cleaning, and preventive care', 'Cosmetic dentistry and whitening', 'Oral and gum concerns'],
      },
      {
        title: 'Care approach',
        paragraphs: [
          'She prioritizes patient comfort and clear education in every session, with follow-up after treatment when needed.',
        ],
      },
    ],
  },
  'dentistry-wissam': {
    name: 'Dr. Wissam Mandour',
    title: 'Oral & maxillofacial surgery and implants specialist',
    seoRole: 'Oral & maxillofacial surgery and implants specialist at Beauty Corner in Hafr Al-Batin',
    specialty: 'Cosmetic & restorative dentistry',
    summary: 'A specialist in oral and maxillofacial surgery and dental implants, focused on precise assessment and safe surgical plans.',
    sections: [
      {
        title: 'About the doctor',
        paragraphs: [
          'Dr. Wissam Mandour specializes in oral and maxillofacial surgery and implants, with a full assessment before any surgical or implant plan.',
        ],
      },
      {
        title: 'Focus areas',
        listItems: ['Oral and maxillofacial surgery', 'Dental implants', 'Surgical assessment and advanced treatment plans'],
      },
      {
        title: 'Care approach',
        paragraphs: [
          'Every case begins with a detailed medical assessment, then options and expected risks are explained clearly before treatment.',
        ],
      },
    ],
  },
  'dermatology-hala': {
    name: 'Dr. Hala Al-Badawy',
    title: 'Dermatology & aesthetics doctor',
    seoRole: 'Dermatology & aesthetics doctor at Beauty Corner in Hafr Al-Batin',
    specialty: 'Dermatology & aesthetics',
    summary:
      'A dermatology and aesthetics doctor who assesses the skin and plans laser, filler, Botox, contouring, and skin-care treatments.',
    sections: [
      {
        title: 'About the doctor',
        paragraphs: [
          'Dr. Hala Al-Badawy starts with a skin assessment, then explains suitable dermatology and aesthetic options before any procedure.',
        ],
      },
      {
        title: 'Focus areas',
        listItems: [
          'Laser for pigmentation and hair',
          'Filler and Botox',
          'Body contouring and skin care such as HydraFacial',
        ],
      },
      {
        title: 'Care approach',
        paragraphs: [
          'She focuses on a natural result and a clear plan after assessment, with follow-up after the session when needed.',
        ],
      },
    ],
  },
};

export const devicesEn: Record<string, { name: string; description: string; imageAlt: string }> = {
  'beyond-whitening': {
    name: 'Beyond Polus whitening system',
    description:
      'In-clinic whitening accelerator that uses advanced light technology to activate whitening gel safely for clearer results in one visit.',
    imageAlt: 'Beyond Polus teeth whitening device at Beauty Corner',
  },
  'dental-unit-integrated': {
    name: 'Fully equipped treatment room',
    description:
      'A complete operatory with a dental chair, medical lighting, and sterilized storage for examination and treatment.',
    imageAlt: 'Fully equipped dental treatment room with chair and cabinetry',
  },
  'dental-unit-blue': {
    name: 'Advanced dental treatment chair',
    description:
      'A comfortable treatment chair with instrument delivery, adjustable lighting, and suction for daily diagnosis and care.',
    imageAlt: 'Blue dental treatment chair with instrument unit and medical light',
  },
  'dental-unit-led': {
    name: 'Mobile LED treatment unit',
    description:
      'A mobile instrument cart with high-clarity LED lighting for cleaning and treatment sessions with flexible room setup.',
    imageAlt: 'Mobile dental treatment unit with LED light and blue chair',
  },
  'woodpecker-ptb': {
    name: 'Woodpecker PT-B gum treatment system',
    description:
      'Ultrasonic scaling and air-polishing device for precise tartar removal and periodontal care inside the clinic.',
    imageAlt: 'Woodpecker PT-B periodontal treatment device at Beauty Corner',
  },
  'dental-examination-unit': {
    name: 'Daily examination and treatment unit',
    description:
      'A modern examination unit with a comfortable chair, medical lighting, and multi-tool arm for everyday exams and care.',
    imageAlt: 'Teal dental examination and treatment unit inside the clinic',
  },
  'curas-qswitched': {
    name: 'CuRAS Q-Switched Nd:YAG laser',
    description:
      'Wontech CuRAS laser with 1064 and 532 nm wavelengths for pigmentation, melasma, tattoo removal, and laser toning.',
    imageAlt: 'CuRAS Q-Switched laser in the dermatology room at Beauty Corner',
  },
  'nuera-tight': {
    name: 'Lumenis NuEra Tight',
    description:
      'A non-surgical radiofrequency system for skin tightening, body contouring, and cellulite appearance by heating tissue and supporting collagen.',
    imageAlt: 'Lumenis NuEra Tight skin-tightening device inside the clinic',
  },
  'candela-gentlemax-pro': {
    name: 'Candela GentleMax Pro',
    description:
      'A dual-wavelength laser for permanent hair removal, pigmented and vascular lesions, and skin rejuvenation across skin types.',
    imageAlt: 'Candela GentleMax Pro laser hair-removal device inside the clinic',
  },
  'lumenis-splendor-x': {
    name: 'Lumenis Splendor X',
    description:
      'Splendor X with BLEND X combines Alexandrite 755 nm and Nd:YAG 1064 nm for hair removal, pigmentation, and vascular treatments.',
    imageAlt: 'Lumenis Splendor X laser hair-removal device inside the clinic',
  },
  'preime-dermafacial': {
    name: 'Préime DermaFacial',
    description:
      'A five-technology skin platform: hydro-cleansing, exfoliation, microcurrent, radiofrequency, and ultrasound for tailored hydration and glow.',
    imageAlt: 'Préime DermaFacial skin-care device in the dermatology room',
  },
  'aqua-peel-tera': {
    name: 'Aqua Peel Tera',
    description:
      'A hydradermabrasion system for deep cleansing, gentle exfoliation, impurity extraction, and serum infusion to improve skin texture.',
    imageAlt: 'Aqua Peel Tera skin-cleansing device at Beauty Corner',
  },
  'multi-tera': {
    name: 'Multi Tera',
    description:
      'A multi-function aesthetic platform that combines technologies such as ultrasound and radiofrequency to firm skin and improve tone.',
    imageAlt: 'Multi Tera device beside Aqua Peel Tera in the dermatology room',
  },
  'fractional-co2-laser': {
    name: 'Fractional CO2 Laser',
    description:
      'A fractional carbon-dioxide laser for skin resurfacing, acne scars, fine lines, and overall texture and tone improvement.',
    imageAlt: 'Fractional CO2 Laser for skin resurfacing in the dermatology room',
  },
};

export const faqEn = [
  {
    question: 'How do I book an appointment at Beauty Corner?',
    answer:
      'Book through the quick booking page or contact form on the website, or via WhatsApp and a direct call to the Hafr Al-Batin branch.',
  },
  {
    question: 'Are dental consultations available?',
    answer:
      'Yes. Our dental team provides consultations to assess your case and agree a suitable treatment plan before any procedure.',
  },
  {
    question: 'Which services are available at the clinic?',
    answer:
      'The clinic offers dental services such as implants, prosthetics, veneers, whitening, cleaning, root canal treatment, and extraction, plus dermatology services: laser, filler and Botox, body contouring, and HydraFacial skin cleaning.',
  },
  {
    question: 'Where is the Hafr Al-Batin branch?',
    answer: `Beauty Corner is in ${formatClinicLocation('en')}.`,
  },
  {
    question: 'What are the working hours?',
    answer: formatClinicHoursFaq('en'),
  },
  {
    question: 'Can I reschedule or cancel?',
    answer: 'Yes. Contact the clinic team by WhatsApp or phone before your visit to reschedule or cancel.',
  },
  {
    question: 'What payment methods are available?',
    answer: 'Available payment methods are confirmed with reception when your appointment is confirmed.',
  },
  {
    question: 'Is parking available?',
    answer: 'Yes. Parking is available in front of the branch in Al Muhammadiyah.',
  },
] as const;
