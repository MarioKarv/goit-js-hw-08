import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const time = 'videoplayer-current-time';

player.on('timeupdate', throttle(updatePlaybackTime, 1000));

function updatePlaybackTime({ seconds }) {
    localStorage.setItem(time, seconds);
}

player.setCurrentTime(localStorage.getItem(time));
