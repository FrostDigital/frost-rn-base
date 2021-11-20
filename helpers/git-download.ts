import { gitget } from "gitget";

export function download({
  org,
  repo,
  subdir,
  dest,
  branch,
}: {
  org: string;
  repo: string;
  subdir?: string;
  dest: string;
  branch?: string;
}) {
  return gitget({
    user: org,
    repo,
    subdir,
    branch,
    folder: dest,
    silent: true,
  });
}
