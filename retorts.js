exports.select = (retorts, name) => {
    let retort = retorts[Math.floor(Math.random() * retorts.length)];
    return retort.replace(`{NAME}`, `<@${name}>`);
};