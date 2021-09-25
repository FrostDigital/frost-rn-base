// const downloadUrl = require("download");
// const gitclone = require("git-clone");
// const rm = require("rimraf").sync;

import { gitget } from "gitget";

export function download(repo: string, subdir: string, dest: string) {
  return gitget({
    repo,
    subdir,
    folder: dest,
  });
}

// /**
//  * Expose `download`.
//  */

// module.exports = download;

// /**
//  * Download `repo` to `dest` and callback `fn(err)`.
//  *
//  * @param {String} repo
//  * @param {String} dest
//  * @param {Object} opts
//  * @param {Function} fn
//  */

// function download(
//   repo: string,
//   dest: string,
//   opts: any,
//   fn: (err: any) => void
// ) {
//   if (typeof opts === "function") {
//     fn = opts;
//     opts = null;
//   }
//   opts = opts || {};
//   var clone = opts.clone || false;
//   delete opts.clone;

//   const repoObj = normalize(repo);
//   var url = repoObj.url || getUrl(repo, clone);

//   if (clone) {
//     var cloneOptions = {
//       checkout: repoObj.checkout,
//       shallow: repoObj.checkout === "master",
//       ...opts,
//     };
//     gitClone(url, dest, cloneOptions, function (err: any) {
//       if (err === undefined) {
//         rimraf.sync(dest + "/.git");
//         fn();
//       } else {
//         fn(err);
//       }
//     });
//   } else {
//     const downloadOptions = {
//       extract: true,
//       strip: 1,
//       mode: "666",
//       ...opts,
//       headers: {
//         accept: "application/zip",
//         ...(opts.headers || {}),
//       },
//     };
//     downloadUrl(url, dest, downloadOptions)
//       .then(function (data) {
//         fn();
//       })
//       .catch(function (err) {
//         fn(err);
//       });
//   }
// }

// /**
//  * Normalize a repo string.

//  */
// function normalize(repo: string) {
//   let regex = /^(?:(direct):([^#]+)(?:#(.+))?)$/;
//   let match = regex.exec(repo);

//   if (match) {
//     const url = match[2];
//     const directCheckout = match[3] || "master";

//     return {
//       type: "direct",
//       url: url,
//       checkout: directCheckout,
//     };
//   } else {
//     const oRegex =
//       /^(?:(github|gitlab|bitbucket):)?(?:(.+):)?([^/]+)\/([^#]+)(?:#(.+))?$/;
//     const oMatch = oRegex.exec(repo) || [];

//     const type = oMatch[1] || "github";
//     let origin = oMatch[2] || null;
//     const owner = oMatch[3];
//     const name = oMatch[4];
//     const checkout = oMatch[5] || "master";

//     if (origin == null) {
//       if (type === "github") {
//         origin = "github.com";
//       } else if (type === "gitlab") {
//         origin = "gitlab.com";
//       } else if (type === "bitbucket") {
//         origin = "bitbucket.org";
//       }
//     }

//     return {
//       type: type,
//       origin: origin,
//       owner: owner,
//       name: name,
//       checkout: checkout,
//     };
//   }
// }

// /**
//  * Adds protocol to url in none specified
//  *
//  * @param {String} url
//  * @return {String}
//  */

// function addProtocol(origin: string, clone: string) {
//   if (!/^(f|ht)tps?:\/\//i.test(origin)) {
//     if (clone) {
//       origin = "git@" + origin;
//     } else {
//       origin = "https://" + origin;
//     }
//   }

//   return origin;
// }

// /**
//  * Return a zip or git url for a given `repo`.
//  */
// function getUrl(repo: string, clone: string) {
//   let url;

//   // Get origin with protocol and add trailing slash or colon (for ssh)
//   let origin = addProtocol(repo.origin, clone);
//   if (/^git@/i.test(origin)) {
//     origin = origin + ":";
//   } else {
//     origin = origin + "/";
//   }

//   // Build url
//   if (clone) {
//     url = origin + repo.owner + "/" + repo.name + ".git";
//   } else {
//     if (repo.type === "github") {
//       url =
//         origin +
//         repo.owner +
//         "/" +
//         repo.name +
//         "/archive/" +
//         repo.checkout +
//         ".zip";
//     } else if (repo.type === "gitlab") {
//       url =
//         origin +
//         repo.owner +
//         "/" +
//         repo.name +
//         "/repository/archive.zip?ref=" +
//         repo.checkout;
//     } else if (repo.type === "bitbucket") {
//       url =
//         origin +
//         repo.owner +
//         "/" +
//         repo.name +
//         "/get/" +
//         repo.checkout +
//         ".zip";
//     }
//   }

//   return url;
// }
