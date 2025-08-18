export const mockUsers = [
  {
    id: "1",
    name: "Leslie Alexander",
    role: "UI Designer",
    avatar: "/professional-woman-diverse.png",
    bio: "Apaixonada por design e causas sociais. Trabalho como UI Designer e dedico meu tempo livre para ajudar ONGs com design.",
    location: "São Paulo, SP",
    joinedDate: "2023-01-15",
    ongsParticipating: [
      {
        id: "1",
        name: "Digital freelancers group",
        role: "Voluntária - Design",
        joinedDate: "2023-03-20",
        avatar: "/digital-group-logo.png",
      },
      {
        id: "2",
        name: "Interaction design association",
        role: "Mentora",
        joinedDate: "2023-06-10",
        avatar: "/design-association-logo.png",
      },
    ],
    stats: {
      horasVoluntariado: 120,
      doacoesFeitas: 15,
      ongsAjudadas: 3,
    },
  },
]

export const mockOngs = [
  {
    id: "1",
    name: "Digital freelancers group",
    description: "Conectamos freelancers digitais para projetos sociais e desenvolvimento profissional.",
    category: "Tecnologia",
    location: "São Paulo, SP",
    foundedYear: 2020,
    avatar: "/digital-group-logo.png",
    banner: "/digital-technology-banner.png",
    mission: "Democratizar o acesso à tecnologia através do trabalho voluntário de profissionais digitais.",
    volunteers: 45,
    beneficiaries: 200,
    projects: [
      {
        id: "1",
        title: "Sites para ONGs",
        description: "Desenvolvimento de sites gratuitos para organizações sem fins lucrativos",
        status: "Em andamento",
        volunteersNeeded: 3,
      },
      {
        id: "2",
        title: "Capacitação Digital",
        description: "Workshops de ferramentas digitais para comunidades carentes",
        status: "Concluído",
        volunteersNeeded: 0,
      },
    ],
    contact: {
      email: "contato@digitalfreelancers.org",
      phone: "(11) 99999-9999",
      website: "https://digitalfreelancers.org",
    },
  },
  {
    id: "2",
    name: "Interaction design association",
    description: "Promovemos o design centrado no usuário para melhorar experiências digitais de ONGs.",
    category: "Design",
    location: "Rio de Janeiro, RJ",
    foundedYear: 2019,
    avatar: "/design-association-logo.png",
    banner: "/interaction-banner.png",
    mission: "Usar o poder do design para criar impacto social positivo.",
    volunteers: 32,
    beneficiaries: 150,
    projects: [
      {
        id: "3",
        title: "UX para Causas Sociais",
        description: "Redesign de interfaces para maximizar doações e engajamento",
        status: "Em andamento",
        volunteersNeeded: 2,
      },
    ],
    contact: {
      email: "hello@ixda-social.org",
      phone: "(21) 88888-8888",
      website: "https://ixda-social.org",
    },
  },
]
