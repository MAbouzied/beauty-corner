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
    service: 'Service',
    fullName: 'Full name',
    phone: 'Mobile number',
    chooseDepartment: 'Choose department',
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
  },
  booking: {
    eyebrow: 'Book your visit',
    title: 'Book quickly now',
    subtitle: 'Enter your name and phone number, choose the department and service, then send via WhatsApp.',
    notice: 'Submitting will open WhatsApp with your booking details ready to send to the clinic.',
    statusInvalid: 'Please fill in the required fields before sending.',
    statusOpening: 'Opening WhatsApp to send your booking request...',
    errors: {
      name: 'Please enter your full name (at least 3 characters).',
      phone: 'Please enter a Saudi mobile number as 05XXXXXXXX.',
      department: 'Please choose a department.',
      service: 'Please choose a service.',
      consent: 'Consent is required to continue.',
    },
  },
  lead: {
    title: 'Book your appointment now',
    subtitle: 'Hafr Al-Batin branch — Al Muhammadiyah, King Faisal Road',
    statusInvalid: 'Please fill in your name, phone number, and service.',
    statusOpening: 'Opening WhatsApp...',
    chooseDental: 'Choose a dental service',
  },
  home: {
    eyebrow: 'Beauty Corner · Hafr Al-Batin',
    heroTitle: 'Complete care for your smile and skin',
    heroText:
      'Dentistry and dermatology services in Al Muhammadiyah, King Faisal Road — modern clinic care with easy WhatsApp booking.',
    servicesTitle: 'Dental services',
    servicesText: 'Choose the care you need and book through WhatsApp in minutes.',
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
    doctorsTitle: 'Dentists in Hafr Al-Batin | Beauty Corner',
    doctorsDescription: 'Meet the Beauty Corner dental team in Hafr Al-Batin and choose the right doctor for your care plan.',
    doctorsHeading: 'Specialist doctors you can trust',
    contactTitle: 'Contact Beauty Corner Clinic in Hafr Al-Batin',
    contactDescription: 'Contact Beauty Corner in Hafr Al-Batin, Al Muhammadiyah, King Faisal Road. Book an appointment or reach us by WhatsApp and phone.',
    bookTitle: 'Book an Appointment at Beauty Corner Hafr Al-Batin',
    bookDescription: 'Book a dental or dermatology visit at Beauty Corner in Hafr Al-Batin in minutes — enter your name, phone, and service.',
    devicesTitle: 'Devices',
    devicesDescription: 'Explore the medical devices and technology used at Beauty Corner in Hafr Al-Batin.',
    devicesHeading: 'Technology inside the clinic',
  },
  location: {
    branch: 'Hafr Al-Batin',
    full: 'Hafr Al-Batin, Al Muhammadiyah, King Faisal Road',
    hours: 'Saturday – Thursday · 10:00 AM – 10:00 PM',
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
  'teeth-whitening': {
    title: 'Teeth whitening',
    description: 'Safe in-clinic whitening to brighten your smile under specialist care.',
    heroImageAlt: 'Dental care session at the clinic',
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
    heroImageAlt: 'Dental treatment room at Beauty Corner',
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
    heroImageAlt: 'Dental treatment room at Beauty Corner',
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
  'acne-treatment': {
    title: 'Acne treatment & scars',
    description: 'Diagnosis and treatment of acne and scars with personalized medical plans.',
    heroImageAlt: 'Skin care at Beauty Corner clinic',
    sections: [
      {
        title: 'Care tailored to your skin',
        paragraphs: [
          'We start by assessing skin type and acne causes before building a gradual treatment plan for your case.',
        ],
      },
      {
        title: 'What’s included',
        listItems: ['Precise skin assessment', 'Staged treatment plan', 'Follow-up and plan adjustments'],
      },
    ],
  },
  pigmentation: {
    title: 'Pigmentation & skin tone evening',
    description: 'Medical treatments to lighten pigmentation and even skin tone.',
    heroImageAlt: 'Pigmentation care session at the clinic',
    sections: [
      {
        title: 'Safer, more even skin tone',
        paragraphs: [
          'We identify the cause of pigmentation first, then choose the most suitable procedure for a natural and safe result.',
        ],
      },
    ],
  },
  'non-surgical-aesthetics': {
    title: 'Non-surgical aesthetic procedures',
    description: 'Medical aesthetic procedures to improve skin appearance without surgery.',
    heroImageAlt: 'Non-surgical aesthetic care at the clinic',
    sections: [
      {
        title: 'Natural-looking medical aesthetics',
        paragraphs: [
          'We offer non-surgical procedures after skin assessment, with clear expectations and aftercare steps.',
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
    specialty: string;
    summary: string;
    sections: { title: string; paragraphs?: string[]; listItems?: string[] }[];
  }
> = {
  'dentistry-fatima': {
    name: 'Dr. Fatima Nidal',
    title: 'Dentist',
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
  'dentistry-mahmoud': {
    name: 'Dr. Mahmoud Gomaa',
    title: 'Dentist',
    specialty: 'Cosmetic & restorative dentistry',
    summary: 'A dentist focused on accurate diagnosis and functional and cosmetic treatment tailored to each case.',
    sections: [
      {
        title: 'About the doctor',
        paragraphs: [
          'Dr. Mahmoud Gomaa provides integrated dental care that combines precision and clarity, with a plan based on case priorities.',
        ],
      },
      {
        title: 'Focus areas',
        listItems: ['Restorative dentistry', 'Preventive care and follow-up', 'Smile aesthetics after medical assessment'],
      },
      {
        title: 'Care approach',
        paragraphs: [
          'He starts with assessment, then chooses the most suitable option while explaining each step before treatment.',
        ],
      },
    ],
  },
  'dentistry-wissam': {
    name: 'Dr. Wissam Mandour',
    title: 'Oral & maxillofacial surgery and implants specialist',
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
};

export const devicesEn: Record<string, { name: string; description: string; imageAlt: string }> = {
  'beyond-whitening': {
    name: 'Beyond whitening system',
    description: 'Professional teeth-whitening device using advanced light technology for fast, safe in-clinic results.',
    imageAlt: 'Beyond teeth whitening device at Beauty Corner',
  },
  'dental-unit-integrated': {
    name: 'Integrated dental unit',
    description: 'A modern treatment unit with a comfortable chair and precise instruments for diagnosis and care.',
    imageAlt: 'Integrated dental treatment unit inside the clinic',
  },
  'dental-unit-blue': {
    name: 'Advanced dental treatment chair',
    description: 'A treatment chair with instrument delivery, medical lighting, and suction for comfort and precision.',
    imageAlt: 'Blue dental treatment chair with instrument unit',
  },
  'dental-unit-led': {
    name: 'LED dental treatment unit',
    description: 'A treatment unit with high-clarity LED lighting and a modern control panel for cleaning and care.',
    imageAlt: 'Dental treatment unit with LED light and control panel',
  },
  'treatment-room': {
    name: 'Fully equipped treatment room',
    description: 'A sterilized treatment room with a complete dental unit and medical storage for multiple procedures.',
    imageAlt: 'Fully equipped dental treatment room',
  },
  'dental-examination-unit': {
    name: 'Advanced examination unit',
    description: 'A modern examination unit with adjustable lighting and a multi-tool system for daily exams and care.',
    imageAlt: 'Advanced teal dental examination unit',
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
      'The clinic offers dental services such as implants, prosthetics, whitening, cleaning, root canal treatment, and extraction, plus selected dermatology services depending on doctor availability.',
  },
  {
    question: 'Where is the Hafr Al-Batin branch?',
    answer: 'Beauty Corner is in Hafr Al-Batin, Al Muhammadiyah district, King Faisal Road.',
  },
  {
    question: 'What are the working hours?',
    answer:
      'Saturday to Thursday, 10:00 AM to 10:00 PM. Closed on Friday. Hours may change during Ramadan and official holidays.',
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
