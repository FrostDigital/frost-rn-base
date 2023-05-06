import fsExtra from "fs-extra";

const postInstallNotesFilename = "post-installation.md";

export function getPostInstallNotes() {
  if (fsExtra.existsSync(postInstallNotesFilename)) {
    return fsExtra.readFileSync(postInstallNotesFilename).toString().trim();
  }

  return "";
}
