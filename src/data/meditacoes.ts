// Dados de exemplo para meditações
export const meditacoes = [
  // Categoria: Ansiedade
  {
    id: 'ans1',
    titulo: 'Respiração para Ansiedade',
    categoria: 'Ansiedade',
    duracao: '5 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia//respiracaoo-para%20-ansiedade.jpg',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia//respiracaoo-para%20-ansiedade.mp3',
    descricao: 'Uma prática de respiração diafragmática para acalmar o sistema nervoso e reduzir a ansiedade em momentos de estresse.',
    beneficios: [
      'Reduz os níveis de cortisol no corpo',
      'Diminui a frequência cardíaca',
      'Acalma a mente e reduz pensamentos acelerados',
      'Melhora a clareza mental'
    ]
  },
  {
    id: 'ans2',
    titulo: 'Meditação Guiada Anti-Ansiedade',
    categoria: 'Ansiedade',
    duracao: '8 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia//meditacao-guiada-anti-ansiedade.jpg',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia//meditacao-guiada-anti-ansiedade.mp3',
    descricao: 'Meditação guiada para ajudar a reduzir a ansiedade e encontrar calma interior.',
    beneficios: [
      'Reduz sintomas de ansiedade',
      'Promove relaxamento muscular',
      'Ajuda a lidar com preocupações',
      'Desenvolve resiliência emocional'
    ]
  },
  {
    id: 'ans3',
    titulo: 'Exercício de Aterramento',
    categoria: 'Ansiedade',
    duracao: '4 min',
    imagemUrl: '/lovable-uploads/meditation-anxiety3.jpg',
    audioUrl: '/assets/exercicio-aterramento.mp3',
    descricao: 'Técnica de aterramento para reconexão com o presente e redução da ansiedade.',
    beneficios: [
      'Traz de volta ao momento presente',
      'Reduz pensamentos ansiosos',
      'Promove sensação de segurança',
      'Melhora a concentração'
    ]
  },
  {
    id: 'ans4',
    titulo: 'Visualização Positiva',
    categoria: 'Ansiedade',
    duracao: '10 min',
    imagemUrl: '/lovable-uploads/meditation-anxiety4.jpg',
    audioUrl: '/assets/visualizacao-positiva.mp3',
    descricao: 'Prática de visualização para criar um espaço mental seguro e tranquilo.',
    beneficios: [
      'Cria imagens mentais relaxantes',
      'Reduz o estresse mental',
      'Promove pensamentos positivos',
      'Desenvolve recursos internos de calma'
    ]
  },
  {
    id: 'ans5',
    titulo: 'Acalme sua Mente',
    categoria: 'Ansiedade',
    duracao: '7 min',
    imagemUrl: '/lovable-uploads/meditation-anxiety5.jpg',
    audioUrl: '/assets/acalme-sua-mente.mp3',
    descricao: 'Meditação para acalmar pensamentos acelerados e encontrar paz interior.',
    beneficios: [
      'Reduz o fluxo de pensamentos',
      'Promove clareza mental',
      'Auxilia no controle da ansiedade',
      'Desenvolve foco e concentração'
    ]
  },

  // Categoria: Sono
  {
    id: 'sono1',
    titulo: 'Sono Tranquilo',
    categoria: 'Sono',
    duracao: '15 min',
    imagemUrl: '/lovable-uploads/meditation-sleep1.jpg',
    audioUrl: '/assets/sono-tranquilo.mp3',
    descricao: 'Meditação relaxante para preparar o corpo e a mente para um sono reparador.',
    beneficios: [
      'Melhora a qualidade do sono',
      'Reduz a insônia',
      'Promove relaxamento profundo',
      'Acalma a mente antes de dormir'
    ]
  },
  {
    id: 'sono2',
    titulo: 'Relaxamento Noturno',
    categoria: 'Sono',
    duracao: '20 min',
    imagemUrl: '/lovable-uploads/meditation-sleep2.jpg',
    audioUrl: '/assets/relaxamento-noturno.mp3',
    descricao: 'Prática de relaxamento progressivo para induzir o sono naturalmente.',
    beneficios: [
      'Relaxa tensões musculares',
      'Prepara para o sono profundo',
      'Reduz a ansiedade noturna',
      'Melhora o ciclo do sono'
    ]
  },
  {
    id: 'sono3',
    titulo: 'Meditação para Insônia',
    categoria: 'Sono',
    duracao: '12 min',
    imagemUrl: '/lovable-uploads/meditation-sleep3.jpg',
    audioUrl: '/assets/meditacao-insonia.mp3',
    descricao: 'Técnicas específicas para quem sofre com dificuldades para dormir.',
    beneficios: [
      'Combate a insônia',
      'Acalma pensamentos noturnos',
      'Reduz a agitação mental',
      'Promove sono reparador'
    ]
  },
  {
    id: 'sono4',
    titulo: 'Respiração para Dormir',
    categoria: 'Sono',
    duracao: '8 min',
    imagemUrl: '/lovable-uploads/meditation-sleep4.jpg',
    audioUrl: '/assets/respiracao-dormir.mp3',
    descricao: 'Exercícios respiratórios suaves para induzir o sono naturalmente.',
    beneficios: [
      'Acalma o sistema nervoso',
      'Prepara para o descanso',
      'Reduz tensões do dia',
      'Melhora a qualidade do sono'
    ]
  },
  {
    id: 'sono5',
    titulo: 'Histórias para Dormir',
    categoria: 'Sono',
    duracao: '25 min',
    imagemUrl: '/lovable-uploads/meditation-sleep5.jpg',
    audioUrl: '/assets/historias-dormir.mp3',
    descricao: 'Narrativas relaxantes para ajudar a adormecer naturalmente.',
    beneficios: [
      'Distrai a mente de preocupações',
      'Cria ambiente mental tranquilo',
      'Facilita o processo de dormir',
      'Promove sonhos agradáveis'
    ]
  },

  // Categoria: Ciclo
  {
    id: 'ciclo1',
    titulo: 'Equilíbrio Hormonal',
    categoria: 'Ciclo',
    duracao: '15 min',
    imagemUrl: '/lovable-uploads/meditation-cycle1.jpg',
    audioUrl: '/assets/equilibrio-hormonal.mp3',
    descricao: 'Meditação para harmonizar os hormônios e equilibrar o ciclo menstrual.',
    beneficios: [
      'Equilibra os hormônios naturalmente',
      'Reduz sintomas da TPM',
      'Promove bem-estar feminino',
      'Harmoniza o ciclo menstrual'
    ]
  },
  {
    id: 'ciclo2',
    titulo: 'Alívio de Cólicas',
    categoria: 'Ciclo',
    duracao: '10 min',
    imagemUrl: '/lovable-uploads/meditation-cycle2.jpg',
    audioUrl: '/assets/alivio-colicas.mp3',
    descricao: 'Prática específica para reduzir o desconforto das cólicas menstruais.',
    beneficios: [
      'Alivia dores menstruais',
      'Relaxa a região abdominal',
      'Reduz o desconforto físico',
      'Promove bem-estar durante o período'
    ]
  },
  {
    id: 'ciclo3',
    titulo: 'Fase Folicular',
    categoria: 'Ciclo',
    duracao: '12 min',
    imagemUrl: '/lovable-uploads/meditation-cycle3.jpg',
    audioUrl: '/assets/fase-folicular.mp3',
    descricao: 'Meditação alinhada com a fase folicular do ciclo menstrual.',
    beneficios: [
      'Aumenta a energia criativa',
      'Potencializa a produtividade',
      'Harmoniza com o ciclo natural',
      'Promove clareza mental'
    ]
  },
  {
    id: 'ciclo4',
    titulo: 'Fase Luteal',
    categoria: 'Ciclo',
    duracao: '18 min',
    imagemUrl: '/lovable-uploads/meditation-cycle4.jpg',
    audioUrl: '/assets/fase-luteal.mp3',
    descricao: 'Prática para equilibrar as emoções durante a fase luteal.',
    beneficios: [
      'Equilibra o humor',
      'Reduz irritabilidade',
      'Promove autocuidado',
      'Harmoniza as emoções'
    ]
  },
  {
    id: 'ciclo5',
    titulo: 'Conexão Feminina',
    categoria: 'Ciclo',
    duracao: '20 min',
    imagemUrl: '/lovable-uploads/meditation-cycle5.jpg',
    audioUrl: '/assets/conexao-feminina.mp3',
    descricao: 'Meditação para fortalecer a conexão com a energia feminina.',
    beneficios: [
      'Fortalece a intuição',
      'Promove autoconhecimento',
      'Conecta com a sabedoria interior',
      'Desenvolve autocuidado'
    ]
  },

  // Categoria: Autoestima
  {
    id: 'auto1',
    titulo: 'Amor Próprio',
    categoria: 'Autoestima',
    duracao: '15 min',
    imagemUrl: '/lovable-uploads/meditation-self1.jpg',
    audioUrl: '/assets/amor-proprio.mp3',
    descricao: 'Meditação para desenvolver e fortalecer o amor próprio.',
    beneficios: [
      'Desenvolve autocompaixão',
      'Fortalece a autoestima',
      'Promove aceitação pessoal',
      'Cultiva amor próprio'
    ]
  },
  {
    id: 'auto2',
    titulo: 'Aceitação Corporal',
    categoria: 'Autoestima',
    duracao: '12 min',
    imagemUrl: '/lovable-uploads/meditation-self2.jpg',
    audioUrl: '/assets/aceitacao-corporal.mp3',
    descricao: 'Prática para desenvolver uma relação positiva com seu corpo.',
    beneficios: [
      'Melhora a imagem corporal',
      'Promove aceitação',
      'Desenvolve gratidão pelo corpo',
      'Reduz autocrítica'
    ]
  },
  {
    id: 'auto3',
    titulo: 'Poder Pessoal',
    categoria: 'Autoestima',
    duracao: '10 min',
    imagemUrl: '/lovable-uploads/meditation-self3.jpg',
    audioUrl: '/assets/poder-pessoal.mp3',
    descricao: 'Meditação para fortalecer sua confiança e poder pessoal.',
    beneficios: [
      'Aumenta a autoconfiança',
      'Fortalece a autoestima',
      'Desenvolve assertividade',
      'Promove empoderamento'
    ]
  },
  {
    id: 'auto4',
    titulo: 'Autocuidado Diário',
    categoria: 'Autoestima',
    duracao: '8 min',
    imagemUrl: '/lovable-uploads/meditation-self4.jpg',
    audioUrl: '/assets/autocuidado-diario.mp3',
    descricao: 'Prática diária para cultivar o amor e cuidado próprio.',
    beneficios: [
      'Estabelece rotina de autocuidado',
      'Fortalece amor próprio',
      'Desenvolve hábitos positivos',
      'Promove bem-estar diário'
    ]
  },
  {
    id: 'auto5',
    titulo: 'Superando Críticas',
    categoria: 'Autoestima',
    duracao: '14 min',
    imagemUrl: '/lovable-uploads/meditation-self5.jpg',
    audioUrl: '/assets/superando-criticas.mp3',
    descricao: 'Meditação para lidar com críticas e fortalecer sua autoestima.',
    beneficios: [
      'Desenvolve resiliência emocional',
      'Fortalece autoconfiança',
      'Reduz impacto de críticas',
      'Promove crescimento pessoal'
    ]
  },

  // Categoria: Sons
  {
    id: 'sons1',
    titulo: 'Sons da Chuva',
    categoria: 'Sons',
    duracao: '30 min',
    imagemUrl: '/lovable-uploads/meditation-sound1.jpg',
    audioUrl: '/assets/sons-chuva.mp3',
    descricao: 'Sons naturais de chuva para relaxamento e foco.',
    beneficios: [
      'Promove concentração',
      'Cria ambiente relaxante',
      'Mascara ruídos externos',
      'Ajuda no relaxamento'
    ]
  },
  {
    id: 'sons2',
    titulo: 'Ondas do Mar',
    categoria: 'Sons',
    duracao: '45 min',
    imagemUrl: '/lovable-uploads/meditation-sound2.jpg',
    audioUrl: '/assets/ondas-mar.mp3',
    descricao: 'Som relaxante das ondas do mar para meditação e descanso.',
    beneficios: [
      'Induz relaxamento profundo',
      'Promove sensação de paz',
      'Ajuda na meditação',
      'Melhora qualidade do sono'
    ]
  },
  {
    id: 'sons3',
    titulo: 'Floresta Calma',
    categoria: 'Sons',
    duracao: '40 min',
    imagemUrl: '/lovable-uploads/meditation-sound3.jpg',
    audioUrl: '/assets/floresta-calma.mp3',
    descricao: 'Sons da natureza e floresta para conexão e paz interior.',
    beneficios: [
      'Promove conexão com natureza',
      'Reduz estresse',
      'Cria ambiente tranquilo',
      'Facilita relaxamento'
    ]
  },
  {
    id: 'sons4',
    titulo: 'Melodia de Piano',
    categoria: 'Sons',
    duracao: '35 min',
    imagemUrl: '/lovable-uploads/meditation-sound4.jpg',
    audioUrl: '/assets/melodia-piano.mp3',
    descricao: 'Suaves melodias de piano para relaxamento e concentração.',
    beneficios: [
      'Aumenta foco e concentração',
      'Promove criatividade',
      'Reduz ansiedade',
      'Cria ambiente produtivo'
    ]
  },
  {
    id: 'sons5',
    titulo: 'Mantras de Cura',
    categoria: 'Sons',
    duracao: '25 min',
    imagemUrl: '/lovable-uploads/meditation-sound5.jpg',
    audioUrl: '/assets/mantras-cura.mp3',
    descricao: 'Mantras sagrados para meditação profunda e cura interior.',
    beneficios: [
      'Promove cura energética',
      'Eleva a vibração',
      'Facilita meditação profunda',
      'Harmoniza mente e corpo'
    ]
  }
];

// Meditação de emergência para ansiedade
export const emergencyMeditation = {
  id: 'sos-ansiedade',
  titulo: 'SOS Ansiedade',
  duracao: '1 min',
  audioUrl: '/assets/emergencia-ansiedade.mp3',
  descricao: 'Exercício rápido de respiração para momentos de ansiedade aguda'
};
