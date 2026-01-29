# 🔄 Guia de Migração - Passo a Passo

## Como Completar Sua Aplicação Modular

Este guia vai te ajudar a transferir o código do arquivo monolítico original para a nova estrutura modular.

---

## ⚡ Início Rápido (5 minutos)

### 1. Teste a Estrutura Atual
1. Abra `index.html` no navegador
2. Abra o Console (F12)
3. Você deve ver: "🎮 Hunter x Hunter RPG Sheet carregado!"
4. A lista de personagens deve aparecer (vazia no início)

### 2. Identifique o que funciona
- ✅ Carregamento de arquivos
- ✅ Estado global
- ✅ Funções auxiliares
- ✅ Sistema de storage
- ⚠️ Renderização (parcial)
- ❌ Criador de personagem (precisa completar)
- ❌ Ficha completa (precisa completar)

---

## 📋 Checklist de Migração

### Fase 1: Dados (Fácil - 15 min)
- [x] Classes Nen - ✅ COMPLETO
- [x] Raças - ✅ COMPLETO
- [x] Inclinações - ✅ COMPLETO
- [x] Skills - ✅ COMPLETO
- [ ] **Antecedentes** - ⚠️ PRECISA COMPLETAR

**Ação**: Complete `/js/data/backgrounds.js` com todos os antecedentes

### Fase 2: Componentes Visuais (Médio - 1-2 horas)
- [ ] **UI Components** - Cole funções que retornam HTML
- [ ] **Character Creation** - Cole todo fluxo de criação
- [ ] **Character Sheet** - Cole renderização da ficha completa

### Fase 3: Lógica (Médio - 1 hora)
- [ ] **Render Function** - Cole função principal render()
- [ ] **Actions** - Cole todas as funções de evento/ação

---

## 🎯 Como Migrar Cada Arquivo

### 1. Completar `/js/data/backgrounds.js`

**Localizar no original:**
```
Linha ~196-223: antecedentes: [
```

**Como fazer:**
1. Abra `indexderecuperacao.txt`
2. Vá para linha 196
3. Copie TODO o array `antecedentes`
4. Cole em `backgrounds.js` substituindo o stub

**Template:**
```javascript
const ANTECEDENTES = [
    { nome: "Amigo dos Animais", ... },
    { nome: "Aristocrata", ... },
    // ... cole TODOS aqui
];
```

---

### 2. Completar `/js/components/ui-components.js`

**O que procurar no original:**
- Funções pequenas que retornam HTML
- Funções auxiliares de renderização
- Componentes reutilizáveis (botões, inputs, cards)

**Exemplos típicos:**
```javascript
function renderNenHexagon() { ... }
function renderAttributeCard() { ... }
function renderSkillRow() { ... }
```

**Como identificar:**
- Buscas úteis: `function render`, `return \``
- Procure funções que NÃO sejam as principais (render, renderCharCreator, etc)
- Copie APENAS componentes pequenos e reutilizáveis

---

### 3. Completar `/js/components/char-creation.js`

**Localizar no original:**
Procure por:
- `state.creatorStep`
- `state.tempChar`
- Lógica de criação passo a passo

**O que copiar:**
1. Toda a função que renderiza o criador (geralmente grande)
2. Funções de navegação entre etapas
3. Funções de validação
4. Lógica de finalização da criação

**Linha aproximada:** ~350-700 (varia)

**Como fazer:**
1. Busque: "function renderCharCreator" OU "CREATOR"
2. Copie toda a função e auxiliares relacionadas
3. Cole em `char-creation.js`

---

### 4. Completar `/js/components/char-sheet.js`

**Localizar no original:**
Procure por:
- Renderização de atributos
- Renderização de vitais (HP, Aura, SAN)
- Renderização de skills
- Renderização de inventário
- Tabs da ficha

**O que copiar:**
1. Função principal de renderização da ficha
2. Renderização de cada seção (atributos, vitals, skills, inventory)
3. Renderização de tabs

**Linha aproximada:** ~700-1100 (varia)

---

### 5. Completar `/js/core/render.js`

**Localizar no original:**
```javascript
function render() {
    const app = document.getElementById('app');
    // ... switch ou if/else entre views
}
```

**O que fazer:**
1. Procure "function render()" no original
2. Copie TODA a função
3. Cole em `render.js` substituindo o stub
4. Verifique se chama as funções certas:
   - `renderCharacterList()` para LIST
   - `renderCharCreator()` para CREATOR
   - `renderCharSheet()` para SHEET

**Linha aproximada:** ~900-1100

---

### 6. Completar `/js/core/actions.js`

**Localizar no original:**
Procure por TODAS as funções que:
- Começam com `update`, `add`, `remove`, `toggle`, `set`, `handle`
- Modificam `state` ou `state.currentChar`
- São chamadas por `onclick=` no HTML

**Exemplos:**
```javascript
function updateSheetAttr(key, delta) { ... }
function addItem() { ... }
function toggleSkillAccordion() { ... }
function handleNenSelection() { ... }
```

**Como fazer:**
1. Vá pro final do arquivo original (depois das funções de render)
2. Copie TODAS as funções de ação/manipulação
3. Cole em `actions.js`

**Linha aproximada:** ~1100-1400

---

## 🔍 Dicas de Busca no Arquivo Original

### Atalhos Úteis
- `Ctrl+F` para buscar
- `Ctrl+G` para ir para linha específica

### Buscas Recomendadas

| O que procurar | Buscar por |
|----------------|------------|
| Componentes UI | `function render` + pequenas |
| Criador | `creatorStep` ou `tempChar` |
| Ficha | `currentChar` + renderização |
| Render principal | `function render() {` |
| Ações | `function update`, `function add` |

---

## ✅ Como Saber se Está Funcionando

### Após cada arquivo completado, teste:

1. **Antecedentes:**
   - Console não deve ter erro de "ANTECEDENTES is not defined"

2. **UI Components:**
   - Componentes visuais devem renderizar corretamente
   - Sem HTML quebrado

3. **Criador:**
   - Clicar em "+ Novo Personagem" deve abrir o criador
   - Deve ter passos funcionais
   - Deve criar personagem ao final

4. **Ficha:**
   - Clicar em personagem deve abrir ficha
   - Atributos, vitais, skills devem aparecer
   - Botões +/- devem funcionar

5. **Render:**
   - Navegação entre telas funciona
   - Sem tela em branco

6. **Actions:**
   - Todos os botões/cliques funcionam
   - Mudanças são salvas

---

## 🚨 Troubleshooting

### Erro: "X is not defined"
**Solução:** A variável/função está em outro arquivo. Verifique ordem de carregamento no `index.html`

### Erro: "Cannot read property of undefined"
**Solução:** Provavelmente `state.currentChar` está null. Adicione verificação.

### Render não funciona
**Solução:** 
1. Verifique console
2. Veja se função render() está completa
3. Teste chamar `render()` manualmente no console

### Botões não fazem nada
**Solução:**
1. Verifique se ações estão em `actions.js`
2. Veja se funções tem mesmo nome que `onclick=`
3. Verifique console para erros

---

## 📊 Progresso Esperado

| Fase | Tempo | Dificuldade | Resultado |
|------|-------|-------------|-----------|
| Dados | 15 min | ⭐ Fácil | Todas constantes carregam |
| UI Components | 30 min | ⭐⭐ Médio | Visual melhora |
| Criador | 45 min | ⭐⭐⭐ Difícil | Pode criar chars |
| Ficha | 45 min | ⭐⭐⭐ Difícil | Ficha completa |
| Render | 15 min | ⭐⭐ Médio | Navegação funciona |
| Actions | 30 min | ⭐⭐ Médio | Tudo interativo |

**Total:** ~3 horas de trabalho focado

---

## 🎉 Quando Terminar

Você terá:
- ✅ App totalmente funcional
- ✅ Código organizado e modular
- ✅ Fácil manutenção
- ✅ Rápido para editar
- ✅ Pronto para Google AI Studio

**Próximos passos:**
1. Delete o arquivo monolítico original
2. Faça commit dos arquivos modulares
3. Aproveite a edição rápida!

---

## 💡 Precisa de Ajuda?

Se ficar preso:
1. Veja os comentários TODO nos arquivos
2. Releia este guia
3. Teste uma parte por vez
4. Use console.log() para debug

Boa sorte! 🚀
