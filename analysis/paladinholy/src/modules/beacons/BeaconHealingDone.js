import { Trans } from '@lingui/macro';
import Analyzer, { SELECTED_PLAYER } from 'parser/core/Analyzer';
import HealingValue from 'parser/shared/modules/HealingValue';
import HealingDone from 'parser/shared/modules/throughput/HealingDone';
import Panel from 'parser/ui/Panel';

import BeaconHealingBreakdown from './BeaconHealingBreakdown';
import BeaconHealSource from './BeaconHealSource';

class BeaconHealingDone extends Analyzer {
  static dependencies = {
    beaconHealSource: BeaconHealSource,
    healingDone: HealingDone,
  };

  _totalBeaconHealing = new HealingValue();
  _beaconHealingBySource = {};

  constructor(options) {
    super(options);
    this.addEventListener(
      this.beaconHealSource.beacontransfer.by(SELECTED_PLAYER),
      this._onBeaconTransfer,
    );
  }

  _onBeaconTransfer(event) {
    this._totalBeaconHealing = this._totalBeaconHealing.add(
      event.amount,
      event.absorbed,
      event.overheal,
    );

    const source = event.originalHeal;
    const spellId = source.ability.guid;
    let sourceHealing = this._beaconHealingBySource[spellId];
    if (!sourceHealing) {
      sourceHealing = this._beaconHealingBySource[spellId] = {
        ability: source.ability,
        healing: new HealingValue(),
      };
    }
    sourceHealing.healing = sourceHealing.healing.add(event.amount, event.absorbed, event.overheal);
  }

  statistic() {
    return (
      <Panel
        title={
          <Trans id="paladin.holy.modules.beacons.beaconHealingDone.beaconHealingSources">
            Beacon healing sources
          </Trans>
        }
        explanation={
          <Trans id="paladin.holy.modules.beacons.beaconHealingDone.beaconHealingSources.explanation">
            Beacon healing is triggered by the <b>raw</b> healing done of your primary spells. This
            breakdown shows the amount of effective beacon healing replicated by each beacon
            transfering heal.
          </Trans>
        }
        position={120}
        pad={false}
      >
        <BeaconHealingBreakdown
          totalHealingDone={this.healingDone.total}
          totalBeaconHealing={this._totalBeaconHealing}
          beaconHealingBySource={this._beaconHealingBySource}
          fightDuration={this.owner.fightDuration}
        />
      </Panel>
    );
  }
}

export default BeaconHealingDone;
