//FEATURES:
    //Ranks for games
    //Multiple games
    //Player look up


const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

const fs = require('fs');

const cheerio = require('cheerio');
const request = require('request');

const token = config.token;

const PREFIX = '#';

var data1 = fs.readFileSync('scores.json');
var scores = JSON.parse(data1);
var data2 = fs.readFileSync('ranks.json');
var ranks = JSON.parse(data2);

client.on('ready', ()=>{
    console.log('Bot is online');
})

client.on('message', message => {

    if(!message.content.includes(PREFIX)){
        return;
    }

    let args = message.content.substring(PREFIX.length).split(" ");

    var userId = message.author.id;
    if (!scores[userId]) { //this checks if data for the user has already been created
        scores[userId] = {wins: 0, losses: 0, games: 0, rank: ""}; //if not, create it
        fs.writeFileSync('scores.json', JSON.stringify(scores, null, 2));
        console.log('New User Created');
    }
    switch(args[0]){
        case 'win':
            updateScore(userId, 'wins', 1);
            const wEmbed = new Discord.RichEmbed()
            .setTitle('Scores - '+ message.author.username)
            .setColor('0x1fe5ff')
            .addField('Wins', scores[userId].wins, true)
            .addField('Losses', scores[userId].losses, true)
            .addField('Games', scores[userId].games, true);

            message.channel.sendEmbed(wEmbed);
            break;
        case 'loss':
            updateScore(userId, 'losses', 1);
            const lEmbed = new Discord.RichEmbed()
            .setTitle('Scores - '+ message.author.username)
            .setColor('0x1fe5ff')
            .addField('Wins', scores[userId].wins, true)
            .addField('Losses', scores[userId].losses, true)
            .addField('Games', scores[userId].games, true);

            message.channel.sendEmbed(lEmbed);
            break;
        case 'setRank':
            if(args[1] === 'bronze'){

            }
            else if(args[1] === 'silver'){
                
            }
            else if(args[1] === 'gold'){
                
            }
            else if(args[1] === 'platinum'){
                
            }
            else if(args[1] === 'diamond'){
                
            }
            else if(args[1] === 'champ'){
                
            }
            break;
        case 'stats':
            const sEmbed = new Discord.RichEmbed()
            .setTitle('Scores - '+ message.author.username)
            .setColor('0x1fe5ff')
            .addField('Rank', scores[userId].rank, true)
            .addField('Wins', scores[userId].wins, true)
            .addField('Losses', scores[userId].losses, true)
            .addField('Win %', scores[userId].wins / scores[userId].games, true)
            .addField('Games', scores[userId].games, true);

            message.channel.sendEmbed(sEmbed);
            break;
        case 'reset':
            resetScore(userId);
            const rEmbed = new Discord.RichEmbed()
            .setTitle('Scores - '+ message.author.username)
            .setColor('0x1fe5ff')
            .addField('Wins', scores[userId].wins, true)
            .addField('Losses', scores[userId].losses, true)
            .addField('Games', scores[userId].games, true);

            message.channel.sendEmbed(rEmbed);
            break;
        case 'help':
            break;
    }
});

function updateScore(user, key, value){
    if(key === 'wins'){
        scores[user].wins += 1;
        scores[user].games += 1;
    }
    else if(key === 'losses'){
        scores[user].losses += 1;
        scores[user].games += 1;
    }
    var data = JSON.stringify(scores, null, 2);
    fs.writeFile('scores.json', data, finished);
    function finished(){
        console.log('Score Updated');
    }
}

function resetScore(user){
    scores[user].wins = 0;
    scores[user].losses = 0;
    scores[user].games = 0;
    var data = JSON.stringify(scores, null, 2);
    fs.writeFile('scores.json', data, finished);
    function finished(){
        console.log('Score Reset');
    }
}

function image(message){

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "Cute Tiger",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
        $ = cheerio.load(responseBody);
 
        var links = $(".image a.link");
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        //console.log(urls);
 
        if (!urls.length) {   
            return;
        }
 
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
}

client.login(token);