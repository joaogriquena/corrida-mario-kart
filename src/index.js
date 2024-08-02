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

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`)

        // Sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco ${block}`)

        // rolar os dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        // teste de habilidade
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0

        if (block === "RETA") {
            totalTestSkill1 = character1.VELOCIDADE + diceResult1
            totalTestSkill2 = character2.VELOCIDADE + diceResult2

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE)
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE)
        }

        if (block === "CURVA") {
            totalTestSkill1 = character1.MANOBRABILIDADE + diceResult1
            totalTestSkill2 = character2.MANOBRABILIDADE + diceResult2

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE)
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE)
        }

        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER
            let powerResult2 = diceResult2 + character2.PODER

            console.log(`${character1.NOME} cronfotou com ${character2.NOME}!🥊🥊`)

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER)
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER)

            character2.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0

            character1.PONTOS -= powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0

            console.log(powerResult1 === powerResult2 ? 'Empate!' : '')

        }

        //verificando o vencedor

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} ganhou a rodada!`)
            character1.PONTOS++
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} ganhou a rodada!`)
            character2.PONTOS++
        }

        console.log("______________________________________")
    }
}

(async function Main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... `)

    await playRaceEngine(player1, player2)
})()