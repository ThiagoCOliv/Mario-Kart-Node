import { getPlayersInRace } from './players-in-race';
import { Player } from './player-interface';

console.log('🏎️  Welcome to Mario Kart Node! 🏁');

const WIN_THRESHOLD = 100;

function rollDice(): number 
{
    return Math.floor(Math.random() * 6) + 1;
}

function getBlock(initRace: boolean): string 
{
    if (initRace) return "RETA";
    
    let result: string;
    let random = Math.random();
  
    switch (true) 
    {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
  
    return result;
}

function logRollResult(character: Player, block: string, diceResult: number, attribute: number): void 
{
    console.log(`${character.name} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

function playRaceEngine(players: Player[]): void 
{
    if (players.length !== 2) 
    {
        console.error("❌ Erro: O jogo requer exatamente 2 jogadores!");
        return;
    }

    let initRace = true;
    const [player1, player2] = players as [Player, Player];
    
    console.log(`\n🏁 CORRIDA: ${player1.name} vs ${player2.name}\n`);

    while (!checkWinner(players)) 
    {
        let block = getBlock(initRace);
        initRace = false;
        console.log(`\n📍 Bloco: ${block}`);

        let diceResult1 = rollDice();
        let diceResult2 = rollDice();

        let totalTestSkill1: number;
        let totalTestSkill2: number;

        switch (block) {
            case "RETA":
                totalTestSkill1 = diceResult1 + player1.speed;
                totalTestSkill2 = diceResult2 + player2.speed;

                logRollResult(player1, "velocidade", diceResult1, player1.speed);
                logRollResult(player2, "velocidade", diceResult2, player2.speed);

                player1.points += totalTestSkill1;
                player2.points += totalTestSkill2;
                break;

            case "CURVA":
                totalTestSkill1 = diceResult1 + player1.maneuverability;
                totalTestSkill2 = diceResult2 + player2.maneuverability;

                logRollResult(player1, "manobrabilidade", diceResult1, player1.maneuverability);
                logRollResult(player2, "manobrabilidade", diceResult2, player2.maneuverability);

                player1.points += totalTestSkill1;
                player2.points += totalTestSkill2;
                break;

            case "CONFRONTO":
                totalTestSkill1 = diceResult1 + player1.power;
                totalTestSkill2 = diceResult2 + player2.power;

                logRollResult(player1, "poder", diceResult1, player1.power);
                logRollResult(player2, "poder", diceResult2, player2.power);

                if (totalTestSkill1 > totalTestSkill2) 
                {
                    player1.points += totalTestSkill1;
                    console.log(`⚔️  ${player1.name} venceu o confronto!`);
                } 
                else if (totalTestSkill2 > totalTestSkill1) 
                {
                    player2.points += totalTestSkill2;
                    console.log(`⚔️  ${player2.name} venceu o confronto!`);
                } 
                else 
                {
                    console.log("⚔️  Confronto empatado!");
                }
                break;
        }

        console.log(`Placar: ${player1.name} ${player1.points} x ${player2.points} ${player2.name}`);
        console.log("-----------------------------");
    }

    declareWinner(players);
}

function checkWinner(players: Player[]): boolean 
{
    return players[0]!.points >= WIN_THRESHOLD || players[1]!.points >= WIN_THRESHOLD;
}

function declareWinner(players: Player[]): void 
{
    const [player1, player2] = players as [Player, Player];
    
    console.log("\n🏆 RESULTADO FINAL:\n");
    console.log(`${player1.name}: ${player1.points} ponto(s)`);
    console.log(`${player2.name}: ${player2.points} ponto(s)\n`);

    if (player1.points > player2.points)
        console.log(`🎉 ${player1.name} venceu a corrida! Parabéns! 🏆\n`);
    else if (player2.points > player1.points)
        console.log(`🎉 ${player2.name} venceu a corrida! Parabéns! 🏆\n`);
    else
        console.log("⚖️  A corrida terminou em empate!\n");
}

(async function main(): Promise<void> 
{
    try 
    {
        const selectedPlayers = await getPlayersInRace();
        playRaceEngine(selectedPlayers);
    } 
    catch (error) 
    {
        console.error("❌ Erro ao executar o jogo:", error);
        process.exit(1);
    }
})();