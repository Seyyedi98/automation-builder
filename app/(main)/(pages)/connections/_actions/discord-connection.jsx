"use server";

import prisma from "@/lib/client";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";

export const onDiscordConnect = async (
  channel_id,
  webhook_id,
  webhook_name,
  webhook_url,
  id,
  guild_name,
  guild_id
) => {
  // check if webhook id params set
  if (webhook_id) {
    //check if webhook exists in database with userid
    const webhook = await prisma.discordWebhook.findFirst({
      where: {
        userId: id,
      },
      include: {
        connections: {
          select: {
            type: true,
          },
        },
      },
    });

    // if webhook does not exist for this user
    if (!webhook) {
      //create new webhook
      await prisma.discordWebhook.create({
        data: {
          userId: id,
          webhookId: webhook_id,
          channelId: channel_id,
          guildId: guild_id,
          name: webhook_name,
          url: webhook_url,
          guildName: guild_name,
          connections: {
            create: {
              userId: id,
              type: "Discord",
            },
          },
        },
      });
    }

    // if webhook exists return check for duplicate
    if (webhook) {
      //check if webhook exists for target channel id
      const webhook_channel = await prisma.discordWebhook.findUnique({
        where: {
          channelId: channel_id,
        },
        include: {
          connections: {
            select: {
              type: true,
            },
          },
        },
      });

      // if no webhook for channel create new webhook
      if (!webhook_channel) {
        await prisma.discordWebhook.create({
          data: {
            userId: id,
            webhookId: webhook_id,
            channelId: channel_id,
            guildId: guild_id,
            name: webhook_name,
            url: webhook_url,
            guildName: guild_name,
            connections: {
              create: {
                userId: id,
                type: "Discord",
              },
            },
          },
        });
      }
    }
  }
};

export const getDiscordConnectionUrl = async () => {
  const user = await currentUser();
  if (user) {
    const webhook = await prisma.discordWebhook.findFirst({
      where: {
        userId: user.id,
      },
      select: {
        url: true,
        name: true,
        guildName: true,
      },
    });

    return webhook;
  }
};

export const postContentToWebHook = async (content, url) => {
  console.log(content);
  if (content != "") {
    const posted = await axios.post(url, { content });
    if (posted) {
      return { message: "success" };
    }
    return { message: "failed request" };
  }
  return { message: "String empty" };
};