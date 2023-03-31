# App

GymPass style app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter o seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

---

# Test E2E

- [ ] Criar pasta com o nome vitest-environment-prisma dentro da pasta prisma
- [ ] Iniciar package.json
- [ ] Criar arquivo prisma-test-environment e colar o seguinte codigo
```ts
import { Environment } from "vitest";

export default <Environment> {
  name: 'prisma',
  async setup() { //Executa antes de cada arquivo dos test
    console.log('setup')

    return {
      teardown() { //executa apos os testes executarem (para cada arquivo de test)
        console.log('teardown')
      } 
    }
  }
}
```
- [ ] Na pasta vite.config.ts colar o seguinte codigo
```ts
test: {
  environmentMatchGlobs: [
    ['src/http/controllers/**', 'prisma']
  ]
}
```
- [ ] Pelo terminal entrar na pasta prisma/vitest-environment-prisma e rodar o comando ```cmd npm link```
- [ ] Voltar na pasta principal e rodar o comando ```cmd npm link vitest-environment-prisma```

---

## Poque todo este processo ?
 
- Para utilizar diferentes ambientes no vitest dentro do nosso projeto, é necessário seguir um processo específico. A versão atual do vitest não oferece a opção de criar ambientes diretamente dentro do projeto. Para contornar essa limitação, é preciso criar um pacote npm com o nome "vitest-environment-{nome}" para cada ambiente desejado. Dessa forma, podemos utilizar diferentes ambientes em nosso projeto, mesmo sem uma opção nativa do vitest para criar ambientes internos.

---

### Resumo
-Este processo precisa ser feito pois na versão atual do vitest ele ainda não tem uma opção para criar environments dentro do nosso projeto, só podemos utilizar um environments diferente se a gente criar um pacote npm que tenha o nome vitest-environment-{name} então essa é uma maneira de "burlar"