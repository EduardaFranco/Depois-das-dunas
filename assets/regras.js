(function () {

const ATRIBUTOS = [
  { chave: "for", label: "FOR", nome: "Força" },
  { chave: "pre", label: "PRE", nome: "Presença" },
  { chave: "int", label: "INT", nome: "Intelecto" },
  { chave: "agi", label: "AGI", nome: "Agilidade" },
  { chave: "vig", label: "VIG", nome: "Vigor" },
];

const PERICIAS = [
  { chave: "investigacao", nome: "Investigação", atributo: "int" },
  { chave: "percepcao", nome: "Percepção", atributo: "pre" },
  { chave: "furtividade", nome: "Furtividade", atributo: "agi" },
  { chave: "persuasao", nome: "Persuasão", atributo: "pre" },
  { chave: "pontaria", nome: "Pontaria", atributo: "agi" },
  { chave: "pilotagem", nome: "Pilotagem", atributo: "agi" },
  { chave: "medicina", nome: "Medicina", atributo: "int" },
  { chave: "tecnologia", nome: "Tecnologia", atributo: "int" },
  { chave: "luta", nome: "Luta", atributo: "for" },
  { chave: "fortitude", nome: "Fortitude", atributo: "vig" },
  { chave: "conhecimento", nome: "Conhecimento", atributo: "int" },
  { chave: "sobrevivencia", nome: "Sobrevivência", atributo: "vig" },
];

const ESPECIALIZACOES = [
  {
    nome: "Paisana",
    periciaBonus: "furtividade",
    descricao: "Seguir pessoas, entrar em lugares sem ser percebido e se disfarçar são sua especialidade.",
  },
  {
    nome: "Paparazzi",
    periciaBonus: "percepcao",
    descricao: "Observar pessoas e registrar detalhes que ninguém mais vê é uma ótima habilidade.",
  },
  {
    nome: "Matrimonial",
    periciaBonus: "persuasao",
    descricao: "Descobrir traições e descobrir relacionamentos, sabe bem como persuadir alguém atrás de informações!",
  },
  {
    nome: "Investigador",
    periciaBonus: "investigacao",
    descricao: "Encontrar pistas e reconstruir acontecimentos é o trabalho de um investigador.",
  },
  {
    nome: "Tecnologia",
    periciaBonus: "tecnologia",
    descricao: "Invadir sistemas, celulares, computadores e tudo que existe de tecnológico por aí.",
  },
  {
    nome: "Rastreador",
    periciaBonus: "sobrevivencia",
    descricao: "Seguir rastros, encontrar pessoas e se orientar em lugares difíceis.",
  },
  {
    nome: "Intimidador",
    periciaBonus: "luta",
    descricao: "Tem experiência em situações de confronto e interrogatórios mais agressivos."
  },
];

const REGRAS = {
  vidaBase: 10,
  sanidadeBase: 10,
  erosoesBase: 0,

  pontosAtributosBase: 10, // pontos pra distribuir entre os 5 atributos
  maxPorAtributo: 5, // valor máximo em um atributo só
  bonusAtributoEspecializacao: 2, // pontos extras de atributo por ter especialização

  numeroPericiasEscolhidas: 3, // quantas perícias (além da de especialização) ganham bônus
};

window.REGRAS_JOGO = { ATRIBUTOS, PERICIAS, ESPECIALIZACOES, REGRAS };

})();
