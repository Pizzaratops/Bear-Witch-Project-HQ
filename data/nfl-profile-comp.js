// ============================================================
//  NFL_PROFILE_COMP — "Rollenprofil aehnelt X vor dessen Draft"
// ============================================================
//  AUTO-GENERIERT von scripts/build-nfl-profile-comp.js. Nicht von Hand
//  editieren. Siehe claude/college-scouting-concept.md Abschnitt 2 + 7.
//
//  NFL_PROFILE_COMP.comps[Pos][playerId] = Top-10-historische Comps
//  (Mahalanobis auf Production+Groesse-Features, siehe meta.matchFeatures),
//  angereichert mit dem TATSAECHLICHEN Draft-Ergebnis + RAS-Score DIESES
//  Comps (nicht des Prospects selbst -- der hat beides noch nicht).
//
//  WICHTIG (UI-Sprache, siehe Projekt-Doc Abschnitt 6): "Profiliert wie ...
//  (Pre-Draft-Rollenarchetyp, KEINE Erfolgsprognose)" -- niemals mit College
//  Production Comp vermischen oder als Talent-/Erfolgsvorhersage labeln.
// ============================================================

const NFL_PROFILE_COMP = {
  "meta": {
    "builtAt": "2026-09-27T15:15:47.871Z",
    "matchFeatures": {
      "QB": [
        "avgPpaPass",
        "avgPpaRush",
        "usagePass",
        "usageRush",
        "compPct",
        "heightIn",
        "weightLb"
      ],
      "RB": [
        "rushCarShare",
        "recYdShare",
        "avgPpaRush",
        "avgPpaPass",
        "usageRush",
        "heightIn",
        "weightLb"
      ],
      "WR": [
        "recShare",
        "ydShare",
        "tdShare",
        "avgPPA",
        "usageOverall",
        "heightIn",
        "weightLb"
      ],
      "TE": [
        "recShare",
        "ydShare",
        "tdShare",
        "avgPPA",
        "usageOverall",
        "heightIn",
        "weightLb"
      ]
    }
  },
  "comps": {
    "QB": {},
    "RB": {},
    "WR": {},
    "TE": {}
  },
  "stats": {
    "QB": {
      "poolSize": 132,
      "matched": 132,
      "unmatched": 432,
      "targetsWithComps": 0
    },
    "RB": {
      "poolSize": 217,
      "matched": 217,
      "unmatched": 1045,
      "targetsWithComps": 0
    },
    "WR": {
      "poolSize": 362,
      "matched": 362,
      "unmatched": 1137,
      "targetsWithComps": 0
    },
    "TE": {
      "poolSize": 158,
      "matched": 158,
      "unmatched": 575,
      "targetsWithComps": 0
    }
  }
};
