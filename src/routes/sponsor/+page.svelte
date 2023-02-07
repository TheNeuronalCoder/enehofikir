<script>
import { onMount } from 'svelte'

import Navbar from '../Navbar.svelte'
import Footer from '../Footer.svelte'

let children = []

onMount(async () => {
  fetch('http://localhost:1337/api/children?populate=*')
  .then(res => res.json())
  .then(json => children = json.data.map(item => item.attributes))
  .catch(_ => console.error('500 Server Error'))
})
</script>

<svelte:head>
  <title>Sponsor a Child</title>
</svelte:head>

<div id="app">
  <Navbar />

  <div id="children">
    <h1>Sponsor a child</h1>

    <div id="children-list">
      {#each children as child}
        <div class="member-card">
          <img width="300" height="200"
               src="http://localhost:1337{child.photo.data.attributes.url}"
               alt={child.name} />
          <h3>{ child.name }</h3>
          <span>{ child.name }</span>
          <button>Sponsor</button>
        </div>
      {/each}
    </div>

    <Footer />
  </div>
</div>

<style>
#children {
  display: block;
  margin-top: 64px;
  height: 100vh;
}

#children h1 {
  text-align: center;
  margin: 120px 0 50px;
}

#children-list {
  display: flex;
  margin: 0 50px;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.member-card {
  display: flex;
  width: 300px;
  overflow: hidden;
  text-align: center;
  border-radius: 10px;
  margin-bottom: 20px;
  padding-bottom: 18px;
  flex-direction: column;
  border: 1px solid #f0f0f0;
}

.member-card img {
  background: linear-gradient(0.25turn, transparent, #fff, transparent),
              linear-gradient(#f5f6f7, #f5f6f7);  
  background-repeat: no-repeat;
  background-size: 300px 200px, 300px 144px, 95.2380952 80px, 214.285714px 24px;
  background-position: -300px 0, 0 0, 0 152px, 47.6190476px 156px;  
  animation: loading 1.5s infinite;
}

button {
  border: none;
  color: white;
  cursor: pointer;
  margin: 0 20px;
  padding: 10px 50px;
  border-radius: 4px;
  text-decoration: none;
  background-color: #1890ff;
  font-family: "Graphik LCG", -apple-system, system-ui, "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
}

button:hover {
  color: #1890ff;
  padding: 9px 49px;
  border: 1px solid #1890ff;
  background-color: white;
}

span {
  margin-bottom: 10px;
}

@keyframes loading {
  to { background-position: 300px 0, 0 0, 0 152px, 47.6190476px 156px; }
}
</style>