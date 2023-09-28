const fs = require('fs/promises');

async function example() {
  const sourceFile = './src/locale/messages.json';
  const targetFile = './src/locale/messages.gr.json';
  try {
    // Source JSON translations file
    const messages = await fs.readFile(sourceFile, {encoding: 'utf8'});
    const messagesJson = JSON.parse(messages);
    const messagesKeys = Object.keys(messagesJson.translations);

    // Target JSON translations file
    const elMessages = await fs.readFile(targetFile, {encoding: 'utf8'});
    const elMessagesJson = JSON.parse(elMessages);
    const elMessagesKeys = Object.keys(elMessagesJson.translations);

    // Check for missing keys
    const missingTranslations = missingKeys(messagesKeys, messagesJson, elMessagesKeys);

    // Check for obsolete keys
    obsoleteKeys(messagesKeys, elMessagesKeys, elMessagesJson);

    fs.writeFile(targetFile, JSON.stringify({
      ...elMessagesJson,
      translations: {...elMessagesJson.translations, ...missingTranslations}
    }));
  } catch (err) {
    console.log(err);
  }
}

example();

// @ts-ignore
function missingKeys(messagesKeys, messagesJson, elMessagesKeys) {
  // @ts-ignore
  const missingKeys = messagesKeys.filter(messagesKey => !elMessagesKeys.includes(messagesKey));
  const missingTranslations = {};
  if (missingKeys.length > 0) {

    // Append missing translations
    // @ts-ignore
    missingKeys.forEach(missingKey => {
      // @ts-ignore
      missingTranslations[missingKey] = `[Translation needed]: ${messagesJson.translations[missingKey]}`;
    });
  }
  return missingTranslations;
}

// @ts-ignore
function obsoleteKeys(messagesKeys, elMessagesKeys, elMessagesJson) {
  // @ts-ignore
  const obsoleteKeys = elMessagesKeys.filter(messagesKey => !messagesKeys.includes(messagesKey));
  if (obsoleteKeys.length > 0) {
    // Remove obsolete translations
    // @ts-ignore
    obsoleteKeys.forEach(obsoleteKey => delete elMessagesJson.translations[obsoleteKey]);
  }
}