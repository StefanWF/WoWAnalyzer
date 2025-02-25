import { t } from '@lingui/macro';
import SPELLS from 'common/SPELLS';
import { SpellLink } from 'interface';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, { CastEvent, DamageEvent } from 'parser/core/Events';
import { ThresholdStyle, When } from 'parser/core/ParseResults';

// https://stormearthandlava.com/guide/general/priority_list.html
const TARGETS_FOR_GOOD_CAST = 3;

class SubOptimalChainLightning extends Analyzer {
  get badCastsPerMinute() {
    return (this.badCasts / (this.owner.fightDuration / 1000)) * 60;
  }

  get suggestionThresholds() {
    return {
      actual: this.badCastsPerMinute,
      isGreaterThan: {
        minor: 0,
        average: 1,
        major: 2,
      },
      style: ThresholdStyle.NUMBER,
    };
  }

  badCasts = 0;
  lastCast?: CastEvent;
  lastCastBuffed = false;
  hits = 0;

  constructor(options: Options) {
    super(options);
    this.addEventListener(
      Events.cast.by(SELECTED_PLAYER).spell(SPELLS.CHAIN_LIGHTNING),
      this.onCast,
    );
    this.addEventListener(
      Events.damage.by(SELECTED_PLAYER).spell(SPELLS.CHAIN_LIGHTNING),
      this.onDamage,
    );
    this.addEventListener(Events.fightend, this.onFightend);
  }

  checkCast() {
    if (this.hits >= TARGETS_FOR_GOOD_CAST || !this.lastCast) {
      return;
    }
    this.badCasts += 1;
    this.lastCast.meta = this.lastCast.meta || {};
    this.lastCast.meta.isInefficientCast = true;
    this.lastCast.meta.inefficientCastReason = `Chain Lightning hit less than ${TARGETS_FOR_GOOD_CAST} targets.`;
  }

  onCast(event: CastEvent) {
    this.checkCast();
    this.lastCast = event;
    this.hits = 0;
  }

  onDamage(event: DamageEvent) {
    this.hits += 1;
  }

  onFightend() {
    this.checkCast();
  }

  suggestions(when: When) {
    when(this.suggestionThresholds).addSuggestion((suggest, actual, recommended) =>
      suggest(
        <>
          You cast {this.badCasts} <SpellLink id={SPELLS.CHAIN_LIGHTNING.id} /> that hit less than{' '}
          {TARGETS_FOR_GOOD_CAST} targets. Always prioritize{' '}
          <SpellLink id={SPELLS.LIGHTNING_BOLT.id} /> as a filler when there are less than{' '}
          {TARGETS_FOR_GOOD_CAST} targets.
        </>,
      )
        .icon(SPELLS.CHAIN_LIGHTNING.icon)
        .actual(
          t({
            id: 'shaman.elemental.suggestions.chainLightning.efficiency',
            message: `${actual.toFixed(1)} bad Chain Lightning per minute`,
          }),
        )

        .recommended(`${recommended} is recommended`),
    );
  }
}

export default SubOptimalChainLightning;
