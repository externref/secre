import { GuildMember} from "discord.js";



export function isBannable(author: GuildMember,target: GuildMember): boolean{
    if (!(author.roles.highest >target.roles.highest)) return false
    if (target.id == target.guild.ownerId) return false
    return true
}

