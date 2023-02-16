import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

export default function init() {
  const icons = [faGithub, faCalendar];

  library.add(...icons);
}
