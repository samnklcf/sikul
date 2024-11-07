let header = document.getElementById("header");
let headerComponent = `<div
      class="bg-white flex w-full py-3 px-4 justify-between items-center border-b border-gray-200"
    >
      <div class="flex items-center">
        <a
          class="hover:opacity-70 transition-opacity flex items-start mr-10"
          href="/home.html"
        >
          <img src="./assets/images/sik.png" width="50" srcset="">
        </a>
        <a
          class="mr-6 hover:text-accent-600 transition-colors font-medium text-accent-600"
          href="home.html"
        >
          <span>Mes livres</span>
        </a>
        <a
          class="hover:text-accent-600 transition-colors font-medium text-neutral-700"
          href="/community"
        >
          <span class="">Découvertes</span>
        </a>
      </div>

      <nav class="flex items-center" data-controller="shared--darkmode">
        <a
          data-turbo-frame="modal"
          class=" button-secondary mr-2"
          href="/compte.html"
          > <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewbox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
          class="w-5 h-5 text-neutral-700 dark:text-neutral-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          ></path>
        </svg>Mon compte</a
        >
      </nav>
    </div>`

header.innerHTML = headerComponent
