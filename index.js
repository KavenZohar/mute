import dotenv from "dotenv";
dotenv.config();
import {Client, GatewayIntentBits} from "discord.js";
import express from 'express';

const token = process.env.TOKEN;
const app = express();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

let timeOut;

app.get('/', (req, res) => {
    res.send('Kaven is online!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Project is running on port ${PORT}!`);
});

const roleName = "lo gạy";
const modRole = "supa mod";

client.on('ready', () => {
    console.log(`${client.user.tag} is ready!`);
});

client.on('messageCreate', async (message) => {
    if(message.author.bot) return;

    const member = message.guild.members.cache.get(message.author.id);
    let ROLES;
    if (member) {
        ROLES = member.roles.cache.find(role => role.name === modRole);
    }

    const content = message.content.toLowerCase();
    if(content.startsWith('?gay') || content.startsWith('<@919937221765775360> gay') || content.startsWith('<@919937221765775360>gay')) {
        if (ROLES) {
            try {
                const role = message.guild.roles.cache.find(role => role.name === roleName);
    
                if (role) {
                    for (const user of message.mentions.members.values()) {
                        const roles = user.roles.cache.filter(role => role.name !== '@everyone');
                        if (!user.user.bot) {
                            await user.roles.remove(roles);
                            await user.roles.add(role).catch((error) => {
                                            console.error(error);
                                            message.reply(`Hình như sếp chưa thêm quyền quản lý role cho em thì phải :tutu:`);
                                        });
                            await message.channel.send(`Đã nhốt đồng chí <@${user.user.id}> vào tù :heheboi:.`);
                            setTimeout( async () => {
                                        await user.roles.add(roles);
                                        await user.roles.remove(role);
                                    }, 10000);
                        }
                    }
                } else {
                    message.reply("Không tìm thấy role để mute thưa sếp :huh: ");
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            await message.reply("Xin lỗi đồng chí không có quyền dùng lệnh này");
            return;
        }
    }
});

client.login(token);