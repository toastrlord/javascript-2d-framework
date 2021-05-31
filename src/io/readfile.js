async function readFile(path) {
    const response = await fetch(path, {mode: 'cors'});
    return await response.text();
}

export default readFile;