<script>
import { onMount } from 'svelte'

import Navbar from './Navbar.svelte'
import Footer from './Footer.svelte'

let slide = 0
let about = ''
let mission = ''
let vision = ''
let values = ''
let slides = []

onMount(async () => {
  fetch('https://enehofikir.herokuapp.com/api/home?populate=*')
  .then(res => res.json())
  .then(json => {
		about = json.data.attributes.about
		mission = json.data.attributes.mission
		vision = json.data.attributes.vision
		values = json.data.attributes.values
    slides = json.data.attributes.slides.data.map(item => `https://enehofikir.herokuapp.com${item.attributes.url}`)
    console.log(slides)
  }).catch(error => {
    about = '500 Server Error',
    mission = '500 Server Error'
    vision = '500 Server Error'
    values = '500 Server Error'
  })
})
</script>

<svelte:head>
  <title>Home - Enoho Fikir</title>
</svelte:head>

<div id="app">
  <Navbar />

  <div id="home">
    <div id="slideshow">
      <img class="slide" src={slides[slide]} alt="Slideshow" />

      <div id="right-arrow" on:click={ () => slide = slide==slides.length-1 ? 0 : slide+1 }>
        <svg width="100%" height="100%" viewBox="4 0 16 24">
          <path fill="white" d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/>
        </svg>
      </div>

      <div id="left-arrow" on:click={ () => slide = slide==0 ? slides.length-1 : slide-1 }>
        <svg width="100%" height="100%" viewBox="4 0 16 24">
          <path fill="white" d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
        </svg>
      </div>
    </div>

    <div id="about-enoho">
      <h1>About Eneho Fikir</h1>
      <h2>Enoho Fikir & Development Organization</h2>
      <p>{ about }</p>
    </div>

    <div id="mission" class="info">
      <div class="info-text">
        <h1>Our Mission</h1>
        <p>{ mission }</p>
      </div>
      <div id="mission-graphic"></div>
    </div>

    <div id="vision" class="info">
      <div class="info-text">
        <h1>Our Vision</h1>
        <p>{ vision }</p>
      </div>
      <div id="vision-graphic"></div>
    </div>

    <div id="values" class="info">
      <div class="info-text">
        <h1>Our Values</h1>
        <p>{ values }</p>
      </div>
      <div id="values-graphic"></div>
    </div>

    <Footer />
  </div>
</div>

<style>
#home {
  text-align: center;
  margin-top: 70px;
}

#home h2 {
  font-size: 18px;
  color: #3f3f3f;
}

#about-enoho { margin: 80px 0; }
#about-enoho p {
  margin: 0 15vw;
  font-size: 16px;
  line-height: 24px;
}

/*       Slideshow       */
#slideshow {
  display: grid;
  width: 100vw;
  height: 34vw;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
}

#right-arrow {
  position: relative;
  width: 50px;
  height: 50px;
  opacity: 0.8;
  cursor: pointer;
  right: 80px;
  top: calc(34vw / 2 - 50px);
}
#right-arrow:hover { opacity: 1; }

#left-arrow {
  position: relative;
  width: 50px;
  height: 50px;
  left: 30px;
  opacity: 0.8;
  top: calc(34vw / -2 - 50px);
  cursor: pointer;
}
#left-arrow:hover { opacity: 1; }

.slide {
  width: 100vw;
  height: 34vw;
  object-fit: cover;
  grid-column: 1 / 3;
}

/*       Info Cards       */
.info {
  display: flex;
  /* margin: 20px 0; */
  padding: 35px 0;
  flex-direction: row;
  align-items: center;
  justify-items: center;
}
.info-text { width: 50vw; }
.info-text h1 { margin-top: 0; }
.info-text p { margin: 0 12vw; }

#vision {
  padding: 35px 0;
  flex-direction: row-reverse;
  background-color: #f5f5f5;
}

#mission-graphic {
  width: 30vw;
  height: 21.52vw;
  margin: 0 10vw 30px;
  background: url('../lib/icons/rocket.svg');
}

#vision-graphic {
  width: 30vw;
  height: 22.15vw;
  margin: 0 10vw 30px;
  background: url('../lib/icons/environment.svg');
}

#values-graphic {
  width: 30vw;
  height: 21.63vw;
  margin: 0 10vw 30px;
  background: url('../lib/icons/family.svg');
}

/*       Responsive Media Queries       */
@media (max-width: 800px) {
  .info, #vision { flex-direction: column-reverse; }
  .info-text { width: 100vw; }

  #mission-graphic {
    width: 70vw;
    height: 50.21vw;
  }

  #vision-graphic {
    width: 60vw;
    height: 44.31vw;
  }

  #values-graphic {
    width: 60vw;
    height: 43.25vw;
  }
}
</style>