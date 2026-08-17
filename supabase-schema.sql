-- ============================================================
-- Rode este script inteiro no Supabase, em: SQL Editor > New query
-- ============================================================

-- 1) Tabela que guarda as fichas dos investigadores
create table if not exists investigadores (
  id uuid primary key default gen_random_uuid(),
  codigo text unique not null,
  nome text,
  idade text,
  especializacao text,
  historia text,
  memorias text,
  inventario text,
  avatar text default '',
  vida integer default 10,
  sanidade integer default 10,
  erosoes integer default 0,
  atributos jsonb default '{}'::jsonb,
  pericias jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

-- 2) Liga a segurança em nível de linha (RLS)
alter table investigadores enable row level security;

-- 3) Regras de acesso.
--    Aviso importante: pra manter o site simples (sem login pra cada
--    jogador), qualquer pessoa com o link do seu site consegue ler,
--    criar e atualizar fichas usando a "chave anônima" pública. O que
--    protege as fichas na prática é o código de acesso (tipo uma senha)
--    e a senha do painel da mestre — não é uma segurança de nível
--    bancário, mas é o suficiente pra um grupo de amigos jogando RPG.
--    Se um dia você quiser algo mais robusto, dá pra evoluir isso com
--    Supabase Auth de verdade.

create policy "qualquer um pode ler investigadores"
  on investigadores for select
  using (true);

create policy "qualquer um pode criar investigador"
  on investigadores for insert
  with check (true);

create policy "qualquer um pode atualizar investigador"
  on investigadores for update
  using (true);
