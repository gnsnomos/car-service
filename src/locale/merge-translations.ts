const fs = require('fs/promises');

async function example() {
  const sourceFile = './src/locale/messages.json';
  const targetFile = './src/locale/messages.gr.json';
  try {
    // Source JSON translations file
    const messages = await fs.readFile(sourceFile, {encoding: 'utf8'});
    const messagesJson = JSON.parse(messages);
    const messagesKeys = Object.keys(messagesJson.translations);

    // el JSON translations file
    const elMessages = await fs.readFile(targetFile, {encoding: 'utf8'});
    const elMessagesJson = JSON.parse(elMessages);
    const elMessagesKeys = Object.keys(elMessagesJson.translations);

    // check for missing keys
    const missingKeys = messagesKeys.filter(messagesKey => !elMessagesKeys.includes(messagesKey));

    // No missing translations
    if (missingKeys.length === 0) {
      console.log('No missing translation keys found!');
      return;
    }

    // Append missing translations
    const missingTranslations = {};
    missingKeys.forEach(missingKey => {
      // @ts-ignore
      missingTranslations[missingKey] = `[Translation needed]: ${messagesJson.translations[missingKey]}`;
    });
    fs.writeFile(targetFile, JSON.stringify({...elMessagesJson, translations: {...elMessagesJson.translations, ...missingTranslations}}));
    console.log(missingKeys);
  } catch (err) {
    console.log(err);
  }
}

example();