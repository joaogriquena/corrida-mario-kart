const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break

        case random < 0.66:
            result = "CURVA"
            break

        default:
            result = "CONFRONTO"
            break
    }

    return result
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`)

        // Sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco ${block}`)
    }

    // rolar os dados
    let diceResult1 = await rollDice()
    let diceResult2 = await rollDice()

    // teste de habilidade
    let totalTestSkill1 = 0
    let totalTestSkill2 = 0

    if (block === "RETA") {
        totalTestSkill1 = character1.VELOCIDADE + diceResult1
        totalTestSkill2 = character2.VELOCIDADE + diceResult2
    }
    if (block === "CURVA") {
        totalTestSkill1 = character1.MANOBRABILIDADE + diceResult1
        totalTestSkill2 = character2.MANOBRABILIDADE + diceResult2
    }
    if (block === "CONFRONTO") {

    }

}

(async function Main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... 
`)

    await playRaceEngine(player1, player2)
})()