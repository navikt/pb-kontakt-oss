const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

const sourceFile = "navkontor.xlsx";
const destDir = "./src/pages/finn-nav-kontor/data";

const enhetsnrTilEnhetsinfoFile = `${destDir}/enhetsnr-til-enhetsinfo.json`;
const postnrTilStedOgEnhetsnrFile = `${destDir}/postnr-til-enhetsnr-og-poststed.json`;
const stedsnavnTilEnhetsnrFile = `${destDir}/stedsnavn-til-enhetsnr.json`;

const norskSort = new Intl.Collator(["no", "nb", "nn"], {usage: "sort"}).compare;

const sanitizeString = str => str
  .toLowerCase()
  .replace(/\. /g, ".")
  .replace(/[ /–]/g, "-")
  .replace(/,/g, "")
  .replace(/[áàâãä]/g, "a")
  .replace(/[ûùúü]/g, "u")
  .replace(/š/g, "s")
  .replace(/ŋ/g, "n");

const urlifyKontorNavn = navn => sanitizeString(navn)
  .replace(/æ/g, "ae")
  .replace(/ø/g, "o")
  .replace(/å/g, "a")
  .replace("valer-(innlandet)", "valer-i-hedmark")
  .replace("valer-(viken)", "valer")
  .replace(/porsanger.+/, "porsanger")
  .replace("balsfjord-og-storfjord", "balsfjord-storfjord")
  .replace("bo-(nordland)", "bo")
  .replace(/^nav-nes$/, "nav-nes-i-akershus")
  .replace("karmoy-og-bokn", "karmoy-bokn")
  .replace("vindafjord-etne", "vindafjord")
  .replace(/^nav-fjord$/, "nav-alesund")
  .replace(/^nav-eigersund$/, "nav-eigersund-bjerkreim")
  .replace(/^nav-odal$/, "nav-sor-odal")
  .replace(/^nav-indre-namdal$/, "nav-grong")
  .replace(/^nav-malselv-bardu$/, "nav-malselv");

const sorterEnheterPaaKontornavnOgFjernDuplikater = (enhetsnrArray, enhetsnrTilKontor) => !enhetsnrArray ? [] : enhetsnrArray
  .filter(enhetsnr => {
    const kontorNavn = enhetsnrTilKontor[enhetsnr];
    if (kontorNavn) {
      return true;
    }
    console.log("Error: kontornavn ikke funnet for enhetsnr " + enhetsnr);
    return false;
  })
  .sort((a, b) => norskSort(enhetsnrTilKontor[a].navn, enhetsnrTilKontor[b].navn))
  .reduce((acc, curr, index, arr) =>
    (index > 0 && enhetsnrTilKontor[arr[index - 1]].navn === enhetsnrTilKontor[arr[index]].navn ? acc : [...acc, curr]), []);

const sheetToJson = (fileName, sheetName, columnKeys) => (
  excelToJson({
    sourceFile: fileName,
    header: {
      rows: 1
    },
    sheets: [
      {
        name: sheetName,
        columnToKey: columnKeys
      }
    ]
  })[sheetName]
);

const jsonToFile = (jsonObj, destFile) => (
  fs.writeFile(destFile, JSON.stringify(jsonObj), e => e && console.log("Error: " + e))
);

const sheetNames = Object.keys(excelToJson({sourceFile: sourceFile, columnToKey: {}}));

const kontorInfoJson = sheetToJson(
  sourceFile,
  sheetNames[1],
  {
    A: "postnr",
    B: "poststed",
    H: "kommune",
    I: "kontornavn",
    J: "enhetsnr"
  }
);

const enhetsnrTilEnhetsInfo = Object.values(kontorInfoJson)
  .reduce((acc, curr) => (
    curr && curr.enhetsnr && curr.kontornavn ?
      {...acc, [parseInt(curr.enhetsnr, 10)]: {navn: curr.kontornavn, url: urlifyKontorNavn(curr.kontornavn)}}
      : acc), {});

const postnrTilStedOgEnhetsnr = Object.values(kontorInfoJson)
  .reduce((acc, curr) => (
    curr && curr.postnr && curr.enhetsnr && curr.poststed ?
      {...acc, [parseInt(curr.postnr, 10)]: {enhetsnr: curr.enhetsnr, poststed: curr.poststed}}
      : acc), {});

const makeStedsnavnTilEnhetsnr = (kontorInfo) => {
  const stedsnavnTilEnhetsnr = {};

  const getEquivalentKeyIfExists = key => {
    const sanitizedKey = sanitizeString(key);
    for (const key of Object.keys(stedsnavnTilEnhetsnr)) {
      if (sanitizeString(key) === sanitizedKey) {
        return key;
      }
    }
    return null;
  };

  const addValue = (key, value) => {
    if (!key || !value) {
      return;
    }
    const eqKey = getEquivalentKeyIfExists(key);
    if (!eqKey) {
      stedsnavnTilEnhetsnr[key] = [];
      stedsnavnTilEnhetsnr[key].push(value);
    } else if (!stedsnavnTilEnhetsnr[eqKey].includes(value)) {
      stedsnavnTilEnhetsnr[eqKey].push(value);
    }
  };

  Object.values(kontorInfo).forEach(enhet => {
    if (enhet.poststed) {
      addValue(enhet.poststed, enhet.enhetsnr);
    }
    if (enhet.kommune) {
      addValue(enhet.kommune, enhet.enhetsnr);
    }
    if (enhet.kontornavn) {
      addValue(enhet.kontornavn.replace("NAV ", "").toUpperCase(), enhet.enhetsnr);
    }
  });

  for (const key of Object.keys(stedsnavnTilEnhetsnr)) {
    stedsnavnTilEnhetsnr[key] = sorterEnheterPaaKontornavnOgFjernDuplikater(stedsnavnTilEnhetsnr[key], enhetsnrTilEnhetsInfo);
  }

  return stedsnavnTilEnhetsnr;
};

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

jsonToFile(makeStedsnavnTilEnhetsnr(kontorInfoJson), stedsnavnTilEnhetsnrFile);
jsonToFile(enhetsnrTilEnhetsInfo, enhetsnrTilEnhetsinfoFile);
jsonToFile(postnrTilStedOgEnhetsnr, postnrTilStedOgEnhetsnrFile);
