<script>
import { onMount } from 'svelte'

import Navbar from '../Navbar.svelte'
import Footer from '../Footer.svelte'

let cover_stories = []
let latest_news = []

let page = 0
let pagination = 0
let page_range = []
let pagination_index = 0

const prev_page = () => {
  page -= 1
  pagination_index = Math.floor(page / 4)
  page_range = page > pagination-4
             ? Array.from({ length: pagination-pagination_index*4 }, (_, i) => pagination_index*4+i)
             : Array.from({ length: 4 }, (_, i) => pagination_index*4+i)
}

const next_page = () => {
  page += 1
  pagination_index = Math.floor(page / 4)
  page_range = page > pagination-4
             ? Array.from({ length: pagination-pagination_index*4 }, (_, i) => pagination_index*4+i)
             : Array.from({ length: 4 }, (_, i) => pagination_index*4+i)
}

onMount(async () => {
  fetch('https://enehofikir.onrender.com/api/stories?populate=*')
  .then(res => res.json())
  .then(json => {
    const data = json.data.map(story => story.attributes)
    cover_stories = data.filter(story => story.category=='Cover Story')
    latest_news = data.filter(story => story.category=='Latest News')
    pagination_index = Math.floor(page / 4)
    pagination = Math.ceil(latest_news.length/4)
    page_range = page > pagination-4
              ? Array.from({ length: pagination-pagination_index*4 }, (_, i) => pagination_index*4+i)
              : Array.from({ length: 4 }, (_, i) => pagination_index*4+i)
  }).catch(e => console.error('500 Server Error'))
})
</script>

<svelte:head>
  <title>News & Updates</title>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css">
</svelte:head>

<div id="app">
  <Navbar />

  <div id="news">
    <h1>News & Updates</h1>

    <div id="cover-stories">
      {#each cover_stories as story}
        <div>
          <img src={story.thumbnail.data.attributes.url} alt={story.title} />
          <a href={`/news/${story.title.toLowerCase().split(' ').join('-')}`}>{ story.title }</a>
        </div>
      {/each}
    </div>

    <div id="latest-news">
      <header>Latest News <i class="arrow-right"></i></header>

      {#if pagination > 1}
        <div id="pagination">
          {#if page > 0}
            <i class="mi mi-chevron-left" on:click={prev_page}></i>
          {/if}

          {#each page_range as i}
            <span class={ page==i ? 'active-page': 'page' } on:click={ () => page = i }>
              { i+1 }
            </span>
          {/each}

          {#if page < pagination-1}
            <i class="mi mi-chevron-right" on:click={next_page}></i>
          {/if}
        </div>
      {/if}
    </div>

    <div id="latest-news-stories">
      {#each latest_news.slice(page*4, Math.min(latest_news.length, page*4+4)) as story}
        <div>
          <a href={`/news/${story.title.toLowerCase().split(' ').join('-')}`}>
            <img src={story.thumbnail.data.attributes.url} alt={story.title} />
            <h2>{ story.title }</h2>
            <p>{ story.content.substring(0, 150) }...</p>
          </a>
        </div>
      {/each}
    </div>

    <Footer />
  </div>
</div>

<style>
#news {
  box-sizing: border-box;
}

#news h1 {
  text-align: center;
  margin: 120px 0 50px;
}

#cover-stories {
  display: grid;
  width: 90vw;
  height: 40vw;
  margin: 0 5vw;
  overflow: hidden;
  margin-bottom: 70px;
  grid-template-areas:
    "main-story side-story1"
    "main-story side-story2";
  grid-template-rows: 50% 50%;
  grid-template-columns: 60vw 30vw;
}

#cover-stories div {
  display: grid;
  overflow: hidden;
  grid-template-rows: 0 100%;
}
#cover-stories div img { width: 100%; }
#cover-stories div a {
  margin: 0;
  padding: 30px;
  color: white;
  align-self: end;
  font-size: 25px;
  font-weight: bold;
  background-color: #00000077;
}

#cover-stories div:nth-child(1) { grid-area: main-story; }
#cover-stories div:nth-child(2) { grid-area: side-story1; }
#cover-stories div:nth-child(3) { grid-area: side-story2; }

.arrow-right {
  display: inline-block;
  padding: 5px;
  border: solid black;
  border-width: 0 5px 5px 0;
  transform: rotate(315deg);
  -webkit-transform: rotate(315deg);
}

#news header {
  font-size: 24px;
  margin: 0 0 10px 5vw;
  font-weight: bold;
}

#latest-news {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#pagination {
  display: flex;
  margin-right: 5vw;
  margin-bottom: 15px;
  align-items: center;
  flex-direction: row;
}
#pagination i {
  cursor: pointer;
  width: 32px;
  height: 32px;
}
#pagination i:hover { background-color: #f0f0f0; }

.active-page {
  display: block;
  width: 30px;
  height: 30px;
  color: white;
  margin: 0 5px;
  font-size: 14px;
  font-weight: 600;
  line-height: 30px;
  border-radius: 5px;
  text-align: center;
  background-color: #1677ff;
  font-family: -apple-system, "system-ui", "segoe ui", Roboto, "helvetica neue", Arial, "noto sans", sans-serif, "apple color emoji", "segoe ui emoji", "segoe ui symbol", "noto color emoji";
}

.page {
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  line-height: 30px;
  border-radius: 5px;
  text-align: center;
  color: #1677ff;
  background-color: white;
  border: 1px solid #1677ff;
  font-family: -apple-system, "system-ui", "segoe ui", Roboto, "helvetica neue", Arial, "noto sans", sans-serif, "apple color emoji", "segoe ui emoji", "segoe ui symbol", "noto color emoji";
}

#latest-news-stories {
  display: flex;
  width: 90vw;
  gap: 20px;
  margin: 0 5vw 50px;
  flex-wrap: wrap;
  flex-direction: row;
}
#latest-news-stories div { width: 400px; }
#latest-news-stories div h2 { color: black; }

#latest-news-stories div img {
  width: 400px;
  background: linear-gradient(0.25turn, transparent, #fff, transparent),
              linear-gradient(#f5f6f7, #f5f6f7);  
  background-repeat: no-repeat;
  background-size: 300px 200px, 300px 144px, 95.2380952px 80px, 214.285714px 24px;
  background-position: -300px 0, 0 0, 0 152px, 47.6190476px 156px;  
  animation: loading 1.5s infinite;
}

@keyframes loading {
  to { background-position: 300px 0, 0 0, 0 152px, 47.6190476px 156px; }
}

@media (max-width: 900px) {
  #cover-stories {
    grid-template-areas:
      "main-story main-story"
      "main-story main-story";
  }
}
</style>
