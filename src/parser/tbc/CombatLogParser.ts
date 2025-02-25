import Channeling from 'parser/shared/normalizers/Channeling';
import FlaskChecker from 'parser/tbc/modules/items/FlaskChecker';
import FoodChecker from 'parser/tbc/modules/items/FoodChecker';
import WeaponEnhancementChecker from 'parser/tbc/modules/items/WeaponEnhancementChecker';

import BaseCombatLogParser, { DependenciesDefinition } from '../core/CombatLogParser';
import Abilities from '../core/modules/Abilities';
import Buffs from '../core/modules/Buffs';
import SpellTimeWaitingOnGlobalCooldown from '../shared/enhancers/SpellTimeWaitingOnGlobalCooldown';
import AbilitiesMissing from '../shared/modules/AbilitiesMissing';
import AbilityTracker from '../shared/modules/AbilityTracker';
import AlwaysBeCasting from '../shared/modules/AlwaysBeCasting';
import CastEfficiency from '../shared/modules/CastEfficiency';
import DeathRecapTracker from '../shared/modules/DeathRecapTracker';
import DeathTracker from '../shared/modules/DeathTracker';
import DispelTracker from '../shared/modules/DispelTracker';
import DistanceMoved from '../shared/modules/DistanceMoved';
import Enemies from '../shared/modules/Enemies';
import EnemyInstances from '../shared/modules/EnemyInstances';
import EventHistory from '../shared/modules/EventHistory';
import RaidHealthTab from '../shared/modules/features/RaidHealthTab';
import FilteredActiveTime from '../shared/modules/FilteredActiveTime';
import GlobalCooldown from '../shared/modules/GlobalCooldown';
import Haste from '../shared/modules/Haste';
import CritEffectBonus from '../shared/modules/helpers/CritEffectBonus';
import Pets from '../shared/modules/Pets';
import SpellHistory from '../shared/modules/SpellHistory';
import SpellManaCost from '../shared/modules/SpellManaCost';
import VantusRune from '../shared/modules/spells/VantusRune';
import SpellUsable from '../shared/modules/SpellUsable';
import StatTracker from '../shared/modules/StatTracker';
import DamageDone from '../shared/modules/throughput/DamageDone';
import DamageTaken from '../shared/modules/throughput/DamageTaken';
import HealingDone from '../shared/modules/throughput/HealingDone';
import ThroughputStatisticGroup from '../shared/modules/throughput/ThroughputStatisticGroup';
import ApplyBuffNormalizer from '../shared/normalizers/ApplyBuff';
import CancelledCastsNormalizer from '../shared/normalizers/CancelledCasts';
import MissingCastsNormalizer from '../shared/normalizers/MissingCasts';
import PhaseChangesNormalizer from '../shared/normalizers/PhaseChanges';
import PrePullCooldownsNormalizer from '../shared/normalizers/PrePullCooldowns';
import ManaValues from '../tbc/modules/ManaValues';
import PreparationRuleAnalyzer from './modules/features/Checklist/PreparationRuleAnalyzer';
import CombatPotionChecker from './modules/items/CombatPotionChecker';
import EnchantChecker from './modules/items/EnchantChecker';
import ManaGained from './statistic/ManaGained';

class CombatLogParser extends BaseCombatLogParser {
  static defaultModules: DependenciesDefinition = {
    // Normalizers
    applyBuffNormalizer: ApplyBuffNormalizer,
    cancelledCastsNormalizer: CancelledCastsNormalizer,
    prepullNormalizer: PrePullCooldownsNormalizer,
    phaseChangesNormalizer: PhaseChangesNormalizer,
    missingCastsNormalize: MissingCastsNormalizer,
    channeling: Channeling,

    // Enhancers
    spellTimeWaitingOnGlobalCooldown: SpellTimeWaitingOnGlobalCooldown,

    // Analyzers
    healingDone: HealingDone,
    damageDone: DamageDone,
    damageTaken: DamageTaken,
    throughputStatisticGroup: ThroughputStatisticGroup,
    deathTracker: DeathTracker,

    foodChecker: FoodChecker,
    enchantChecker: EnchantChecker,
    flaskChecker: FlaskChecker,
    weaponEnhancementChecker: WeaponEnhancementChecker,
    preparationRuleAnalyzer: PreparationRuleAnalyzer,
    combatPotionChecker: CombatPotionChecker,

    enemies: Enemies,
    enemyInstances: EnemyInstances,
    pets: Pets,
    spellManaCost: SpellManaCost,
    eventHistory: EventHistory,
    abilityTracker: AbilityTracker,
    haste: Haste,
    statTracker: StatTracker,
    alwaysBeCasting: AlwaysBeCasting,
    filteredActiveTime: FilteredActiveTime,
    abilities: Abilities,
    buffs: Buffs,
    abilitiesMissing: AbilitiesMissing,
    castEfficiency: CastEfficiency,
    spellUsable: SpellUsable,
    spellHistory: SpellHistory,
    globalCooldown: GlobalCooldown,
    manaValues: ManaValues,
    vantusRune: VantusRune,
    distanceMoved: DistanceMoved,
    deathRecapTracker: DeathRecapTracker,
    dispels: DispelTracker,

    critEffectBonus: CritEffectBonus,

    // Tabs
    raidHealthTab: RaidHealthTab,
  };

  static suggestions = [...BaseCombatLogParser.suggestions];
  static statistics = [...BaseCombatLogParser.statistics, ManaGained];
}

export default CombatLogParser;
