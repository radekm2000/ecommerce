import {
  AutocompleteInteraction,
  CacheType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { SlashCommand } from './slash-command';
import { BinanceService } from 'src/binance/binance.service';
import { DiscordEmbedColors } from '../discord-embeds/colors';
import { BinanceBalanceWithTotalValueAndSymbol } from 'src/utils/dtos/binance.dto';

// there are many symbols that cant be converted I.E   COMBOBTC, USTCETH, COMBOETH, LUNCETH so only ones that can be converted will be
// displayed on discord
// might delete that feature later  with choosing specific currency to convert to
// DEFAULT ONE IS USDT

const CURRENCIES = ['BTC', 'USDT', 'ETH'];

type Config = {
  binanceService: BinanceService;
};

const AMOUNT_OF_TOKENS_OPTION_NAME = 'tokens';
const CURRENCY_OPTION_NAME = 'currency';
const DEFAULT_NUMBER_OF_TOKENS_TO_DISPLAY = 3;

export class BinanceAccountTokenInfo implements SlashCommand {
  private binanceService: BinanceService;

  readonly config: any = new SlashCommandBuilder()
    .setName('binance-account')
    .setDescription('Shows your most valuable tokens')
    .addIntegerOption((option) =>
      option
        .setName(AMOUNT_OF_TOKENS_OPTION_NAME)
        .setDescription(
          'Displays amount of tokens that you inserted here which value is greater than 0',
        )
        .setRequired(true)
        .setMaxValue(10)
        .setMinValue(1),
    )
    .addStringOption((option) =>
      option
        .setName(CURRENCY_OPTION_NAME)
        .setDescription('Choose currency to convert to')
        .setRequired(false)
        .setAutocomplete(true),
    );

  constructor(config: Config) {
    this.binanceService = config.binanceService;
  }

  public autocomplete = async (interaction: AutocompleteInteraction) => {
    const value = interaction.options.getFocused().toLowerCase();

    const choices = CURRENCIES.filter((c) => c.includes(value));
    await interaction.respond(
      choices.map((choice) => ({
        name: choice,
        value: choice,
      })),
    );
  };

  public execute = async (interaction: ChatInputCommandInteraction) => {
    const numberOfTokens =
      interaction.options.getInteger(AMOUNT_OF_TOKENS_OPTION_NAME) ??
      DEFAULT_NUMBER_OF_TOKENS_TO_DISPLAY;

    await interaction.deferReply({ ephemeral: true });
    const currencyName =
      interaction.options.getString(CURRENCY_OPTION_NAME) ?? '';

    if (currencyName && !this.isCurrencyNameValid(currencyName)) {
      await interaction.reply({
        content:
          'Invalid currency to convert tokens value to. Please select a valid currency from the autocomplete options',
      });
    }

    const balances = await this.binanceService.getAccountInfo(
      numberOfTokens,
      currencyName,
    );

    if (balances.length === 0) {
      await interaction.editReply('No tokens found');
    }

    const embed = await this.createEmbed(balances, numberOfTokens);

    await interaction.editReply({
      embeds: [embed],
    });
  };

  private isCurrencyNameValid = (currencyName: string) => {
    return CURRENCIES.includes(currencyName.toUpperCase());
  };

  private createEmbed = async (
    balances: BinanceBalanceWithTotalValueAndSymbol[],
    numberOfTokens: number,
  ) => {
    const description = balances
      .map(
        (balance) =>
          `**Token**: ${balance.asset}\n**Symbol**: ${balance.symbol}\n**Amount**: ${balance.free}\n**Total value**: ${balance.totalValue}`,
      )
      .join('\n\n');
    const embed = new EmbedBuilder()
      .setTitle(`Your top ${numberOfTokens} tokens`)
      .setColor(DiscordEmbedColors.success)
      .setDescription(description);

    return embed;
  };
}
