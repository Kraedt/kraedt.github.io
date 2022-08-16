
let metaUrl = "";

const initMeta = (downloadSiteUrl) => {
  metaUrl = `${downloadSiteUrl}meta`;
  console.log(metaUrl)
}

const licenses = [
  {
    "id": 1,
    "name": "Creative Commons",
    "desc": "This track was released under Creative Commons and can be used in any content where credit is given.",
    "level": 1
  },
  {
    "id": 2,
    "name": "Unofficial Remix",
    "desc": "This track is potentially under strict licensing and unsafe to use in any content, as it is an unofficial remix of a copyrighted song.",
    "level": 3
  },
  {
    "id": 3,
    "name": "Unsafe",
    "desc": "This track was released under a potentially non-content-producer-friendly license and is unsafe for use in any content.",
    "level": 3
  },
  {
    "id": 4,
    "name": "Wolf Beats CC",
    "desc": "This track was released under Creative Commons (or similar) and can be used in any content where credit is given.",
    "info-url": "http://www.wolfbeatsmedia.com/copyright.html",
    "level": 1
  },
  {
    "id": 5,
    "name": "THN License",
    "desc": "This track was released under a potentially non-content-producer-friendly license, but may be safe to use in content under certain circumstances.",
    "info-url": "http://tryhardninja.com/MusicUsageTerms",
    "level": 2
  },
  {
    "id": 6,
    "name": "None",
    "desc": "There is no current license information for this track.",
    "level": 3
  },
  {
    "id": 7,
    "name": "Vital Free Music",
    "desc": "This track was released for free by VitalFM and is safe to use for creative content provided that you give credit to me (the artist). It wouldn't be a bad idea to paste a link to VitalFM's website or Soundcloud, as well. If planning to use for commercial purposes, please contact me first.",
    "level": 1
  }
]

const licenseIcons = [
  {
    "level": 1,
    "class": "fa fa-check-circle text-success"
  },
  {
    "level": 2,
    "class": "fa fa-exclamation-circle text-warning"
  },
  {
    "level": 3,
    "class": "fa fa-skull-crossbones text-danger"
  }
]

const getLicenseIcon = (licenseId) => {
  let license = licenses.find(x => x.id == licenseId);
  let icon = licenseIcons.find(x => x.level == license.level);
  return `<i class="${icon.class} fa-lg " title="${license.desc}"></i>`
}

const externalLink = (title, url, img) => url ? `<a href="${url}" title="${title}" target="_blank"><img src="/assets/images/links/${img}.png" /></a>` : '';
const getItemImageUrl = (item) => item.imageUrl ? item.imageUrl : 'no-image.jpg';

const fillSongTable = (filterSafe, songs) => {
  let table = $('#music-table');
  for (song of songs) {
    let license = licenses.find(x => x.id == song.licenseId);
    if (filterSafe && license.level !== 1)
      continue;

    table.append(`
      <tr>
        <td>
          <a href="<<songurl>>"><img class="image-prop" src="/assets/images/songs/${getItemImageUrl(song)}"/></a>

          <div class="mobile-song-info">
            <h2><a href="${song.url}">${song.title}</a> ${getLicenseIcon(song.licenseId)}</h2>
            <p>${song.artist}</p>
          </div>
        </td>
        <td class="song-info">
          <a href="${song.url}">${song.title}</a>
          ${getLicenseIcon(song.licenseId)}
        </td>
        <td class="song-info">${song.artist}</td>
        <td class="song-info">${song.genre}</td>
        <td>
          <div class="audio-links">
            ${song.downloadable ? `<button class="direct-dl-btn" onclick="requestDownload({{ song.id }}, '{{ site.download-site-dl }}')"><img src="/assets/images/links/direct.png"/></button>` : ''}
            ${externalLink('Spotify', song.spotifyUrl, 'spotify')}
            ${externalLink('iTunes', song.itunesUrl, 'itunes')}
            ${externalLink('Beatport', song.beatportUrl, 'beatport')}
            ${externalLink('Amazon', song.amazonUrl, 'amazon')}
          </div>
        </td>
      </tr>
    `)
  }
}

const fillAlbumsTable = (albums) => {
  let table = $('#albums-table');
  for (album of albums) {
    table.append(`
      <tr>
        <td>
          <a href="<<albumurl>>"><img class="image-prop" src="/assets/images/songs/${getItemImageUrl(album)}"/></a>

          <div class="mobile-song-info">
            <h2><a href="<<albumurl>>">${album.title}</a></h2>
          </div>
        </td>
        <td class="song-info"><h4><a href="<<albumurl>>">${album.title}</a></h4></td>
      </tr>
    `)
  }
}

const ajaxGet = (url, success, data) => $.ajax({
  type: "GET",
  crossDomain: true,
  url: url,
  data: data,
  success: success,
  error: (err) => {
    console.log("Error: " + JSON.stringify(err));
    return false;
  }
})

const loadSongs = (filterSafe) => $(document).ready(() => ajaxGet(`${metaUrl}/songs`, (r) => fillSongTable(filterSafe, r)));
const loadAlbums = () => $(document).ready(() => ajaxGet(`${metaUrl}/albums`, (r) => fillAlbumsTable(r)));