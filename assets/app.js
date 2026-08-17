/* ============================================================
   FUNÇÕES COMPARTILHADAS — usadas em várias páginas
   ============================================================ */

// Gera um código tipo "DUNAS-7F2K" e garante que não existe ainda.
async function gerarCodigoAcessoUnico() {
  const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sem O/0/I/1 pra evitar confusão
  for (let tentativa = 0; tentativa < 15; tentativa++) {
    let sufixo = "";
    for (let i = 0; i < 5; i++) {
      sufixo += caracteres[Math.floor(Math.random() * caracteres.length)];
    }
    const codigo = `DUNAS-${sufixo}`;
    const { data } = await supabaseClient
      .from("investigadores")
      .select("codigo")
      .eq("codigo", codigo)
      .maybeSingle();
    if (!data) return codigo;
  }
  throw new Error("Não foi possível gerar um código único, tente de novo.");
}

// Busca um investigador pelo código de acesso (não sensível a maiúsculas/minúsculas).
async function buscarInvestigadorPorCodigo(codigo) {
  const codigoNormalizado = codigo.trim().toUpperCase();
  const { data, error } = await supabaseClient
    .from("investigadores")
    .select("*")
    .eq("codigo", codigoNormalizado)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// Busca todos os investigadores, pro painel da mestre.
async function listarInvestigadores() {
  const { data, error } = await supabaseClient
    .from("investigadores")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

// Cria um novo investigador. Retorna a linha criada.
async function criarInvestigador(dados) {
  const { data, error } = await supabaseClient
    .from("investigadores")
    .insert(dados)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Atualiza um investigador existente (identificado pelo código).
async function atualizarInvestigador(codigo, dados) {
  const { data, error } = await supabaseClient
    .from("investigadores")
    .update(dados)
    .eq("codigo", codigo)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Guarda o código de acesso no navegador do jogador, pra ele não
// precisar digitar de novo toda hora (fica só na memória do navegador dele).
function salvarCodigoLocal(codigo) {
  localStorage.setItem("dunas_codigo_acesso", codigo);
}
function pegarCodigoLocal() {
  return localStorage.getItem("dunas_codigo_acesso");
}
function limparCodigoLocal() {
  localStorage.removeItem("dunas_codigo_acesso");
}

// Lê um arquivo de imagem e devolve uma versão redimensionada em base64,
// pra não salvar fotos gigantes no banco de dados.
function redimensionarImagem(arquivo, tamanhoMaximo = 300) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let largura = img.width;
        let altura = img.height;
        if (largura > altura && largura > tamanhoMaximo) {
          altura = Math.round((altura * tamanhoMaximo) / largura);
          largura = tamanhoMaximo;
        } else if (altura > tamanhoMaximo) {
          largura = Math.round((largura * tamanhoMaximo) / altura);
          altura = tamanhoMaximo;
        }
        const canvas = document.createElement("canvas");
        canvas.width = largura;
        canvas.height = altura;
        canvas.getContext("2d").drawImage(img, 0, 0, largura, altura);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    leitor.onerror = reject;
    leitor.readAsDataURL(arquivo);
  });
}


function mostrarMensagem(elemento, texto, tipo = "erro") {
  elemento.textContent = texto;
  elemento.className = `mensagem ${tipo}`;
  elemento.style.display = texto ? "block" : "none";
}

// SVG das ondas decorativas, usado no rodapé de toda página.
const ONDAS_SVG = `
<svg viewBox="0 0 1440 220" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="width:100%;height:180px;display:block;">
  <path d="M0,90 C240,150 480,30 720,70 C960,110 1200,40 1440,90 L1440,220 L0,220 Z" fill="#6BB9D6" opacity="0.55"/>
  <path d="M0,130 C240,180 480,110 720,140 C960,170 1200,110 1440,140 L1440,220 L0,220 Z" fill="#2C6E91"/>
</svg>`;

function inserirOndas() {
  const container = document.createElement("div");
  container.className = "ondas";
  container.innerHTML = ONDAS_SVG;
  document.body.appendChild(container);
}
