<script>
import { onMount } from 'svelte'

import Navbar from '../Navbar.svelte'
import Footer from '../Footer.svelte'

let projects = []

onMount(async () => {
  fetch('http://170.187.137.154:1337/api/projects?populate=*')
  .then(res => res.json())
  .then(json => projects = json.data.map(item => item.attributes))
  .catch(_ => console.error('500 Server Error'))
})
</script>

<svelte:head>
  <title>Projects</title>
</svelte:head>

<div id="app">
  <Navbar />

  <div id="projects">
    <h1>Projects</h1>

    <div id="project-list">
      {#each projects as project}
        <div class="project-card">
          <img src="http://170.187.137.154:1337{project.thumbnail.data.attributes.url}" alt="Project Thumbnail" />
          <h2>{ project.title }</h2>
          <span>{ project.description }</span>
          <a href="/">Read More...</a>
        </div>
      {/each}
    </div>

    <Footer />
  </div>
</div>

<style>
#projects {
  padding-top: 50px;
  text-align: center;
}

h1 {
  margin: 70px 0 50px;
}

#project-list {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.project-card {
  display: flex;
  width: 70vw;
  overflow: hidden;
  border-radius: 20px;
  margin-bottom: 50px;
  padding-bottom: 18px;
  flex-direction: column;
  background-color: white;
  border: 1px solid #f0f0f0;
}

.project-card:hover {
  border: none;
  transition: ease .3s;
  box-shadow: 0 2px 8px #999;
}

.project-card span {
  margin: 0 20px 30px;
}

.project-card img {
  width: 70vw;
  height: 35vw;
}

.project-card a {
  color: white;
  padding: 10px 50px;
  border-radius: 4px;
  margin: 0 30px 10px;
  background-color: #1890ff;
}

.project-card a:hover {
  color: #1890ff;
  padding: 9px 49px;
  border: 1px solid #1890ff;
  background-color: white;
}
</style>