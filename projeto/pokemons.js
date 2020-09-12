const db = require('./database')
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.table(db.pokemons)

rl.question('O que você gostaria de fazer com seus pokemons? \n 1. Registrar \n 2. Treinar \n', function (instrucao) {
  if (instrucao.toLowerCase() == 'registrar' || instrucao == '1') { // tolowerCase - converte texto p minusculo
    rl.question('Qual o nome do pokemon? \n', function (nomePokemon) {
      rl.question('Qual o nível do pokemon? \n', function (nivelPokemon) {
        rl.question('Qual o tipo do pokemon? \n', function (tipoPokemon) {
          console.log('Nome:', nomePokemon, 'Nível:', nivelPokemon, 'Tipo:', tipoPokemon)
          // Você pode remover esse console.log acima se quiser.
          // Chame AQUI a função que irá receber os valores e registrar o pokemon.

          // Função é mais utilizada quando for para organização ou reutilizar o código(net)
          // Aqui na atv usei a função -table- já utilizada pela prof

          const pokemon =
          {
            id: db.pokemons.length + 1,
            nome: nomePokemon,
            nivel: parseInt(nivelPokemon),
            tipo: tipoPokemon.split(',')  // Split serve para dividir um string por um caractere
          }
          db.pokemons.push(pokemon)
          console.table(db.pokemons) // chamar a função que a prof ja criou lá em cima. 

          rl.close()
        });
      });
    });
  } else if (instrucao.toLowerCase() == 'treinar' || instrucao == '2') { 
    rl.question('Qual o ID do pokemon? \n', function (idPokemon) {
      rl.question('Quantos níveis quer adicionar? \n', function (niveisPokemon) {
        console.log('ID:', idPokemon, 'Níveis:', niveisPokemon)
        // Você pode remover esse console.log acima se quiser.
        // Chame AQUI a função que irá receber os valores e treinar o pokemon.

        let pokemon = {}
        for (let i = 0; i < db.pokemons.length; i++) {
          const pokemonItem = db.pokemons[i];
          if (pokemonItem.id == idPokemon) {
            pokemon = pokemonItem
            break
          }
        } 
        pokemon.nivel += parseInt (niveisPokemon)
        if (pokemon.nivel > 100 ) {
          pokemon.nivel = 100
          
        }
        console.table(db.pokemons)
        rl.close()
      });
    });
  }
  else {console.log('opção inválida')}
 // console.log(instrucao)
});
