// Dados de exemplo para meditações
export const meditacoes = [
  // Categoria: Ansiedade
  {
    id: 'ans1',
    titulo: 'Respiração para Ansiedade',
    categoria: 'Ansiedade',
    duracao: '5 min', // Updated
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ansiedade/respiracao-para-ansiedade.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ansiedade/respiracaoo-para-ansiedade.mp3',
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
    duracao: '15 min', // Updated
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ansiedade/meditacao-guiada-anti-ansiedade.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ansiedade/meditacao-guiada-anti-ansiedade.mp3',
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
    duracao: '9 min', // Updated
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ansiedade/exercicio-de-aterramento.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ansiedade/exercicio-aterramento.mp3',
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
    duracao: '8 min', // Updated
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ansiedade/visualizacao-positiva.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ansiedade/visualizacao-positiva.mp3',
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
    duracao: '4 min', // Updated
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ansiedade/acalme-sua-mente.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ansiedade/acalme-sua-mente.mp3',
    descricao: 'Meditação para acalmar pensamentos acelerados e encontrar paz interior.',
    beneficios: [
      'Reduz o fluxo de pensamentos',
      'Promove clareza mental',
      'Auxilia no controle da ansiedade',
      'Desenvolve foco e concentração'
    ]
  },

  // Categoria: Sono (updated)
  {
    id: 'sono1',
    titulo: 'Sono Tranquilo',
    categoria: 'Sono',
    duracao: '4 min', // Updated
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sono/sono-tranquilo.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sono/sono-tranquilo.mp3',
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
    duracao: '20 min', // Updated
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sono/relaxamento-noturno.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sono/relaxamento-noturno.mp3',
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
    duracao: '34 min', // Updated
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sono/meditacao-para-insonia.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sono/meditacao-para-insonia.mp3',
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
    duracao: '31 min', // Updated
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sono/respiracao-para-dormir.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sono/respiracao-para-dormir.mp3',
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
    duracao: '23 min', // Updated
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sono/historias-para-dormir.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sono/historias-para-dormir.mp3',
    descricao: 'Narrativas relaxantes para ajudar a adormecer naturalmente.',
    beneficios: [
      'Distrai a mente de preocupações',
      'Cria ambiente mental tranquilo',
      'Facilita o processo de dormir',
      'Promove sonhos agradáveis'
    ]
  },

  // Categoria: Sons
  {
    id: 'sons1',
    titulo: 'Sons da Chuva',
    categoria: 'Sons',
    duracao: '15 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sons/sons-da-chuva.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sons/sons-da-chuva.mp3',
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
    duracao: '4 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sons/ondas-do-mar.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sons/ondas-do-mar.mp3',
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
    duracao: '3 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sons/floresta-calma.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sons/floresta-calma.mp3',
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
    duracao: '2 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sons/melodia-de-piano.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sons/melodia-de-piano.mp3',
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
    duracao: '15 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sons/mantras-de-cura.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/sons/mantras-de-cura.mp3',
    descricao: 'Mantras sagrados para meditação profunda e cura interior.',
    beneficios: [
      'Promove cura energética',
      'Eleva a vibração',
      'Facilita meditação profunda',
      'Harmoniza mente e corpo'
    ]
  },

  // Categoria: Ciclo
  {
    id: 'ciclo1',
    titulo: 'Equilíbrio Hormonal',
    categoria: 'Ciclo',
    duracao: '18 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ciclo/equilibrio-hormonal.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ciclo/equilibrio-hormonal.mp3',
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
    duracao: '20 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ciclo/alivio-de-colicas.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ciclo/alivio-de-colicas.mp3',
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
    duracao: '6 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ciclo/fase-folicular.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ciclo/fase-folicular.mp3',
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
    duracao: '5 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ciclo/fase-lutea.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ciclo/fase-lutea.mp3',
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
    duracao: '5 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ciclo/conexao-feminina.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/ciclo/conexao-feminina.mp3',
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
    duracao: '8 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/autoestima/amor-proprio.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/autoestima/amor-proprio.mp3',
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
    duracao: '8 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/autoestima/aceitacao-corporal.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/autoestima/aceitacao-corporal.mp3',
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
    duracao: '15 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/autoestima/poder-pessoal.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/autoestima/poder-pessoal.mp3',
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
    duracao: '11 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/autoestima/autocuidado-diario.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/autoestima/autocuidado-diario.mp3',
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
    duracao: '17 min',
    imagemUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/autoestima/superando-criticas.png',
    audioUrl: 'https://rwjpbxplhkdvwyvyostn.supabase.co/storage/v1/object/public/meditacao_midia/autoestima/superando-criticas.mp3',
    descricao: 'Meditação para lidar com críticas e fortalecer sua autoestima.',
    beneficios: [
      'Desenvolve resiliência emocional',
      'Fortalece autoconfiança',
      'Reduz impacto de críticas',
      'Promove crescimento pessoal'
    ]
  }
];

// Note: This file has become quite large and complex. 
// Consider refactoring into separate files for each category (ansiedade.ts, sono.ts, etc.)
