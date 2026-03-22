import * as readline from 'readline';
import { Player } from './player-interface';
import { players } from './players';

function createInterface(): readline.Interface 
{
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

async function choosePlayer(availablePlayers: Player[]): Promise<Player> 
{
    const rl = createInterface();
    
    return new Promise((resolve) => {
        console.log('Jogadores disponíveis: ' + availablePlayers.map(p => p.name).join(' - '));
        
        rl.question('Escolha um desses jogadores: ', (resposta: string) => {
            const playerChosen = availablePlayers.find(
                player => player.name.toLowerCase() === resposta.toLowerCase()
            );
            
            if (!playerChosen) 
            {
                rl.close();
                console.log('❌ Jogador não encontrado. Por favor, escolha um válido.');
                return resolve(choosePlayer(availablePlayers));
            }
            
            console.log(`✅ Você escolheu ${playerChosen.name}!`);
            rl.close();
            resolve(playerChosen);
        });
    });
}

async function definePlayersInRace(availablePlayers: Player[]): Promise<Player[]> 
{
    const playersSelected: Player[] = [];
    
    console.log('\n🏎️  SELEÇÃO DE JOGADORES\n');
    
    const player1 = await choosePlayer(availablePlayers);
    playersSelected.push(player1);
    
    const player2 = await choosePlayer(availablePlayers.filter(player => !playersSelected.includes(player)));
    playersSelected.push(player2);
    
    return playersSelected;
}

export async function getPlayersInRace(): Promise<Player[]> 
{
    return definePlayersInRace(players);
}