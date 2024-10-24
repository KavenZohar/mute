import dotenv from "dotenv";
dotenv.config();
import express from 'express';
const app = express();
app.get('/', (req, res) => {
    res.send('Kaven is online!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Project is running on port ${PORT}!`);
});

import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import { imageUrl } from "./images/images.js";

const img = imageUrl;
const token = process.env.TOKEN;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
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
                                            message.reply({embeds: [errorEmbed(`Hình như sếp chưa thêm quyền quản lý role cho em thì phải 🥹 hoặc chưa để role em cao hơn.`)]});
                                        });
                            const emBed = new EmbedBuilder()
                                        .setColor('#00BEDC')
                                        .setDescription(`Đã nhốt đồng chí <@${user.user.id}> vào tù 🫡 vì gay.`);
                            await message.channel.send({embeds: [emBed]});
                            setTimeout( async () => {
                                        await user.roles.add(roles);
                                        await user.roles.remove(role);
                                    }, 3600000);
                        }
                    }
                } else {
                    return await message.reply({embeds: [await errorEmbed("Không tìm thấy role để mute thưa sếp 😗 ")]});
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            return await message.reply({embeds: [await errorEmbed("Xin lỗi đồng chí không có quyền dùng lệnh này 😬")]});
        }
    }

    if(content.startsWith('?gx') || content.startsWith('<@919937221765775360> gx') || content.startsWith('<@919937221765775360>gx')) {
        let random = Math.floor(Math.random() * img.length) + 1;
        const image = img[random];
        try {
            const emBed = new EmbedBuilder()
                .setColor('#00BEDC')
                .setImage(image);
            await message.channel.send({ embeds: [emBed] }).catch((error) => {
                console.error(error);
                message.reply({embeds: [errorEmbed("Không có quyền gửi ảnh vào trong này 🌚")]});
            });
          } catch (error) {
            console.error('Error sending image:', error);
          }
    }


});

async function errorEmbed(content) {
    let emBed = new EmbedBuilder()
        .setColor('Red')
        .setDescription(content);
    return emBed;
}

client.login(token);