let vibrateDuration = 200;

export const setVibration = (duration) => {
  vibrateDuration = duration;
};

export default function () {
  const canVibrate = window.navigator.vibrate;
  if (canVibrate) window.navigator.vibrate(vibrateDuration);
}
