const line = `${test.full_name}, ${test.occupation} in ${test.city}, ${test.summary}`;

const test = {
  full_name: 'Jalil Taibi',
  occupation: 'Co-Founder at LeGratin.io',
  summary: 'Co-founder & CTO @ LeGratin.io 🚀',
  city: 'Paris',
  experiences: [
    {
      starts_at: {
        day: 1,
        month: 1,
        year: 2022,
      },
      ends_at: {
        day: 31,
        month: 12,
        year: 2022,
      },
      company: 'Newton',
      company_linkedin_profile_url: null,
      title: 'Full-stack Developer',
      description:
        'Newton helps blockchain developers find answers to the questions of Cairo-lang, Solidity, StarkNet, and web3.0',
      location: 'Miami, Floride, États-Unis',
      logo_url: null,
    },
    {
      starts_at: {
        day: 1,
        month: 1,
        year: 2021,
      },
      ends_at: {
        day: 31,
        month: 12,
        year: 2022,
      },
      company: 'ALTAVIA',
      company_linkedin_profile_url: 'https://fr.linkedin.com/company/altavia',
      title: 'Full-stack Developer',
      description: null,
      location: 'Ville de Paris, Île-de-France, France',
      logo_url:
        'https://media.licdn.com/dms/image/C4D0BAQEyW1gk-79FlA/company-logo_100_100/0/1635947823778?e=2147483647&v=beta&t=cMvaQg_KENk22gS51eYvzcHcZ5dySbHCUN983V-ebBY',
    },
    {
      starts_at: {
        day: 1,
        month: 1,
        year: 2021,
      },
      ends_at: {
        day: 31,
        month: 12,
        year: 2021,
      },
      company: 'FONCIA',
      company_linkedin_profile_url: 'https://fr.linkedin.com/company/foncia',
      title: 'Full-stack Developer',
      description: null,
      location: 'Ville de Paris, Île-de-France, France',
      logo_url:
        'https://media.licdn.com/dms/image/C560BAQHCjYR4pbTPDw/company-logo_100_100/0/1641978751102?e=2147483647&v=beta&t=-2ltcocy1jS5qz225dO3OUOesnegPRHMPmLrsX_VbbM',
    },
    {
      starts_at: {
        day: 1,
        month: 1,
        year: 2021,
      },
      ends_at: null,
      company: 'Time for the Planet',
      company_linkedin_profile_url: 'https://fr.linkedin.com/company/tftp',
      title: 'Associate',
      description:
        "Time For The Planet est une entreprise à mission qui souhaite rassembler 1 milliard d'euros pour créer 100 entreprises luttant contre le réchauffement climatique. \nIl est possible de devenir actionnaire à partir d'un euro investi. \n\nNous sommes la dernière génération à pouvoir éviter un effondrement du climat. Agissons ensemble ! \n\nSi vous souhaitez savoir comment vous engager, par ici : https://www.time-planet.com/fr",
      location: null,
      logo_url:
        'https://media.licdn.com/dms/image/C560BAQEa1RVp4n1JjA/company-logo_100_100/0/1569059603915?e=2147483647&v=beta&t=MBTyf6QBED5YMs9zAL2ltYKcy4wSooFNMUygRe-ebwc',
    },
    {
      starts_at: {
        day: 1,
        month: 1,
        year: 2020,
      },
      ends_at: null,
      company: 'LeGratin.io',
      company_linkedin_profile_url: 'https://fr.linkedin.com/company/legratin',
      title: 'Co-Founder',
      description:
        'Avec LeGratin.io, nos promesses sont simples :\n\n- Pour les indépendants : "Nous sommes un réseau sélectif 100% freelance Tech dédié aux indépendants hautement qualifiés".\n\n- Pour nos Clients : "Accédez au top des freelances partout en france reconnus pour leurs compétences techniques et leurs soft-skills"',
      location: 'Région de Paris, France',
      logo_url:
        'https://media.licdn.com/dms/image/C560BAQGezWb3v2GAdQ/company-logo_100_100/0/1622639523287?e=2147483647&v=beta&t=ReieSAymPK70FBtGoxMZSPPmMbf_t_vKbgrzmWkIRTY',
    },
    {
      starts_at: {
        day: 1,
        month: 1,
        year: 2019,
      },
      ends_at: {
        day: 31,
        month: 12,
        year: 2020,
      },
      company: 'Creanetis',
      company_linkedin_profile_url: 'https://fr.linkedin.com/company/creanetissas',
      title: 'Lead full stack',
      description: null,
      location: null,
      logo_url:
        'https://media.licdn.com/dms/image/C4D0BAQH0U3D2_31Qnw/company-logo_100_100/0/1605721419641?e=2147483647&v=beta&t=EnR1r20gfhQmMBrNLxK9cFE61C8J83EAMY2dVdVqjCg',
    },
    {
      starts_at: {
        day: 1,
        month: 1,
        year: 2019,
      },
      ends_at: {
        day: 31,
        month: 12,
        year: 2020,
      },
      company: 'Gymkee',
      company_linkedin_profile_url: 'https://fr.linkedin.com/company/gymkee',
      title: 'Fullstack developer Nodejs Reactjs',
      description: null,
      location: 'Paris',
      logo_url:
        'https://media.licdn.com/dms/image/C4D0BAQG3a-eg_oUfBw/company-logo_100_100/0/1636141072033?e=2147483647&v=beta&t=kCu7KPoELhgehXgwyc2OFtWUSmB2f6Muc2D8T8ofWQU',
    },
    {
      starts_at: {
        day: 1,
        month: 1,
        year: 2019,
      },
      ends_at: {
        day: 31,
        month: 12,
        year: 2020,
      },
      company: 'Qare',
      company_linkedin_profile_url: 'https://fr.linkedin.com/company/qare-fr',
      title: 'Back-end developer Nodejs',
      description: null,
      location: 'Région de Paris, France',
      logo_url:
        'https://media.licdn.com/dms/image/C4E0BAQEMvfIOWFxdCQ/company-logo_100_100/0/1669041588620?e=2147483647&v=beta&t=GzCU1BNkxbhWLwXI0scLnc3382xaftOvH1TlvPsUq9Q',
    },
    {
      starts_at: {
        day: 1,
        month: 3,
        year: 2018,
      },
      ends_at: {
        day: 31,
        month: 12,
        year: 2018,
      },
      company: 'Homeloop',
      company_linkedin_profile_url: 'https://fr.linkedin.com/company/homeloop',
      title: 'Fullstack developer Nodejs Vuejs',
      description: null,
      location: 'Région de Paris, France',
      logo_url:
        'https://media.licdn.com/dms/image/C4E0BAQE0sU59-LVqiA/company-logo_100_100/0/1672851017412?e=2147483647&v=beta&t=olpygVS2-WMePZ9ePAXNBiroDx78HinpJ6WHNkRv7NM',
    },
  ],
  education: [
    {
      starts_at: {
        day: 1,
        month: 1,
        year: 2017,
      },
      ends_at: {
        day: 31,
        month: 12,
        year: 2019,
      },
      field_of_study: 'Informatique',
      degree_name: 'Master',
      school: '42',
      school_linkedin_profile_url: 'https://fr.linkedin.com/school/42born2code/',
      description:
        '42 est la première formation en informatique entièrement gratuite, ouverte à toutes et à tous sans condition de diplôme et accessible dès 18 ans. Sa pédagogie est basée sur le peer-to-peer learning : un fonctionnement participatif, sans cours, sans professeur, qui permet aux étudiant(e)s de libérer toute leur créativité grâce à l’apprentissage par projets',
      logo_url:
        'https://media.licdn.com/dms/image/C560BAQGSgXr_qMUO8w/company-logo_100_100/0/1618322814939?e=2147483647&v=beta&t=oIJ0sVUFwK5HFlOp_X6-kcdGnC8oidmXQaYB9YmD3T0',
      grade: null,
      activities_and_societies: null,
    },
  ],
};
