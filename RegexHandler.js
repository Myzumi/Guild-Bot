const RegexHandler = {};
// file deepcode ignore RegExpBadCharRange: <Everything works?>
RegexHandler.regex_guildchat = /^Guild > (\[.*?\])*.*? ([\w\d]{2,17}).*?( \[.*?\])*.*?: (\w*[A-z0-9_ \.\,;:\-_\/]{1,10000})*$/i;
RegexHandler.regex_officerchat = /^Officer > (\[.*?\])*.*? ([\w\d]{2,17}).*?( \[.*?\])*.*?: (\w*[A-z0-9_ \.\,;:\-_\/]{1,10000})*$/i;
RegexHandler.regex_lobbyjoin = /^(\[.*?\])*.*? ([\w\d]{2,17}).*?( \[.*?\])*.*? joined the lobby!/;
module.exports = RegexHandler;
