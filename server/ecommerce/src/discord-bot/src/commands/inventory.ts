import {
  AutocompleteInteraction,
  CacheType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { SlashCommand } from './slash-command';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/utils/entities/product.entity';
import { DiscordEmbedColors } from '../discord-embeds/colors';
import { IProductsService } from 'src/spi/products';

type Config = {
  usersService: UsersService;
  productsService: IProductsService;
};

export class InventoryCommand implements SlashCommand {
  private readonly usersService: UsersService;
  private readonly productsService: IProductsService;

  constructor(config: Config) {
    this.usersService = config.usersService;
    this.productsService = config.productsService;
  }

  public readonly config = new SlashCommandBuilder()
    .setName('inventory')
    .setDescription(
      'Displays the items that you have listed for sale on the website',
    );

  public execute = async (interaction: ChatInputCommandInteraction) => {
    const userDiscordId = interaction.user.id;

    await interaction.deferReply({ ephemeral: true });

    const user = await this.usersService.findUserByDiscordId(userDiscordId);
    const userProducts = await this.productsService.getUserProducts(user.id);

    const embed = await this.createEmbeds(userProducts);
    await interaction.editReply({ embeds: embed });
  };

  public autocomplete = async (interaction: AutocompleteInteraction) => {};

  private createEmbeds = async (userProducts: Product[]) => {
    const headerEmbed = new EmbedBuilder()
      .setTitle('Your items')
      .setDescription(
        `You currently have **${userProducts.length}** listed items.`,
      )
      .setColor(DiscordEmbedColors.default);
    const productEmbeds = userProducts.map((product) => {
      const productImage = product.images[0].imageUrl;

      return new EmbedBuilder()
        .setTitle(`**${product.title}**`)
        .setDescription(`${product.description}`)
        .setColor(DiscordEmbedColors.default)
        .addFields([
          { name: 'Price', value: `$${product.price}`, inline: true },
          { name: 'Brand', value: product.brand, inline: true },
          { name: 'Category', value: product.category, inline: true },
        ])
        .setImage(productImage);
    });

    return [headerEmbed, ...productEmbeds];
  };
}
