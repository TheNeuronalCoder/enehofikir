<script>
import { onMount } from 'svelte'

import Navbar from '../Navbar.svelte'
import Footer from '../Footer.svelte'

let photos = []
let videos = []

onMount(async () => {
  fetch('https://enehofikir.onrender.com/api/gallery?populate=*')
  .then(res => res.json())
  .then(json => {
    videos = json.data.attributes.videos.split('\n')
    photos = json.data.attributes.photos.data.map(item => item.attributes.url)
  }).catch(error => {
    console.error('500 Server Error')
  })
})
</script>

<svelte:head>
  <title>Gallery</title>
</svelte:head>

<div id="app">
  <Navbar />

  <div id="gallery">
    <h1>Gallery</h1>

    <h2>Videos</h2>
    <div id="video-gallery">
      {#each videos as url}
        <iframe src={url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
      {/each}
    </div>

    <h2>Images</h2>
    <div id="image-gallery">
      {#each photos as photo, i}
        <img src={photo} alt="Gallery Photo" />
      {/each}
    </div>

    <Footer />
  </div>
</div>

<style>
#gallery {
  margin-top: 64px;
  box-sizing: border-box;
}

#gallery h1 {
  text-align: center;
  margin: 120px 0 50px;
}

#gallery h2 {
  color: #666;
  font-size: 25px;
  text-align: center;
}

#video-gallery {
  width: 80vw;
  margin: 0 10vw 50px;

  column-gap: 1vw;
  column-count: 3;
}

#video-gallery iframe {
  width: 26vw;
  height: 14.625vw;
}
#video-gallery iframe:not(:last-child) { margin-bottom: 1vw; }

#image-gallery {
  width: 80vw;
  margin: 0 10vw;
  column-gap: 1vw;
  column-count: 3;
}

#image-gallery img {
  width: 26vw;
  border: none;
  margin-bottom: 1vw;
}

#image-gallery img, #video-gallery iframe {
  background: linear-gradient(0.25turn, transparent, #fff, transparent),
              linear-gradient(#f5f6f7, #f5f6f7);  
  background-repeat: no-repeat;
  background-size: 26vw 26vw, 26vw 14.8571429vw, 8.25396825 10.4vw, 23.4vw 3.12vw; 
  background-position: -26vw 0, 0 0, 0 19.76vw, 4.12698413vw 20.28vw; 
  animation: loading 1.5s infinite;
}

@keyframes loading {  
  to { background-position: 26vw 0, 0 0, 0 19.76vw, 4.12698413vw 20.28vw; }
}

@media (min-aspect-ratio: 5/6) and (max-aspect-ratio: 5/4) {
  #video-gallery, #image-gallery { column-count: 2; }

  #video-gallery iframe {
    width: 39vw;
    height: 21.9375vw;
  }
  #image-gallery img { width: 39vw; }
}

@media (max-aspect-ratio: 5/6) {
  #video-gallery, #image-gallery { column-count: 1; }

  #video-gallery iframe {
    width: 78vw;
    height: 43.875vw;
  }
  #image-gallery img { width: 78vw; }
}
</style>
