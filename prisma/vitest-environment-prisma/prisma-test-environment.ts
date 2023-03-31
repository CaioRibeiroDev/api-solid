import { Environment } from "vitest";

export default <Environment> {
  name: 'prisma',
  async setup() { //Executa antes de cada arquivo dos test
    console.log('setup')

    return {
      async teardown() { //executa apos os testes executarem (para cada arquivo de test)
        console.log('teardown')
      } 
    }
  }
}