import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function init() {
  const icons = [faGithub];

  library.add(...icons);
}
