import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import { SlashCommand } from './slash-command';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';

const PRODUCT_OPTION_NAME = 'product';

type Config = {
  usersService: UsersService;
  productService: ProductsService;
};

export class RemoveProduct implements SlashCommand {
  readonly config: any = new SlashCommandBuilder()
    .setName('remove-product')
    .setDescription('Removes one of your listed products')
    .addStringOption((option) =>
      option
        .setName(PRODUCT_OPTION_NAME)
        .setDescription('Product to remove')
        .setRequired(true)
        .setAutocomplete(true),
    );

  private readonly usersService: UsersService;
  private readonly productService: ProductsService;

  constructor(config: Config) {
    this.usersService = config.usersService;
    this.productService = config.productService;
  }

  public autocomplete = async (interaction: AutocompleteInteraction) => {
    const userId = interaction.user.id;
    const user = await this.getUserWithProducts(userId);
    const value = interaction.options.getFocused().toLowerCase();
    const userProducts = user.products;

    const filteredProducts = userProducts
      .filter((product) => product.title.toLowerCase().includes(value))
      .slice(0, 25);

    await interaction.respond(
      filteredProducts.map((choice) => ({
        name: choice.title,
        value: choice.id.toString(),
      })),
    );
  };

  public execute = async (interaction: ChatInputCommandInteraction) => {
    const productArg = interaction.options.getString(PRODUCT_OPTION_NAME);
    if (!productArg) {
      await interaction.reply({
        content: `Missing "${productArg} option"`,
        ephemeral: true,
      });
    }

    const productId = parseInt(productArg);

    if (!this.isValidProduct(productId)) {
      await interaction.reply({
        content:
          'Invalid product ID. Please select a valid product from the autocomplete options.',
        ephemeral: true,
      });
      return;
    }

    await this.deleteProductById(productId);
    await interaction.reply({
      content: 'Product removed successfully',
      ephemeral: true,
    });
  };

  private getUserWithProducts = async (userDiscordId: string) => {
    return await this.usersService.findUserByDiscordId(userDiscordId);
  };

  private deleteProductById = async (productId: number) => {
    return await this.productService.deleteProduct(productId);
  };

  private isValidProduct = (productArg: number) => {
    return !isNaN(productArg);
  };
}
