import { SystemData } from '../types';

export const SYSTEM_DB: SystemData = {
  "sistema": "Hunter x Hunter 5e v2.0",
  "versao_database": "1.0.0",
  "data_compilacao": "2026-01-23",
  
  "inclinacoes_gerais_basicas": {
    "regras_de_aquisicao": "Ao iniciar o jogo, o personagem recebe uma inclinação básica positiva sem custo ou penalidade. Para adicionar outras inclinações positivas (não de combate), deve-se compensar de forma correspondente com uma inclinação básica negativa para cada inclinação positiva extra. Essas inclinações são permanentes. A compensação pode chegar até um máximo de 10 pontos totais.",
    "positivas": [
      {
        "nome": "Aliado",
        "custo": "1 pt. cada aliado",
        "descricao": "O personagem possui um velho amigo que pode lhe oferecer ajuda, informações e abrigo caso esteja próximo de sua residência."
      },
      {
        "nome": "Contatos",
        "custo": "Varia",
        "opcoes": [
          {
            "nome": "Informação rápida",
            "custo": "1 pt.",
            "efeito": "Você recebe uma informação sobre a dúvida em até 24 horas por $500."
          },
          {
            "nome": "Informação de confiança",
            "custo": "2 pts.",
            "efeito": "Você recebe todas as informações disponíveis, explicando quais se podem confiar."
          },
          {
            "nome": "Informação barata",
            "custo": "1 pt.",
            "efeito": "Diminui a informação rápida de $500 para até 100."
          }
        ],
        "regra_especial": "Caso tenha escolhido Negociante ou Investigador, VOCÊ pode ser O CONTATO de alguém, tendo vantagem em testes de negociação na busca de informações cabíveis ao que solicitam."
      },
      {
        "nome": "Corpo de Gigante",
        "custo": "5 pts.",
        "descricao": "Você é enorme e por isso tem um nível a mais de vitalidade. +5 HP inicial e +3 por nível. O usuário tem que ficar com altura acima de 2,10m e não consegue utilizar armas leves e pequenas sem depender de uma técnica."
      },
      {
        "nome": "Empatia com Animais",
        "custo": "1 pt.",
        "descricao": "Você é talentoso em entender o comportamento dos animais. Superando um teste de INT = 10 você compreende o estado emocional do animal - amigável, assustado, hostil, faminto, etc."
      },
      {
        "nome": "Folego",
        "custo": "2 pts.",
        "descricao": "Dificilmente alguém terá sucesso te asfixiando ou afogando. Você consegue prender a respiração por 5-7 minutos fazendo esforço e 10-15 apenas nadando de forma despretensiosa ou se concentrando. Após isso, inicia sua contagem mecânica de asfixia nas condições."
      },
      {
        "nome": "Inventor",
        "custo": "Varia (Pode ser escolhido outra vez)",
        "descricao": "Você é um inventor natural, podendo modificar equipamentos existentes e, com tempo e dinheiro suficientes, inventar aparelhos inteiramente novos concedendo um dos seguintes benefícios:",
        "beneficios": [
          "Dão até 1d8 de dano natural de qualquer propriedade (max. 3 propriedades) (1 ponto)",
          "Atingem até 2 alvos (1 ponto)",
          "Diminuem até 4 de espaço/peso (1 ponto)",
          "Aumentam até 2 de CA (1 ponto)"
        ]
      },
      {
        "nome": "Ligação com a Máfia",
        "custo": "3 pts. (Pode ser escolhido outra vez para outra família)",
        "descricao": "O personagem tem certa influência com alguma família mafiosa e poderá pedir alguns favores, mas cuidado, é bom não exagerar, pois eles normalmente pedem favores em troca."
      },
      {
        "nome": "Sentidos Aguçados",
        "custo": "1 pt. por sentido (Pode ser escolhido outra vez)",
        "descricao": "Seus sentidos são mais desenvolvidos que o normal. Cada Sentido Aguçado concede +2 para uma das opções abaixo em Testes de Sentidos:",
        "opcoes": [
          "Audição Aguçada: +2 de bônus para escutar algo, ou reparar em algum som incomum (ex. alguém engatilhando uma arma no escuro).",
          "Paladar e Olfato Aguçados: +2 de bônus para reparar em um gosto ou cheiro (Bônus passivo, antes de tomar, podendo evitar o envenenamento por ingestão).",
          "Tato Aguçado: +2 de bônus em detectar algo pelo toque ao investigar ou com Prestidigitação (por exemplo, uma arma escondida quando revistar um suspeito).",
          "Visão Aguçada: +2 de bônus em localizar coisas visualmente, e qualquer coisa que faça uma procura visual (por exemplo, procurar armadilhas ou pegadas)."
        ]
      },
      {
        "nome": "Sorte Grande",
        "custo": "3 pts.",
        "descricao": "Você pode re-rolar 1 dado por sessão ficando com o maior resultado."
      },
      {
        "nome": "Tempo de Vida Estendido (Anomalia)",
        "custo": "3 pts.",
        "descricao": "Independente de que raça pertença, você é uma anomalia. Seu ciclo de vida se estende em uma margem de 20 anos a mais em todos os períodos de desenvolvimento após a infância. Ex. Adolescência: 12-32; Juventude: 33-55; Vida adulta: 56-80; Velhice 81-100. Essa inclinação pode ser combinada com o Tempo de Vida Estendido por NEN."
      },
      {
        "nome": "Visão no Escuro",
        "custo": "2 pts.",
        "descricao": "Você pode ver 9m no escuro como se fosse dia e não sofre penalidades de escuridão que não conte como bloqueio ou aplique cegueira."
      }
    ],
    "negativas": [
      {
        "nome": "Avareza",
        "tipo": "Loucura Permanente",
        "valor_compensacao": "+2 pts.",
        "descricao": "Você fica preocupado demais em conservar sua riqueza. Você deverá procurar sempre o melhor negócio. Faça um teste de autocontrole (SAB/INT ou CAR à critério do mestre e valor do gasto) toda vez que tiver que gastar algum dinheiro. Se falhar, você se recusará a gastar o dinheiro, mas se houver necessidade absoluta para isto, você deveria pechinchar e reclamar exaustivamente. Além disso, pelo estresse e compulsão sua Sanidade diminui em 1 como dano (Não permanente)."
      },
      {
        "nome": "Azar Grande",
        "valor_compensacao": "+3 pts.",
        "descricao": "Você DEVE re-rolar seu primeiro acerto crítico no d20 da sessão."
      },
      {
        "nome": "Desatencioso",
        "valor_compensacao": "+1 pt.",
        "descricao": "Você consegue entender as emoções dos outros, mas não as suas intenções. Isto faz de você desajeitado em situações envolvendo manipulação social. Você é o clássico 'nerd' e sofre -1 para usar ou resistir a Testes de Influência."
      },
      {
        "nome": "Dívida",
        "valor_compensacao": "+3 pts.",
        "descricao": "Você deve um favor a alguém que te ajudou em um momento de dificuldade, salvou sua vida de uma besta mágica, mercenários, mafiosos ou qualquer coisa do tipo. Essa pessoa poderá te cobrar esse favor a qualquer momento e poderá ser qualquer coisa. Quem sabe que favor será esse..."
      },
      {
        "nome": "Esquecido",
        "valor_compensacao": "+1 pt.",
        "descricao": "Você tem dificuldade de se recordar de nomes, lugares, aparências e informações. Enquanto não tiver uma circunstância marcante de ligação com os pontos citados, ou não andar com um item que sirva de suporte para recordar (como um aparelho celular, bloco de anotações, tatuagens e etc... É bem comum causar confusão por isso."
      },
      {
        "nome": "Honestidade",
        "valor_compensacao": "+2 pts.",
        "pre_requisito": "Tendência Heroico ou Neutro",
        "descricao": "Você precisa obedecer a lei sempre e dar o melhor de si para que os outros também o façam. Numa região onde exista pouca ou nenhuma lei, você não ficará 'fora da lei', mas sim, agirá como se as leis de seu lugar de origem estivessem em vigor. Você assumirá também que os outros são honestos até saber o contrário. E buscará impelir seus aliados a seguirem a lei, podendo chegar ao conflito. Enquanto a lei e ordem não é imposta, você fica com -3 Estresse (Dano Psíquico) em sua Sanidadedede por conta do estresse gerado em sua consciência."
      },
      {
        "nome": "Indeciso",
        "tipo": "Loucura Permanente",
        "valor_compensacao": "+5 pts.",
        "descricao": "Você tem muita dificuldade para se decidir, recebendo -3 em rolagens de iniciativa. Além disso, sempre que se deparar com uma escolha, faça um teste simples de INT ou CAR CD 15 com um redutor igual ao número de alternativas: -2 se houver duas opções, -3 se houver três, etc.. SE FALHAR, VOCÊ NÃO FARÁ NADA, PERDENDO SEU TURNO, como se estivesse atordoado. Faça o teste novamente a cada minuto (ou no início de cada turno, se estiver em combate ou outra situação de tensão) até você decidir-se, e só depois disso você poderá agir normalmente, pelo menos até a próxima vez que tiver que encarar uma decisão."
      },
      {
        "nome": "Inimigo",
        "valor_compensacao": "Varia",
        "descricao": "Durante sua jornada o mestre irá introduzir alguns inimigos que podem apenas atrapalhar ou te destruir completamente. Esses personagens podem ser planejados em conjunto na história do personagem.",
        "categorias": [
          {
            "nome": "Fraco",
            "valor": "+1 pt.",
            "efeito": "Seria um inimigo mais chato do que um desafio por assim dizer, ele sempre aparece para te atrapalhar e seus objetivos são estúpidos. Ex. a equipe roket em Pokémon."
          },
          {
            "nome": "Rival",
            "valor": "+2 pts.",
            "efeito": "Seria um inimigo mediano, um rival que busca os mesmos objetivos e não gosta de você por motivos diversos, ele fará de tudo para te atrapalhar inclusive lutar com você."
          },
          {
            "nome": "Poderoso",
            "valor": "+5 pts.",
            "efeito": "Seria um inimigo tipo chefão de game, alguém muito mal com objetivos perversos que foram frustrados por você e esse dia ele te caça e fará de tudo para te recrutar para o lado dele, pois ele reconhece suas habilidades ou se não puder fazê-lo ele o matará sem piedade."
          }
        ]
      },
      {
        "nome": "Inveja",
        "valor_compensacao": "+1 pt.",
        "descricao": "Você tem uma reação muito ruim frente a qualquer um que pareça mais inteligente, mais atraente, poderoso ou em melhor situação do que a sua! Pode também se opor a qualquer plano proposto por um 'rival', e odiará se alguma outra pessoa estiver em evidência."
      },
      {
        "nome": "Perda Auditiva",
        "valor_compensacao": "+1 pt.",
        "descricao": "Você não é surdo, mas perdeu uma parte da audição e sofrerá um redutor de -3 em qualquer teste de Audição."
      },
      {
        "nome": "Veracidade",
        "valor_compensacao": "+2 pts.",
        "descricao": "Você odeia dizer uma mentira ou o faz muito mal. Ter que mentir pode fazer literalmente você ficar enjoado ou com peso na consciência. Escolha no momento da mentira uma das opções abaixo:",
        "penalidades": [
          "Nauseas e Taquicardia (Condição 'Envenenado')",
          "-5 de Sanidade"
        ],
        "recuperacao": "Esses efeitos são desfeitos ao revelar a verdade ou ao superar o alvo em +5 no momento da mentira."
      }
    ]
  },

  "equipamentos": {
    "armas": {
      "comuns_rudimentares": {
        "simples_corpo_a_corpo": [
          { "nome": "Adaga", "custo": "10 $", "dano_tipo": "1d4 Corte", "espaco_peso": 0.5, "tags": ["Acuidade", "Arremesso (distância 6m/18m)"], "detalhe": "Lâmina versátil para combate ou arremesso." },
          { "nome": "Azagaia", "custo": "25 $", "dano_tipo": "1d6 Perfuração", "espaco_peso": 1.0, "tags": ["Arremesso (distância 6m/18m)", "Perfuração"], "detalhe": "Uma lança curta projetada para ser lançada." },
          { "nome": "Cajado / Bastão", "custo": "5 $", "dano_tipo": "1d6 Impacto", "espaco_peso": 1.0, "tags": ["Versátil (1d8)", "Finta"], "detalhe": "Pode ser usado com uma ou duas mãos." },
          { "nome": "Clava Grande", "custo": "150 $", "dano_tipo": "1d8 Impacto", "espaco_peso": 2.0, "tags": ["Pesada", "Duas Mãos"], "detalhe": "Uma arma bruta que exige força e ambas as mãos." },
          { "nome": "Foice Curta", "custo": "30 $", "dano_tipo": "1d4 Corte", "espaco_peso": 1.0, "tags": ["Leve", "Mortal x3"], "detalhe": "Eficiente em causar cortes profundos e críticos." },
          { "nome": "Lança", "custo": "120 $", "dano_tipo": "1d6 Perfuração", "espaco_peso": 1.0, "tags": ["Versátil (1d8)", "Arremesso (distância 9m/36m)"], "detalhe": "Arma de haste clássica para estocar ou arremessar." },
          { "nome": "Maça", "custo": "120 $", "dano_tipo": "1d6 Impacto", "espaco_peso": 1.0, "tags": ["Bloqueio"], "detalhe": "Arma contundente que auxilia na defesa." },
          { "nome": "Machadinha", "custo": "20 $", "dano_tipo": "1d6 Corte", "espaco_peso": 0.5, "tags": ["Leve", "Arremesso (distância 6m/18m)"], "detalhe": "Machado pequeno e equilibrado." },
          { "nome": "Martelo Leve", "custo": "10 $", "dano_tipo": "1d4 Impacto", "espaco_peso": 0.5, "tags": ["Leve", "Arremesso (distância 6m/18m)"], "detalhe": "Ferramenta de impacto fácil de manusear." },
          { "nome": "Porrete Pogamoggan", "custo": "80 $", "dano_tipo": "1d4 Impacto", "espaco_peso": 0.5, "tags": ["Leve", "Versátil (1d6)", "Bloqueio"], "detalhe": "Bastão reforçado para defesa e ataque." }
        ],
        "marciais_corpo_a_corpo": [
          { "nome": "Alabarda", "custo": "400 $", "dano_tipo": "1d12 Corte", "espaco_peso": 1.5, "tags": ["Alcance", "Duas Mãos", "Pesada"] },
          { "nome": "Bastão de 3 partes", "custo": "300 $", "dano_tipo": "1d8 Impacto", "espaco_peso": 1.0, "tags": ["Bloqueio", "Derrubar", "Finta"] },
          { "nome": "Bumerangue", "custo": "150 $", "dano_tipo": "1d6 Impacto", "espaco_peso": 0.5, "tags": ["Arremesso (distância 6m/18m)", "Finta", "Leve", "Retorno"] },
          { "nome": "Chakram", "custo": "150 $", "dano_tipo": "1d6 Corte", "espaco_peso": 1.0, "tags": ["Arremesso (6m/18m)", "Finta", "Leve", "Retorno"] },
          { "nome": "Chicote", "custo": "120 $", "dano_tipo": "1d4 Corte", "espaco_peso": 0.5, "tags": ["Acuidade", "Alcance", "Desarmar"] },
          { "nome": "Cimitarra", "custo": "120 $", "dano_tipo": "1d6 Corte", "espaco_peso": 1.0, "tags": ["Acuidade", "Leve"] },
          { "nome": "Espada Curta", "custo": "120 $", "dano_tipo": "1d6 Corte", "espaco_peso": 1.0, "tags": ["Leve"] },
          { "nome": "Espada Exótica (Katana)", "custo": "180 $", "dano_tipo": "1d8 Corte", "espaco_peso": 1.0, "tags": ["Acuidade"] },
          { "nome": "Espada Grande", "custo": "450 $", "dano_tipo": "2d6 Corte", "espaco_peso": 1.5, "tags": ["Bloqueio", "Duas Mãos", "Pesada"] },
          { "nome": "Espada Longa", "custo": "150 $", "dano_tipo": "1d8 Corte", "espaco_peso": 1.0, "tags": ["Versátil (1d10)"] },
          { "nome": "Foice com Corrente", "custo": "250 $", "dano_tipo": "2d4 Corte", "espaco_peso": 1.0, "tags": ["Agarrar", "Alcance", "Duas Mãos", "Finta"] },
          { "nome": "Foice", "custo": "350 $", "dano_tipo": "2d4 Corte", "espaco_peso": 1.0, "tags": ["Alcance", "Duas Mãos", "Mortal x3", "Pesada"] },
          { "nome": "Florete/Rapieira", "custo": "180 $", "dano_tipo": "1d8 Perfuração", "espaco_peso": 1.0, "tags": ["Acuidade"] },
          { "nome": "Garra de Ferro", "custo": "180 $", "dano_tipo": "1d6 Corte", "espaco_peso": 1.0, "tags": ["Acuidade", "Crítico"] },
          { "nome": "Glaive", "custo": "280 $", "dano_tipo": "1d10 Corte", "espaco_peso": 1.5, "tags": ["Alcance", "Duas mãos", "Pesada"] },
          { "nome": "Jitte", "custo": "120 $", "dano_tipo": "1d6 Perfuração", "espaco_peso": 1.0, "tags": ["Bloqueio", "Leve"] },
          { "nome": "Lança de Montaria", "custo": "500 $", "dano_tipo": "1d12 Perfuração", "espaco_peso": 1.5, "tags": ["Alcance", "Especial (estocada)", "Duas Mãos", "Pesada"] },
          { "nome": "Linha de Batalha", "custo": "5 $", "dano_tipo": "1d4 Corte", "espaco_peso": 0.1, "tags": ["Alcance", "Agarrar", "Tropeçar", "Duas Mãos"] },
          { "nome": "Maça Estrela", "custo": "250 $", "dano_tipo": "1d8 Impacto", "espaco_peso": 1.0, "tags": ["Bloqueio", "Mortal x3"] },
          { "nome": "Machado", "custo": "150 $", "dano_tipo": "1d8 Corte", "espaco_peso": 1.0, "tags": ["Versátil (1d10)"] },
          { "nome": "Machado Grande", "custo": "450 $", "dano_tipo": "1d12 Corte", "espaco_peso": 1.5, "tags": ["Bloqueio", "Duas Mãos", "Pesada"] },
          { "nome": "Mangual", "custo": "220 $", "dano_tipo": "1d8 Impacto", "espaco_peso": 1.0, "tags": ["Desarmar", "Duas Mãos", "Especial (+1 em ataque)"] },
          { "nome": "Manopla de Combate", "custo": "350 $", "dano_tipo": "+1 em ataque Desarmado", "espaco_peso": 1.0, "tags": ["Bloqueio", "Leve"] },
          { "nome": "Marreta", "custo": "450 $", "dano_tipo": "2d6 Impacto", "espaco_peso": 1.5, "tags": ["Bloqueio", "Duas Mãos", "Pesada"] },
          { "nome": "Martelo de Guerra", "custo": "150 $", "dano_tipo": "1d8 Impacto", "espaco_peso": 1.0, "tags": ["Versátil (1d10)"] },
          { "nome": "Nunchaku", "custo": "120 $", "dano_tipo": "1d6 Impacto", "espaco_peso": 1.0, "tags": ["Desarmar", "Leve"] },
          { "nome": "Picareta de Guerra", "custo": "150 $", "dano_tipo": "1d8 Perfuração", "espaco_peso": 1.0, "tags": ["Duas Mãos"] },
          { "nome": "Soqueira com Lâminas", "custo": "120 $", "dano_tipo": "1d6 Corte", "espaco_peso": 0.5, "tags": ["Acuidade", "Leve"] },
          { "nome": "Tonfá", "custo": "120 $", "dano_tipo": "1d6 Impacto", "espaco_peso": 1.0, "tags": ["Bloqueio", "Leve"] },
          { "nome": "Tridente", "custo": "350 $", "dano_tipo": "1d10 Perfuração", "espaco_peso": 1.5, "tags": ["Duas Mãos", "Pesada"] }
        ],
        "marciais_distancia": [
          { "nome": "Arco Longo", "custo": "250 $", "dano_tipo": "1d8 Perfuração", "espaco_peso": 1.0, "tags": ["Duas Mãos", "Munição (distância 32m/96m)"], "detalhe": "Arco de grande porte com longo alcance." },
          { "nome": "Besta de Mão", "custo": "200 $", "dano_tipo": "1d6 Perfuração", "espaco_peso": 1.0, "tags": ["Munição (distância 9m/18m)", "Recarregar"], "detalhe": "Compacta, pode ser usada com uma mão, mas exige recarga." },
          { "nome": "Besta Pesada", "custo": "250 $", "dano_tipo": "1d10 Perfuração", "espaco_peso": 1.0, "tags": ["Munição (distância 18m/32m)", "Duas Mãos"], "detalhe": "Disparo potente que exige ambas as mãos." },
          { "nome": "Fuma-Shuriken", "custo": "200 $", "dano_tipo": "1d8 Corte", "espaco_peso": 1.0, "tags": ["Arremesso (6m/18m)", "Retorno", "Oculto"], "detalhe": "Shuriken gigante dobrável, difícil de detectar antes do uso." },
          { "nome": "Monster Chakram", "custo": "250 $", "dano_tipo": "1d10 Corte", "espaco_peso": 2.0, "tags": ["Arremesso (6m/18m)", "Retorno", "Duas Mãos"], "detalhe": "Versão massiva do chakram para danos elevados." }
        ]
      },
      "cientificas_explosivas": {
        "simples": [
          { "nome": "Bola de gude explosiva (5 unidades)", "custo": "300 $", "dano_tipo": "2d4 cada", "espaco_peso": 0.5, "tags": ["Arremesso (distância 12m)", "Ataques Múltiplos", "Explosiva", "Especial (TR Múltiplo)"], "testes_provocados": {"tipo": "TR DES", "cd": 10, "area_alcance": "1,5m"}, "efeito_condicao": "Caído", "detalhe": "Explode ao tocar em qualquer superfície depois de lançada." },
          { "nome": "Mosquete", "custo": "3.000 $", "dano_tipo": "1d12", "espaco_peso": 1.0, "tags": ["Balística", "Duas Mãos", "Munição (distância 32m/96m)", "Recarregar"], "area_alcance": "12m Linha", "detalhe": "Arma de fogo longa de cano liso. Requer munição de cartucho." },
          { "nome": "Motosserra", "custo": "5.000 $", "dano_tipo": "2d6", "espaco_peso": 2.0, "tags": ["Mortal x3", "Pesada"], "testes_provocados": {"tipo": "TR CON", "cd": 15}, "efeito_condicao": "Sangramento Leve (2d4)", "detalhe": "Ferramenta motorizada adaptada para combate. Requer combustível." },
          { "nome": "Pistola", "custo": "2.000 $", "dano_tipo": "1d10", "espaco_peso": 1.0, "tags": ["Balística", "Munição (distância 18m/32m)"], "area_alcance": "Linha", "detalhe": "Arma de fogo padrão para defesa pessoal." },
          { "nome": "Spray de pimenta (10 usos)", "custo": "100 $", "dano_tipo": "0", "espaco_peso": 0.5, "tags": ["Ataque Múltiplo", "Especial (Persistência)"], "testes_provocados": {"tipo": "TR CON", "cd": 16, "area_alcance": "1,5m Linha"}, "efeito_condicao": "Cego", "detalhe": "Item portátil que causa irritação severa aos olhos." },
          { "nome": "Tazer (3 Cargas)", "custo": "1.000 $", "dano_tipo": "0", "espaco_peso": 0.5, "tags": ["Ataque Múltiplo", "Especial (Persistência)"], "testes_provocados": {"tipo": "TR CON", "cd": 12}, "efeito_condicao": "Atordoado", "detalhe": "Dispositivo de imobilização por choque elétrico." }
        ],
        "complexas": [
          { "nome": "Dinamite (1 banana)", "custo": "1.000 $", "dano_tipo": "2d8 + 8", "espaco_peso": 1.0, "tags": ["Arma de Cerco", "Explosivo", "Detonador"], "testes_provocados": {"tipo": "TR DES", "cd": 17, "area_alcance": "4,5m Raio"}, "detalhe": "Dura 30 segundos (5 rodadas) acesa. Dano dobrado em estruturas." },
          { "nome": "Espingarda", "custo": "10.000 $", "dano_tipo": "4d6", "espaco_peso": 1.0, "tags": ["Balística", "Duas Mãos", "Munição (distância 6m/18m)", "Recarregar"], "area_alcance": "12m Linha" },
          { "nome": "Dispositivo de PEM (3 usos)", "custo": "500 $", "dano_tipo": "1d6", "espaco_peso": 0.5, "tags": ["Detonador"], "area_alcance": "6m Raio", "detalhe": "Pulso Eletromagnético para destruir eletrônicos." },
          { "nome": "Fuzil de Assalto", "custo": "185.000 $", "dano_tipo": "2d10", "espaco_peso": 1.0, "tags": ["Balística", "Crítico", "Duas Mãos", "Rajada: 10", "Munição (36m/96m)"], "testes_provocados": {"tipo": "TR CON", "cd": 15, "area_alcance": "9m Cone (Rajada)"}, "efeito_condicao": "Sangramento" },
          { "nome": "Granada Comum", "custo": "500 $", "dano_tipo": "2d6 + 5", "espaco_peso": 0.5, "tags": ["Arremesso (12m)", "Explosivo"], "testes_provocados": {"tipo": "TR DES", "cd": 15, "area_alcance": "3m Raio"}, "efeito_condicao": "Caído" },
          { "nome": "Granada de Gás Lacrimogêneo", "custo": "400 $", "dano_tipo": "1d4", "espaco_peso": 0.5, "tags": ["Arremesso (12m)", "Dispersão (1d6 turnos)", "Leve"], "testes_provocados": {"tipo": "TR CON", "cd": 12, "area_alcance": "9m Raio"}, "efeito_condicao": "Cego e Envenenado" },
          { "nome": "Granada de Fumaça", "custo": "150 $", "dano_tipo": "0", "espaco_peso": 0.5, "tags": ["Arremesso (9m/18m)", "Cobertura", "Leve"], "testes_provocados": {"tipo": "TR CON", "cd": 15, "area_alcance": "4,5m Raio"}, "efeito_condicao": "Cego", "detalhe": "Cobertura pesada (+5 CA por 1d6 turnos)." },
          { "nome": "Granada de Luz ou Som (Atordoante)", "custo": "200 $", "dano_tipo": "0", "espaco_peso": 0.5, "tags": ["Arremesso (9m/18m)", "Persistência"], "testes_provocados": {"tipo": "TR CON", "cd": 18, "area_alcance": "3m Raio"}, "efeito_condicao": "Cego ou Surdo" },
          { "nome": "Lança Chamas (5 usos/1 galão)", "custo": "20.000 $", "dano_tipo": "3d6", "espaco_peso": 2.0, "tags": ["Duas Mãos", "Dispersão", "Munição (1 Galão)", "Pesada"], "testes_provocados": {"tipo": "TR CON", "cd": 15, "area_alcance": "4,5m Cone"}, "efeito_condicao": "Queimado" },
          { "nome": "Molotov", "custo": "100 $", "dano_tipo": "1d6", "espaco_peso": 0.2, "tags": ["Arremesso (18m)"], "area_alcance": "3m Raio", "efeito_condicao": "Queimado" }
        ],
        "especiais": [
          { "nome": "Bazuca (6 munições)", "custo": "250.000 $", "dano_tipo": "2d10 + 15", "espaco_peso": 4.0, "tags": ["Arma de Cerco", "Duas Mãos", "Explosivo", "Munição (distância 18m/32m)", "Pesada", "Recarregar"], "testes_provocados": {"tipo": "TR DES", "cd": 25, "area_alcance": "4,5m Raio"}, "efeito_condicao": "Atordoado, Caído e Confuso", "detalhe": "Requer Projétil de Bazuca, (0,5 peso / 1.500$)." },
          { "nome": "Fuzil de Precisão", "custo": "200.000 $", "dano_tipo": "2d10", "espaco_peso": 1.0, "tags": ["Balística", "Crítico", "Distância Mínima 15m", "Duas Mãos", "Mortal x4", "Munição (distância 96m/200m)", "Recarregar"], "area_alcance": "200m Linha", "efeito_condicao": "Sangramento Médio (2d8)" },
          { "nome": "Metralhadora", "custo": "200.000 $", "dano_tipo": "2d12", "espaco_peso": 1.0, "tags": ["Balística", "Duas Mãos", "Especial (Rajada: 15)", "Mortal x3", "Munição (distância 18m/32m)"], "testes_provocados": {"tipo": "TR CON", "cd": 15, "area_alcance": "12m Cone (Gatilho)"}, "efeito_condicao": "Sangramento Médio (2d8)" }
        ]
      },
      "cerco": [
        { "nome": "Balestra Fixa", "tipo_objeto": "Objeto Grande", "custo": "2.500 $", "ca": 15, "pv": 30, "espaco_peso": 5.0, "tags": ["Arma de Cerco", "Projétil", "Recarregar"], "acoes": [{"nome": "Seta", "tipo_ataque": "Arma à Distância", "bonus_acerto": "+6", "alcance": "36m/144m", "dano": "16 (3d10) Perfuração", "alvos": 1}] },
        { "nome": "Canhão", "tipo_objeto": "Objeto Grande", "custo": "12.000 $", "ca": 15, "pv": 75, "espaco_peso": 15.0, "tags": ["Arma de Cerco", "Explosivo", "Recarregar", "Pesada"], "acoes": [{"nome": "Bola de Canhão", "tipo_ataque": "Arma à Distância", "bonus_acerto": "+6", "alcance": "180m/720m", "dano": "44 (8d10) Concussão", "alvos": 1}] },
        { "nome": "Torreta", "tipo_objeto": "Objeto Grande", "custo": "34.000 $", "ca": 15, "pv": 75, "espaco_peso": 12.0, "tags": ["Arma de Cerco", "Balística", "Rajada", "Fixa"], "acoes": [{"nome": "Rajada", "tipo_ataque": "Arma à Distância", "bonus_acerto": "+Modificador de DES", "alcance": "30m em linha", "dano": "40 (10d8) Balístico", "alvos": "Múltiplos em linha"}] },
        { "nome": "Tanque de Guerra", "tipo_objeto": "Veículo Grande", "custo": "7.000.000 $", "ca": 12, "pv": 500, "espaco_peso": 12000.0, "tags": ["Arma de Cerco", "Blindado", "Móvel", "Complexo"], "acoes": [{"nome": "Atropelamento", "dano": "64 (7d12) Impacto/Esmagamento", "alvos": 3}, {"nome": "Torreta", "dano": "25 (4d8) Balístico"}, {"nome": "Canhão", "dano": "xx (5d12) Balístico/Explosivo", "alvos": 6}] }
      ]
    },
    "armaduras": {
      "leves": [
        { "nome": "Casaco Reforçado", "custo": "130 $", "ca_bonus": "11 + Mod. DES", "espaco_peso": 0, "tags": ["Resistência Balística"], "detalhe": "+0,5 espaço adicional no inventário." },
        { "nome": "Jaqueta de Couro", "custo": "300 $", "ca_bonus": "11 + Mod. DES", "espaco_peso": 0, "tags": ["Resistência Balística"], "detalhe": "+0,5 espaço adicional." },
        { "nome": "Camisa Embutida", "custo": "50 $", "ca_bonus": "11 + Mod. DES", "espaco_peso": 0, "tags": ["Resistência Balística"], "detalhe": "Proteção discreta usada sob roupas." },
        { "nome": "Colete Fino de Kevlar", "custo": "350 $", "ca_bonus": "12 + Mod. DES", "espaco_peso": 0.3, "tags": ["Resistência Balística"] },
        { "nome": "Colete Oculto", "custo": "500 $", "ca_bonus": "12 + Mod. DES", "espaco_peso": 0.5, "tags": ["Resistência Balística"], "detalhe": "Não é notado sob vestimentas." },
        { "nome": "Escudo Comum", "custo": "60 $", "ca_bonus": "+1 (automático se empunhado)", "espaco_peso": 1.0, "tags": ["Resistência Balística"] }
      ],
      "medias": [
        { "nome": "Colete Oculto Maior", "custo": "560 $", "ca_bonus": "13 + Mod. DES (max. 2)", "espaco_peso": 1.0, "tags": ["RD 1 (Cortante e Perfurante)", "Resistência Balística"] },
        { "nome": "Colete Padrão de Kevlar", "custo": "1200 $", "ca_bonus": "14 + Mod. DES (max. 3)", "espaco_peso": 0, "tags": ["Resistência Balística"], "detalhe": "+1 espaço no inventário." },
        { "nome": "Peitoral de Adamantina", "custo": "180.000 $", "ca_bonus": "14 + Mod. DES (max. 3)", "espaco_peso": 0, "tags": ["Resistência a Dano Crítico", "Resistência Balística"], "detalhe": "Anula efeito extra de acertos críticos." },
        { "nome": "Colete Tático", "custo": "1500 $", "ca_bonus": "15 + Mod. DES (max. 2)", "espaco_peso": 0, "tags": ["Resistência Balística", "Desvantagem em Furtividade"], "detalhe": "+0,5 espaço adicional." },
        { "nome": "Escudo Tático", "custo": "300 $", "ca_bonus": "+3 (automático se empunhado)", "espaco_peso": 1.5, "tags": ["Resistência Balística"] }
      ],
      "pesadas": [
        { "nome": "Colete de Resposta Rápida", "custo": "1000 $", "ca_bonus": "16", "espaco_peso": 1.0, "requisito": "FOR 14", "tags": ["RD 3 (Cortante, Perfurante e Balística)", "Desvantagem em Furtividade"], "detalhe": "Proteção integral para cenários de alto risco." },
        { "nome": "Farda de Combate", "custo": "2000 $", "ca_bonus": "17", "espaco_peso": 1.0, "requisito": "FOR 14", "tags": ["RD 3 (Cortante, Perfurante e Balística)", "Desvantagem em Furtividade"], "detalhe": "Uniforme reforçado para soldados de elite." },
        { "nome": "Farda de Operações Especiais (Entrada Forçada)", "custo": "3500 $", "ca_bonus": "18", "espaco_peso": 1.5, "requisito": "FOR 14", "tags": ["RD 5 (Cortante, Perfurante e Balística)", "Desvantagem em Furtividade"], "detalhe": "Máxima proteção física disponível." },
        { "nome": "Armadura de Adamantina (Entrada Forçada)", "custo": "200.000 $", "ca_bonus": "17", "espaco_peso": 1.0, "requisito": "FOR 16", "tags": ["Resistência a Dano Crítico", "Desvantagem em Furtividade"], "detalhe": "Extremamente pesada e resistente a impactos fatais." },
        { "nome": "Escudo Torre Tático", "custo": "580 $", "ca_bonus": "+5 (automático se empunhado)", "espaco_peso": 3.0, "requisito": "FOR 14", "tags": [], "detalhe": "Oferece cobertura quase total, mas limita a mobilidade." }
      ]
    },
    "kits_ferramentas": [
      { "nome": "Kit de Armas", "custo": "120 $", "espaco_peso": 1.5, "tags": ["Ferramenta", "Artesanal", "Usos: 5"], "detalhe": "Para preparar e armar armadilhas ou armas mundanas comuns." },
      { "nome": "Kit de Caça e Rastreio", "custo": "150 $", "espaco_peso": 1.5, "tags": ["Ferramenta", "Rastrear", "Usos: 5"], "detalhe": "Para preparar armadilhas, encurralar e perseguir criaturas." },
      { "nome": "Kit de Cozinha", "custo": "80 $", "espaco_peso": 1.0, "tags": ["Ferramenta", "Usos: 5"], "detalhe": "Permite preparar e servir comida para até seis pessoas e identificar fontes de comida e venenos." },
      { "nome": "Kit de Disfarce", "custo": "50 $", "espaco_peso": 0.5, "tags": ["Ferramenta", "Usos: 10"], "detalhe": "Cosméticos e adereços para mudar a aparência física de forma natural." },
      { "nome": "Kit de Falsificação", "custo": "30 $", "espaco_peso": 0.5, "tags": ["Ferramenta", "Usos: 10"], "detalhe": "Papéis, tintas e lacres para criar falsificações de documentos. Contestada pelo Kit Forense." },
      { "nome": "Kit Forense", "custo": "500 $", "espaco_peso": 1.0, "tags": ["Ferramenta", "Investigação", "Usos: 5"], "detalhe": "Usado para coletar evidências (DNA, resquícios) e identificar a validade de um item." },
      { "nome": "Kit de Hacker", "custo": "800 $", "espaco_peso": 1.5, "tags": ["Ferramenta", "Tecnologia", "Usos: 10"], "detalhe": "Roteador 5g e cabos universais para invadir sistemas e encontrar informações protegidas por firewalls." },
      { "nome": "Kit de Ferramentas de Ofício", "custo": "50 $", "espaco_peso": 1.5, "tags": ["Ferramenta", "Usos: 3"], "detalhe": "O mestre e o antecedente ajudam a definir o tipo específico de ferramenta contido." }
    ],
    "itens_medicos": [
      { "nome": "Kit Antídoto", "custo": "50 $", "espaco_peso": 0.5, "tags": ["Ingestão", "Cura", "Usos: 3"], "detalhe": "Contém injetores para neutralizar venenos comuns. Concede Vantagem em testes de resistência contra veneno por 1 hora." },
      { "nome": "Kit Médico", "custo": "500 $", "espaco_peso": 0.8, "tags": ["Cura", "Estabilizar", "Usos: 5"], "detalhe": "Abastecido com 3 pílulas de hemoglobina, bandagens, estabilizadores ósseos e antissépticos. Pode estabilizar uma criatura com 0 PV sem teste de Medicina." },
      { "nome": "Máscara de Gás", "custo": "350 $", "espaco_peso": 0.5, "tags": ["Ferramenta", "Usos: 15"], "detalhe": "Permite sobreviver em ambientes com pouco oxigênio ou com gases e fumaças." },
      { "nome": "Pílula de Hemoglobina (Comum)", "custo": "5 $", "espaco_peso": 0, "tags": ["Ingestão", "Cura", "Exaustão: 40%"], "efeito": "Cura 2d4 + modificador de CON em Pontos de Vida.", "detalhe": "Mais de 3 pílulas por dia gera chance de 1 nível de Exaustão." },
      { "nome": "Pílula: Paracetamol & Dipirona Concentrado", "custo": "10 $", "espaco_peso": 0, "tags": ["Ingestão", "Cura", "Exaustão: 50%"], "efeito": "Cura 2d6 + modificador de CON em Pontos de Vida." },
      { "nome": "Pílula: Morfina", "custo": "100 $", "espaco_peso": 0, "tags": ["Ingestão", "Cura", "Exaustão: 60%"], "efeito": "Cura 2d8 + modificador de CON em Pontos de Vida." },
      { "nome": "Respirador Aquático", "custo": "350 $", "espaco_peso": 2.0, "tags": ["Ferramenta"], "detalhe": "Permite respirar sob a água por até 1 hora antes de precisar trocar os filtros." }
    ],
    "itens_gerais": [
      { "nome": "Ponto de Rádio", "custo": "150 $", "espaco_peso": 0, "tags": ["Comunicação", "Vestir"], "detalhe": "Transmissor independente com receptor auditivo emparelhado via rádio com 5 canais e alcance de 15 metros." },
      { "nome": "Celular", "custo": "1.500 $", "espaco_peso": 0.1, "tags": ["Comunicação", "Conexão"], "detalhe": "Dispositivo magnético com GPS e sinal de satélite. Permite acessar o portal de missões Hunter." },
      { "nome": "Pen-Drive", "custo": "60 $", "espaco_peso": 0, "tags": ["Armazenamento"], "detalhe": "Dispositivo para armazenamento de informações via porta USB." },
      { "nome": "Câmera", "custo": "600 $", "espaco_peso": 0.5, "tags": ["Armazenamento"], "detalhe": "Dispositivo para gravação de informações visuais estáticas ou com movimento." },
      { "nome": "Computador", "custo": "3.000 $", "espaco_peso": 1.0, "tags": ["Armazenamento", "Comunicação", "Conexão"], "detalhe": "Portátil para pesquisa e acesso à rede mundial. Permite acesso ao portal de missões Hunter." },
      { "nome": "Relógio de Bolso com Bússola", "custo": "50 $", "espaco_peso": 0.1, "tags": ["Ferramentas"] },
      { "nome": "Corda (10m)", "custo": "25 $", "espaco_peso": 0.5, "tags": ["Ferramentas"] },
      { "nome": "Haste Luminosa (par)", "custo": "35 $", "espaco_peso": 0.2, "tags": ["Ferramentas"] },
      { "nome": "Gancho de Escalada (par)", "custo": "50 $", "espaco_peso": 0.5, "tags": ["Ferramentas"] },
      { "nome": "Gerador de Calor Portátil", "custo": "200 $", "espaco_peso": 1.0, "tags": ["Ferramentas"] },
      { "nome": "Binóculos", "custo": "45 $", "espaco_peso": 0.5, "tags": ["Ferramentas"] },
      { "nome": "Espelho de mão", "custo": "10 $", "espaco_peso": 0.1, "tags": ["Ferramentas"] },
      { "nome": "Barraca de Camping (2 pessoas)", "custo": "500 $", "espaco_peso": 2.0, "tags": ["Ferramentas"] },
      { "nome": "Algema", "custo": "100 $", "espaco_peso": 0.5, "tags": ["Ferramentas"] },
      { "nome": "Mochila", "custo": "120 $", "espaco_gerado": 1.5, "tags": ["Ferramentas"] },
      { "nome": "Mala de Roupas (Vazia)", "custo": "120 $", "espaco_gerado": 2.0, "tags": ["Desvantagem em Furtividade", "Ferramentas"] },
      { "nome": "Mala de Viagem", "custo": "120 $", "espaco_gerado": 2.5, "tags": ["Desvantagem em Furtividade", "Ferramentas"] },
      { "nome": "Bracelete para acoplar", "custo": "120 $", "espaco_gerado": 1.0, "tags": ["Desvantagem em Furtividade", "Ferramentas"] },
      { "nome": "Pochete", "custo": "120 $", "espaco_gerado": 0.7, "tags": ["Ferramentas"] },
      { "nome": "Cartucheira (Pochete de Perna)", "custo": "120 $", "espaco_gerado": 0.7, "tags": ["Ferramentas"] },
      { "nome": "Garrafa Térmica", "custo": "120 $", "espaco_peso": 0.5, "tags": ["Ferramentas"] }
    ],
    "municoes": [
      { "nome": "Flecha", "quantidade_pacote": 20, "arma_compativel": "Arco", "espaco_peso": 1.0, "custo": "50 $", "detalhe": "Munição padrão para arcos curtos e longos." },
      { "nome": "Projétil de Bazuca", "quantidade_pacote": 1, "arma_compativel": "Bazuca", "espaco_peso": 0.5, "custo": "1500 $", "detalhe": "Munição explosiva de alto custo para armamento pesado." },
      { "nome": "Cartucho (Espingarda / Mosquete)", "quantidade_pacote": 4, "arma_compativel": ["Espingarda", "Mosquete"], "espaco_peso": 0.5, "custo": "50 $", "detalhe": "Cartuchos de grosso calibre para armas de fogo simples ou complexas." },
      { "nome": "Cartucho (Fuzil de Assalto)", "quantidade_pacote": 30, "arma_compativel": "Fuzil de Assalto", "espaco_peso": 1.0, "custo": "200 $", "detalhe": "Pente padrão para fuzis automáticos. Suporta o uso da propriedade Rajada." },
      { "nome": "Cartucho (Fuzil de Precisão)", "quantidade_pacote": 6, "arma_compativel": "Fuzil de Precisão", "espaco_peso": 1.0, "custo": "100 $", "detalhe": "Munição de alta precisão para disparos de longo alcance." },
      { "nome": "Cartucho (Metralhadora)", "quantidade_pacote": 45, "arma_compativel": "Metralhadora", "espaco_peso": 1.5, "custo": "300 $", "detalhe": "Cinto de munição pesado para fogo sustentado." },
      { "nome": "Cartucho (Pistola)", "quantidade_pacote": 12, "arma_compativel": "Pistola", "espaco_peso": 0.5, "custo": "100 $", "detalhe": "Pente padrão para pistolas semi-automáticas." },
      { "nome": "Combustível", "quantidade_pacote": 1, "arma_compativel": ["Motosserra", "Lança Chamas"], "espaco_peso": 1.0, "custo": "50 $", "detalhe": "Galão necessário para o funcionamento de ferramentas motorizadas e armas incendiárias." }
    ]
  },
  
  "personagem": {
    "racas": {
      "humanos_e_tribos": [
        {
          "nome": "Humano Comum",
          "descricao": "Raça mais comum no mundo, com variações de aparências e características físicas.",
          "aumento_atributo": {"FOR": 1, "DES": 1, "CON": 1, "INT": 1, "SAB": 1, "CAR": 1},
          "caracteristicas_especiais": []
        },
        {
          "nome": "Fanalis",
          "descricao": "Composição física descomunal e cabelos vermelhos.",
          "aumento_atributo": {"FOR": 2, "CON": 2, "DES": 2, "INT": -2, "SAB": -2, "CAR": -2},
          "caracteristicas_especiais": [
            {"nome": "Força Descomunal", "efeito": "Modificador de FOR extremamente alto para combate corpo-a-corpo."}
          ]
        },
        {
          "nome": "Gyudondond",
          "descricao": "Conhecidos como Homens Flauta, aplicam estacas no corpo para sonoridade.",
          "aumento_atributo": "Distribua 3 pontos em qualquer atributo",
          "tipo_distribuicao": "livre",
          "pontos_distribuir": 3,
          "caracteristicas_especiais": [
            {"nome": "Alarido de Guerra", "efeito": "Pode utilizar Intimidação como ação de movimento ao performar uma dança."}
          ]
        },
        {
          "nome": "Imuchack",
          "descricao": "Guerreiros de até 4 metros que vivem em áreas gélidas.",
          "aumento_atributo": {"FOR": 2, "CON": 1, "INT": -2},
          "tamanho": "Grande (até 4m)",
          "caracteristicas_escolha": [
            {"nome": "Imunidade ao Frio", "efeito": "Imune a baixas temperaturas e dano de gelo/frio."},
            {"nome": "Caça Aquática", "efeito": "Sem penalidade de movimento para nadar; prende respiração por 1+CONx2 minutos."}
          ]
        }
      ],
      "clas_especiais": [
        {
          "nome": "Kurta",
          "descricao": "Aldeões com cultura própria conhecidos pelos Olhos Escarlates.",
          "aumento_atributo": "Escolha +2 em INT ou SAB",
          "tipo_distribuicao": "escolha",
          "opcoes_atributo": ["INT", "SAB"],
          "pontos_distribuir": 2,
          "caracteristicas_especiais": [
            {"nome": "Mudança Escarlate", "efeito": "+1 em todos os atributos enquanto os olhos estiverem vermelhos."},
            {"nome": "Caça Fascinante", "efeito": "Pode ser procurado e caçado caso descubram sua origem."}
          ],
          "gatilhos_olhos_escarlates": [
            "Menos de 15% de vida",
            "Dano psíquico > metade da vida",
            "Efeito de medo/aterrorizado por usuário de NEN",
            "Ver amigos próximos morrendo"
          ],
          "mecanica_especial": {
            "nome": "Sofrimento Profundo",
            "ativacao": "Automática ao atingir qualquer gatilho",
            "efeito": "Olhos ficam escarlates, +1 em todos atributos",
            "duracao": "Até sair da condição de gatilho"
          }
        }
      ],
      "modificados_e_fantasia": [
        {
          "nome": "Wormorfos",
          "descricao": "Humanos modificados geneticamente (povo verme).",
          "aumento_atributo": "Nenhum",
          "deslocamento": {"terrestre": "9m", "subterraneo": "9m"},
          "caracteristicas_especiais": [
            {"nome": "Visão", "efeito": "Ecolocalização de 3m; não depende de visão/audição no solo."},
            {"nome": "Corpo Malemolente", "efeito": "Resistência a dano de impacto/concussão por pele rígida."},
            {"nome": "Enterrada", "mecanica": "Agarre contra CA; se sucesso, ação bônus para submergir puxando o alvo (Condição Caído e Agarrado)."}
          ],
          "resistencias": ["Impacto", "Concussão"]
        },
        {
          "nome": "Elfos e Meio-Elfos",
          "descricao": "Seres de linhagem feérica com afinidade mágica.",
          "aumento_atributo": "Escolha +2 em DES, SAB, INT ou CAR",
          "tipo_distribuicao": "escolha",
          "opcoes_atributo": ["DES", "SAB", "INT", "CAR"],
          "pontos_distribuir": 2,
          "visao": "Penumbra 18m",
          "caracteristicas_especiais": [
            {"nome": "Ancestral Feérico", "efeito": "Vantagem contra intimidação e persuasão (naturais ou por aura)."}
          ]
        },
        {
          "nome": "Meio-Orcs",
          "descricao": "Descendentes de orcs e humanos, conhecidos por sua tenacidade.",
          "aumento_atributo": {"FOR": 1, "CON": 1},
          "caracteristicas_especiais": [
            {"nome": "Resistência Implacável", "efeito": "Se reduzido a 0 HP, volta para 1 HP (Usos = Proficiência/dia)."}
          ]
        },
        {
          "nome": "Anões",
          "descricao": "Povo baixo e robusto, mestres em forja e resistência.",
          "aumento_atributo": {"CON": 2},
          "visao": "Penumbra 18m",
          "caracteristicas_especiais": [
            {"nome": "Resiliência Anã", "efeito": "Vantagem contra venenos e resistência a dano de veneno."}
          ],
          "resistencias": ["Veneno"]
        },
        {
          "nome": "Draconatos",
          "descricao": "Descendentes de dragões com habilidades elementais.",
          "aumento_atributo": "Escolha +2 em FOR, DES ou CAR",
          "tipo_distribuicao": "escolha",
          "opcoes_atributo": ["FOR", "DES", "CAR"],
          "pontos_distribuir": 2,
          "caracteristicas_especiais": [
            {"nome": "Arma de Sopro", "mecanica": "Ação Principal, TR CON ou DES, 2d6 dano (escala no nv 6: 3d6 e nv 11: 4d6).", "nota": "Consultar tipos de dragão e elementos para determinar tipo de dano."}
          ],
          "tabela_ancestral_dragao": {
            "nota": "O tipo de dano da Arma de Sopro depende da ancestralidade escolhida",
            "tipos": ["Fogo (Vermelho)", "Gelo (Branco)", "Ácido (Verde)", "Elétrico (Azul)", "Veneno (Negro)"]
          }
        }
      ],
      "tecnologicos_e_sobrenaturais": [
        {
          "nome": "Neans (Andróides)",
          "descricao": "Constructos quase indistinguíveis de humanos.",
          "aumento_atributo": "Variável - Atualização Diária",
          "tipo": "Constructo",
          "caracteristicas_especiais": [
            {"nome": "Atualização de Disco Rígido", "efeito": "Altera todos os pontos de atributo no início de cada dia.", "mecanica": "Jogador pode redistribuir completamente os atributos a cada descanso longo."},
            {"nome": "Curto Circuito", "efeito": "Não sofrem exaustão biológica, mas entram em curto ao receber dano elétrico.", "vulnerabilidade": "Elétrico"}
          ],
          "imunidades": ["Exaustão biológica", "Veneno", "Doenças"],
          "vulnerabilidades": ["Elétrico"]
        },
        {
          "nome": "Vampiros",
          "descricao": "Mortos-vivos que se alimentam de aura e sangue.",
          "hierarquia": [
            {"nivel": "Vampiro", "niveis_personagem": "0-3"},
            {"nivel": "Lorde", "niveis_personagem": "4-7"},
            {"nivel": "Conde", "niveis_personagem": "8-11"},
            {"nivel": "Imperador", "niveis_personagem": "12"}
          ],
          "aumento_atributo": {"INT": 2},
          "aumento_atributo_adicional": "Escolha +1 em FOR, DES ou CON",
          "tipo_distribuicao": "misto",
          "caracteristicas_especiais": [
            {"nome": "Sugar Aura", "mecanica": "Ação Bônus, Ataque de Mordida, TR CON. Rouba 10% da aura do alvo por sucesso.", "tipo": "Ação Bônus"},
            {"nome": "Exposição Solar", "efeito": "Após 2 rodadas no sol direto, -5 na CA. -2 na CA em locais protegidos do sol.", "fraqueza": "Luz Solar"}
          ],
          "fraquezas": ["Luz Solar"],
          "regeneracao": "Regenera HP ao sugar aura com sucesso"
        }
      ],
      "formigas_quimera": {
        "regra_especial": "Iniciam sem Antecedentes. Não recebem aumento de atributo direto.",
        "mecanica_criacao": "Baseada em slots de traços conforme hierarquia",
        "hierarquia": [
          {
            "nivel": "Peões/Soldados",
            "slots_tracos": 1,
            "equivalencia": "Resistência acima de humanos comuns",
            "poder_relativo": "Básico"
          },
          {
            "nivel": "Oficiais",
            "slots_tracos": 2,
            "equivalencia": "Humanos fortes com básico de NEN",
            "poder_relativo": "Intermediário"
          },
          {
            "nivel": "Líderes de Esquadrão",
            "slots_tracos": 3,
            "equivalencia": "Usuários proficientes em NEN",
            "poder_relativo": "Avançado"
          },
          {
            "nivel": "Guardas Reais",
            "slots_tracos": 5,
            "equivalencia": "3-10 usuários de NEN",
            "poder_relativo": "Elite"
          }
        ],
        "tracos_especiais": [
          {"nome": "Arma Natural", "descricao": "Bico, Cauda, Chifres, Garras, Ferrão ou Tentáculos.", "efeito_mecanico": "1d6 de dano natural + modificador de FOR"},
          {"nome": "Corpo Adaptável", "descricao": "Mudança corporal (Ex: Lagarta p/ Borboleta) ou resistência a impacto.", "opcoes": ["Metamorfose", "Resistência a Impacto"]},
          {"nome": "Criatura de Cerco", "descricao": "Dano crítico em construções e Constructos.", "efeito_mecanico": "Dano x2 contra estruturas e constructos"},
          {"nome": "Destreza Animal", "descricao": "Vantagem em TR de Destreza.", "efeito_mecanico": "Vantagem em testes de resistência de DES"},
          {"nome": "Escudo Natural", "descricao": "Resistência a dano cortante, perfurante e/ou impacto.", "opcoes": ["Cortante", "Perfurante", "Impacto"], "escolha": "Selecione 1 tipo"},
          {"nome": "Evasão", "descricao": "+2 na Reação de Esquiva.", "efeito_mecanico": "+2 em testes de Esquiva"},
          {"nome": "Investida", "descricao": "Aumenta dano ou aplica condição com base no deslocamento.", "efeito_mecanico": "+1d6 de dano se mover 6m+ antes do ataque"},
          {"nome": "Rasante", "descricao": "Ataque aéreo sem provocar AdO.", "requisito": "Voo", "efeito_mecanico": "Não provoca ataque de oportunidade ao atacar em voo"},
          {"nome": "Regeneração", "descricao": "Recuperação gradual de vida.", "efeito_mecanico": "Recupera 1d4 HP no início de cada turno se tiver mais de 0 HP"},
          {"nome": "Telepatia", "descricao": "Comunicação entre espécies; Ativa para inferiores, passiva para superiores.", "alcance": "18m"},
          {"nome": "Veneno/Peçonha", "descricao": "Aplicação de veneno no contato; imune ao próprio material.", "efeito_mecanico": "TR CON CD 12 ou sofre 1d6 de dano de veneno por turno (3 turnos)", "imunidade": "Próprio veneno"}
        ],
        "caracteristicas_base": {
          "telepatia": "Inata a todas as formigas (alcance 18m entre formigas)",
          "tamanho": "Miúdo a Médio Modificado",
          "deslocamento": "9m padrão"
        },
        "notas_implementacao": {
          "criacao_personagem": "Jogador escolhe hierarquia, então seleciona número de traços correspondente aos slots",
          "exemplo": "Um Oficial (2 slots) pode escolher Arma Natural e Evasão"
        }
      }
    },
    "antecedentes": [
      {
        "nome": "Amigo dos Animais",
        "descricao": "Pessoas que se importam com o equilíbrio da natureza, mas que também adoram um desafio, andam pelas florestas e pântanos buscando encontrar criaturas fantásticas e desconhecidas.",
        "proficiencias": "Escolha um Kit dentre os recebidos e Adestrar Animais e Natureza",
        "equipamento": ["Qualquer arma simples (corpo-a-corpo ou à distância)", "Qualquer arma simples (corpo-a-corpo ou à distância)", "Kit de Caça e Rastreio de Criaturas ou Kit Médico"],
        "caracteristicas": [
          {"nome": "Habitat Natural", "efeito": "Animais e Feras (inclusive hostis) normalmente o consideram outra criatura não hostil. Seus companheiros são tratados como membros aliados do seu bando, desde que não atuem de forma hostil."},
          {"nome": "Tarzan/Jane", "efeito": "Ao passar um minuto interagindo com uma criatura não hostil você pode identificar alguma informação que ela já tenha conhecimento sobre o ambiente ou uma outra criatura."},
          {"nome": "Companheiro Inabalável", "efeito": "Você tem um companheiro que te concede a Ação Ajuda no turno dele. Ele te entende e obedece comandos simples. Tendo 10 HP, 12 CA, 1d4 de dano, 12m, +1 para o ataque, e +4 em uma perícia, ou +2 em duas perícias. Você pode abrir mão das perícias e 6m de deslocamento para o dano se tornar 1d8."}
        ]
      },
      {
        "nome": "Aristocrata",
        "descricao": "Pessoas que entendem de riqueza, poder e privilégios. Mas não só entendem, elas desfrutam e estão acostumadas a isso.",
        "proficiencias": "História e Religião",
        "equipamento": ["Celular ou Câmera", "Computador", "Mochila 3 (Mala)", "Qualquer arma simples (corpo-a-corpo ou à distância)"],
        "caracteristicas": [
          {"nome": "Posição Privilegiada", "efeito": "Você é bem-vindo na alta sociedade e as pessoas assumem que você tem o direito de estar onde está. As pessoas comuns fazem todos os esforços para acomodá-lo e evitar seu desprazer, e outros nobres o tratam como um membro da mesma classe social."},
          {"nome": "Mauricinho / Patricinha", "efeito": "Você recebe toda semana uma quantia correspondente aos recursos financeiros de sua família de acordo com a tabela ao rolar 1d4: (1) Classe Média Alta: 50-150; (2) Classe Alta: 200-500; (3) Rico: 600-1500; (4) Jogador de aviãozinho: 2000-5000."}
        ]
      },
      {
        "nome": "Artista",
        "descricao": "Pessoas com as mais variadas capacidades de entretenimento se aventuram no mundo artístico para realizar seus sonhos vivendo daquilo que amam ou buscando alcançar fama e dinheiro.",
        "proficiencias": "Kit de Ferramenta de Ofício e escolha 3 dentre: Acrobacia, Atuação, Intuição ou Prestidigitação",
        "equipamento": ["Mala de Roupas ou Mochila Comum/Maleta", "Câmera ou Celular", "Kit de Ferramentas de Ofício"],
        "caracteristicas": [
          {"nome": "Tudo no @", "efeito": "Comerciantes que negociam com você reconhecem seu trabalho como artista, você tem chance (50%) de pagar suas compras com merchandising."},
          {"nome": "Virando a Cadeira - Fascinar Espectadores", "efeito": "Apresentar sua arte às pessoas antes de conversar ou negociar, faz com que fiquem fascinadas por você e tenham uma inclinação a concordar com sua opinião. Vantagem em testes (checks) de Carisma. (Não TRs)"}
        ]
      },
      {
        "nome": "Assassino (Marcial)",
        "descricao": "Assassinos famosos como a família Zoldyck e ainda outros, desenvolvem habilidades próprias para sua profissão e, com isso, se tornam peritos naquilo que fazem. A arte de matar de forma rápida.",
        "proficiencias": "Escolha um Kit dentre os recebidos e Acrobacia e Furtividade",
        "equipamento": ["Adaga/Faca", "Veneno Variante: 1 frasco (Beijo do Vampiro)", "Pochete de Perna", "Kit de disfarce ou Kit de Falsificação"],
        "caracteristicas": [
          {"nome": "Eco do Ritmo", "efeito": "Se concentrar em seu turno completo projeta um padrão hipnótico da sua imagem para quem o olha, fazendo com que todas as criaturas hostis tenham desvantagem em jogadas de ataque direcionadas a você até que seja acertado."},
          {"nome": "Sumidão", "efeito": "Vantagem em testes de furtividade de qualquer natureza e não é descoberto ao realizar um ataque enquanto se está furtivo."},
          {"nome": "Máquina de Matar", "efeito": "Dano dobrado (nos dados) em ataques realizados enquanto se está oculto/furtivo."}
        ]
      },
      {
        "nome": "Caçador de Feras",
        "descricao": "Nesse mundo existem diversas criaturas desconhecidas e hostis que se reproduzem nas sombras enquanto sobrepujam habitat naturais de outras criaturas.",
        "proficiencias": "Escolha um Kit dentre os recebidos e Natureza e Sobrevivência",
        "equipamento": ["Espingarda Carregada ou Tazer", "Kit de Caça e Rastreio de Criaturas ou Kit Antídoto", "Qualquer arma simples ou Marcial (corpo-a-corpo ou à distância) e Rede"],
        "caracteristicas": [
          {"nome": "Temos que Pegar!", "efeito": "Vantagem em todos os testes relacionados a rastrear feras naturais e bestas mágicas (inclusive bestas de NEN)."},
          {"nome": "Desbravador", "efeito": "Você recebe +2 em sobrevivência e anula qualquer penalidade de sobrevivência não causadas por Hatsus, como Exaustão. Além disso não sofre penalidades de deslocamento por terrenos difíceis ou clima ruim."}
        ]
      },
      {
        "nome": "Cientista/Técnico",
        "descricao": "Após muito estudo e dedicação, começam a arriscar a vida também no campo experimental para comprovar suas teorias e hipóteses.",
        "proficiencias": "Escolha 2 perícias com Kits e 3 dentre: História, Investigação, Medicina, Natureza, Prestidigitação, Religião ou Sobrevivência. Incremento no Valor de Habilidade: Aumente em 1 o valor de Inteligência ou Sabedoria.",
        "equipamento": ["Qualquer arma simples (corpo-a-corpo ou à distância)", "1 Mochila Comum/Maleta", "Kit Antídoto ou Kit Médico", "Kit de Armas ou Kit Forense ou Kit de Hacker"],
        "caracteristicas": [
          {"nome": "Explorar Fraqueza (Marcial)", "efeito": "O personagem pode utilizar sua ação principal para analisar o oponente ou situação tendo vantagem no próximo ataque contra um inimigo ou teste baseado em inteligência. Se utilizado em combate, depois da primeira análise, a característica pode ser usada outras vezes como ação bônus em um mesmo oponente."},
          {"nome": "Mestre do Planejamento", "efeito": "Ao utilizar um item / kit escolhido no antecedente, você ganha um 1d6 para rolar em qualquer jogada ou teste cabível 3 vezes por dia. Não aplicável a danos."}
        ]
      },
      {
        "nome": "Criminoso",
        "descricao": "Essas pessoas normalmente vivem à margem da lei, desprezando e quebrando os regulamentos da sociedade. Estão quase sempre envolvidos com roubo e violência.",
        "proficiencias": "Escolha um Kit dentre os recebidos e Enganação e Furtividade",
        "equipamento": ["Qualquer arma simples ou Marcial", "1 Pochete", "Opção Cleptomaníaco: 1 Celular roubado com 5 informações, Kit Ferramentas Ofício", "Opção Estelionatário: Kit de Falsificação ou Kit de Disfarce", "Opção Político Corrupto: Pen-Drive com informações de 1 nome conhecido", "Opção Traficante: Pochete, Um maço com 1.500 $, Celular com contato de fornecedor"],
        "caracteristicas": [
          {"nome": "Cleptomaníaco", "efeito": "Inicia com celular roubado e kit de ferramentas de ofício."},
          {"nome": "Estelionatário", "efeito": "Acesso a kits de falsificação ou disfarce para golpes."},
          {"nome": "Político Corrupto", "efeito": "Possui informações privilegiadas (Pen-Drive) para manipular poder e influência."},
          {"nome": "Traficante", "efeito": "Inicia com recursos financeiros de vendas ilícitas e contatos de fornecedores."}
        ]
      },
      {
        "nome": "Discípulo",
        "descricao": "Uma pessoa que é orientada por um mestre e normalmente continua seguindo suas orientações.",
        "proficiencias": "Kit de Ferramenta de Ofício e Escolha 3 perícias quaisquer",
        "equipamento": ["Celular com contato ou anotações de seu mestre", "Qualquer arma simples ou Marcial (corpo-a-corpo ou à distância)", "Kit de Ferramentas de Ofício"],
        "caracteristicas": [
          {"nome": "Abre-te Sésamo", "efeito": "Você consegue acessar alguns lugares ou pessoas e informações a partir da fama do seu mestre e da credibilidade que o nome lhe confere."},
          {"nome": "Mateus 28.18-20 (Possivelmente Marcial)", "efeito": "Seu mestre supostamente morreu ou desapareceu, porém ele lhe concedeu um ensinamento, poder, item, equipamento ou marca que te permite continuar sua história."}
        ]
      },
      {
        "nome": "Guarda Costas",
        "descricao": "Arduamente treinados para trabalhos físicos, guarda-costas podem ser pessoas dispostas a fazer um trabalho perigoso por dinheiro.",
        "proficiencias": "Atletismo e Intimidação",
        "equipamento": ["Pistola", "Qualquer arma simples ou Marcial (corpo-a-corpo ou à distância)"],
        "caracteristicas": [
          {"nome": "Artista Marcial (Marcial)", "efeito": "Você treinou técnicas e desenvolveu seu corpo ao máximo para o combate corpo-a-corpo. Seus golpes desarmados causam 1d6 no lugar de 1d4."},
          {"nome": "Horário de Trabalho", "efeito": "Você consegue escolher uma pessoa para manter sua atenção de forma constante em batalha ou fora de batalha. Você tem vantagem e +2 em jogadas de percepção para encontrar essa pessoa."}
        ]
      },
      {
        "nome": "Líder",
        "descricao": "Você é uma pessoa que procura mudar a sociedade ao seu redor jogando na arena da política, pessoas e personalidades.",
        "proficiencias": "Escolha três entre Enganação, História, Investigação ou Persuasão",
        "equipamento": ["1 pílula de Hemoglobina", "1 pílula de Hemoglobina variante: (Paracetamol & Dipirona concentrada)", "Qualquer arma simples (corpo-a-corpo ou à distância)", "Qualquer outro Kit"],
        "caracteristicas": [
          {"nome": "Presença de Liderança", "efeito": "Sua presença notável e inspiradora concede 1d4 (grau básico) que pode ser utilizado em qualquer jogada de seus aliados (cada um) até o fim do dia. Se a jogada tiver sucesso por causa do dado, o dado aumenta um grau (torna-se 1d6) e assim por diante. Se falhar no grau básico, não pode ser usada no dia. Se falhar com dado aumentado, o grau apenas diminui. Se chegar a 1d20, o aliado recebe o benefício de transformar o dado básico em 1d6 em outros dias."}
        ]
      },
      {
        "nome": "Marinheiro",
        "descricao": "Você navegou em um navio pelo mar durante anos, nesse período, enfrentou poderosas tormentas, monstros abissais e os malditos piratas.",
        "proficiencias": "Atletismo e Percepção",
        "equipamento": ["Corrente Pesada ou Rede", "Qualquer arma simples ou Marcial (corpo-a-corpo ou à distância)"],
        "caracteristicas": [
          {"nome": "Grande Herói da Marinha", "efeito": "Todas as forças armadas te reconhecem por um grande feito conquistado. Você não gasta passagem em navios, jatos, aviões e dirigíveis. Possui Documento de patente, Experiência de Convés (imune a ser derrubado) e Mala de Roupas."},
          {"nome": "Imperador do Mar", "efeito": "Buscando mais poder você ouviu falar de NEN e precisa descobrir como acessar isso. Possui Experiência de Convés (imune a ser derrubado), Pistola ou Mosquete, Arma simples ou Marcial e Relógio à prova dágua com Bússola."}
        ]
      },
      {
        "nome": "Mentalista",
        "descricao": "Conhecedores do funcionamento da mente, mentalistas são profissionais que trabalham com a realidade do pensamento ou com a ilusão.",
        "proficiencias": "Escolha um Kit dentre os recebidos e Enganação ou Persuasão e Intuição",
        "equipamento": ["Qualquer arma simples (corpo-a-corpo ou à distância)", "Kit de Falsificação ou Kit de Ferramenta de Ofício"],
        "caracteristicas": [
          {"nome": "Perceptivo", "efeito": "+2 em testes de Percepção."},
          {"nome": "Referência Bibliográfica", "efeito": "Possui vantagem em todos os testes de Carisma contra humanoides com inteligência igual ou superior a Modificador 0 para convencê-los, ou enganá-los dentro de qualquer argumento."}
        ]
      },
      {
        "nome": "Negociante",
        "descricao": "Indivíduos acostumados a lidar com o público e, por isso, possuem facilidade na oratória e na persuasão.",
        "proficiencias": "Atuação, Persuasão e Prestidigitação",
        "equipamento": ["Qualquer equipamento dentro do orçamento de 2.000 $", "1 Mala de Roupas"],
        "caracteristicas": [
          {"nome": "Camelô", "efeito": "Quando vender qualquer item seu usado, você consegue vendê-lo com o custo oficial, desde que esteja funcional."},
          {"nome": "Pechincheiro", "efeito": "Desconsiderando os itens iniciais, você consegue comprar qualquer item com desconto de 30% do valor de mercado desde que use a frase -Mas a gente não pode conversar melhor esse preço, meu chefe?!-. Essa característica não é válida para armas de fogo, explosivos e itens de nível Místico / Especial."}
        ]
      },
      {
        "nome": "Ninja (Marcial)",
        "descricao": "Esgueirando-se na noite ou no meio da multidão, submetendo seus corpos à torturas para acostumarem-se com a dor e aplicando técnicas nunca antes vistas.",
        "proficiencias": "Escolha um Kit dentre os recebidos e Acrobacia ou Atletismo e Furtividade",
        "equipamento": ["Adaga/Faca; Fuma-Shuriken; Agulha Senbon (5); Soqueira com Lâminas (2); Shuriken (5)", "Kit de disfarce ou Kit de Falsificação", "Bola de gude expl. ou Granada de Luz/Fumaça", "Qualquer arma simples ou Marcial (corpo-a-corpo ou à distância)"],
        "caracteristicas": [
          {"nome": "Furtividade Superior", "efeito": "Vantagem em testes de furtividade de qualquer natureza."},
          {"nome": "Jutsu: Clone das Sombras", "efeito": "Cria um clone sólido. 5/5 PV, mesmas características sem NEN. Pode usar ação bônus para comandar clones."},
          {"nome": "Jutsu: Substituição", "efeito": "Reação para fuga rápida com CA +5 e chance de aparecer em até 3m de onde estava."}
        ]
      },
      {
        "nome": "Órfão",
        "descricao": "Você cresceu nas ruas, sozinho, órfão e pobre. Você não tinha ninguém para cuidar de você ou te alimentar, então, aprendeu a se virar sozinho.",
        "proficiencias": "Escolha 2 perícias com Kits recebidos. Recebe ainda Furtividade e Intuição ou Prestidigitação",
        "equipamento": ["Kit de Disfarce", "Kit de Ferramentas de Ofício ou Kit de Armas", "Qualquer arma simples (corpo-a-corpo ou à distância)"],
        "caracteristicas": [
          {"nome": "Segredos da Cidade", "efeito": "Você conhece os padrões secretos e o fluxo das cidades e pode encontrar passagens através da expansão urbana que os outros deixariam passar. Quando não em combate, você e companheiros podem viajar entre dois locais na cidade com o dobro da velocidade ou metade do custo."},
          {"nome": "Zé-Pequeno", "efeito": "Vantagem em todos os testes de Carisma quando se tratam de assuntos, pessoas e temas relacionados à máfia e ao conhecimento do submundo."},
          {"nome": "Insignificante", "efeito": "Os inimigos tendem a te ignorar se você não fizer nada que os ameace e nem for o foco inicial de um conflito. Você também pode passar por terrenos ocupados por oponentes em um combate como se passasse adjacente, não recebendo AdO."}
        ]
      },
      {
        "nome": "Recluso",
        "descricao": "Você viveu em reclusão – ou em uma comunidade isolada como um monastério ou completamente sozinho – por um período importante da sua vida.",
        "proficiencias": "Escolha 1 perícia com Kit recebido e Intuição, Medicina e Religião",
        "equipamento": ["Qualquer arma simples ou Marcial (corpo-a-corpo ou à distância)", "Kit de Armas ou Kit de Caça e Rastreio de Criaturas"],
        "caracteristicas": [
          {"nome": "Monge (Marcial)", "efeito": "Vantagem em qualquer teste de constituição. Treinou técnicas corporais para o combate desarmado. Seus golpes desarmados causam 1d6 no lugar de 1d4."},
          {"nome": "Escravo", "efeito": "Resistente a intimidação com ou sem aura. Pessoas com posição de autoridade alheias a você tem desvantagem em qualquer teste de carisma que não lhe beneficie. Em batalha, tentativa de intimidação resistida concede ataque de oportunidade (sem reação preparada necessária)."}
        ]
      },
      {
        "nome": "Soldado",
        "descricao": "A guerra sempre esteve na vida de soldados. Treinando desde jovem, estudando o uso das armas e armaduras, aprendendo técnicas básicas de sobrevivência.",
        "proficiencias": "Escolha 1 perícia com Kit recebido e Atletismo e Intimidação ou Sobrevivência",
        "equipamento": ["Qualquer arma simples ou Marcial (corpo-a-corpo ou à distância)", "Kit de Armas ou Kit de Caça e Rastreio de Criaturas", "1 Mala de Roupas ou Mochila Comum/Maleta"],
        "caracteristicas": [
          {"nome": "Batedor", "efeito": "Acostumado a abrir caminho para investigar planos do inimigo (Vantagem em Investigação e Furtividade quando estiver sozinho ou 20 metros separado do grupo investigando inimigos)."},
          {"nome": "Médico de Combate", "efeito": "Conhece procedimento que impede malefícios das pílulas de hemoglobina e suas variações e consegue aplicar em uma pessoa por dia."},
          {"nome": "Atirador de Elite", "efeito": "Atacar alvos além da distância normal não impõe desvantagem. Ataques ignoram meia cobertura e três-quartos. Pode escolher sofrer -5 no acerto para adicionar +10 no dano."}
        ]
      },
      {
        "nome": "Agente de Saúde",
        "descricao": "Um amor pela saúde dos outros, ou ainda um compromisso com a vida domina todos dessa origem.",
        "proficiencias": "Kit Médico ou Antídoto e Medicina e Percepção",
        "equipamento": ["Qualquer arma simples (corpo-a-corpo ou à distância)", "Kit Médico", "Kit Antídoto ou 3 pílulas de Hemoglobina variante: (Paracetamol e Dipirona Concentrado)"],
        "caracteristicas": [
          {"nome": "Técnica Medicinal", "efeito": "Sempre que cura um personagem, você adiciona seu INTx2 no total de PV curados."},
          {"nome": "Primeiros Socorros", "efeito": "+3 em testes para estabilizar outros personagens. Aumenta o proveito do Kit de primeiros socorros de 3 usos para 6 usos."},
          {"nome": "Médico Experimental", "efeito": "Pode fazer qualquer antídoto com kit de primeiros socorros e algum item da natureza ao redor. Margem de funcionamento é de 30% (evolui para 50% no nível 3, 70% no nível 6 e 85% no nível 10)."}
        ]
      },
      {
        "nome": "Atleta",
        "descricao": "Você tem um físico primoroso e bem trabalhado, você competia/compete em algum tipo de esporte.",
        "proficiencias": "Atletismo e Acrobacia ou Intuição ou Percepção",
        "equipamento": ["Qualquer arma simples (corpo-a-corpo ou à distância)", "1 pílula de Hemoglobina variante: (Morfina)"],
        "caracteristicas": [
          {"nome": "Bolt", "efeito": "Seu físico primoroso lhe permite fazer uma ação de movimento extra ou saltar em distância metade de seu deslocamento."},
          {"nome": "Implacável", "efeito": "Se falhar em um teste de resistência, você pode rolar novamente para o teste, mas é obrigado a manter o novo resultado. Pode usar esse traço igual ao seu bônus de proficiência por dia."}
        ]
      },
      {
        "nome": "Chef",
        "descricao": "Um ótimo cozinheiro, com habilidades de impressionar qualquer um.",
        "proficiencias": "Com todos os kits recebidos e Sobrevivência, Percepção e História",
        "equipamento": ["Qualquer arma simples (corpo-a-corpo ou à distância)", "Kit de Cozinha", "Kit de Caça e Rastreio de Criaturas"],
        "caracteristicas": [
          {"nome": "Sabor Único", "efeito": "Com os ingredientes você pode fazer qualquer um dos tipos de pratos, além de você ter um bônus de 1d6 em testes de CAR contra pessoas que comeram sua comida em até uma semana."},
          {"nome": "Sabor de Casa", "efeito": "Com os ingredientes certos (teste de sobrevivência CD 10), você pode fazer uma comida que vale por um descanso curto (Um mesmo personagem não pode se beneficiar disso mais de uma vez a cada 24h)."}
        ]
      },
      {
        "nome": "Circense",
        "descricao": "Você sobrevivia com base em seu corpo e suas performances, fazendo malabares, piruetas e o que mais estivesse em seu arsenal.",
        "proficiencias": "Kit de Disfarce, Acrobacia, Atuação e Persuasão ou Enganação",
        "equipamento": ["Qualquer arma simples (corpo-a-corpo ou à distância)", "Kit de Disfarce", "Roupa Chique"],
        "caracteristicas": [
          {"nome": "Performance", "efeito": "Você tem +5 em acrobacia ou prestidigitação para seus números."},
          {"nome": "Mimetismo", "efeito": "Você consegue imitar sons que já tenha escutado, incluindo vozes. Uma criatura que ouve os sons feitos por você pode perceber que são imitações com um sucesso em um teste de Sabedoria (Intuição) contestado por um teste seu de Carisma (Enganação)."}
        ]
      },
      {
        "nome": "Gamer",
        "descricao": "Alguém que vivia em casa jogando os mais diversos jogos, talvez um famoso pro-player, talvez apenas alguém que fugia da realidade nos games.",
        "proficiencias": "Kit de Hacker, História e Intuição",
        "equipamento": ["Qualquer arma simples (corpo-a-corpo ou à distância)", "Dispositivo de PEM", "Computador, Celular e Pen Drive", "Kit de Hacker"],
        "caracteristicas": [
          {"nome": "Dormir não dá XP", "efeito": "Ao invés de descansar, algumas latas de energético te fazem passar por um descanso normal, porém da próxima vez você precisará descansar."},
          {"nome": "Procrastinador", "efeito": "Você é acostumado a deixar tudo para a última hora, você consegue fazer tudo na metade do tempo, mas nem sempre ficará bom."}
        ]
      },
      {
        "nome": "Investigador",
        "descricao": "Um detetive, de renome ou não, trabalhando em busca de saber os mistérios do mundo, de casos policiais, ou daquilo que pegar mais.",
        "proficiencias": "Kit Forense, Investigação e Atuação ou Intuição ou Percepção ou Enganação",
        "equipamento": ["Pistola", "Kit Forense", "Ponto de rádio"],
        "caracteristicas": [
          {"nome": "Detetive", "efeito": "O mestre sempre irá te falar uma coisa extra, sem precisar jogar investigação em toda cena de investigação."},
          {"nome": "Rede de Contatos", "efeito": "Graças à influência da sua agência, você pode obter cinco informações por campanha sem custo."}
        ]
      },
      {
        "nome": "Piloto",
        "descricao": "Alguém que manda muito bem no volante, um piloto de fuga, um corredor de Fórmula 1.",
        "proficiencias": "Percepção, Intuição e Prestidigitação (Pilotar)",
        "equipamento": ["Qualquer arma simples (corpo-a-corpo ou à distância)", "Moto (pode pagar a diferença para ter um carro)"],
        "caracteristicas": [
          {"nome": "Manobras Maníacas", "efeito": "Com uma ação bônus, e desde que esteja dentro de um veículo, o jogador desvia de qualquer coisa menor que seu veículo automaticamente. Caso o objeto ou pessoa seja maior que seu veículo você pode realizar um teste de reflexos (CD 15)."},
          {"nome": "Piloto de Fuga", "efeito": "Com uma ação normal você pressiona o acelerador como nunca, dobrando sua velocidade atual enquanto em um veículo. O jogador não sofre penalidades resultantes da velocidade quando usando este poder."},
          {"nome": "Experiência no Volante", "efeito": "Você recebe +3 em testes para pilotar."}
        ]
      },
      {
        "nome": "Religioso",
        "descricao": "Talvez um padre, um pastor, talvez um fanático de uma religião pouco conhecida.",
        "proficiencias": "Religião e História",
        "equipamento": ["Qualquer arma simples (corpo-a-corpo ou à distância)", "Bíblia, ou qualquer outro livro sagrado (item de Roleplay)"],
        "caracteristicas": [
          {"nome": "Pregar", "efeito": "Você recebe +3 em teste de Religião para acalmar. E quando acalmar alguém, a pessoa acalmada receberá uma ação protagonista para gastar no próximo turno."},
          {"nome": "Orador Público", "efeito": "Sempre que realizar um teste de Carisma (Persuasão) enquanto estiver falando para um grupo grande de pessoas, você é considerado proficiente na perícia de Persuasão e adiciona o dobro do seu bônus de proficiência para o teste."},
          {"nome": "Benção Divina", "efeito": "Após fazer uma oração a seu deus você se sente momentaneamente motivado e revigorado (seu modificador de SAB sobe um ponto)."}
        ]
      },
      {
        "nome": "Mestre de RPG",
        "descricao": "Você viveu sua vida narrando feitos incríveis, mas cansou de contar a história dos outros e resolveu começar sua própria aventura épica.",
        "proficiencias": "Atuação, História e Enganação",
        "equipamento": ["Celular e Um kit de dados", "Computador", "Casaco reforçado"],
        "caracteristicas": [
          {"nome": "Mestre do Improviso", "efeito": "Seus jogadores já botaram você em tanta enrascada que nada mais te surpreende, você se torna imune a condição Despevenido, além disso você é capaz de pensar em uma solução para tudo que parece impossível, você tem vantagem em testes de carisma para convencer alguém de algo que você acabou de pensar."},
          {"nome": "Sombra do Verdadeiro Mestre", "efeito": "Uma vez por missão casualmente seu personagem diz algo que vai virar verdade, você não escolhe o que será isso, tudo que seu personagem falar poderá ser escolhido pelo mestre para isso, porém o mestre deve avisar a frase que se tornou verdade, no momento que ela for dita."}
        ]
      }
    ]
  },
  "capitulo": "Domínio de NEN"
};
