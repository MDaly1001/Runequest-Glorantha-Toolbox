import { useState } from 'react';

/*
 * Skill modifier tables
 *
 * Each array represents:
 *
 * [1–4, 5–8, 9–12, 13–16, 17–20, each additional +4]
 *
 * Values are percentage points.
 */
const skillModifierTables = {
  agility: {
    str: [-5, 0, 0, 0, 5, 5],
    siz: [5, 0, 0, 0, -5, -5],
    dex: [-10, -5, 0, 5, 10, 5],
    pow: [-5, 0, 0, 0, 5, 5],
  },

  communication: {
    int: [-5, 0, 0, 0, 5, 5],
    pow: [-5, 0, 0, 0, 5, 5],
    cha: [-10, -5, 0, 5, 10, 5],
  },

  knowledge: {
    int: [-10, -5, 0, 5, 10, 5],
    pow: [-5, 0, 0, 0, 5, 5],
  },

  magic: {
    pow: [-10, -5, 0, 5, 10, 5],
    cha: [-5, 0, 0, 0, 5, 5],
  },

  manipulation: {
    str: [-5, 0, 0, 0, 5, 5],
    dex: [-10, -5, 0, 5, 10, 5],
    int: [-10, -5, 0, 5, 10, 5],
    pow: [-5, 0, 0, 0, 5, 5],
  },

  perception: {
    int: [-10, -5, 0, 5, 10, 5],
    pow: [-5, 0, 0, 0, 5, 5],
  },

  stealth: {
    siz: [10, 5, 0, -5, -10, -5],
    dex: [-10, -5, 0, 5, 10, 5],
    int: [-10, -5, 0, 5, 10, 5],
    pow: [5, 0, 0, 0, -5, -5],
  },
};

/*
 * Get the modifier for a single stat.
 *
 * The modifier table covers:
 * 1–4
 * 5–8
 * 9–12
 * 13–16
 * 17–20
 * and then every additional +4 above 20.
 */
function getStatModifier(value, modifiers) {
  if (value <= 4) return modifiers[0];
  if (value <= 8) return modifiers[1];
  if (value <= 12) return modifiers[2];
  if (value <= 16) return modifiers[3];
  if (value <= 20) return modifiers[4];

  const extraSteps = Math.ceil((value - 20) / 4);

  return modifiers[4] + extraSteps * modifiers[5];
}

/*
 * Calculate the total modifier for a skill category.
 */
function getSkillModifier(category, stats) {
  const table = skillModifierTables[category];

  if (!table) {
    return 0;
  }

  return Object.entries(table).reduce((total, [stat, modifiers]) => {
    return total + getStatModifier(stats[stat], modifiers);
  }, 0);
}

export default function StatCalculator() {
  const [stats, setStats] = useState({
    str: 10,
    con: 10,
    siz: 10,
    dex: 10,
    int: 10,
    pow: 10,
    cha: 10,
  });

  const handleStatChange = (e) => {
    const { name, value } = e.target;

    setStats((prevStats) => ({
      ...prevStats,
      [name]: parseInt(value, 10) || 0,
    }));
  };

  /*
   * Stat combinations
   */
  const strSiz = stats.str + stats.siz;
  const strCon = stats.str + stats.con;
  const powCha = stats.pow + stats.cha;

  /*
   * Derived stats
   */
  const hp = Math.floor(strSiz / 2);
  const mp = stats.pow;
  const mov = "8 units / 24 meters"

  /*
   * Health stats
   */
  const hpHead = Math.floor(hp * 0.2);
  const hpArms = Math.floor(hp * 0.4);
  const hpChest = Math.floor(hp * 0.5);
  const hpAbdomen = Math.floor(hp * 0.3);
  const hpLegs = Math.floor(hp * 0.3);

  /*
   * Combat stats
   */

  // SIZ Strike Rank
  const sizSR =
    stats.siz < 6
      ? 3
      : stats.siz < 14
        ? 2
        : stats.siz < 21
          ? 1
          : 0;

  // DEX Strike Rank
  const dexSR =
    stats.dex < 5
      ? 5
      : stats.dex < 8
        ? 4
        : stats.dex < 12
          ? 3
          : stats.dex < 15
            ? 2
            : stats.dex < 18
              ? 1
              : 0;

  // Damage Bonus
  const damageBonus =
    strSiz <= 12
      ? '+1D4'
      : strSiz <= 24
        ? '0'
        : strSiz <= 32
          ? '+1D4'
          : strSiz <= 40
            ? '+1D6'
            : strSiz <= 56
              ? '+2D6'
              : '+3D6';

  // Healing Rate
  const healingRate =
    stats.con < 6
      ? 1
      : stats.con < 12
        ? 2
        : stats.con < 18
          ? 3
          : 4;

  // Spirit Combat Damage
  const spiritCombatDamage =
    powCha <= 12
      ? '+1D3'
      : powCha <= 24
        ? '+1D6'
        : powCha <= 32
          ? '1D6+1'
          : powCha <= 40
            ? '1D6+3'
            : powCha <= 56
              ? '2D6+3'
              : '3D6+4';

  // Encumbrance
  const enc = Math.min(stats.str, Math.floor(strCon / 2));

  // Skill modifiers
  const skillModifiers = {
    agility: getSkillModifier('agility', stats),
    communication: getSkillModifier('communication', stats),
    knowledge: getSkillModifier('knowledge', stats),
    magic: getSkillModifier('magic', stats),
    manipulation: getSkillModifier('manipulation', stats),
    perception: getSkillModifier('perception', stats),
    stealth: getSkillModifier('stealth', stats),
  };

  return (
    <>
      <h2>Characteristics</h2>

      <label>
        STR:
        <input
          name="str"
          type="number"
          value={stats.str}
          onChange={handleStatChange}
        />
      </label>

      <hr />

      <label>
        CON:
        <input
          name="con"
          type="number"
          value={stats.con}
          onChange={handleStatChange}
        />
      </label>

      <hr />

      <label>
        SIZ:
        <input
          name="siz"
          type="number"
          value={stats.siz}
          onChange={handleStatChange}
        />
      </label>

      <hr />

      <label>
        DEX:
        <input
          name="dex"
          type="number"
          value={stats.dex}
          onChange={handleStatChange}
        />
      </label>

      <hr />

      <label>
        INT:
        <input
          name="int"
          type="number"
          value={stats.int}
          onChange={handleStatChange}
        />
      </label>

      <hr />

      <label>
        POW:
        <input
          name="pow"
          type="number"
          value={stats.pow}
          onChange={handleStatChange}
        />
      </label>

      <hr />

      <label>
        CHA:
        <input
          name="cha"
          type="number"
          value={stats.cha}
          onChange={handleStatChange}
        />
      </label>

      <hr />

      <h2>Derived Stats</h2>

      <p>Max HP: {hp}</p>
      <p>MP: {mp}</p>
      <p>MOV: {mov}</p>

      <h4>Health Stats</h4>

      <p>HP - Head: {hpHead}</p>
      <p>HP - Arms: {hpArms}</p>
      <p>HP - Chest: {hpChest}</p>
      <p>HP - Abdomen: {hpAbdomen}</p>
      <p>HP - Legs: {hpLegs}</p>

      <h4>Combat Stats</h4>

      <p>SIZ SR: {sizSR}</p>
      <p>DEX SR: {dexSR}</p>
      <p>Damage Bonus: {damageBonus}</p>
      <p>Healing Rate: {healingRate}</p>
      <p>Spirit Combat Damage: {spiritCombatDamage}</p>
      <p>ENC: {enc}</p>

      <h4>Skill Modifiers</h4>

      <p>Agility: {skillModifiers.agility}%</p>
      <p>Communication: {skillModifiers.communication}%</p>
      <p>Knowledge: {skillModifiers.knowledge}%</p>
      <p>Magic: {skillModifiers.magic}%</p>
      <p>
        Manipulation (inc weapons): {skillModifiers.manipulation}%
      </p>
      <p>Perception: {skillModifiers.perception}%</p>
      <p>Stealth: {skillModifiers.stealth}%</p>


    </>
  );
}
