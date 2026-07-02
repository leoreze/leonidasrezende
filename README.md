# Leonidas Rezende Landing + Admin Marketplace v10

Atualização v10:
- Templates agora aceitam upload de arquivo `.zip` no admin.
- O backend salva o ZIP em `/frontend/uploads/templates/`.
- O backend descompacta o template em `/frontend/templates/<slug>/`.
- O campo `Preview / demo URL` é preenchido automaticamente com o `index.html` encontrado.
- O campo `Download URL` é preenchido automaticamente com o ZIP salvo.
- Segmentos foram simplificados para: Nome do segmento, Slug, Status e Descrição.
- Produtos foram simplificados para: Título, Slug, Segmento, Status e Descrição.
- `.env` não incluído no ZIP.

Local:
```bash
cp backend/.env.example backend/.env
npm run install:all
npm run dev
```

Exemplo `backend/.env` local:
```env
ADMIN_EMAIL=leoreze@gmail.com
ADMIN_PASSWORD=admin123
ADMIN_JWT_SECRET=troque-por-um-segredo-longo-local
```

Fluxo do template com live demo:
1. Entre em `/admin`.
2. Vá em Templates.
3. Preencha Título e Slug.
4. Envie o arquivo `.zip` no campo `Preview / demo URL`.
5. O sistema descompacta o template e preenche a URL da demo automaticamente.
6. Salve o template.
7. A demo abre em `/demo/<slug>`.


## Dados do marketplace local

Os cadastros feitos no admin agora são salvos em `marketplace-data/` por padrão, não mais diretamente nos arquivos seed de `data/`. Isso evita perder produtos, segmentos e templates quando uma nova versão do ZIP for extraída por cima do projeto.

Você também pode definir uma pasta própria no `backend/.env`:

```env
MARKETPLACE_DATA_DIR=C:/Users/Leoni/leonidasrezende-marketplace-data
```

Os arquivos dentro de `data/` servem apenas como conteúdo inicial/seed quando ainda não existe cadastro persistente.
