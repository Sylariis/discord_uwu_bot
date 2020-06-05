//discord bot using node.js
//level up, item, crafting stats, bossing/mobbing and pvp functionalities
//uwu ugu

var Discord = require('discord.io');
var auth = require('./auth.json');
var Datastore = require('nedb');
// Configure logger settings
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
});

 var user_db = new Datastore({ filename: 'data/user_data.txt' , autoload: true });
 user_db.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
});
  //user_db.insert({test:"test",test2:"test2"});

var defaultmsg= "ugu hewwo uwuwuuw uw aus dfljf";
var boss_hp;
var boss_flag;
var boss_mood;
var hp_msg_string="aa";
var already_regd;

bot.editRole({
	permissions: {
    TEXT_READ_MESSAGES: true,
    TEXT_SEND_MESSAGES: true,
    TEXT_SEND_TSS_MESSAGES: true
	}
});

bot.on('message', function (user, userID, channelID, message, evt) {

    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 4) == '!uwu') {
        var args = message.substring(4).split(' ');
        //var split_message = args[0].split(" ", 2);
        console.log(args[0]);
        console.log(args[1]);
        console.log(args[2]);
        var cmd = args[1];
        var cmd2= args[2];

        args = args.splice(1);

        user_db.count({user:user},function(err,count){
          console.log(" count");
          console.log(count);
        })

        switch(cmd) {
            // !ugu
            case 'uwu':
                bot.sendMessage({
                    to: channelID,
                    message: defaultmsg
                });
                break;

            case 'whaletest':
                boss_hp=100;
                boss_flag=1;
                boss_mood=1;
                var message_string="HP:" + String(boss_hp) + " 100";
                bot.sendMessage({
                    to: channelID,
                    message: 'HOLY FUCKING SHIT ITS A WHALE KILL IT' ,
                });
                bot.sendMessage({
                    to: channelID,
                    message: message_string
                });
                bot.uploadFile({
                    to: channelID,
                    file: 'whale_test.png'
                });
                break;
            case 'attackboss100':
              //test command
              boss_flag=0;
              boss_mood=0;
              bot.sendMessage({
                to: channelID,
                message: 'test command autokilled whale'
              });
              user_db.update({userID:userID},{$inc:{EXP:10}},function(){
                //aaAAAAAAAAAAAAAAAA
              });
              break;
            case 'attackboss':
                if (boss_flag){
                  boss_hp=boss_hp-Math.floor(Math.random() * 10);
                  if(boss_mood==1){
                    boss_mood=2;
                    bot.sendMessage({
                      to: channelID,
                      message: 'HE ANGEY!'
                    });
                  }
                  var hp_msg_string ='HP:' + String(boss_hp) + '/ 100';
                  if(boss_hp<=0){
                    boss_flag=0;
                    boss_mood=0;
                    bot.sendMessage({
                      to: channelID,
                      message: 'wow! u killed him uwu wuwu wuwu wuwuw ug unug uang uans ungugng ung ugnugg ungu g'
                    });
                    //send out exp
                    db.update({userID:userID},{$inc:{EXP:10}},function(){
                      //aaAAAAAAAAAAAAAAAA
                    });
                    break;
                  }

                  bot.sendMessage({
                    to: channelID,
                    message: hp_msg_string
                  });
                  bot.uploadFile({
                    to: channelID,
                    file: 'whale_test_angey.png'
                  });
                } else {
                  bot.sendMessage({
                    to: channelID,
                    message: 'thewes no boss rn sowwy'
                  });
                }
                break;
                case 'tameboss':
                    if(boss_mood==2){
                      bot.sendMessage({
                        to: channelID,
                        message: 'sowwwyy angey bosses cannot be tamed uwu ugu'
                      });
                    }
                    break;
                case 'realwhaletest':
                    if(boss_flag){
                      bot.sendMessage({
                          to: channelID,
                          message: 'Sowwyyy thewes alweady a boss, pwease kiww it befowe u spawn another boss uwu'
                      });
                      break;
                    }
                    boss_hp=100;
                    boss_flag=2;
                    bot.sendMessage({
                        to: channelID,
                        message: 'HOLY FUCKING SHIT ITS A WHALE KILL IT'
                    });
                    bot.sendMessage({
                        to: channelID,
                        message: 'HP:100/100'
                    });
                    bot.uploadFile({
                        to: channelID,
                        file: 'realwhale_test.png'
                    });
                    break;
                case 'attackboss':
                    if (boss_flag){
                      bot.sendMessage({
                        to: channelID,
                        message: 'HE ANGEY'
                      });
                      bot.uploadFile({
                        to: channelID,
                        file: 'realwhale_test_angey.png'
                      });
                    } else {
                      bot.sendMessage({
                        to: channelID,
                        message: 'thewes no boss rn sowwy'
                      });
                    }
                    break;

            case 'register':
              user_db.find({user:user},function(err,recieved_user_data){
                if(err){
                  //error response
                  console.log(err);
                }
                console.log(recieved_user_data);
                console.log(recieved_user_data.length);
                if(recieved_user_data.length){
                    already_regd=1;
                    console.log("test1");
                    console.log(already_regd);
                  }

                  console.log("test2");
                  console.log(already_regd);
                  if(already_regd==1){
                    bot.sendMessage({
                      to: channelID,
                      message: 'Sowwy, u hav alweady wegistered owo \n hewe awe uw stats uwu'
                    });
                  }else if(cmd2=="piawate"||cmd2=="tiefuwu"||cmd2=="awchewe"||cmd2=="wawwiowo"||cmd2=="magiwic"){
                  bot.sendMessage({
                    to: channelID,
                    message: 'Congwats,' + user + '! \n uwu wewcom our new ' + cmd2 +"!" +" \ni hope u enjoy uw stay uwu ugu owo"
                  });
                  user_db.insert({user:user, userID: userID, level:1,class:cmd2, HP_MAX:100, HP_CURR:100, MP_MAX:100, MP_CURR:100, EXP:0, Hit_boss:0 });
                }else{
                  bot.sendMessage({
                    to: channelID,userID,
                    message: 'pwease choose out of piawate, tiefuwu, awchewe, magiwic and wawwiowo using !uwu register [class]'
                  });
                }
                });
                //console.log(recieved_user_data);
              break;

            case 'stats':
            user_db.find({user:user},function(err,recieved_user_data){
                if(err){
                  //error response
                  console.log(err)
                }
                console.log(recieved_user_data[0].HP);
                console.log(recieved_user_data);
                var lastupdate=recieved_user_data.length -1;
                bot.sendMessage({
                  to: channelID,
                  message: 'uwu hewe awe uw stats master-chan ugu uwu owo *nuzzles u* ' +  '\nuser:' + recieved_user_data[lastupdate].user + '\nClass:'+ recieved_user_data[lastupdate].class +'\n HP:' + recieved_user_data[lastupdate].HP_CURR + "/" + recieved_user_data[lastupdate].HP_MAX + '\n Level:' + recieved_user_data[lastupdate].level + "\n EXP:" + recieved_user_data[lastupdate].EXP
                });
            });
            break;

            default:
                bot.sendMessage({
                  to:channelID,
                  message: 'uwu whats this? *nuzzles ur message* sowwy i dont wecognise this command'
                })
            break;
            // Just add any case commands if you want to..
         }
     }
});
console.log("oongie");
