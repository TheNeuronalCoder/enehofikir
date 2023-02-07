<script>
import logo from '$lib/img/logo.png'
import { click_outside } from './click_outside.ts'

let open_info_dropdown = false
let open_help_dropdown = false
let open_portrait_nav = false

const toggle_info_dropdown = () => {
  open_help_dropdown = false
  open_info_dropdown = !open_info_dropdown
}

const toggle_help_dropdown = () => {
  open_info_dropdown = false
  open_help_dropdown = !open_help_dropdown
}
</script>

<nav id="main-nav">
  <a id="logo" href="/">
    <img src={logo} alt="main icon" />
  </a>

  <a href="/">
    <button>Home</button>
  </a>

  <a href="/team">
    <button>Team</button>
  </a>

  <a href="/projects">
    <button>Projects</button>
  </a>

  <div use:click_outside on:click_outside={ () => open_info_dropdown = false }>
    <button class="dropdown-btn" on:click={toggle_info_dropdown}>
      Information
      <svg viewBox="4 4 896 896" fill="currentColor" aria-hidden="true"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>
    </button>

    {#if open_info_dropdown}
      <div id="info-dropdown" class="dropdown-content">
        <a href="/news">News & Updates</a>
        <a href="/gallery">Gallery</a>
        <a href="/contact">Contact Us</a>
      </div>
    {/if}
  </div>

  <div use:click_outside on:click_outside={ () => open_help_dropdown = false }>
    <button class="dropdown-btn" on:click={toggle_help_dropdown}>
      Volunteer
      <svg viewBox="4 4 896 896" fill="currentColor" aria-hidden="true"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>
    </button>

    {#if open_help_dropdown}
      <div id="help-dropdown" class="dropdown-content">
        <a href="/register">Register</a>
        <a href="/sponsor">Sponsor a child</a>
        <a href="https://www.paypal.com/us/home">Donate</a>
      </div>
    {/if}
  </div>

  <svg id="unordered-list-icon"
       viewBox="64 64 896 896"
       aria-hidden="true"
       on:click={ () => open_portrait_nav = !open_portrait_nav }>
    <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path>
  </svg>

  {#if open_portrait_nav}
    <div id="portrait-nav">
      <a href="/">Home</a>
      <a href="/team">Team</a>
      <a href="/projects">Projects</a>

      <p>Information</p>
      <a href="/news">News & Updates</a>
      <a href="/gallery">Gallery</a>
      <a href="/contact">Contact Us</a>

      <p>Help</p>
      <a href="/register">Register</a>
      <a href="/sponsor">Sponsor a child</a>
      <a href="/donate">Donate</a>
    </div>
  {/if}
</nav>

<style>
#main-nav {
  position: fixed;
  display: flex;
  width: 100vw;
  height: 64px;
  padding-right: 30px;
  box-sizing: border-box;
  background-color: white;
  justify-content: flex-end;
  box-shadow: 0 2px 8px #f0f1f2;
  z-index: 1;
}

#logo {
  cursor: pointer;
  margin-left: 70px;
  margin-right: auto;
}
#logo img { height: 64px; }

#info-dropdown { right: 96px; }
#help-dropdown { right: 30px; }
.dropdown-content {
  position: absolute;
  display: flex;
  width: 130px;
  margin-top: 10px;
  border-radius: 3px;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05);
  -webkit-box-shadow: 0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05);
}

.dropdown-content a {
  color: #595959;
  padding: 8px 0;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
}
.dropdown-content a:hover { background-color: #f5f5f5; }

#main-nav button {
  cursor: pointer;
  background-color: white;
}

.dropdown-btn, #main-nav a button {
  border: 0;
  font-size: 14px;
  color: black;
  /* margin: 0 12px; */
  padding: 22.5px 12px;
  font-family: Avenir, -apple-system, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

#main-nav a button {
  margin: 0 12px;
  padding: 21px 0;
  /* padding: 21px 12px; */
  border-top: 2px solid white;
}

#main-nav button:hover { color: #1890ff; }

#main-nav a button:hover {
  transition: .3s ease;
  border-top: 2px solid #1890ff;
}

/*       Icons       */
#main-nav button svg {
  width: .75em;
  height: .75em;
  margin-left: 2px;
}

/*       Portrait Navbar       */
#portrait-nav {
  position: absolute;
  display: none;
  width: 300px;
  height: 448px;
  top: 60px;
  right: 15px;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05);
  -webkit-box-shadow: 0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05);

  overflow: auto;
  max-height: 90vh;
}

#unordered-list-icon {
  position: absolute;
  display: none;
  width: 14px;
  height: 14px;
  top: 25px;
  right: 31px;
  cursor: pointer;
}

#portrait-nav a, #portrait-nav p {
  font-size: 14px;
  font-family: Avenir, -apple-system, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

#portrait-nav p {
  margin-bottom: 8px;
  color: #8c8c8c;
  padding: 8px 16px 0px 24px;
}

#portrait-nav a {
  color: #333;
  cursor: pointer;
  padding: 10px 0 10px 24px;
}

#portrait-nav a:hover {
  background-color: #f5f5f5;
}

/*       Responsive Media Queries       */
@media (max-width: 600px) {
  #logo { margin-left: auto; }
  #portrait-nav { display: flex; }
  #unordered-list-icon { display: block; }
  #main-nav button, .dropdown-content { display: none; }
}
</style>