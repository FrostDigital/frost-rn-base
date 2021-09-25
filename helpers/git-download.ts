import { gitget } from "gitget";

export function download({
  org,
  repo,
  subdir,
  dest,
}: {
  org: string;
  repo: string;
  subdir?: string;
  dest: string;
}) {
  return gitget({
    user: org,
    repo,
    subdir,
    folder: dest,
    silent: true,
  });
}
