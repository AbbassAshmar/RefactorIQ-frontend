export function buildFileTree(files) {
    const root = { name: '', path: '', folders: new Map(), files: [] };

    for (const file of files) {
        const parts = file.file_path.replaceAll('\\', '/').split('/').filter(Boolean);
        const fileName = parts.pop();
        let current = root;
        let currentPath = '';

        for (const folderName of parts) {
            currentPath = currentPath ? `${currentPath}/${folderName}` : folderName;
            if (!current.folders.has(folderName)) {
                current.folders.set(folderName, {
                    name: folderName,
                    path: currentPath,
                    folders: new Map(),
                    files: [],
                });
            }
            current = current.folders.get(folderName);
        }
        current.files.push({ ...file, name: fileName });
    }

    return root;
}
