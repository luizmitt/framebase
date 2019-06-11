# Clonar projeto

```bash
git clone https://gitlab.com/sistemaspmm/thupan/projeto
cd projeto
```
# Configuração Inicial

```bash
npm run build
```

# Rodar o projeto na linha de comando 
### NOTA: agora é opcional, npm run build ou executar gulp já conecta com o phpServer.

```bash
php -elwsS localhost:9000 -t public
```

# Rodar o projeto com docker

```bash
docker-composer up 
```
