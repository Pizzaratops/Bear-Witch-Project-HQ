// ============================================================
//  DRAFT_CAPITAL_CURVE — empirisch gelernte "Pick -> erwartete fruehe
//  NFL-Opportunity"-Kurve (kein linearer/handgeschaetzter Pick-Wert!)
// ============================================================
//  AUTO-GENERIERT von scripts/build-draft-capital-curve.js. Einmalige
//  Ableitung, kein taeglicher Sync -- die zugrundeliegenden Jahrgaenge
//  (2010-2023) sind abgeschlossen und aendern sich nicht.
//
//  Opportunity-Proxy: Ø Offense-Snap-Anteil ueber Rookie-Saison + Jahr 2
//  (Regular Season), aus nflverse snap_counts. Bucket = Draft-Pick-Bereich.
//  n = Anzahl Spieler im Bucket (Vorsicht bei kleinem n, z.B. QB 177-220
//  ist mit n<10 verrauscht -- eher die Nachbar-Buckets zur Glaettung nutzen).
//
//  DRAFT_CAPITAL_CURVE[Pos] = [{ bucket, n, avgOpp, medianOpp }]
//  avgOpp/medianOpp = 0..1 (Anteil Offense-Snaps). Undrafted/kein Pick ist
//  NICHT enthalten -- dafuer separat einen Wert unterhalb von "221+" annehmen.
// ============================================================

const DRAFT_CAPITAL_CURVE = {
  "meta": {
    "minDraftYear": 2010,
    "maxDraftYear": 2023,
    "sampleSize": 846,
    "seasons": [
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019,
      2020,
      2021,
      2022,
      2023,
      2024
    ],
    "opportunityMetric": "avg_offense_snap_pct_year1_2"
  },
  "curve": {
    "QB": [
      {
        "bucket": "1-10",
        "n": 25,
        "avgOpp": 0.929,
        "medianOpp": 0.964
      },
      {
        "bucket": "11-32",
        "n": 12,
        "avgOpp": 0.806,
        "medianOpp": 0.879
      },
      {
        "bucket": "33-64",
        "n": 9,
        "avgOpp": 0.603,
        "medianOpp": 0.642
      },
      {
        "bucket": "65-105",
        "n": 19,
        "avgOpp": 0.609,
        "medianOpp": 0.652
      },
      {
        "bucket": "106-140",
        "n": 14,
        "avgOpp": 0.391,
        "medianOpp": 0.3
      },
      {
        "bucket": "141-176",
        "n": 9,
        "avgOpp": 0.373,
        "medianOpp": 0.34
      },
      {
        "bucket": "177-220",
        "n": 9,
        "avgOpp": 0.614,
        "medianOpp": 0.68
      },
      {
        "bucket": "221+",
        "n": 6,
        "avgOpp": 0.37,
        "medianOpp": 0.44
      }
    ],
    "RB": [
      {
        "bucket": "1-10",
        "n": 7,
        "avgOpp": 0.703,
        "medianOpp": 0.717
      },
      {
        "bucket": "11-32",
        "n": 11,
        "avgOpp": 0.523,
        "medianOpp": 0.557
      },
      {
        "bucket": "33-64",
        "n": 30,
        "avgOpp": 0.451,
        "medianOpp": 0.507
      },
      {
        "bucket": "65-105",
        "n": 39,
        "avgOpp": 0.372,
        "medianOpp": 0.374
      },
      {
        "bucket": "106-140",
        "n": 41,
        "avgOpp": 0.246,
        "medianOpp": 0.233
      },
      {
        "bucket": "141-176",
        "n": 36,
        "avgOpp": 0.249,
        "medianOpp": 0.239
      },
      {
        "bucket": "177-220",
        "n": 41,
        "avgOpp": 0.149,
        "medianOpp": 0.112
      },
      {
        "bucket": "221+",
        "n": 29,
        "avgOpp": 0.165,
        "medianOpp": 0.11
      }
    ],
    "WR": [
      {
        "bucket": "1-10",
        "n": 14,
        "avgOpp": 0.771,
        "medianOpp": 0.835
      },
      {
        "bucket": "11-32",
        "n": 34,
        "avgOpp": 0.68,
        "medianOpp": 0.7
      },
      {
        "bucket": "33-64",
        "n": 59,
        "avgOpp": 0.593,
        "medianOpp": 0.603
      },
      {
        "bucket": "65-105",
        "n": 57,
        "avgOpp": 0.489,
        "medianOpp": 0.524
      },
      {
        "bucket": "106-140",
        "n": 42,
        "avgOpp": 0.298,
        "medianOpp": 0.259
      },
      {
        "bucket": "141-176",
        "n": 41,
        "avgOpp": 0.331,
        "medianOpp": 0.305
      },
      {
        "bucket": "177-220",
        "n": 59,
        "avgOpp": 0.261,
        "medianOpp": 0.234
      },
      {
        "bucket": "221+",
        "n": 38,
        "avgOpp": 0.25,
        "medianOpp": 0.227
      }
    ],
    "TE": [
      {
        "bucket": "1-10",
        "n": 3,
        "avgOpp": 0.666,
        "medianOpp": 0.683
      },
      {
        "bucket": "11-32",
        "n": 8,
        "avgOpp": 0.571,
        "medianOpp": 0.622
      },
      {
        "bucket": "33-64",
        "n": 26,
        "avgOpp": 0.511,
        "medianOpp": 0.548
      },
      {
        "bucket": "65-105",
        "n": 32,
        "avgOpp": 0.39,
        "medianOpp": 0.397
      },
      {
        "bucket": "106-140",
        "n": 30,
        "avgOpp": 0.338,
        "medianOpp": 0.33
      },
      {
        "bucket": "141-176",
        "n": 28,
        "avgOpp": 0.313,
        "medianOpp": 0.277
      },
      {
        "bucket": "177-220",
        "n": 22,
        "avgOpp": 0.209,
        "medianOpp": 0.192
      },
      {
        "bucket": "221+",
        "n": 16,
        "avgOpp": 0.174,
        "medianOpp": 0.165
      }
    ]
  }
};
